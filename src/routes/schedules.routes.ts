import { Router } from "express";

import createScheduleController from "../controllers/schedules/createSchedule.controller";
import listScheduleController from "../controllers/schedules/listSchedules.controller";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";
import verifyIsAdmMiddleware from "../middlewares/verifyIsAdm.middleware";

const routes = Router();

export const schedulesRoutes = () => {
  routes.post("/", verifyAuthMiddleware, createScheduleController);
  routes.get(
    "/properties/:id",
    verifyAuthMiddleware,
    verifyIsAdmMiddleware,
    listScheduleController
  );

  return routes;
};
