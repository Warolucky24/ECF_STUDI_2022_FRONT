import {defineStore} from "pinia";
import type {PartnerAddInterface, PartnerInterface} from "@/shared/interfaces/PartnerInterface";
import {DEFAULT_FILTER, type FilterInterface} from "@/shared/interfaces";
import {addPartner, changeActivePartner, fetchAllPartner} from "@/shared/services";

interface PartnerStoreInterface{
    partner: PartnerInterface[],
    filters : FilterInterface,
    isLoading: boolean,
    loaded: boolean,
    needRefresh: boolean

}

export const usePartnerStore = defineStore("partner", {
    state: (): PartnerStoreInterface => ({
        partner : [],
        filters : {...DEFAULT_FILTER},
        isLoading: false,
        loaded : false,
        needRefresh : false
    }),
    getters: {
        filteredPartner(state){
            return state.partner;
        }

    },
    actions: {
        async fetchPartner(){
            this.isLoading = true
            this.partner = await fetchAllPartner();
            this.isLoading = false
        },
        async addPartner(formValues: PartnerAddInterface){
            await addPartner(formValues)
            this.needRefresh = true
        },
        async changeActive(partner_id : number, active: number){
            const editPartner = await changeActivePartner(partner_id, active)
            if(editPartner){
                this.needRefresh = true
                const partnerIndex = this.partner.findIndex(p => p.id === partner_id)
                this.partner[partnerIndex].partner_active = active
            }
        }
    }
})


export function initialFetchPartner(){
    const partnerStore = usePartnerStore()
    if (!partnerStore.loaded || partnerStore.needRefresh){
        if(partnerStore.needRefresh){
            partnerStore.partner = []
            partnerStore. needRefresh = false
        }
    }
    partnerStore.fetchPartner()
    partnerStore.loaded = true
}