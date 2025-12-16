import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './reports.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private reportsRepository: Repository<Report>) { }

    create(data: Partial<Report>) {
        const report = this.reportsRepository.create(data);
        return this.reportsRepository.save(report);
    }
}
