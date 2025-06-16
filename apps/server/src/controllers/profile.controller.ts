import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { GetProfileApiResponse } from '@ridersafeid/types';

import { AddOrUpdateProfileDto } from '@/dto';
import { JwtAuthGuard } from '@/guards';
import { ProfileService } from '@/services';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    addProfile(
        @Request() req: { user: { id: string } },
        @Body() body: AddOrUpdateProfileDto,
    ) {
        return this.profileService.upsertProfile(req.user.id, body);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getProfile(
        @Request() req: { user: { id: string } },
    ): Promise<GetProfileApiResponse> {
        return this.profileService.getProfile(req.user.id);
    }
}
