import session from "express-session";
import config from "config";
import connectRedis from "connect-redis";
const RedisStore = connectRedis(session);

import getCookieOptions from "./getCookieOptions.js";
import { appKeyPrefix } from "./getKeyPrefix.js";
import isLocal from "../util/isLocal.js";

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
      host: redisHost,
      port: redisPort,
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
