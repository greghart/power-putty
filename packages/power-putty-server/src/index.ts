export { default as getExpressApplication } from './getExpressApplication';
// Re-export middleware
import favicon from 'serve-favicon';
import serveStatic from 'serve-static';
export { favicon, serveStatic };