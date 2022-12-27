import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import listPropertiesService from "../../services/properties/listProperties.service";

const listPropertiesController = async (req: Request, resp: Response) => {
  try {
    const properties = await listPropertiesService();
    return resp.json(properties);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, resp);
    }
  }
};

export default listPropertiesController;
