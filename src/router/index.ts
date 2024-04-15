// 导入VueRouter和RouteRecordRaw
import {RouteRecordRaw,createRouter,createWebHashHistory} from "vue-router";

// 定义默认的路由
const routesDefault: RouteRecordRaw[] = [
    {
        // 路径
        path: "/login",
        // 路由名称
        name: "login",
        // meta数据，用于存储标题
        meta: {
            title: "登录",
        },
        // 组件
        component: () => import("@/components/login/index.vue"),
    },
    {
        // 路径
        path: "/",
        // 路由名称
        name: "index",
        // meta数据，用于存储标题
        meta: {
            title: "首页",
        },
        // 组件
        component: () => import("@/components/Layout/index.vue"),
    },
];

// 创建VueRouter实例
const router = createRouter({
    // 创建history实例
    history: createWebHashHistory(),
    // 路由配置
    routes: [...routesDefault],
});

// 添加beforeEach钩子，用于打印路径和来源路径
router.beforeEach((to, from, next) => {
    console.log(to, from);
    try {
        next();
    } catch (error) {
        throw error;
    }
});
// 声明模块vue-router
declare module "vue-router" {
    interface RouteMeta {
        title: string; // 页面标题
        hidden?: boolean; // 是否隐藏
        isFullPage?: boolean; // 是否全屏
        tagTitle?: String; // 标签页标题
        hiddenInTag?: boolean; // 是否在标签页中隐藏
    }
}
// 导出router实例
export default router;