import {defineStore} from "pinia";
import type {UserConnectInterface, User} from "@/shared/interfaces";
import {updateUser, connectUser, fetchAllUsers} from "@/shared/services";
import {usePartnerStore} from "@/stores/partnerStore";

export type Style = "danger" | "success" | "warning"

interface UserStoreInterface{
    isConnected : boolean,
    currentUser: User,
    error: any,
    style: Style
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
            user_name: "none",
        },
        error: null,
        style: "danger",
    }),
    getters: {

    },
    actions: {
        sendMsg(msg: string, style : Style){
            this.error = msg
            this.style = style
            setTimeout(()=> {
                this.error = null
            },4000)
        },
        goConnect: async function (formConnect: UserConnectInterface) {
            try {
                this.error = null
                this.currentUser = await connectUser(formConnect);
                this.error = null;
                this.isConnected = true
                this.sendMsg("Vous êtes connecté", "success")
            } catch (e) {
                this.isConnected = false
                // @ts-ignore
                this.sendMsg(e.error, "danger")

            }
        },
        async updatePassword(password: string){
            const response = await updateUser(this.currentUser.email,password, "password");
            return response;
        },
        async updateName(email:string, name: string){
            const response = await updateUser(email, name, "user_name");
            return response;
        }
    }

})
