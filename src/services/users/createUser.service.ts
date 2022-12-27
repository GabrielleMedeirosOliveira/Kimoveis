import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { User } from "../../entities/user.entity";
import { IUserRequest } from "../../interfaces/users";
import bcrypt from "bcryptjs";

const createUserService = async ({
  name,
  email,
  password,
  isAdm,
}: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const emailAlreadyExists = users.find((user) => user.email === email);
  if (emailAlreadyExists) {
    throw new AppError(400, "Email already exists!");
  }
  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = userRepository.create({
    name,
    email,
    isAdm,
    password: hashedPassword,
  });

  await userRepository.save(user);

  return user;
};

export default createUserService;
