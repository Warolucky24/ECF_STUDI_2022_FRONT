import {defineStore} from "pinia";
import type {PartnerAddInterface, PartnerInterface} from "@/shared/interfaces/PartnerInterface";
import {DEFAULT_FILTER, type FilterInterface, type FilterUpdate} from "@/shared/interfaces";
import {
    addPartner,
    changeActiveDroitPartner,
    changeActivePartner,
    fetchAllPartner,
    updatePartner
} from "@/shared/services";
import {useUserStore} from "@/stores/userStore";

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
            return state.partner.filter(p => {
                const etat_partner = p.partner_active === 1 ? "Actif" : "Non-actif";
                return p.partner_name.toLocaleLowerCase().startsWith(state.filters.search.toLocaleLowerCase()) &&
                    (state.filters.etat === "all" || state.filters.etat === etat_partner)
            })
        }
    },
    actions: {
        async fetchPartner(){
            this.isLoading = true
            this.partner = await fetchAllPartner();
            this.isLoading = false
        },
        async addPartner(formValues: PartnerAddInterface){
            this.isLoading = true
            const response = await addPartner(formValues)
            if (response){
                this.needRefresh = true;
                this.partner.push(response)
            }
            this.isLoading = false
        },
        async changeActive(partner_id : number, active: number){
            const editPartner = await changeActivePartner(partner_id, active)
            if(editPartner){
                this.needRefresh = true
                const partnerIndex = this.partner.findIndex(p => p.id === partner_id)
                this.partner[partnerIndex].partner_active = active
            }
        },
        async changeActiveDroit(partner_id :number, gestion_name:string, gestion_active:number){
            const editDroitPartner = await changeActiveDroitPartner(partner_id, gestion_name, gestion_active);
            if (editDroitPartner){
                this.needRefresh = true
            }
        },
        updateFilter(filterUpdate : FilterUpdate){
            if (filterUpdate.search !== undefined){
                this.filters.search = filterUpdate.search
            }else if(filterUpdate.etat){
                this.filters.etat = filterUpdate.etat
            }else{
                this.filters = {... DEFAULT_FILTER}
            }
        },
        async updatePartner(partner_id: number, partner_name: string, logo_url: string){
            const response = await updatePartner(partner_id, partner_name, logo_url)
            if (response){
                this.needRefresh = true
                const partnerIndex = this.partner.findIndex(e => e.id === partner_id)
                this.partner[partnerIndex] = response
            }
            return response
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