import { TypeOrmModule } from "@nestjs/typeorm";
import { Exclude } from "class-transformer";
import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

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