const managementHallRouter = require("../routes/management/management-hall.router");

const {
  httpPostHall,
  httpGetHall,
} = require("../routes/management/management-hall.controller");
const {
  checkManagementPermission,
} = require("../routes/_middlewares/check-management-permission.mw");

jest.mock("express", () => ({
  Router: () => ({ get: jest.fn(), put: jest.fn(), post: jest.fn() }),
}));

describe("hall", () => {
  it("should get hall", () => {
    expect(managementHallRouter.get).toHaveBeenCalledTimes(1);
    expect(managementHallRouter.get).toHaveBeenCalledWith("/", httpGetHall);
  });
  it("should create hall", () => {
    expect(managementHallRouter.post).toHaveBeenCalledTimes(1);
    expect(managementHallRouter.post).toHaveBeenCalledWith(
      "/",
      checkManagementPermission,
      httpPostHall
    );
  });
});
