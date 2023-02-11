const { userExistsWithId } = require("../../models/user/user.model");

const {
  verifyeRefreshToken,
  createRefreshToken,
  createAccessToken,
} = require("../../libs/jwt.lib");
const { sendRefreshToken } = require("../../utils/cookie.util");

async function httpPostRefreshToken(req, res) {
  const token = req.cookies.jid;
  if (!token) {
    return res.send({ ok: false, accessToken: "" });
  }

  try {
    let payload = null;
    try {
      payload = verifyeRefreshToken(token);
      if (payload.uid === "") {
        throw new Error("Invalid user");
      }
    } catch (err) {
      console.error(err);
      return res.send({ ok: false, accessToken: "" });
    }

    // token is valid and
    // we can send back an access token
    const user = await userExistsWithId(payload.uid);

    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: "" });
    }

    sendRefreshToken(
      res,
      createRefreshToken({
        uid: user._id,
        tokenVersion: user.tokenVersion,
      })
    );

    return res.send({
      ok: true,
      accessToken: createAccessToken({
        uid: user._id,
      }),
    });
  } catch (err) {
    console.error(err);
    return res.send({ ok: false, accessToken: "" });
  }
}

module.exports = {
  httpPostRefreshToken,
};
