//IMPORTS
import express from "express";
import { router as movieRouter } from "./movie/index.js";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { createWriteStream } from "fs";
import auth from "./auth.js";
import { ensureLoggedIn } from "connect-ensure-login";

const app = express();

//LOGGING INCOMING REQUESTS TO ACCESS.LOG FILE
const accessLogStream = createWriteStream("access.log", { flags: "a" });
app.use(
  morgan("common", {
    immediate: true,
    stream: accessLogStream,
  })
);

//OPTIONS FOR HTTPS SERVER
// const options = {
//   key: readFileSync("Path"),
//   cert: readFileSync("Path"),
// };
//FOR SENDING STATIC FILE
app.use(express.static(`${dirname(fileURLToPath(import.meta.url))}/public`));

//FOR LOGGING REQUESTS
app.use(morgan("common", { immediate: true }));

//FOR HANDLING HTML FORM INPUT
app.use(express.urlencoded({ extended: false }));

auth(app);

//ROUTER SETUP
app.use("/movie", ensureLoggedIn("./login.html"), movieRouter);

//REDIRECTING TO BASE URL
app.get("/", (request, response) => {
  response.redirect("/movie");
});

// FOR HTTPS
app.listen(8080, () => {
  console.log(`listening on http://localhost:8080`);
});

//FOR HTTP2
// spdy.createServer(options, app).listen(8080, () => {
//   console.log(`listening on https://localhost:8080`);
// });
