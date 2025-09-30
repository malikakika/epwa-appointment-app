import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

export type Role = "PATIENT" | "DOCTOR" | "ADMIN";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Index({ unique: true })
  @Column({ type: "varchar", length: 255 })
  email!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  passwordHash!: string | null;

  @Column({ type: "varchar", length: 20, default: "PATIENT" })
  role!: Role;

  @Column({ type: "varchar", length: 100, nullable: true })
  firstName!: string | null;

  @Column({ type: "varchar", length: 100, nullable: true })
  lastName!: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  name!: string | null; 

  @Column({ type: "varchar", length: 20, nullable: true })
  phone!: string | null;

  @Column({ type: "varchar", length: 20, nullable: true })
  streetNumber!: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  street!: string | null;

  @Column({ type: "varchar", length: 20, nullable: true })
  postalCode!: string | null;

  @Column({ type: "varchar", length: 100, nullable: true })
  city!: string | null;

  @Column({ type: "varchar", length: 100, nullable: true })
  specialty!: string | null;

  @Column({ type: "varchar", length: 50, nullable: true })
  rpps!: string | null;
}
