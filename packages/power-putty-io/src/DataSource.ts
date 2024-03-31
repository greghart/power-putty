import Source from "./Source.js";

/**
 * A source of data where we already have a buffer
 */
class DataSource implements Source {
  constructor(private name: string, private data: Buffer | string) {}

  getOriginalName() {
    return this.name;
  }

  getBuffer() {
    if (Buffer.isBuffer(this.data)) {
      return Promise.resolve(this.data);
    }
    return Promise.resolve(Buffer.from(this.data));
  }
}

export default DataSource;
