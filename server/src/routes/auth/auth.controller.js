const { findHash } = require("../../models/hash/hash.model");
const { findUser } = require("../../models/user/user.model");

const { createAccessToken, createRefreshToken } = require("../../libs/jwt.lib");
const { compareHash } = require("../../libs/hash.lib");
const { sendRefreshToken } = require("../../utils/cookie.util");

async function httpPostLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Wrong Credentials", message: "Fields can't be empty!" });
  }

  try {
    const user = await findUser({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Invalid User", message: "User not found!" });
    }

    const passHash = await findHash({ userId: user._id });
    if (!passHash) {
      return res
        .status(400)
        .json({ error: "Invalid User", message: "User not found!" });
    }

    const passwordMatched = await compareHash(password, passHash.hash);

    if (!passwordMatched) {
      return res
        .status(400)
        .json({ error: "Unable to login", message: "Wrong password!" });
    }

    sendRefreshToken(
      res,
      createRefreshToken({
        uid: user._id,
        tokenVersion: user.tokenVersion,
      })
    );

    const token = createAccessToken({
      uid: user._id,
    });

    return res.status(200).json({ accessToken: token, message: "User found" });
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ error: "Invalid User", message: err.message });
  }
}

async function httpGetLogout(req, res) {
  try {
    sendRefreshToken(
      res,
      createRefreshToken({
        name: "",
        uid: "",
      })
    );

    return res.status(200).json({ ok: true, message: "Success" });
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Logout wasn't successful", message: err.message });
  }
}

module.exports = {
  httpPostLogin,
  httpGetLogout,
};
