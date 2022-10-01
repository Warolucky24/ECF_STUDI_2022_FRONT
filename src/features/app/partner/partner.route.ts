import type {RouteRecordRaw} from "vue-router";
import {initialFetchPartner} from "@/stores/partnerStore";
import {tokenExpired} from "@/shared/guards/auth.guard";

export const PARTNER_ROUTE: RouteRecordRaw[] = [
    {
        path: "",
        redirect : "/app/partner/list"
    },
    {
        path: "list",
        name: "listPartner",
        beforeEnter: [initialFetchPartner, tokenExpired],
        component: () => import("@/features/app/partner/views/PartnerList.vue")
    },
    {
        path:"detail/:partner_id",
        beforeEnter: [tokenExpired],
        name: "detailPartner",
        component: () => import('@/features/app/partner/views/PartnerDetail.vue')
    }
]