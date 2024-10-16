const responseSchema = {
  response: {
    200: {
      properties: {
        message: { type: "string" },
      },
    },
  },
};

/**
 * Controller function to handle greeting routes
 * Registered within the Fastify app using `fastify.register`
 *
 * @param {Object} fastify - The Fastify instance
 * @param {Object} options - Configuration options
 * @param {Function} done - Callback function to indicate completion of route registration
 */
const greetingsController = (fastify, options, done) => {
  // GET route that returns a simple greeting message
  fastify.get("/", { schema: responseSchema }, (req, reply) => {
    // Standard response with "Hello World!" message
    return {
      message: "Hello World!",
    };
  });

  // GET route with dynamic :name parameter
  // Responds with a personalized message based on the parameter passed in the URL
  fastify.get("/:name", { schema: responseSchema }, (req, reply) => {
    return {
      message: `Hello ${req.params.name}!`, // req.params contains the route parameters
    };
  });

  // Indicates that route registration is complete
  done();
};

export default greetingsController;
