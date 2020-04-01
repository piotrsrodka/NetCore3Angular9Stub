export interface User {
    id: number;
    email: string;
    password: string;
    name: string;
    role: string;
    isActive: boolean;
    authdata?: string;
}
