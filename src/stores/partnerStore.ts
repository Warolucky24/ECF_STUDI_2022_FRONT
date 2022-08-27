import {defineStore} from "pinia";
import type {PartnerInterface} from "@/shared/interfaces/PartnerInterface";
import {tablePartner} from "@/data/user";
import {DEFAULT_FILTER, type FilterInterface, type FilterUpdate} from "@/shared/interfaces";

interface PartnerStoreInterface{
    partner: PartnerInterface[],
    filters : FilterInterface,

}

export const usePartner = defineStore("partner", {
    state: (): PartnerStoreInterface => ({
        partner : [],
        filters : {...DEFAULT_FILTER}
    }),
    getters: {
        filteredPartner(state){
            return state.partner.filter((partner) => {
                partner.partner_name.toLocaleLowerCase().startsWith(state.filters.search.toLocaleLowerCase())
            })
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
        fetchPartner(){
            this.partner = [... tablePartner]
        }
    }
})


export function initialFetchPartner(){
    const partnerStore = usePartner()
    partnerStore.fetchPartner()
}