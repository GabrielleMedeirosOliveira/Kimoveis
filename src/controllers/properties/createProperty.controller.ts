import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import createPropertyService from "../../services/properties/createProperty.service";

const createPropertyController = async (req: Request, resp: Response) => {
  try {
    const {
      value,
      size,
      address: { district, zipCode, number, city, state },
      categoryId,
    } = req.body;
    const newProperty = await createPropertyService({
      value,
      size,
      address: { district, zipCode, number, city, state },
      categoryId,
    });

    return resp.status(201).json(newProperty);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, resp);
    }
  }
};

export default createPropertyController;
