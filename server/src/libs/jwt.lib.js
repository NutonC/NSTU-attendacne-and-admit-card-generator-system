const jwt = require("jsonwebtoken");
const CONFIG = require("../config");

const jwtAccessSecret = CONFIG.jwt.access_secret;
const jwtAccessExpiration = CONFIG.jwt.access_expiration;
const jwtRefreshSecret = CONFIG.jwt.refresh_secret;
const jwtRefreshExpiration = CONFIG.jwt.refresh_expiration;

function signToken(
  payload,
  secret = jwtAccessSecret,
  expiry = jwtAccessExpiration
) {
  return jwt.sign({ ...payload }, secret, { expiresIn: expiry });
}

function verifyToken(token, secret = jwtAccessSecret) {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    throw new Error(err.message);
  }
}

const createAccessToken = (payload) => {
  return signToken(payload, jwtAccessSecret, jwtAccessExpiration);
};

const createRefreshToken = (payload) => {
  return signToken(payload, jwtRefreshSecret, jwtRefreshExpiration);
};

const verifyAccessToken = (token) => {
  return verifyToken(token, jwtAccessSecret);
};

const verifyeRefreshToken = (token) => {
  return verifyToken(token, jwtRefreshSecret);
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyeRefreshToken,
};
