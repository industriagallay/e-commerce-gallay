import { Router } from "express";
import authRegisterHandler from "../handlers/authRegisterHandler";

export const authRegisterRouter = Router();

authRegisterRouter.post("/", authRegisterHandler);

export default authRegisterRouter;
