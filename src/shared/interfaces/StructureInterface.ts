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
    struct_name : string,
    struct_active : number,
    c_crosstrainning:number,
    c_particulier: number,
    c_pilate: number,
    v_boisson: number,
    v_vetement: number
}