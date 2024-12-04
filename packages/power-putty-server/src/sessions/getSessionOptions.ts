import config from "config";
import { RedisStore } from "connect-redis";
import redis from "redis";

import isLocal from "../util/isLocal.js";
import getCookieOptions from "./getCookieOptions.js";
import { appKeyPrefix } from "./getKeyPrefix.js";

/**
 * Get the options to use for sessions in app
 *
 * Isolates what we actually have configurable
 * @param Whether app is running locally.
 * @param Secret to use for signing session
 * @param
 * @param
 */
function getSessionOptions(
  isLocal: boolean,
  sessionSecret: string,
  redisHost: string,
  redisPort: number
) {
  const client = redis.createClient({
    url: `redis::/${redisHost}:${redisPort}`,
    database: 1,
  });
  client.unref();
  client.on("error", console.log);
  return {
    name: appKeyPrefix,
    secret: sessionSecret,
    proxy: true,
    saveUninitialized: false,
    resave: false,
    cookie: getCookieOptions({
      isLocal,
      browserSession: true,
    }),
    store: new RedisStore({
      client: client,
      ttl: 60 * 60 * 24 * 30, // Browser sessions are maintained for 30 days
      prefix: `${appKeyPrefix}|`,
    }),
  };
}

const appSessionOptions = getSessionOptions(
  isLocal(),
  config.get<string>("power-putty-server.cookies.secret"),
  config.get<string>("power-putty-server.sessions.redis.host"),
  config.get<number>("power-putty-server.sessions.redis.port")
);

export { appSessionOptions };
export default getSessionOptions;
