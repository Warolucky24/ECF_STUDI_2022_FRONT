import type {RouteRecordRaw} from "vue-router";
import {initialFetchPartner} from "@/stores/partnerStore";

export const PARTNER_ROUTE: RouteRecordRaw[] = [
    {
        path: "",
        redirect : "/app/partner/list"
    },
    {
        path: "list",
        name: "listPartner",
        beforeEnter: [initialFetchPartner],
        component: () => import("@/features/app/partner/views/PartnerList.vue")
    },
    {
        path:"detail/:partner_id",
        name: "detailPartner",
        component: () => import('@/features/app/partner/views/PartnerDetail.vue')
    }
]