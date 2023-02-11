const authRouter = require("../routes/auth/auth-register.router");

const {
  httpPostRegisterVersity,
} = require("../routes/auth/auth-register.controller");
jest.mock("express", () => ({
  Router: () => ({ get: jest.fn(), put: jest.fn(), post: jest.fn() }),
}));

describe("authentication", () => {
  it("should register university", () => {
    expect(authRouter.post).toHaveBeenCalledTimes(4);
    expect(authRouter.post).toHaveBeenCalledWith(
      "/versity",
      httpPostRegisterVersity
    );
  });
  // it("should user logout",()=>{
  //     expect(authRouter.get).toHaveBeenCalledTimes(3);
  // })
});
