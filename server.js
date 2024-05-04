import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import { db } from "./config/db.js";
import { initializeModel } from "./models/index.js";
// import passportConfig from "./config/passport.js";

// Load config
dotenv.config();

// Passport config`
// passportConfig(passport);

try {
    db.authenticate();
    console.log("Postgres connected successfully");
  } catch (error) {
    console.error("Error", error);
  }
  

const app = express();

app.use(
    cors({
      origin: "*",
    })
  );

  app.use(express.json());

  //Session
  
  app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
    })
  );
  
  app.use("/api", routes);
  app.get("/db/models", initializeModel);

  //Passport middleware
  
  app.use(passport.initialize());
  app.use(passport.session());

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on port ${process.env.PORT}`));