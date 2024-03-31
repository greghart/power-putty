import type { Upload } from "./Upload.js";
import Source from "./Source.js";
import { Readable } from "stream";

/**
 * An abstract I/O Engine.
 *
 * Implementations dictate how to store an Upload and subsequently read an upload
 */
interface IOEngine {
  // Upload data and return the data uploaded
  upload(upload: Upload, source: Source): Promise<Buffer>;
  download(upload: Upload): Promise<Buffer>;
  downloadStream(upload: Upload): Readable;
  // Code that identifies the engine used.
  // This is stored in database for posterity.
  getCode(): string;
}

export type { IOEngine };
