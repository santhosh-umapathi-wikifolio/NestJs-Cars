import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { authGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/users.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApprovedReportDto } from './dtos/approved-report.dto';
import { adminGuard } from '../guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Controller('reports')

export class ReportsController {
    constructor(private readonly reportsService: ReportsService) { }

    @Get()
    getReports(@Query() query: GetEstimateDto) {
        return this.reportsService.getEstimate(query);
    }

    @Post('/create')
    @authGuard()
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportsService.create(body, user);
    }

    @Patch('/approve/:id')
    @authGuard()
    @adminGuard()
    approveReport(@Param('id') id: string, @Body() body: ApprovedReportDto) {
        return this.reportsService.approve(+id, body.approved);
    }
}
