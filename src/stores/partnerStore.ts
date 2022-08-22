import {defineStore} from "pinia";
import type {PartnerInterface} from "@/shared/interfaces/PartnerInterface";
import {tablePartner} from "@/data/user";

interface PartnerStoreInterface{
    data_partner: PartnerInterface[]
}

export const usePartnerStore = defineStore("userStore", {
    state: (): PartnerStoreInterface => ({
        data_partner : tablePartner
    }),
    getters: {

    },
    actions: {
    }

})
