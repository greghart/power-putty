# `power-putty-server`

Power Putty component to power a robust and extensible express server with
sane defaults. 

Express.js is an incredibly powerful and light framework for the web. However,
it can be difficult to remember all the little things that need to go into
a powerful and rich server application. That's where this component enters --
bundled with all the best middlewares to get your server out the door fast.

## Features 

* Sane defaults for an Express.js application that will be powering a modern 
  web application
* Setup cookies and sessions breezily with `express-session`, `cookie-parser`
* Expose server state to the client in a standard way (for SSR) with `express-state`
* Serve favicon and other static files with `serve-favicon`, `serve-static`
* Sane defaults for parsing incoming requests with `body-parser`
* Flash messages with `connect-flash`
* Secure headers with `helmet`
* Does _not_ handle 404s, just pop your own middleware in the end ;)
* TODO Support for common patterns of responding to requests?

## Usage

```typescript
import { getExpressApplication } from 'power-putty-server';

```

## Config 

Server can be configured programmatically, but also offers configuration via 
[Node Config](https://github.com/lorenwest/node-config).

Most options are namespaced under `power-putty-server`, with the exception of 
standardized settings like `port`.

| Config Key | Description |
| --- | --- |
| `port` | Port to listen on |
| `power-putty-server.is_local` | Whether we are running locally and need to account for that. Assumes Macs are always local. |
| `power-putty-server.cookies.secret` | Secret token for cookies |
| `power-putty-server.sessions.prefix` | Prefix to use for session keys (both in browser and persistence). Supports `{NODE_ENV}` macro |
| `power-putty-server.sessions.secret` | Secret token for sessions |
| `power-putty-server.sessions.redis.host` | Host of Redis server |
| `power-putty-server.sessions.redis.port` | Port of Redis server |
