const { verifyAccessToken } = require("../../libs/jwt.lib");

function checkAuthToken(req, res, next) {
  const { authorization } = req.headers;

  const token = authorization.split(" ");
  if (!authorization || token[0] !== "Bearer") {
    return res
      .status(401)
      .json({ error: "Unauthorized", message: "You must login first!" });
  }

  try {
    const payload = verifyAccessToken(token[1]);
    if (payload && payload.uid) {
      //deserializing the user
      req.user = {
        userId: payload.uid,
        versityId: payload.vid,
      };

      return next();
    }
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .json({ error: "Session expired", message: "Retry or Log in again!" });
  }
}

module.exports = {
  checkAuthToken,
};
