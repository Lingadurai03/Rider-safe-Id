import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GetQrApiResponse } from '@ridersafeid/types';
import { Request } from 'express';

import { JwtAuthGuard } from '@/guards';
import { AppService } from '@/services';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @UseGuards(JwtAuthGuard)
    @Get('getQr')
    getQr(@Req() req: { user: { id: string } }): Promise<GetQrApiResponse> {
        return this.appService.getQrData(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('getLogs')
    async getUserId(@Req() req: Request) {
        const user = req.user as { id: string };
        return this.appService.getLogs(user.id, req);
    }
}
