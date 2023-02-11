const { userExistsWithId } = require("../../models/user/user.model");
const {
  findSubscriptionPackage,
} = require("../../models/subscription-package/subscription-package.model");
const {
  findVersity,
  versityExistsWithId,
} = require("../../models/versity/versity.model");
const { findTeacher } = require("../../models/teacher/teacher.model");
const { getStudnetData } = require("../../models/student/student.model");
const {
  departmentExistsWithId,
} = require("../../models/department/department.model");
const { hallExistsWithId } = require("../../models/hall/hall.model");
const {
  findManagement,
  findManagements,
} = require("../../models/management/management.model");

const { getNextDateISOstring } = require("../../utils/date.util");
const CONFIG = require("../../config");
const {
  findRegistrationToken,
} = require("../../models/registration-token/registration-token.model");
const { createAccessToken } = require("../../libs/jwt.lib");

async function httpGetUserProfile(req, res) {
  const { userId } = req.user;

  try {
    const user = await userExistsWithId(userId);

    if (!user) {
      return res.status(404).json({
        error: "Couldn'\t load profile",
        message: "Profile not found",
      });
    }

    const response = await handleLoadUserProfile({
      userId: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      joined: user.joined,
      userRole: user.role,
    });

    return res.status(200).json({
      data: response.data,
      accessToken: response.accessToken,
      message: "Profile Found!",
    });
  } catch (err) {
    console.error(err);
    return res
      .status(404)
      .json({ error: "Couldn'\t load profile", message: err.message });
  }
}

async function handleLoadUserProfile({
  userId,
  name,
  email,
  phone,
  gender,
  joined,
  userRole,
}) {
  try {
    let userData = {
      name,
      email,
      phone,
      gender,
    };

    if (userRole === Number(CONFIG.user_roles.versity)) {
      const versity = await findVersity({ userId });
      if (!versity) {
        throw new Error("Profile not found");
      }
      const subscriptionData = await findSubscriptionPackage({
        _id: versity.subscriptionPackageId,
      });
      if (!subscriptionData) {
        throw new Error("Profile not found");
      }

      const tokenData = await findRegistrationToken({ versityId: versity._id });
      if (!tokenData) {
        throw new Error("Profile not found");
      }
      const { tokenCode, tokenUseLeft, tokenType } = tokenData;

      const managementAccounts = await findManagements({
        versityId: versity._id,
      });

      let managementUsers = [];
      for await (const managementData of managementAccounts) {
        const management = await userExistsWithId(managementData.userId);

        if (management) {
          managementUsers.push({
            name: management.name,
            email: management.email,
            phone: management.phone,
            joined: management.joined,
          });
        }
      }

      const finalData = {
        versityName: versity.versityName,
        versityWebsite: versity.versityWebsite,
        subscribedPackage: subscriptionData.packageName,
        packageExpiration: versity.subscriptionPackageExpiry,
        packageEnrolled: versity.subscriptionPackageEnrolled,
        tokenData: { tokenCode, tokenUseLeft, tokenType },
        managementUsers,
        uType: "versity",
      };

      const accessToken = createAccessToken({
        uid: userId,
        vid: versity._id,
      });

      return {
        data: Object.assign(userData, { ...finalData }),
        accessToken,
      };
    }

    if (userRole === Number(CONFIG.user_roles.management)) {
      const management = await findManagement({ userId });

      if (!management) {
        throw new Error("Profile not found");
      }
      const versity = await versityExistsWithId(management.versityId);
      const subscriptionData = await findSubscriptionPackage({
        _id: versity.subscriptionPackageId,
      });
      if (!subscriptionData) {
        throw new Error("Profile not found");
      }

      const { nextDayISO } = getNextDateISOstring(
        joined,
        subscriptionData.packageDurationInDays
      );

      const finalData = {
        versityName: versity.versityName,
        versityWebsite: versity.versityWebsite,
        subscribedPackage: subscriptionData.packageName,
        packageExpiration: nextDayISO,
        uType: "management",
      };

      const accessToken = createAccessToken({
        uid: userId,
        vid: versity._id,
      });

      return {
        data: Object.assign(userData, { ...finalData }),
        accessToken,
      };
    }

    if (userRole === Number(CONFIG.user_roles.teacher)) {
      const { teacherTitle, teacherUID, departmentId, versityId } =
        await findTeacher({ userId });
      const { departmentName, departmentCode } = await departmentExistsWithId(
        departmentId
      );
      const { versityName } = await versityExistsWithId(versityId);

      const finalData = {
        ...userData,
        teacherTitle,
        teacherUID,
        versityName,
        departmentCode,
        departmentName,
        uType: "teacher",
      };

      const accessToken = createAccessToken({
        uid: userId,
        vid: versityId,
      });

      return {
        data: Object.assign(userData, { ...finalData }),
        accessToken,
      };
    }

    if (userRole === Number(CONFIG.user_roles.student)) {
      const studentData = await getStudnetData({ userId });

      const finalData = {
        fathersName: studentData.fathersName,
        mothersName: studentData.mothersName,
        versityName: studentData.versityId.versityName,
        departmentCode: studentData.departmentId.departmentCode,
        departmentName: studentData.departmentId.departmentName,
        semesterData: studentData.semesterIds,
        currentSemesterData: studentData.currentSemesterId.semesterNumber,
        session: studentData.sessionId.session,
        dateOfBirth: studentData.dateOfBirth,
        uType: "student",
      };

      const accessToken = createAccessToken({
        uid: userId,
        vid: studentData.versityId._id,
      });

      return {
        data: Object.assign(userData, { ...finalData }),
        accessToken,
      };
    }

    return userData;
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = {
  httpGetUserProfile,
};
