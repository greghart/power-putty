/**
 * Basic interface to encapsulate a "source" of data to upload
 *
 * The obvious ones are also included -- files, buffers, strings.
 */
abstract class Source {
  abstract getBuffer(): Promise<Buffer>;
  abstract getOriginalName(): string;
}

export default Source;
