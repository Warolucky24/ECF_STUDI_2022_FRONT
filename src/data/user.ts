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
        name : "Crossfit Lyon",
        active : true
    },
    {
        name: "Crossfit Paris",
        active: true
    }
] as PartnerInterface[]