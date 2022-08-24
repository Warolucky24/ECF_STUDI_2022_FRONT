import type {RouteRecordRaw} from "vue-router";
import {PARTNER_ROUTE} from "@/features/app/partner/partner.route";

export const APP_ROUTES: RouteRecordRaw[] = [
    {
        path: "",
        redirect : "/app/profil"
    },
    {
        path: "profil",
        component: () => import('@/features/app/views/profilView.vue'),
        meta:{
            page: "profil"
        }
    },
    {
        path: "partner",
        component: () => import('@/features/app/partner/partnerView.vue'),
        children: PARTNER_ROUTE,
        meta: {
            page: "partner"
        }
    },
    {
        path: "struct",
        component: () => import('@/features/app/struct/structView.vue'),
        meta: {
            page: "struct"
        }
    }
]