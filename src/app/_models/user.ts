import { Role } from "./role";

export class User {
    id?: number;
    title?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: Role;
    created?: string;
    isVerified?: string;
    jwtToken?: string;
    userType?: string;
    id_token: any;
}

