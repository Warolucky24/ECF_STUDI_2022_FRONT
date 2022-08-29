import type {UserConnectInterface, User} from "@/shared/interfaces";
import {BASE_URL} from "@/shared/services/index";


export async function connectUser(User : UserConnectInterface): Promise<User> {
    const response = await (await fetch(`${BASE_URL}/login`,
        {
            method: "POST",
            body: JSON.stringify(User),
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