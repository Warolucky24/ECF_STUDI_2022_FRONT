import {defineStore} from "pinia";
import type {PartnerAddInterface, PartnerDetailInterface, PartnerInterface} from "@/shared/interfaces/PartnerInterface";
import {DEFAULT_FILTER, type FilterInterface, type FilterUpdate} from "@/shared/interfaces";
import {addPartner, dataPartnerById, fetchAllPartner} from "@/shared/services";

interface PartnerStoreInterface{
    partner: PartnerInterface[],
    filters : FilterInterface,
    isLoading: boolean,
    loaded: boolean,
    needRefresh: boolean,
    partnerDetail : PartnerDetailInterface | null

}

export const usePartnerStore = defineStore("partner", {
    state: (): PartnerStoreInterface => ({
        partner : [],
        filters : {...DEFAULT_FILTER},
        isLoading: false,
        loaded : false,
        needRefresh : false,
        partnerDetail : null
    }),
    getters: {
        filteredPartner(state){
            return state.partner;
        }

    },
    actions: {
        updateFilter(filterUpdate: FilterUpdate){

            if(filterUpdate.search !== undefined){
                this.filters.search = filterUpdate.search
                console.log(this.filters.search)
            }else if(filterUpdate.etat){
                this.filters.etat = filterUpdate.etat
            }else{
                this.filters = {...DEFAULT_FILTER}
            }
        },
        async fetchPartner(){
            this.isLoading = true
            this.partner = await fetchAllPartner();
            this.isLoading = false
        },
        async addPartner(formValues: PartnerAddInterface){
            await addPartner(formValues)
            this.needRefresh = true
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