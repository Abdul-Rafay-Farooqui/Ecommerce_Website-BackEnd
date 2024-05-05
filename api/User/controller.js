import asyncHandler from "express-async-handler";

import {
    update_user,
    delete_user,
  } from "./services.js";
  import { User } from "./User.js";


const updateUserById = asyncHandler(async (req, res) => {
    const data = req.body;
  
    if (data.email) {
      const isUser = await User.findOne({ where: { email: data.email } });
      if (isUser && isUser.id !== req.user.id) {
        return res
          .status(401)
          .json({ error: "An account with email already exists" });
      }
    }
  
    await update_user(req.user.id, data)
      .then((updatedUser) => {
        return res.status(200).json(updatedUser[1]);
      })
      .catch((error) => {
        return res.status(500).json({ error: error.message });
      });
  });
  
  const deleteUserById = asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.params.id);
  
    if (user) {
      await delete_user(req.params.id)
        .then((deletedUser) => {
          return res.status(200).json({ message: "User deleted successfully" });
        })
        .catch((error) => {
          return res.status(500).json({ error: error.message });
        });
    } else {
      return res.status(404).json({ error: "Incorrect User Id: No user found." });
    }
  });

  export {
    updateUserById,
    deleteUserById,
  };