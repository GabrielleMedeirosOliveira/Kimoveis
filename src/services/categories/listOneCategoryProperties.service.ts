import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { Category } from "../../entities/category.entity";
import { Property } from "../../entities/property.entity";

const listOneCategoryPropertiesService = async (idCategory: string) => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const propertiesRepository = AppDataSource.getRepository(Property);

  const categoryProperties = await categoryRepository.findOne({
    where: {
      id: idCategory,
    },
    relations: {
      properties: true,
    },
  });

  if (!categoryProperties) {
    throw new AppError(404, "Category not found!");
  }

  return categoryProperties;
};

export default listOneCategoryPropertiesService;
