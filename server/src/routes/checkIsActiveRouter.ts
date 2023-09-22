import { Router } from "express";
import { authCheckIsActiveHandler } from "../handlers/loginAndRegisterHandler/authCheckIsActiveHandler";

export const checkIsActiveRouter = Router();

checkIsActiveRouter.post("/", authCheckIsActiveHandler);

export default checkIsActiveRouter;
