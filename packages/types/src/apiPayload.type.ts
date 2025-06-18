export interface LoginApiPayload {
    email: string;
    password: string;
}

export interface RegisterApiPayload {
    email: string;
    password: string;
    phone?: string;
    fullName: string;
}

export interface RefreshTokenApiPayload {
    refreshToken: string;
}

interface EmergencyContactType {
    name: string;
    phone: string;
}

export class AddOrUpdateProfileApiPayload {
    profileName: string;
    bloodGroup: string;
    address: string;
    pincode: string;
    dob: string;
    state: string;
    city: string;
    imageUrl?: string;
    showPrivateData?: boolean;
    emergencyContacts?: EmergencyContactType[];
}

export class CreateLogApiPayload {
    city: string;
    state: string;
    country: string;
    lat: number;
    long: number;
    accuracy: string;
}
