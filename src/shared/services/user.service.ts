import type {UserConnectInterface, User} from "@/shared/interfaces";
import {BASE_URL} from "@/shared/services/index";


export async function connectUser(User : UserConnectInterface): Promise<User> {
    const response = await (await fetch(`${BASE_URL}/login`,
        {
            method: "POST",
            body: JSON.stringify({
                user_email: User.user_email,
                user_password: User.user_password
            }),
            headers: {
                "Content-type": "application/json"
            }
        })).json();
    if(!response.error){
        return response;
    }else{
        throw response;
    }
}

export async function updateUser(email : string ,value: string|number, column: string){
    const response = await (await fetch(`${BASE_URL}/user/${column}`,{
        method: "PUT",
        body: JSON.stringify({
            user_email : email,
            value: value
        })
    })).json()
    console.log(response)
    if (!response.error){
        return response;
    }else{
        throw response;
    }
}

export async function deletePartnerOrStructService(id:number, type:string){
    const response = await (await fetch(`${BASE_URL}/${type}/${id}`,{
        method: "DELETE"
    })).json()
    if (!response.error){
        return response;
    }else{
        throw response;
    }

}