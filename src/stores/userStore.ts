import {defineStore} from "pinia";
import type {UserConnectInterface, User} from "@/shared/interfaces";
import {connectUser} from "@/shared/services";



interface UserStoreInterface{
    isConnected : boolean,
    currentUser: User,
    error: any
}

export const useUserStore = defineStore("userStore", {
    state: (): UserStoreInterface => ({
        isConnected: false,
        currentUser: {
            id: 0,
            email: "none",
            first_connect: false,
            is_admin: true,
            user_active: true,
            user_name: "none"
        },
        error: null
    }),
    getters: {

    },
    actions: {
        sendMsg(msg: string){
            this.error = msg
            setTimeout(()=> {
                this.error = null
            },3000)
        },
        goConnect: async function (formConnect: UserConnectInterface) {
            try {
                this.error = null
                this.currentUser = await connectUser(formConnect);
                this.error = null;
                this.isConnected = true
            } catch (e) {
                this.isConnected = false
                // @ts-ignore
                this.sendMsg(e.error)

            }
        }
    }

})
