const sendRefreshToken = (res, token) => {
  const payload =
    process.env.NODE_ENV === "production"
      ? {
          httpOnly: true,
          path: "/refresh_token",
          secure: true,
          sameSite: "none",
          maxAge: 60 * 60 * 24 * 1000 * 7,
        }
      : {
          httpOnly: true,
          path: "/refresh_token",
          maxAge: 60 * 60 * 24 * 1000 * 7,
        };

  res.cookie("jid", token, payload);
};

const sendCookie = (res, name, data, maxAge = -1, path = "/") => {
  const payload =
    process.env.NODE_ENV === "production"
      ? {
          httpOnly: true,
          path,
          secure: true,
          sameSite: "none",
          maxAge,
        }
      : {
          httpOnly: true,
        };

  res.cookie(name, data, payload);
};

module.exports = {
  sendRefreshToken,
  sendCookie,
};
