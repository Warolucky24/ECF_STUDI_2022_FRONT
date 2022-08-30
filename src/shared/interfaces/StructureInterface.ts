export interface StructInterface{
    id: number,
    partner_id: number,
    partner_name: string,
    struct_active: number,
    struct_name: string,
    logo_url: string,
    user_id: number
}

export interface StructPartnerDetailInterface{
    id: number,
    struct_name : string,
    struct_active : number,
    c_crosstrainning:number,
    c_particulier: number,
    c_pilate: number,
    v_boisson: number,
    v_vetement: number
}

export interface StructAddInterface{
    user_email: string,
    struct_name: string,
    struct_active: string
    partner_id: number
}

export interface StructDetailInterface{
    struct_id : number,
    partner_id: number,
    partner_name: string,
    user_id: number,
    user_name: string,
    user_email: string,
    struct_name: string,
    struct_active: number,
    gestion: {
        c_crosstrainning:number,
        c_particulier: number,
        c_pilate: number,
        v_boisson: number,
        v_vetement: number
    }
}