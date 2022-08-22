import {defineStore} from "pinia";
import type {UserConnectInterface} from "@/shared/interfaces/UserInterface";

interface UserStoreInterface{
    isConnected : boolean
}


export const useUserStore = defineStore("userStore", {
    state: (): UserStoreInterface => ({
        isConnected: false
    }),
    getters: {

    },
    actions: {
        goConnect(formConnect: UserConnectInterface){
            //requete post
            this.isConnected = true
            console.log(formConnect)
        }
    }

})
