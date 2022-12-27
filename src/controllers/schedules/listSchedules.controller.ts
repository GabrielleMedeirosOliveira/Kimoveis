import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import listSchedulesService from "../../services/schedules/listSchedules.service";

const listScheduleController = async (req: Request, resp: Response) => {
  try {
    const { id } = req.params;
    const schedulesProperties = await listSchedulesService(id);

    return resp.json(schedulesProperties);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, resp);
    }
  }
};

export default listScheduleController;
