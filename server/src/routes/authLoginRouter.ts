import { Router } from "express";
import authLoginHandler from "../handlers/authLoginHandler";

export const authLoginRouter = Router();

authLoginRouter.post("/", authLoginHandler);

export default authLoginRouter;
