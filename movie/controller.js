import { getAll, remove, get, save } from "./model.js";
import { render } from "./view.js";
import { render as formRender } from "./form.js";
import { readFileSync } from "fs";

export async function listAction(request, response) {
  try {
    const data = await getAll(request.user.id);
    const body = render(data);
    response.send(body);
  } catch (error) {
    response.status(500).send("Internal Server Error");
  }
}

export async function removeAction(request, response) {
  try {
    const id = parseInt(request.params.id, 10);
    if (isNaN(id)) {
      throw new Error("Invalid ID");
    }
    await remove(id, request.user.id);
    response.redirect(request.baseUrl);
  } catch (error) {
    response.status(400).send("Bad Request");
  }
}

export async function formAction(request, response) {
  try {
    let movie = { id: "", title: "", year: "", public: "" };
    if (request.params.id) {
      movie = await get(parseInt(request.params.id), request.user.id);
    }
    console.log('Movie');
    const body = formRender(movie);
    response.send(body);
  } catch (error) {
    response.status(500).send("Internal Server Error");
  }
}

export async function saveAction(request, response) {
  try {
    const movie = {
      id: request.body.id,
      title: request.body.title,
      year: request.body.year,
      public: request.body.public === 1 ? 1 : 0,
    };
    await save(movie, request.user.id);
    response.redirect(request.baseUrl);
  } catch (error) {
    response.status(500).send("Internal Server Error");
  }
}
