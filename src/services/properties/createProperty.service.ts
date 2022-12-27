import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { Property } from "../../entities/property.entity";
import { Adress } from "../../entities/adress.entity";
import { Category } from "../../entities/category.entity";
import { IPropertyRequest } from "../../interfaces/properties";

const createPropertyService = async ({
  value,
  size,
  address: { district, zipCode, number, city, state },
  categoryId,
}: IPropertyRequest) => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const addressRepository = AppDataSource.getRepository(Adress);
  const propertyRepository = AppDataSource.getRepository(Property);

  const addres = await addressRepository.find();

  const addresAlredyExists = addres.find((one) => one.number === number);
  if (addresAlredyExists) {
    throw new AppError(400, "Address already in use");
  }

  if (state.length > 2) {
    throw new AppError(400, "Invalid size");
  }

  if (zipCode.length > 8) {
    throw new AppError(400, "Invalid size");
  }

  const newAddress = addressRepository.create({
    district,
    zipCode,
    number,
    city,
    state,
  });

  await addressRepository.save(newAddress);

  const category = await categoryRepository.findOneBy({ id: categoryId });

  if (!category) {
    throw new AppError(404, "Category not found!");
  }

  const property = propertyRepository.create({
    value,
    size,
    address: newAddress,
    category: {
      id: category?.id,
      name: category?.name,
    },
  });

  await propertyRepository.save(property);

  return property;
};

export default createPropertyService;
