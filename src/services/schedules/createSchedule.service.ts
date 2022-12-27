import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { Schedule } from "../../entities/schedule.entity";
import { User } from "../../entities/user.entity";
import { Property } from "../../entities/property.entity";
import { IScheduleRequest } from "../../interfaces/schedules";
import { format } from "date-fns";

const createScheduleService = async ({
  userId,
  propertyId,
  date,
  hour,
}: IScheduleRequest) => {
  const scheduleRepository = AppDataSource.getRepository(Schedule);
  const userRepository = AppDataSource.getRepository(User);
  const propertyRepository = AppDataSource.getRepository(Property);

  const user = await userRepository.findOneBy({ id: userId });
  if (!user) {
    throw new AppError(404, "User not found!");
  }

  const property = await propertyRepository.findOneBy({
    id: propertyId,
  });
  if (!property) {
    throw new AppError(404, "Property not found!");
  }

  const newFormat = new Date(date + " " + hour);

  if (
    Number(format(newFormat, "ee")) === 1 ||
    Number(format(newFormat, "ee")) === 7
  ) {
    throw new AppError(400, "Open schedule only on weekdays!");
  }

  if (
    Number(format(newFormat, "H")) < 8 ||
    Number(format(newFormat, "H")) > 17
  ) {
    throw new AppError(400, "Open schedule only between 8:00h and 18:00h!");
  }

  const schedules = await scheduleRepository.find();
  const scheduleAlreadyExists = schedules.find(
    (sched) => sched.date === date && sched.hour === hour
  );
  if (scheduleAlreadyExists) {
    throw new AppError(400, "This schedule already exists");
  }

  const newSchedule = scheduleRepository.create({
    user,
    property,
    date,
    hour,
  });

  await scheduleRepository.save(newSchedule);

  return newSchedule;
};

export default createScheduleService;
