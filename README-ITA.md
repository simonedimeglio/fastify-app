
# Fastify App - Guida di Avvio

## Introduzione
Questa guida spiega come configurare e lanciare un'applicazione Fastify di base. Fastify è un web framework per Node.js altamente performante e facile da usare.

## Installazione

Prima di tutto, inizializza il progetto e installa Fastify:
```bash
npm init
npm install fastify
```

Modifica il file `package.json` aggiungendo `"type": "module"` e uno script di avvio:
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

## Creazione del Server

Crea il file `src/index.js` con il seguente contenuto:
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

## Esecuzione

Avvia l'applicazione con:
```bash
npm run start
```

Apri il browser all'indirizzo `http://127.0.0.1:3002` per vedere il seguente output JSON:
```json
{ "message": "Hello World!" }
```

## Watcher per Sviluppo

Installa Nodemon per il riavvio automatico del server durante lo sviluppo:
```bash
npm install --save-dev nodemon
```

Modifica `package.json` per aggiungere un comando `dev`:
```json
"scripts": {
  "start": "node src/index",
  "dev": "nodemon src/index"
}
```

## Definizione di Rotte con `.route()`

Alternativamente, puoi definire rotte usando `.route()`:
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

Fastify utilizza **Pino** per il logging. Questo è utile per tracciare gli eventi durante l'esecuzione dell'app.

## Validazione con Schema

Fastify usa **JSON Schema** per validare le richieste. Ecco un esempio di schema di validazione:
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
