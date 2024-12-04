import config from "config";
import { type IOEngine } from "./IOEngine.js";
import LocalEngine from "./LocalEngine.js";
import S3Engine from "./S3Engine.js";

function getEngine(options = config.get<any>("power-putty-io")): IOEngine {
  if (options.engine === "local") {
    return new LocalEngine(options.local.rootDirectory);
  }
  if (options.engine === "s3") {
    return new S3Engine(options.s3.bucket);
  }
  throw new Error(`getEngine -- Engine ${options.engine} unknown`);
}

export default getEngine;
