import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { User } from "../../entities/user.entity";

const softDeleteUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const user = users.find((user) => user.id === id);

  if (!user) {
    throw new AppError(404, "User not found!");
  }

  if (!user?.isActive) {
    throw new AppError(400, "User inative!");
  } else {
    const newState = false;
    await userRepository.update(user.id, { isActive: newState });
  }

  return true;
};

export default softDeleteUserService;
