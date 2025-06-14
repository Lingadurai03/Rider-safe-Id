export interface LoginApiPayload {
    email: string;
    password: string;
}

export interface RegisterApiPayload {
    email: string;
    password: string;
    phone?: string;
    fullName?: string;
}

export interface RefreshTokenPayload {
    refreshToken: string;
}
