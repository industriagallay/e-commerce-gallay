import { Router } from "express";
import { authCheckIsActiveHandler } from "../handlers/loginAndRegisterHandler/authCheckIsActiveHandler";
import authLoginHandler from "../handlers/loginAndRegisterHandler/authLoginHandler";

export const authLoginRouter = Router();

authLoginRouter.post("/", authCheckIsActiveHandler, authLoginHandler);

export default authLoginRouter;
