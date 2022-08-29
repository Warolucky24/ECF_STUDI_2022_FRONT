import {useUserStore} from "@/stores/userStore";

export function isConnectGuard(){
    const userStore = useUserStore()
    if(!userStore.isConnected){
        return '/';
    }
}

export function isNoConnectGuard(){
    const userStore = useUserStore()
    if(userStore.isConnected){
        return "/app"
    }
}

export function notAdminGuardPartner(){
    const userStore = useUserStore()
    if (!userStore.currentUser.is_admin){
        return "/app/profil"
    }
}

export function notAdminGuardStruct(){
    const userStore = useUserStore()
    if (!userStore.currentUser.is_admin){
        return "/app/profil"
    }
}