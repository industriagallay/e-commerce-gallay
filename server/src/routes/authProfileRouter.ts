import { Router } from "express";
import authProfileHandler from "../handlers/loginAndRegisterHandler/authProfileHandler";
import { authRequired } from "../middlewares/authRequired";

export const authProfileRouter = Router();

authProfileRouter.get("/", authRequired, authProfileHandler);

export default authProfileRouter;
