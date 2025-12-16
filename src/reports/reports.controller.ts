import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { authGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/users.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApprovedReportDto } from './dtos/approved-report.dto';

@Controller('reports')

export class ReportsController {
    constructor(private readonly reportsService: ReportsService) { }

    @Post('/create')
    @authGuard()
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportsService.create(body, user);
    }

    @Patch('/approve/:id')
    @authGuard()
    approveReport(@Param('id') id: string, @Body() body: ApprovedReportDto) {
        return this.reportsService.approve(+id, body.approved);
    }
}
