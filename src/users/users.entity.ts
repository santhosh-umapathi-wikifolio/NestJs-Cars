import { TypeOrmModule } from "@nestjs/typeorm";
import { Report } from "../reports/reports.entity";
import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: false })
    admin: boolean;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[];

    @AfterInsert()
    logInsert() {
        console.log(`New User Created with id: ${this.id}, email: ${this.email}`);
    }

    @AfterUpdate()
    logUpdate() {
        console.log(`User Updated with id: ${this.id}, email: ${this.email}`);
    }

    @AfterRemove()
    logRemove() {
        console.log(`User Removed with id: ${this.id}, email: ${this.email}`);
    }
}

export const UserEntity = TypeOrmModule.forFeature([User]);