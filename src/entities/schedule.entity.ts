import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Property } from "./property.entity";
import { User } from "./user.entity";

@Entity("schedules")
export class Schedule {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  hour: string;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @ManyToOne(() => Property)
  property: Property;
}
