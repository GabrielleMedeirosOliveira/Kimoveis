import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { User } from "../../entities/user.entity";
import { IUserLogin } from "../../interfaces/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const loginService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User);
  const account = await userRepository.findOne({
    where: {
      email: email,
    },
  });

  if (!account) {
    throw new AppError(403, "Wrong email/password");
  }

  if (!account.isActive) {
    throw new AppError(401, "Invalid User");
  }

  if (!bcrypt.compareSync(password, account.password)) {
    throw new AppError(403, "Wrong email/password");
  }

  const token = jwt.sign(
    {
      isAdm: account.isAdm,
    },
    process.env.SECRET_KEY as string,
    {
      subject: account.id,
      expiresIn: "24h",
    }
  );

  return token;
};

export default loginService;
