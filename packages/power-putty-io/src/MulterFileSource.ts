import Source from "./Source";

/**
 * Source to encapsulate a formidable file descriptor
 */
class MulterFileSource implements Source {
  file: Express.Multer.File;
  /**
   * @param {object} - Formidable file descriptor
   * @see {https://www.npmjs.com/package/formidable#formidablefile}
   */
  constructor(file: Express.Multer.File) {
    this.file = file;
  }

  getOriginalName() {
    return this.file.originalname;
  }

  /**
   * @returns a memoized buffer of file contents
   */
  getBuffer() {
    return Promise.resolve(this.file.buffer);
  }
}

export default MulterFileSource;
