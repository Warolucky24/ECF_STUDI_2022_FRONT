import type {GestionInterface} from "@/shared/interfaces/GestionInterface";

export interface StructInterface{
    id: number,
    struct_name: string,
    struct_active: number,
    partner_id: number,
    partner_name: string,
    partner_user_id: number,
    logo_url: string,
    user_id: number,
    profil_url: string,
    email: string,
    user_name: string,
    user_active: number
}

export interface StructPartnerDetailInterface{
    id: number,
    struct_name : string,
    struct_active : number,
    v_vetement: number,
    v_boisson: number,
    c_particulier: number,
    c_crosstrainning: number,
    c_pilate: number
}

export interface StructAddInterface{
    user_email: string,
    struct_name: string,
    struct_active: string,
    partner_id: number,
    user_name: string,
    struct_adress: string,
    struct_postal: number,
    struct_city: string
}
export interface StructUpdateInterface{
    struct_name: string,
    user_name: string,
    struct_address: string,
    struct_postal: number,
    struct_city: string
}


export interface StructDetailInterface{
    struct_id : number,
    struct_name: string,
    struct_active: number,
    struct_address: string,
    struct_city: string,
    struct_postal: number,
    partner_id: number,
    partner_user_id: number,
    partner_name: string,
    partner_active: number,
    user_id: number,
    user_name: string,
    user_email: string,
    user_active: number,
    gestion: GestionInterface
}