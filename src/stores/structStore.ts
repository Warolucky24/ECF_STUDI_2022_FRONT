import {defineStore} from "pinia";
import type {FilterInterface, StructAddInterface, StructInterface} from "@/shared/interfaces";
import {addStruct, changeActiveDroitStruct, changeActiveStruct, fetchAllStruct} from "@/shared/services";
import {DEFAULT_FILTER, type FilterUpdate} from "@/shared/interfaces";


interface StructStoreInterface{
    struct : StructInterface[],
    filters: FilterInterface,
    isLoading : boolean,
    loaded: boolean,
    needRefresh: boolean
}

export const useStructStore = defineStore("structStore",{
    state: ():StructStoreInterface =>({
        struct : [],
        filters: {... DEFAULT_FILTER},
        isLoading : false,
        loaded: false,
        needRefresh : false
    }),
    getters: {
        filteredStruct(state){
            return state.struct.filter(s => {
                const etat_partner = s.struct_active === 1 ? "Actif" : "Non-actif";
                return s.struct_name.toLocaleLowerCase().startsWith(state.filters.search.toLocaleLowerCase()) &&
                    (state.filters.etat === "all" || state.filters.etat === etat_partner)
            })
        }
    },
    actions: {
        async fetchStruct(){
            this.isLoading = true
            this.struct = await fetchAllStruct();
            this.isLoading = false
        },
        async changeActive(struct_id : number, active:number){
            const editStruct = await changeActiveStruct(struct_id, active)
            if(editStruct){
                this.needRefresh = true
                const structIndex = this.struct.findIndex(p => p.id === struct_id)
                this.struct[structIndex].struct_active = active
            }
        },
        async addStruct(formValues : StructAddInterface){
            await addStruct(formValues);
            this.needRefresh = true
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
        async changeDroitActive(struct_id:number, gestion_name:string,gestion_active:number){
            const editDroitStruct = await changeActiveDroitStruct(struct_id, gestion_name, gestion_active)
            if (editDroitStruct){
                this.needRefresh = true
            }
        }
    }
})

export function initialFetchStruct(){
    const structStore = useStructStore()
    if(!structStore.loaded || structStore.needRefresh){
        if (structStore.needRefresh){
            structStore.struct = []
            structStore.needRefresh = false
        }
    }
    structStore.fetchStruct()
    structStore.loaded = true
}