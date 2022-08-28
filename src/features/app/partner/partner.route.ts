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
        name: "addpartner",
        component: () => import("@/features/app/partner/views/PartnerAdd.vue")
    },
    {
        path: "update",
        name: "updatepartner",
        component: () => import("@/features/app/partner/views/PartnerUpdate.vue")
    },
    {
        path:"detail/:partner_id",
        name: "detail",
        component: () => import('@/features/app/partner/views/PartnerDetail.vue')
    }
]