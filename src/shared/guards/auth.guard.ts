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
        try {
            const response = await connectUserWithJWT()
            userStore.isConnected = true
            userStore.currentUser = response.user
        }catch (e){


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