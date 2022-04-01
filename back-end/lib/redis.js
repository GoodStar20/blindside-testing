const Redis = require("ioredis");
const redis = new Redis();

const RedisKey = {
  MOVIES: "movies",
};

module.exports = {
  redis,
  RedisKey,
};
