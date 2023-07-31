import { Router } from "express";
import authLoginHandler from "../handlers/loginAndRegisterHandler/authLoginHandler";
import authenticateToken from "../middlewares/authToken";


export const authLoginRouter = Router();

authLoginRouter.post("/", authenticateToken, authLoginHandler);

export default authLoginRouter;
