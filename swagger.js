import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  info: {
    title: "Movie Database API",
    version: "1.0.0",
    description: "API of movie database",
  },
  host: "localhost:8080",
  basePath: "/",
};

const options = {
  swaggerDefinition,
  apis: ["./movie/index.js"],
};

export default swaggerJSDoc(options);
