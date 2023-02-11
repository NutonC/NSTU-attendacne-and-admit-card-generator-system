const departmentsDatabase = require("../mongo-db/departments.mongo");

const { versityExistsWithId } = require("../versity/versity.model");

async function registerDepartment(departmentData) {
  const { departmentCode, versityId } = departmentData;
  try {
    const versityExists = await versityExistsWithId(versityId);
    if (!versityExists) {
      throw new Error("Unauthorized versity");
    }

    const departmentExists = await findDepartment({
      departmentCode,
      versityId,
    });
    if (departmentExists) {
      throw new Error("Department already exists!");
    }

    await departmentsDatabase.create({
      ...departmentData,
      createdAt: new Date(),
    });

    return {
      ok: 1,
      department: departmentData,
    };
  } catch (err) {
    throw new Error(err.message);
  }
}

async function findDepartments(filterQueryObj) {
  return await departmentsDatabase
    .find(filterQueryObj, {
      versityId: 0,
      _id: 0,
      __v: 0,
    })
    .sort({ createdAt: -1 }); //DESC order
}

async function findDepartment(filterQueryObj) {
  return await departmentsDatabase.findOne(filterQueryObj);
}

async function departmentExistsWithId(departmentId) {
  try {
    return await departmentsDatabase.findById(departmentId);
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = {
  registerDepartment,
  findDepartment,
  findDepartments,
  departmentExistsWithId,
};
