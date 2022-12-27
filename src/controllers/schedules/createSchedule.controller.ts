import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import createScheduleService from "../../services/schedules/createSchedule.service";

const createScheduleController = async (req: Request, resp: Response) => {
  try {
    const { id } = req.user;
    const userId = id;
    const { propertyId, date, hour } = req.body;

    const newSchedule = await createScheduleService({
      userId,
      propertyId,
      date,
      hour,
    });

    return resp.status(201).json({ message: "Schedule Created" });
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, resp);
    }
  }
};

export default createScheduleController;
