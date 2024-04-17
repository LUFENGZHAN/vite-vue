// 导入VueRouter和RouteRecordRaw
import {RouteRecordRaw, createRouter, createWebHashHistory} from 'vue-router';
/**
 * 动态路由
 */
export let asyncRoutes: RouteRecordRaw[] = [];

/**
 * 添加整个文件夹的 modules
 */
const modules: Record<string, {default: RouteRecordRaw[]}> = import.meta.glob('./modules/*.ts', {eager: true});
const _modules = Object.keys(modules).map((v) =>
	modules[v].default.map((a) => ({
		...a,
		nameNumber: parseInt(v.replace('./modules/', '').split('-')[0]),
	}))
);
console.log(_modules);

// 定义默认的路由
const routesDefault: RouteRecordRaw[] = [
	{
		// 路径
		path: '/login',
		// 路由名称
		name: 'login',
		// meta数据，用于存储标题
		meta: {
			title: '登录',
			hiddenInTag: true,
			requiresAuth: false,
			isFullPage: true,
		},
		// 组件
		component: () => import('@/components/login/index.vue'),
	},
	{
		// 路径
		path: '/:pathMatch(.*)*',
		// 路由名称
		name: 'NotFound',
		// meta数据，用于存储标题
		meta: {
			title: '404',
			hiddenInTag: true,
			isFullPage: true,
			requiresAuth: false,
		},
		// 组件
		component: () => import('@/components/NotFound/index.vue'),
	},
	{
		// 路径
		path: '/',
		// 路由名称
		name: 'index',
		// 组件
		component: () => import('@/components/Layout/index.vue'),
		redirect: '/home',
		children: [
			{
				// 路径
				path: '/home',
				// 路由名称
				name: 'home',
				// meta数据，用于存储标题
				meta: {
					title: '首页',
					hiddenInTag: true,
				},
				// 组件
				component: () => import('@/views/home/index.vue'),
			},
		],
	},
];

// 创建VueRouter实例
const router = createRouter({
	// 创建history实例
	history: createWebHashHistory(),
	// 路由配置
	routes: [...routesDefault],
});
// 声明模块vue-router
declare module 'vue-router' {
	interface RouteMeta {
		keepAlive?: boolean; //是否保持 alive 状态
		title?: string; // 页面标题
		hidden?: boolean; // 是否隐藏
		isFullPage?: boolean; // 是否全屏
		tagTitle?: String; // 标签页标题
		hiddenInTag?: boolean; // 是否在标签页中隐藏
		requiresAuth?: boolean; // 是否需要登录
	}
}
// 导出router实例
export default router;
