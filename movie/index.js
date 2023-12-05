import { Router } from "express";
import {
  listAction,
  detailAction,
  createAction,
  updateAction,
  deleteAction,
} from "./controller.js";
import validator from "express-validator";

export const router = Router();
/**
 * @swagger
 * definitions:
 *  movie:
 *    properties:
 *      id:
 *        type: integer
 *        example: 1
 *      title:
 *        type: string
 *        example: Iron Man
 *      year:
 *        type: integer
 *        example: 2008
 *      public:
 *        type: integer
 *        example: 1
 *      user:
 *        type: integer
 *        example: 1
 */

/**
 * @swagger
 * /movie:
 *  get:
 *    tags:
 *       - movies
 *    description: Returns all movies
 *    produces:
 *      - application/json
 *      - application/xml
 *    responses:
 *      200:
 *          description: An array of movies
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/definitions/movie'
 */
router.get("/", listAction);
/**
 * @swagger
 * /movie/{movieId}:
 *  get:
 *    tags:
 *      - movies
 *    description: Returns one movie
 *    produces:
 *      - application/json
 *      - application/xml
 *    responses:
 *      200:
 *        description : One movie object
 *        schema:
 *          $ref: '#/definitions/movie'
 *
 */
router.get("/:movieId", detailAction);
router.put("/update/:id", updateAction);
router.post(
  "/new",
  validator.checkSchema({
    title: {
      errorMessage: "Title is invalid",
      isString: true,
      isLength: {
        errorMessage: "Title has to be between 1 to 30",
        options: {
          min: 1,
          max: 30,
        },
      },
    },
    year: {
      errorMessage: "Year is invalid",
      isInt: true,
    },
  }),
  createAction
);
router.delete("/delete/:id", validator.param("id").isInt(), deleteAction);
