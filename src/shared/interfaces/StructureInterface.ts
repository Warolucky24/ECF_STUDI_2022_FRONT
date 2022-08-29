export interface StructureInterface{
    struct_id : number,
    user_id : number,
    partner_id : number,
    struct_name : string,
    struct_active : number
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