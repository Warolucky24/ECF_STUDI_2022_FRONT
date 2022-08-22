import {defineStore} from "pinia";
import type {UserInterface} from "@/shared/interfaces/UserInterface";
import {tableUser} from "@/data/user";

interface UserStoreInterface{
    isConnected : boolean,
    msg_error_auth : string | null
}


export const useUserStore = defineStore("userStore", {
    state: (): UserStoreInterface => ({
        isConnected: false,
        msg_error_auth : null
    }),
    getters: {

    },
    actions: {
        goConnect(formConnect: UserInterface){
            //requete post
            this.isConnected = true
            console.log(formConnect)
        }
    }

})
