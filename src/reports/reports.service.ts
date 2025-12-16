import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './reports.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private reportsRepository: Repository<Report>) { }

    create(data: Partial<Report>, user: User) {
        const report = this.reportsRepository.create(data);
        report.user = user;
        return this.reportsRepository.save(report);
    }
}
