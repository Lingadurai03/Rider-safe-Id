import { Type } from 'class-transformer';
import {
    ArrayMaxSize,
    IsBoolean,
    IsDateString,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';

export class EmergencyContactDto {
    @IsString()
    name: string;

    @IsString()
    phone: string;
}

export class AddOrUpdateProfileDto {
    @IsString()
    profileName: string;

    @IsString()
    bloodGroup: string;

    @IsString()
    address: string;

    @IsString()
    pincode: string;

    @IsDateString()
    dob: string;

    @IsString()
    state: string;

    @IsString()
    city: string;

    @IsOptional()
    @IsString()
    imageUrl?: string;

    @IsOptional()
    @IsBoolean()
    showPrivateData?: boolean;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => EmergencyContactDto)
    @ArrayMaxSize(3)
    emergencyContacts?: EmergencyContactDto[];
}
