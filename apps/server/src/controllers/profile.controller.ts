import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import {
    AddOrUpdateProfileApiResponse,
    GetProfileApiResponse,
} from '@ridersafeid/types';

import { AddOrUpdateProfileDto } from '@/dto';
import { JwtAuthGuard } from '@/guards';
import { ProfileService } from '@/services';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    addOrUpdateProfile(
        @Request() req: { user: { id: string } },
        @Body() body: AddOrUpdateProfileDto,
    ): Promise<AddOrUpdateProfileApiResponse> {
        return this.profileService.upsertProfile(req.user.id, body);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getProfile(
        @Request() req: { user: { id: string } },
    ): Promise<GetProfileApiResponse | null> {
        return this.profileService.getProfile(req.user.id);
    }
}
