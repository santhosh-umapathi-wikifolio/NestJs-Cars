import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    createUser(email: string, password: string) {
        const user = this.usersRepository.create({ email, password });
        return this.usersRepository.save(user);
    }

    findOne(id: number) {
        return this.usersRepository.findOneBy({ id });
    }

    find(email: string) {
        return this.usersRepository.find({ where: { email } });
    }

    async updateUser(id: number, attrs: Partial<User>) {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const { id: _, ...updateAttrs } = attrs; // Exclude id
        Object.assign(user, updateAttrs);
        return this.usersRepository.save(user);
    }

    async removeUser(id: number) {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return this.usersRepository.remove(user);
    }
}


