import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { Schedule } from "../../entities/schedule.entity";
import { Property } from "../../entities/property.entity";

const listSchedulesService = async (idProperty: string) => {
  const scheduleRepository = AppDataSource.getRepository(Schedule);
  const propertiesRepository = AppDataSource.getRepository(Property);

  const schedulesProperties = await propertiesRepository.findOne({
    where: {
      id: idProperty,
    },
    relations: {
      schedules: true,
    },
  });

  if (!schedulesProperties) {
    throw new AppError(404, "Property not found!");
  }

  return schedulesProperties;
};

export default listSchedulesService;
