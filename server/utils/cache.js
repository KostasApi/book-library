/* eslint-disable new-cap */
/* eslint-disable prefer-rest-params */
const mongoose = require("mongoose");
const redis = require("redis");
const util = require("util");

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

client.on("connect", () => {
  console.log("Redis is connected!");
});

client.on("ready", () => {
  console.log("Redis is ready!");
});

client.on("close", () => {
  console.log("Redis connection closed!");
});

client.on("error", error => {
  console.error(error);
});

client.hget = util.promisify(client.hget);

// create reference for .exec
const { exec } = mongoose.Query.prototype;

// create new cache function on prototype
mongoose.Query.prototype.cache = function (options) {
  this.useCache = true;
  this.expire = options.expire || 3600;
  this.hashKey = JSON.stringify(options.key || this.mongooseCollection.name);

  return this;
};

// override exec function to first check cache for data
mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  const key = JSON.stringify({
    ...this.getQuery(),
    collection: this.mongooseCollection.name,
  });

  // get cached value from redis
  const cacheValue = await client.hget(this.hashKey, key);

  // if cache value is not found, fetch data from mongodb and cache it
  if (!cacheValue) {
    const result = await exec.apply(this, arguments);
    client.hset(this.hashKey, key, JSON.stringify(result));
    client.expire(this.hashKey, this.expire);

    console.log("Return data from MongoDB");
    return result;
  }

  // return found cachedValue
  const doc = JSON.parse(cacheValue);
  console.log("Return data from Redis");
  return Array.isArray(doc)
    ? doc.map(d => new this.model(d))
    : new this.model(doc);
};

module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  },
};
