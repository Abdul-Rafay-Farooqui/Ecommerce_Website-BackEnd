import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import pino from "pino";

const logger = pino();

import { registerUser, loginUser } from "./services.js";
import { User } from "../User/User.js";

const signup = asyncHandler(async (req, res) => {
    const { name, phone_number, email, password, gender} = req.body;
    try {
        if(!name || !phone_number || !email || !password ||!gender){
          return res.status(401).send("One or more Fields are null");
        }

          var isUser = await User.findOne({ where: { email } });
          if(isUser){
            return res.status(500).send("Account with this email already exists")
          }
        
      var hashed_password = await bcrypt.hash(password, 10);
      
      const user = await registerUser( 
        name,
        phone_number,
        email,
        hashed_password,
        gender,
        "user")
          
      logger.info("User " + user.id + " Created");
          
      return res
        .status(201)
        .json({ message: "Account created successfully", user: user });

    } catch (error) {
        
    }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  await loginUser(email, password)
    .then((user) => {
      logger.info("User " + user.id + " Logged In");
      res
        .status(200)
        .json({ message: "Account logged in successfully", user: user });
    })
    .catch((err) => {
      return res.status(500).send({ error: err.message });
    });
});

export { login, signup };
