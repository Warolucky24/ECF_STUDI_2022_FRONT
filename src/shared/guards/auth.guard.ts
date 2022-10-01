import {useUserStore} from "@/stores/userStore";
import {connectUserWithJWT} from "@/shared/services";

export function isConnectGuard(){
    const userStore = useUserStore()
    if(!userStore.isConnected || !userStore.currentUser.user_active){
        return '/';
    }
}

export async function isNoConnectGuard(){
    const userStore = useUserStore()
    if (localStorage.user){
        const response = await connectUserWithJWT()
        if (response.status == 200){
            const res = await response.json()
            userStore.currentUser = res.user
            userStore.isConnected = true
        }else{
            localStorage.removeItem("user")
        }
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