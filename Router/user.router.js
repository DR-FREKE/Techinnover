import { Router } from "express";
import "babel-polyfill";
import upload from "../Middleware/file.middleware";
import Users from "../Controller/UserController";

const router = Router();

router.get("/users", (req, res) => Users._getUsers(req, res));
router.post("/users", upload.single("passport"), (req, res) =>
  Users._addUsers(req, res)
);

export default router;
