import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import listCategoriesService from "../../services/categories/listCategories.service";

const listCategoriesController = async (req: Request, resp: Response) => {
  try {
    const categories = await listCategoriesService();
    return resp.json(categories);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, resp);
    }
  }
};

export default listCategoriesController;
