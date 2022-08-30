import type {StructAddInterface, StructInterface} from "@/shared/interfaces";
import {BASE_URL} from "@/shared/services/index";
import {number} from "zod";


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

export async function addStruct(formValues : StructAddInterface){
    const response = await (await fetch(`${BASE_URL}/struct`, {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
            "Content-type": "application/json"
        }
    })).json()
    if(!response.error){
        return response;
    }else{
        throw response;
    }
}

export async function dataStructById(struct_id : number){
    const response = await (await fetch(`${BASE_URL}/struct/${struct_id}`)).json()
    if(!response.error){
        return response;
    }else{
        throw response;
    }
}