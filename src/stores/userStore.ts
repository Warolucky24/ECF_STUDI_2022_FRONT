import {defineStore} from "pinia";
import type {User, UserConnectInterface} from "@/shared/interfaces";
import {connectUser, deletePartnerOrStructService, updateUser} from "@/shared/services";
import {usePartnerStore} from "@/stores/partnerStore";
import {useStructStore} from "@/stores/structStore";

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
            return await updateUser(this.currentUser.email, password, "password");
        },
        async updateName(email:string, name: string){
            return await updateUser(email, name, "user_name");
        },
        async updateActive(email: string, gestion_active:number){
            return await updateUser(email, gestion_active, "user_active")
        },
        async deletePartnerOrStruct(id : number, type:string){
            const response = deletePartnerOrStructService(id, type);
            if (type === "partner"){
                const partnerStore = usePartnerStore()
                const partnerIndex = partnerStore.partner.findIndex(p => p.id === id)
                if (partnerIndex !== -1){
                    partnerStore.partner.splice(partnerIndex, 1)
                    partnerStore.needRefresh = true
                }
            }else{
                const structStore = useStructStore()
                const structIndex = structStore.struct.findIndex(s => s.id === id)
                if (structIndex !== -1){
                    structStore.struct.splice(structIndex, 1)
                    structStore.needRefresh = true
                }
            }
        }
    }

})
