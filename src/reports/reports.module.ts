import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { ReportEntity } from './reports.entity';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  imports: [ReportEntity],
})
export class ReportsModule { }
