import { Body, Controller, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { authGuard, AuthGuard } from 'src/guards/auth.guard';

@Controller('reports')
@authGuard()
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) { }

    @Post('/create')
    createReport(@Body() body: CreateReportDto) {
        return this.reportsService.create(body);
    }
}
