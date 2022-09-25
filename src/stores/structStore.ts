import {defineStore} from "pinia";
import type {
    FilterInterface,
    StructAddInterface,
    StructInterface,
    StructUpdateInterface
} from "@/shared/interfaces";
import {addStruct, changeActiveDroitStruct, changeActiveStruct, fetchAllStruct, updateStruct} from "@/shared/services";
import {DEFAULT_FILTER, type FilterUpdate} from "@/shared/interfaces";
import {useUserStore} from "@/stores/userStore";


interface StructStoreInterface{
    struct : StructInterface[],
    filters: FilterInterface,
    needRefresh: boolean
}

export const useStructStore = defineStore("structStore",{
    state: ():StructStoreInterface =>({
        struct : [],
        filters: {... DEFAULT_FILTER},
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
            this.struct = await fetchAllStruct();
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
            const response = await addStruct(formValues);
            if (response){
                this.struct.push(response)
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
        async changeDroitActive(struct_id:number, gestion_name:string,gestion_active:number){
            const editDroitStruct = await changeActiveDroitStruct(struct_id, gestion_name, gestion_active)
            if (editDroitStruct){
                this.needRefresh = true
            }
        },
        async updateStruct(struct_id: number, formValues: StructUpdateInterface){
            const response = await updateStruct(struct_id, formValues)
            if (response){
                this.needRefresh =true
                const structIndex = this.struct.findIndex(e => e.id === struct_id)
                this.struct[structIndex] = response
            }
            return response
        }
    }
})

export function initialFetchStruct(){
    const structStore = useStructStore()
    if (structStore.needRefresh){
        structStore.struct = []
        structStore.needRefresh = false
    }
    structStore.fetchStruct()
}