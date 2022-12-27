import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import createUserService from "../../services/users/createUser.service";
import { instanceToPlain } from "class-transformer";

const createUserController = async (req: Request, resp: Response) => {
  try {
    const { name, email, password, isAdm } = req.body;
    const newUser = await createUserService({ name, email, password, isAdm });

    return resp.status(201).json(instanceToPlain(newUser));
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, resp);
    }
  }
};

export default createUserController;
