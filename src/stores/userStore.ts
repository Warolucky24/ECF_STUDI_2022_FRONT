import {defineStore} from "pinia";
import type {UserConnectInterface, User} from "@/shared/interfaces";
import {connectUser} from "@/shared/services";



interface UserStoreInterface{
    isConnected : boolean,
    currentUser: User | null,
    error: any
}

export const useUserStore = defineStore("userStore", {
    state: (): UserStoreInterface => ({
        isConnected: false,
        currentUser: null,
        error: null
    }),
    getters: {

    },
    actions: {
        async goConnect(formConnect: UserConnectInterface){
            try {
                this.currentUser = await connectUser(formConnect);
                this.error= null;
                this.isConnected = true
            }catch (e){
                this.isConnected = false
                this.error = e;
                setTimeout(()=> {
                    this.error = null
                },3000)
            }
        }
    }

})
