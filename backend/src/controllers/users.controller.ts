import { Request, Response, Router } from "express";
import { parse } from "../utils/json.utils";
import { Users } from "../models/users.model";
import path from "node:path";

const jsonUsersPath = path.join(__dirname, "../../data/user.json");

export const usersController = Router();

// Get all users (public)
usersController.get("/", (req: Request, res: Response) => {
  const listUsers = parse(jsonUsersPath, [] as Users[]);
  return res.status(200).json(listUsers);
});

// Get user by ID (admin only)
usersController.get("/:id", (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  if (isNaN(userId)) return res.status(400).send("Invalid user id");

  const listUsers = parse(jsonUsersPath, [] as Users[]);
  const user = listUsers.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).send("User not found");
  }
  return res.status(200).json(user);
});
