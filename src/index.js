import Fastify from "fastify";
import greetingsController from "./greetings-controller.js";

// Fastify instance with logging enabled
const fastify = Fastify({
  logger: true, // The logger displays information and errors during app execution
});

// Registration of the greetings controller with a '/greetings' prefix
// This means that all routes defined in the controller will start with /greetings
fastify.register(greetingsController, { prefix: "/greetings" });

// Alternative method to define individual routes directly in the main file
// This shows how to define a route with Fastify.route()
// It's useful if you want to handle single routes without creating separate controllers
// fastify.route({
//   method: "GET",
//   url: "/hello/:name",
//   schema: {
//     querystring: {
//       properties: {
//         lastName: { type: "string" },
//       },
//       required: ["lastName"],
//     },
//     params: {
//       properties: {
//         name: { type: "string" },
//       },
//       required: ["name"],
//     },
//     response: {
//       200: {
//         properties: {
//           message: { type: "string" },
//         },
//         required: ["message"],
//       },
//     },
//   },
//   handler: (req, reply) => {
//     return {
//       message: `Hello ${req.params.name} ${req.query.lastName}`,
//     };
//   },
// });

// Server start
try {
  // listen() method to start the server on port 3002
  fastify.listen({ port: 3002 });
} catch (error) {
  // Error handling
  fastify.log.error(error); // Log the error to console
  process.exit(1); // Exit with error code
}
