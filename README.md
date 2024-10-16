
# Fastify App - Getting Started Guide

## Introduction
This guide explains how to set up and run a basic Fastify application. Fastify is a high-performance and easy-to-use web framework for Node.js.

## Installation

First, initialize the project and install Fastify:
```bash
npm init
npm install fastify
```

Modify the `package.json` file by adding `"type": "module"` and a start script:
```json
{
  "name": "fastify-app",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node src/index"
  },
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "fastify": "^5.0.0"
  }
}
```

## Creating the Server

Create the file `src/index.js` with the following content:
```js
import Fastify from "fastify";

const fastify = Fastify({ logger: true });

fastify.get("/", (req, reply) => {
  return { message: "Hello World!" };
});

try {
  fastify.listen({ port: 3002 });
} catch (error) {
  fastify.log.error(error);
  process.exit(1);
}
```

## Running the Application

Start the application with:
```bash
npm run start
```

Open your browser at `http://127.0.0.1:3002` to see the following JSON output:
```json
{ "message": "Hello World!" }
```

## Development Watcher

Install Nodemon to automatically restart the server during development:
```bash
npm install --save-dev nodemon
```

Modify `package.json` to add a `dev` script:
```json
"scripts": {
  "start": "node src/index",
  "dev": "nodemon src/index"
}
```

## Defining Routes with `.route()`

Alternatively, you can define routes using `.route()`:
```js
fastify.route({
  method: "GET",
  url: "/hello/:name",
  handler: (req, reply) => {
    return { message: `Hello ${req.params.name}` };
  },
});
```

## Logging

Fastify uses **Pino** for logging. This is useful for tracking events while the app is running.

## Validation with Schema

Fastify uses **JSON Schema** to validate requests. Here's an example of a validation schema:
```js
schema: {
  querystring: {
    type: 'object',
    properties: {
      lastName: { type: 'string' }
    },
    required: ['lastName']
  },
  params: {
    type: 'object',
    properties: {
      name: { type: 'string' }
    },
    required: ['name']
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      },
      required: ['message']
    }
  }
}
```
