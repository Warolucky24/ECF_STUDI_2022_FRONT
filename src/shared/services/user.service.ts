import type {UserConnectInterface, UserResponse} from "@/shared/interfaces";
import {BASE_URL} from "@/shared/services/index";


export async function connectUser(User : UserConnectInterface): Promise<UserResponse> {
    const response = await fetch(`${BASE_URL}/login`,
        {
            method: "POST",
            body: JSON.stringify({
                user_email: User.user_email,
                user_password: User.user_password
            }),
            headers: {
                "Content-type": "application/json"
            }
        })

    if(response.ok){
        return await response.json();
    }else{
        throw await response.json();
    }
}

export async function tokenIsValid(){

    return await fetch(`${BASE_URL}/token`,
        {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                'Authorization': `Bearer ${localStorage.token}`
            }
        })
}

export async function updateUser(email : string ,value: string|number, column: string){
    const response = await (await fetch(`${BASE_URL}/user/${column}`,{
        method: "PUT",
        body: JSON.stringify({
            user_email : email,
            value: value
        }),
        headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${localStorage.token}`
        }
    })).json()
    if (!response.error){
        return response;
    }else{
        throw response;
    }
}

export async function deletePartnerOrStructService(id:number, type:string){
    const response = await (await fetch(`${BASE_URL}/${type}/${id}`,{
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${localStorage.token}`
        }
    })).json()
    if (!response.error){
        return response;
    }else{
        throw response;
    }

}