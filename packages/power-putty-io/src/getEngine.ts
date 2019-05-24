import config from 'config';
import IOEngine from './IOEngine';
import LocalEngine from './LocalEngine';
import S3Engine from './S3Engine';

function getEngine(engine = config.get<string>('power-putty-io.engine')): IOEngine {
  if (engine === 'local') {
    return new LocalEngine(
      config.get('power-putty-io.local.rootDirectory')
    );
  }
  if (engine === 's3') {
    return new S3Engine(
      config.get('power-putty-io.s3.bucket')
    );
  }
  throw new Error(`getEngine -- Engine ${engine} unknown`);
}

export default getEngine;
