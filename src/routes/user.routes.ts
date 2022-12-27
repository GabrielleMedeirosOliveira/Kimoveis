import { Router } from "express";

import createUserController from "../controllers/users/createUser.controller";
import softDeleteUserController from "../controllers/users/softDeleteUser.controller";
import listUserController from "../controllers/users/listUsers.controllers";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";
import verifyIsAdmMiddleware from "../middlewares/verifyIsAdm.middleware";

const routes = Router();

export const userRoutes = () => {
  routes.post("/", createUserController);
  routes.get(
    "/",
    verifyAuthMiddleware,
    verifyIsAdmMiddleware,
    listUserController
  );
  routes.delete(
    "/:id",
    verifyAuthMiddleware,
    verifyIsAdmMiddleware,
    softDeleteUserController
  );

  return routes;
};
