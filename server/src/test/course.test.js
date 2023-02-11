const managementCourseRouter = require("../routes/management/management-course.router");

const {
  httpGetCourse,
  httpPostCourse,
} = require("../routes/management/management-course.controller");
const {
  checkManagementPermission,
} = require("../routes/_middlewares/check-management-permission.mw");

jest.mock("express", () => ({
  Router: () => ({ get: jest.fn(), put: jest.fn(), post: jest.fn() }),
}));

describe("course", () => {
  it("should get course", () => {
    expect(managementCourseRouter.get).toHaveBeenCalledTimes(1);
    expect(managementCourseRouter.get).toHaveBeenCalledWith("/", httpGetCourse);
  });
  it("should create courses", () => {
    expect(managementCourseRouter.post).toHaveBeenCalledTimes(1);
    expect(managementCourseRouter.post).toHaveBeenCalledWith(
      "/",
      checkManagementPermission,
      httpPostCourse
    );
  });
});
