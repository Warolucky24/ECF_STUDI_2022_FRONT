import type {StructPartnerDetailInterface} from "@/shared/interfaces/StructureInterface";

export  interface PartnerInterface{
    id: number,
    logo_url: string,
    partner_active: number,
    partner_name: string,
    email: string,
    user_name: string,
    user_id: number
}


export interface PartnerAddInterface{
    partner_name: string,
    partner_active: string,
    user_email: string
}

export  interface PartnerDetailInterface{
    user_id : number,
    partner_id: number,
    user_name : string,
    user_email: string,
    partner_name: string,
    partner_active: number,
    logo_url: string,
    gestion: {
        c_crosstrainning:number,
        c_particulier: number,
        c_pilate: number,
        v_boisson: number,
        v_vetement: number
    },
    struct : StructPartnerDetailInterface[] | any
}

