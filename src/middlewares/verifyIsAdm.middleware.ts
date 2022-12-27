import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { AppError, handleError } from "../errors/appError";

const verifyIsAdmMiddleware = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user;

    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();

    const check = users.find((user) => user.id === id);

    if (!check?.isAdm) {
      throw new AppError(403, "Unauthorized!");
    } else {
      next();
    }
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, resp);
    }
  }
};

export default verifyIsAdmMiddleware;
