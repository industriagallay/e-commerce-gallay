import { Router } from "express";
import authRegisterHandler from "../handlers/loginAndRegisterHandler/authRegisterHandler";

export const authRegisterRouter = Router();

authRegisterRouter.post("/", authRegisterHandler);

export default authRegisterRouter;
