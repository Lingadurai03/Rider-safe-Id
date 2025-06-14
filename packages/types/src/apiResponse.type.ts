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
