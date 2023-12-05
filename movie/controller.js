import { validationResult } from "express-validator";
import { getAll, remove, get, save } from "./model.js";
import jsonXml from "jsontoxml";

export const listAction = async (request, response) => {
  try {
    const options = {
      userId: request.auth.id,
      sort: request.query.sort ? request.query.sort : "",
    };
    const movies = await getAll(options);
    const movieResponse = {
      movies,
      links: getLinks(options.sort, request.baseUrl),
    };
    response.format({
      xml() {
        movieResponse.movies = movieResponse.movies.map((movie) => ({
          movie,
        }));
        response.send(jsonXml(movieResponse));
      },
      json() {
        response.json(movieResponse);
      },
      default() {
        response.json(movieResponse);
      },
    });
  } catch (e) {
    console.error(e);
    response.status(500).send("An error Occurred");
    return;
  }
};
export const detailAction = async (request, response) => {
  try {
    const movie = await get(request.params.id, request.auth.id);
    const movieResponse = {
      ...movie,
      links: [
        {
          rel: "self",
          href: `${request.baseUrl}/${movie.id}`,
        },
      ],
    };

    response.json(movieResponse);
  } catch (e) {
    console.error(e);
    response.status(404).send("Resource Not found");
    return;
  }
};
export const createAction = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({
        errors: errors.array(),
      });
    }
    const movie = {
      title: request.body.title,
      year: request.body.year,
      public: parseInt(request.body.public, 10) === 1 ? 1 : 0,
    };

    const newMovie = await save(movie, request.auth.id);
    console.log(newMovie);
    response.json(newMovie);
  } catch (error) {
    console.error(error);
    response.status(500).send("An error Occurred");
  }
};
export const updateAction = async (request, response) => {
  try {
    const movie = {
      id: request.params.id,
      title: request.body.title,
      year: request.body.year,
      public: parseInt(request.body.public, 10) ? 1 : 0,
    };
    const updatedMovie = await save(movie, request.auth.id);
    response.json(updatedMovie);
  } catch (error) {
    response.status(500).json(error);
  }
};
export const deleteAction = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(401).json({ errors: errors.array() });
    }
    const id = parseInt(request.params.id, 10);
    await remove(id, request.auth.id);

    response.status(204).send("Removed");
  } catch (error) {
    console.error(error);
    response.status(204).send("An error occurred");
  }
};
function getLinks(current, base) {
  const links = [
    {
      rel: "base",
      href: base + "/",
    },
    {
      rel: "'sort-ascending",
      href: base + "/?sort=asc",
    },
    {
      rel: "sort-descending",
      href: base + "/?sort=desc",
    },
  ];

  return links.map((link) => {
    if (current.length > 0 && link.rel.includes(current)) {
      link.rel = "self";
    } else if (current.length === 0 && link.rel === "base") {
      link.rel = "self";
    }
    return link;
  });
}
