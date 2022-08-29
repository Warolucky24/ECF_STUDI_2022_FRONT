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

export function notAdminGuard(){
    const userStore = useUserStore()
    if (!userStore.currentUser.is_admin){
        return "/app/struct"
    }


}