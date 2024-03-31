import config from "config";
import { type IOEngine } from "./IOEngine.js";
import LocalEngine from "./LocalEngine.js";
import S3Engine from "./S3Engine.js";

function getEngine(
  engine = config.get<string>("power-putty-io.engine")
): IOEngine {
  if (engine === "local") {
    return new LocalEngine(config.get("power-putty-io.local.rootDirectory"));
  }
  if (engine === "s3") {
    return new S3Engine(config.get("power-putty-io.s3.bucket"));
  }
  throw new Error(`getEngine -- Engine ${engine} unknown`);
}

export default getEngine;
