export  interface PartnerInterface{
    id: number,
    logo_url: string,
    partner_active: number,
    partner_name: string,
    gestion_id: number
}


export interface PartnerAddInterface{
    partner_name: string,
    partner_active: string,
    user_email: string
}

export  interface PartnerDetailInterface{
    user_id : string,
    user_name : string,
    user_email: string,
    partner_name: string,
    partner_active: boolean,
    partner_id: number,
    gestion: {
        c_crosstrainning:boolean,
        c_particulier: boolean,
        c_pilate: boolean,
        v_boisson: boolean,
        v_vetement: boolean
    }
}