import { Router } from "express";
import createCategoryController from "../controllers/categories/createCategory.contoller";
import listCategoriesController from "../controllers/categories/listCategories.controller";
import listOneCategoryPropertiesController from "../controllers/categories/listOneCategoryProperties.contoller";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";
import verifyIsAdmMiddleware from "../middlewares/verifyIsAdm.middleware";

const routes = Router();

export const categoriesRoutes = () => {
  routes.post(
    "/",
    verifyAuthMiddleware,
    verifyIsAdmMiddleware,
    createCategoryController
  );
  routes.get("/", listCategoriesController);
  routes.get("/:id/properties", listOneCategoryPropertiesController);

  return routes;
};
