export interface UserProps {
    id: number;
    username: string;
    email: string;
    createdAt: Date;
    password: string;
    admin: boolean;
}