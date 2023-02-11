const managementDepartmentRouter = require("../routes/management/management-department.router");

const {
  httpPostDepartment,
  httpGetDepartment,
} = require("../routes/management/management-department.controller");
const {
  checkManagementPermission,
} = require("../routes/_middlewares/check-management-permission.mw");

jest.mock("express", () => ({
  Router: () => ({ get: jest.fn(), put: jest.fn(), post: jest.fn() }),
}));

describe("department", () => {
  it("should get course", () => {
    expect(managementDepartmentRouter.get).toHaveBeenCalledTimes(1);
    expect(managementDepartmentRouter.get).toHaveBeenCalledWith(
      "/",
      httpGetDepartment
    );
  });
  it("should create courses", () => {
    expect(managementDepartmentRouter.post).toHaveBeenCalledTimes(1);
    expect(managementDepartmentRouter.post).toHaveBeenCalledWith(
      "/",
      checkManagementPermission,
      httpPostDepartment
    );
  });
});
