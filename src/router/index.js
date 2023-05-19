import { createRouter, createWebHistory } from "vue-router"

import BaseMaterial from "@/components/form/BaseMaterial.vue"
import BaseMaterialCategory from "@/components/form/BaseMaterialCategory.vue"
import BaseStock from "@/components/form/BaseStock.vue"
import BaseUnit from "@/components/form/BaseUnit.vue"


const routes = [
    { path: '/', component: BaseMaterial },
    { path: '/material', component: BaseMaterial },
    { path: '/materialCategory', component: BaseMaterialCategory },
    { path: '/stock', component: BaseStock },
    { path: '/unit', component: BaseUnit },
    {
        path: '/:catchAll(.*)',
        component: Error
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router