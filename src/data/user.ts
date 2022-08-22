import type {PartnerInterface} from "@/shared/interfaces/PartnerInterface";
import type {UserInterface} from "@/shared/interfaces/UserInterface";

export const tableUser =  [
    {
        email: "admin@admin.fr",
        password: "admin"
    },{
        email: "user@user.fr",
        password: "user"
    }
] as UserInterface[]

export const tablePartner = [
    {
        partner_id: 1,
        user_id : 1,
        partner_name: "Crossfit Lyon",
        partner_active: 1,
        partner_logo_url : "",
        gestion_id : 1
    },
    {
        partner_id: 1,
        user_id : 1,
        partner_name: "gygagim Lyon",
        partner_active: 1,
        partner_logo_url : "",
        gestion_id : 1
    },
    {
        partner_id: 1,
        user_id : 1,
        partner_name: "Crossfit Paris",
        partner_active: 0,
        partner_logo_url : "",
        gestion_id : 1
    },
    {
        partner_id: 1,
        user_id : 1,
        partner_name: "Crossfit Bordeaux",
        partner_active: 0,
        partner_logo_url : "",
        gestion_id : 1
    }
] as PartnerInterface[]