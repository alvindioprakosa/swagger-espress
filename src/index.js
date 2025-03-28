import express from "express";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { create, getAll, getById, remove, update } from "./users.js";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User API",
      version: "1.0.0",
    },
  },
  apis: ["./src/*.js"],
};

const swaggerDoc = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of the User
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the User
 *       example:
 *         id: 3
 *         name: Pojok Code
 *         email: code@example.com
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The User API
 */

// User Routes
app.get("/users", getAll);
app.get("/users/:id", getById);
app.post("/users", create);
app.put("/users/:id", update);
app.delete("/users/:id", remove);

// Root Route
app.get("/", (req, res) => {
  res.send("Hello World!!");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});