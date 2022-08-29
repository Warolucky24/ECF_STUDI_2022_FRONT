import type {StructInterface} from "@/shared/interfaces";
import {BASE_URL} from "@/shared/services/index";


export async function fetchAllStruct(): Promise<StructInterface[]>{
    const response = await (await fetch(`${BASE_URL}/struct-all`)).json()
    if(!response.error){
        return response;
    }else{
        throw response;
    }
}

export async function changeActiveStruct(struct_id : number, active: number){
    const response = await (await fetch(`${BASE_URL}/struct/active`,{
        method: "PUT",
        body: JSON.stringify({
            struct_id: struct_id,
            struct_active: active
        })
    })).json()
    if (!response.error){
        return response;
    }else{
        throw response;
    }
}