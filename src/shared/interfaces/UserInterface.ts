export interface User{
    email: string,
    first_connect: boolean,
    is_admin: boolean,
    user_active: boolean,
    user_name: string
}

export interface UserConnectInterface{
    email: string,
    password: string
}