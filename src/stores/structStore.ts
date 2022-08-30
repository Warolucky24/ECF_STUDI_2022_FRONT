import {defineStore} from "pinia";
import type {StructAddInterface, StructInterface} from "@/shared/interfaces";
import {addStruct, changeActiveStruct, fetchAllStruct} from "@/shared/services";


interface StructStoreInterface{
    struct : StructInterface[],
    isLoading : boolean,
    loaded: boolean,
    needRefresh: boolean
}

export const useStructStore = defineStore("structStore",{
    state: ():StructStoreInterface =>({
        struct : [],
        isLoading : false,
        loaded: false,
        needRefresh : false
    }),
    getters: {
        filteredStruct(state){
            return state.struct
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