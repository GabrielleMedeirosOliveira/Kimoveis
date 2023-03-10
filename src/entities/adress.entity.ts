import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("adresses")
export class Adress {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  district: string;

  @Column({ length: 8 })
  zipCode: string;

  @Column()
  number: string;

  @Column()
  city: string;

  @Column({ length: 2 })
  state: string;
}
