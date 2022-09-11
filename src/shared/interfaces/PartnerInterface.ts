import type {StructPartnerDetailInterface} from "@/shared/interfaces/StructureInterface";
import type {GestionInterface} from "@/shared/interfaces/GestionInterface";

export  interface PartnerInterface{
    id: number,
    user_id: number,
    user_name: string,
    email: string,
    partner_name: string,
    partner_active: number,
    logo_url: string
}


export interface PartnerAddInterface{
    partner_name: string,
    partner_active: string,
    user_email: string,
    user_name: string
}

export  interface PartnerDetailInterface{
    user_id : number,
    partner_id: number,
    user_name : string,
    user_email: string,
    user_active: number,
    partner_name: string,
    partner_active: number,
    logo_url: string,
    gestion: GestionInterface,
    struct : StructPartnerDetailInterface[] | any
}

