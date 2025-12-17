import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './reports.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private reportsRepository: Repository<Report>) { }

    create(data: Partial<Report>, user: User) {
        const report = this.reportsRepository.create(data);
        report.user = user;
        return this.reportsRepository.save(report);
    }

    async approve(id: number, approved: boolean) {
        const report = await this.reportsRepository.findOneBy({ id });
        if (!report) {
            throw new NotFoundException('Report not found');
        }

        report.approved = approved;

        return this.reportsRepository.save(report);
    }

    async getEstimate({ make, model, year, mileage, latitude, longitude }: GetEstimateDto) {
        const estimate = await this.reportsRepository.createQueryBuilder('report')
            .select('AVG(price)', 'price')
            .where('make = :make', { make })
            .andWhere('model = :model', { model })
            .andWhere('longitude - :longitude BETWEEN -5 AND 5', { longitude })
            .andWhere('latitude - :latitude BETWEEN -5 AND 5', { latitude })
            .andWhere('year - :year BETWEEN -3 AND 3', { year })
            .andWhere('approved IS TRUE')
            .orderBy('ABS(mileage - :mileage)', 'DESC')
            .setParameters({ mileage })
            .limit(3)
            .getRawOne()


        return estimate;
    }
}
