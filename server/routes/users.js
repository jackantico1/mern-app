import express from 'express';
import {
  getUser,
  getUsersFriends,
  addRemoveFriends
} from "../controllers/users.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// these are going to be read routes, this lets you do query strings
router.get("/:id", verifyToken, getUser);
router.get("/friends/:id", verifyToken, getUsersFriends);

// updates
router.patch("/friends/:id", verifyToken, addRemoveFriends);

export default router;