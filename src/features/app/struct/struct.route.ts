import type {RouteRecordRaw} from "vue-router";
import {initialFetchStruct} from "@/stores/structStore";

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
        path: "detail/:struct_id",
        name: "detailStruct",
        component: () => import("@/features/app/struct/views/StructDetail.vue")
    }
]