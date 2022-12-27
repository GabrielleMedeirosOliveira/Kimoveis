import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { Category } from "../../entities/category.entity";
import { ICategoryRequest } from "../../interfaces/categories";

const createCategoryService = async ({ name }: ICategoryRequest) => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const categories = await categoryRepository.find();

  const categoryAlreadyExists = categories.find(
    (category) => category.name === name
  );
  if (categoryAlreadyExists) {
    throw new AppError(400, "Category already exists!");
  }

  const category = categoryRepository.create({
    name,
  });

  await categoryRepository.save(category);

  return category;
};

export default createCategoryService;
