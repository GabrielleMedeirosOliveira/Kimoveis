import { Router } from "express";
import createPropertyController from "../controllers/properties/createProperty.controller";
import listPropertiesController from "../controllers/properties/listProperties.controller";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";
import verifyIsAdmMiddleware from "../middlewares/verifyIsAdm.middleware";

const routes = Router();

export const propertiesRoutes = () => {
  routes.post(
    "/",
    verifyAuthMiddleware,
    verifyIsAdmMiddleware,
    createPropertyController
  );
  routes.get("/", listPropertiesController);

  return routes;
};
