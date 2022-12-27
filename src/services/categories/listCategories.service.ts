import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { Category } from "../../entities/category.entity";

const listCategoriesService = async () => {
  const categoryRepository = AppDataSource.getRepository(Category);

  const categories = await categoryRepository.find();

  if (!categories) {
    throw new AppError(404, "No category found");
  }

  return categories;
};

export default listCategoriesService;
