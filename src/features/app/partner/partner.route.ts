import type {RouteRecordRaw} from "vue-router";
import {initialFetchPartner} from "@/stores/partnerStore";
import {notAdminGuardPartner} from "@/shared/guards/auth.guard";

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
        path: "add",
        name: "addPartner",
        beforeEnter: [notAdminGuardPartner, initialFetchPartner],
        component: () => import("@/features/app/partner/views/PartnerAdd.vue")
    },
    {
        path: "update/:partner_id",
        name: "updatePartner",
        beforeEnter: [notAdminGuardPartner, initialFetchPartner],
        component: () => import("@/features/app/partner/views/PartnerUpdate.vue")
    },
    {
        path:"detail/:partner_id",
        name: "detailPartner",
        component: () => import('@/features/app/partner/views/PartnerDetail.vue')
    }
]