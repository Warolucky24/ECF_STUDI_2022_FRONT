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
    email: string,
    user_name: string,
    user_active: number
}

export interface StructPartnerDetailInterface{
    id: number,
    struct_name : string,
    struct_active : number,
    gestion : GestionInterface
}

export interface StructAddInterface{
    user_email: string,
    struct_name: string,
    struct_active: string
    partner_id: number
}

export interface StructDetailInterface{
    struct_id : number,
    struct_name: string,
    struct_active: number,
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