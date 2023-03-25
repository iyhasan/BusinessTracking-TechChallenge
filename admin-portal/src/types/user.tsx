export interface Admin {
    is_active: boolean,
}

export interface UserType {
    email: string,
    first_name: string,
    last_name: string,
    admin: Admin,
}

export interface ProfileType {
    email: string,
    first_name: string,
    last_name: string,
}