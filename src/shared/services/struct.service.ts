import type {StructAddInterface, StructInterface, StructUpdateInterface} from "@/shared/interfaces";
import {ACCESS_TOKEN, BASE_URL} from "@/shared/services/index";


export async function fetchAllStruct(): Promise<StructInterface[]>{
    const response = await (await fetch(`${BASE_URL}/struct`,{
        headers: {
            'Authorization': `Bearer ${ACCESS_TOKEN}`
        }
    })).json()
    if(!response.error){
        return response;
    }else{
        throw response;
    }
}

export async function changeActiveStruct(struct_id : number, active: number){
    const response = await (await fetch(`${BASE_URL}/struct/active`,{
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${ACCESS_TOKEN}`
        },
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
            "Content-type": "application/json",
            'Authorization': `Bearer ${ACCESS_TOKEN}`
        }
    })).json()
    if(!response.error){
        return response;
    }else{
        throw response;
    }
}

export async function dataStructById(struct_id : number){
    const response = await (await fetch(`${BASE_URL}/struct/${struct_id}`,{
        headers:{
            'Authorization': `Bearer ${ACCESS_TOKEN}`
        }
    })).json()
    if(!response.error){
        return response;
    }else{
        throw response;
    }
}

export async function changeActiveDroitStruct(struct_id:number, gestion_name:string, gestion_active:number){
    const response = await (await fetch(`${BASE_URL}/struct/droit`,{
        method: "PUT",
        headers:{
            "Content-type": "application/json",
            'Authorization': `Bearer ${ACCESS_TOKEN}`
        },
        body :JSON.stringify({
            struct_id: struct_id,
            gestion_name: gestion_name,
            gestion_active:gestion_active
        })
    })).json()
    if (!response.error){
        return response;
    }else{
        throw  response;
    }
}

export async function updateStruct(struct_id : number , formValues: StructUpdateInterface){

    const response = await (await fetch(`${BASE_URL}/struct`,{
        method: "PUT",
        headers:{
            "Content-type": "application/json",
            'Authorization': `Bearer ${ACCESS_TOKEN}`
        },
        body: JSON.stringify({
            struct_id : struct_id,
            struct_name: formValues.struct_name,
            struct_address: formValues.struct_address,
            struct_city: formValues.struct_city,
            struct_postal: formValues.struct_postal
        })
    })).json()
    if (!response.error){
        return response;
    }else{
        throw response;
    }
}