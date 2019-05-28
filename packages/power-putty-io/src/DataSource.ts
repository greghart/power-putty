import Bluebird from 'bluebird';

import Source from './Source';

/**
 * A source of data where we already have a buffer
 */
class DataSource implements Source {

  constructor(
    private name: string, 
    private data: Buffer | string
  ) {}

  getOriginalName() {
    return this.name;
  }

  getBuffer() {
    if (Buffer.isBuffer(this.data)) {
      return Bluebird.resolve(this.data);
    }
    return Bluebird.resolve(new Buffer(this.data));
  }

}

export default DataSource;
