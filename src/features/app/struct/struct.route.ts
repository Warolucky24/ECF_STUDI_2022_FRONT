import type {RouteRecordRaw} from "vue-router";
import {initialFetchStruct} from "@/stores/structStore";
import {tokenExpired} from "@/shared/guards/auth.guard";

export const STRUCT_ROUTE: RouteRecordRaw[] = [
    {
        path: "",
        redirect: "/app/struct/list"
    },
    {
        path: "list",
        name: "listStruct",
        beforeEnter: [initialFetchStruct, tokenExpired],
        component: () => import('@/features/app/struct/views/StructList.vue')
    },
    {
        path: "detail/:struct_id",
        name: "detailStruct",
        beforeEnter: [tokenExpired],
        component: () => import("@/features/app/struct/views/StructDetail.vue")
    }
]