import type {RouteRecordRaw} from "vue-router";
import {initialFetchPartner} from "@/stores/partnerStore";

export const PARTNER_ROUTE: RouteRecordRaw[] = [
    {
        path: "",
        redirect : "/app/partner/list"
    },
    {
        path: "list",
        beforeEnter: [initialFetchPartner],
        component: () => import("@/features/app/partner/views/PartnerList.vue")
    },
    {
        path: "add",
        component: () => import("@/features/app/partner/views/PartnerAdd.vue")
    },
    {
        path: "update",
        component: () => import("@/features/app/partner/views/PartnerUpdate.vue")
    }
]