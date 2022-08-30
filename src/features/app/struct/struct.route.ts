import type {RouteRecordRaw} from "vue-router";
import {initialFetchStruct} from "@/stores/structStore";
import {notAdminGuardStruct} from "@/shared/guards/auth.guard";


export const STRUCT_ROUTE: RouteRecordRaw[] = [
    {
        path: "",
        redirect: "/app/struct/list"
    },
    {
        path: "list",
        name: "listStruct",
        beforeEnter: [initialFetchStruct],
        component: () => import('@/features/app/struct/views/StructList.vue')
    },
    {
        path:"add",
        name: "addStruct",
        beforeEnter: [notAdminGuardStruct, initialFetchStruct],
        component: () => import("@/features/app/struct/views/StructAdd.vue")
    },
    {
        path: "update/:struct_id",
        name: "updateStruct",
        beforeEnter: [notAdminGuardStruct, initialFetchStruct],
        component: () => import("@/features/app/struct/views/StructUpdate.vue")
    },
    {
        path: "detail/:struct_id",
        name: "detailStruct",
        component: () => import("@/features/app/struct/views/StructDetail.vue")
    }
]