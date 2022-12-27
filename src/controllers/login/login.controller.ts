import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import { IUserLogin } from "../../interfaces/users";
import loginService from "../../services/login/login.service";

const loginController = async (req: Request, resp: Response) => {
  try {
    const { email, password }: IUserLogin = req.body;
    const token = await loginService({ email, password });

    return resp.status(200).json({ token });
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, resp);
    }
  }
};

export default loginController;
