import jwt from "jsonwebtoken";
import { Router } from "express";
import { get } from "./sqlite-config.js";
import { createHash } from "crypto";

const router = Router();

router.post("/", async (request, response) => {
  try {
    const user = await get({
      username: request.body.username,
      password: createHash("md5").update(request.body.password).digest("hex"),
    });
    if (user) {
      const payload = { ...user };
      delete payload.password;
      const token = jwt.sign(payload, "secret");
      response.json({ token });
    } else {
      response.status(401).json("unauthorized");
    }
  } catch (error) {
    console.error(error);
    response.status(401).json("unauthorized");
  }
});

export { router };
