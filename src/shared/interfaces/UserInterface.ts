export  interface UserInterface{
    id: number,
    email: string,
    password: string,
    user_active: boolean,
    user_name: string,
    user_grade: number
}

export interface UserConnectInterface{
    email: string,
    password: string
}