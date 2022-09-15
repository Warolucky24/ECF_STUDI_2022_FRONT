import {useUserStore} from "@/stores/userStore";

export function isConnectGuard(){
    const userStore = useUserStore()
    if(!userStore.isConnected || !userStore.currentUser.user_active){
        return '/';
    }
}

export function isNoConnectGuard(){
    const userStore = useUserStore()
    if (localStorage.user){
        userStore.isConnected = true
        userStore.currentUser = JSON.parse(localStorage.user)
    }
    if(userStore.isConnected){
        return "/app"
    }
}

export function isAdminGuard(){
    const userStore = useUserStore()
    if (!userStore.currentUser.is_admin){
        return "/app"
    }
}