const envConfig = {
  mongo: {
    db_url: process.env.MONGO_URL,
  },
  stripe: {
    stripe_secret: process.env.STRIPE_SECRET_KEY,
  },
  jwt: {
    access_secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    refresh_secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    access_expiration: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
    refresh_expiration: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
  },
  hash: {
    salt: process.env.SALT_ROUNDS,
  },
  user_roles: {
    versity: process.env.VERSITY_ROLE,
    teacher: process.env.TEACHER_ROLE,
    student: process.env.STUDENT_ROLE,
    management: process.env.MANAGEMENT_ROLE,
  },
};

module.exports = envConfig;
