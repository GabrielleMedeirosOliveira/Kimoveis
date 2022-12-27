import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import createCategoryService from "../../services/categories/createCartegory.service";

const createCategoryController = async (req: Request, resp: Response) => {
  try {
    const { name } = req.body;
    const newCategory = await createCategoryService({ name });

    return resp.status(201).json(newCategory);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, resp);
    }
  }
};

export default createCategoryController;
