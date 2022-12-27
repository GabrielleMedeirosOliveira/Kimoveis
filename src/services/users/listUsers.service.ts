import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { User } from "../../entities/user.entity";

const listUsersService = async () => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  return users;
};

export default listUsersService;
