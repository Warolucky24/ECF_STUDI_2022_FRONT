export interface User{
    id: number,
    email: string,
    first_connect: boolean,
    is_admin: boolean,
    user_active: boolean,
    user_name: string,
    profil_url: string
}

export interface UserConnectInterface{
    user_email: string,
    user_password: string,
    souvenir: boolean

}


export const  defaultUser = {
    id: 0,
    email: "none",
    first_connect: false,
    is_admin: true,
    user_active: true,
    user_name: "none",
}