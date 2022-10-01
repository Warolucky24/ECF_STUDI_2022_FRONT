import {BASE_URL} from "@/shared/services/index";
import type {PartnerAddInterface, PartnerDetailInterface, PartnerInterface} from "@/shared/interfaces";


export async function fetchAllPartner(): Promise<PartnerInterface[]> {
    const response = await fetch(`${BASE_URL}/partner`, {
        headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${localStorage.token}`
        }
    });
    if(response.ok){
        return await response.json();
    }else{
        throw response;
    }
}

export async function dataPartnerById($partner_id : number) : Promise<PartnerDetailInterface>{
    const response = await (await fetch(`${BASE_URL}/partner/${$partner_id}`,{
        headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${localStorage.token}`
        }
    })).json()
    if(!response.error){
        return response;
    }else{
        throw response;
    }
}

export async function  addPartner(formValues : PartnerAddInterface){
    const response = await (await fetch(`${BASE_URL}/partner`, {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${localStorage.token}`
        }
    })).json()
    if(!response.error){
        return response;
    }else{
        throw response;
    }
}

export async function changeActivePartner(partner_id : number, active: number){
    const response = await (await fetch(`${BASE_URL}/partner/active`,{
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${localStorage.token}`
        },
        body :JSON.stringify({
            partner_id: partner_id,
            partner_active: active
        })
    })).json()
    if (!response.error){
        return response;
    }else{
        throw  response;
    }
}

export async function changeActiveDroitPartner(partner_id:number, gestion_name:string, gestion_active:number){
    const response = await (await fetch(`${BASE_URL}/partner/droit`,{
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${localStorage.token}`
        },
        body :JSON.stringify({
            partner_id: partner_id,
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


export async function updatePartner(partner_id : number ,partner_name: string, logo_url: string){
    const response = await (await fetch(`${BASE_URL}/partner`,{
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({
            partner_id : partner_id,
            partner_name: partner_name,
            logo_url: logo_url
        })
    })).json()
    if (!response.error){
        return response;
    }else{
        throw response;
    }
}