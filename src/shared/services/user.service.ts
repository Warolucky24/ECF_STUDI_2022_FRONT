import type {UserConnectInterface, User} from "@/shared/interfaces";

export const BASE_URL = "http://api-ecf-studi.math-frigoriste.fr/V1";
export const BASE_URL2 = "http://localhost/ECF_STUDI_2022_DECEMBER/V1";


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