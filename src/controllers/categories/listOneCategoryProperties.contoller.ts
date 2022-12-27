import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import listOneCategoryPropertiesService from "../../services/categories/listOneCategoryProperties.service";

const listOneCategoryPropertiesController = async (
  req: Request,
  resp: Response
) => {
  try {
    const { id } = req.params;
    const categoryProperties = await listOneCategoryPropertiesService(id);

    return resp.json(categoryProperties);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, resp);
    }
  }
};

export default listOneCategoryPropertiesController;
