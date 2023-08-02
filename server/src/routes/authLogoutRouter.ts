import { Router } from "express";
import authLogoutHandler from "../handlers/loginAndRegisterHandler/authLogoutHandler";

export const authLogoutRouter = Router();

authLogoutRouter.post("/", authLogoutHandler);

export default authLogoutRouter;
