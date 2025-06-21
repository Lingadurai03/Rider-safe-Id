import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { GetQrApiResponse } from '@ridersafeid/types';

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
    getQr(@Request() req: { user: { id: string } }): Promise<GetQrApiResponse> {
        return this.appService.getQrData(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('getLogs')
    async getUserId(@Request() req:{user:{id:string}}){
        return this.appService.getLogs(req.user.id)
    }
}
