import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AddOrUpdateProfileApiPayload } from '@ridersafeid/types';

import { PrismaService } from './prisma.service';

@Injectable()
export class ProfileService {
    constructor(private readonly prisma: PrismaService) {}

    async upsertProfile(userId: string, dto: AddOrUpdateProfileApiPayload) {
        const { emergencyContacts, ...profileData } = dto;

        const existingProfile = await this.prisma.profile.findUnique({
            where: { userId },
        });

        if (existingProfile) {
            const updatedProfile = await this.prisma.profile.update({
                where: { userId },
                data: profileData,
            });

            console.log('emergencyContacts', emergencyContacts);
            if (emergencyContacts) {
                await this.prisma.emergencyContact.deleteMany({
                    where: { profileId: updatedProfile.id },
                });

                await this.prisma.emergencyContact.createMany({
                    data: emergencyContacts.map((contact) => ({
                        profileId: updatedProfile.id,
                        ...contact,
                    })),
                });
            }

            return updatedProfile;
        } else {
            return this.prisma.profile.create({
                data: {
                    ...profileData,
                    userId,
                    emergencyContacts: emergencyContacts
                        ? {
                              create: emergencyContacts,
                          }
                        : undefined,
                },
                include: { emergencyContacts: true },
            });
        }
    }

    async getProfile(id: string) {
        console.log('userProfile', id);
        try {
            const userProfile = await this.prisma.profile.findUnique({
                where: { userId: id },
                include: { emergencyContacts: true },
            });

            return userProfile;
        } catch (_error) {
            throw new InternalServerErrorException('Failed to fetch profile');
        }
    }
}
