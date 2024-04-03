import VueRouter from 'vue-router'

const routes = []

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes:routes
})
router.beforeEach((to, from, next) => {
    console.log(to,from);
    try {
        next()
    } catch (error) {
        throw error
    }
})
export default router