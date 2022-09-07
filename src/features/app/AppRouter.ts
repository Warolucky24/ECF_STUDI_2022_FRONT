import type {RouteRecordRaw} from "vue-router";
import {PARTNER_ROUTE} from "@/features/app/partner/partner.route";
import {STRUCT_ROUTE} from "@/features/app/struct/struct.route";

export const APP_ROUTES: RouteRecordRaw[] = [
    {
        path: "",
        redirect : "/app/profil"
    },
    {
        path: "profil",
        component: () => import('@/features/app/views/ProfilView.vue'),
        meta:{
            page: "profil"
        }
    },
    {
        path: "partner",
        component: () => import('@/features/app/partner/PartnerView.vue'),
        children: PARTNER_ROUTE,
        meta: {
            page: "partner"
        }
    },
    {
        path: "struct",
        component: () => import('@/features/app/struct/StructView.vue'),
        children: STRUCT_ROUTE,
        meta: {
            page: "struct"
        }
    }
]