import passport from "passport";
import expressSession from "express-session";
import LocalStrategy from "passport-local";
import { get } from "./sqlite-config.js";
import { createHash } from "crypto";
import { log } from "console";

export default function (app) {
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    const user = await get({ id });
    if (!user) {
      done("User not found");
    } else {
      done(null, user);
    }
  });

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const hash = createHash("md5").update(password).digest("hex");
      const user = await get({ username: username, password: hash });
      if (!user) {
        done(null, false);
      } else {
        done(null, user);
      }
    })
  );
  app.use(
    expressSession({
      secret: "top secret",
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.post(
    "/login",
    passport.authenticate("local", {
      failureRedirect: "/login.html",
    }),
    (request, response) => {
      response.redirect("/");
    }
  );

  app.use("/logout", (request, response) => {
    request.logout();
    response.redirect("/");
  });
}
