export interface LoginApiResponse {
    user: {
        id: string;
        fullName: string | null;
        email: string;
        role: string;
    };
    accessToken: string;
    refreshToken: string;
}

export type RegisterApiResponse = LoginApiResponse;

export type RefreshTokenApiResponse = Omit<LoginApiResponse, 'user'>;

interface EmergencyContactsType {
    id: string;
    profileId: string;
    name: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface GetProfileApiResponse {
    id: string;
    userId: string;
    profileName: string;
    bloodGroup: string;
    address: string;
    pincode: string;
    dob: Date;
    state: string;
    city: string;
    imageUrl: null | string;
    showPrivateData: boolean;
    createdAt: Date;
    updatedAt: Date;
    emergencyContacts: EmergencyContactsType[];
}
