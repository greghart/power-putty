import config from 'config';

/**
 * Whether app is currently running 'locally'
 *
 * Dictates a lot of functionality -- we can guess it based on platform or
 * env variables
 */
const key = 'power-putty-server.is_local';
function isLocal() {
  return (
    (config.has(key) && config.get(key) === 'true') || 
    process.platform === 'darwin'
  );
}

export default isLocal;
