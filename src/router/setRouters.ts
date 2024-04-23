import router, { asyncRoutes } from './index';
import { RouteRecordSingleViewWithChildren } from 'vue-router';
import useRouters from '@/pinia/modules/set-router';
export let state = true;
export const setRouters = async (is_login = false) => {
	const setRouter = useRouters();
	const rootconfig: RouteRecordSingleViewWithChildren = {
		// 路径
		path: '/',
		// 路由名称
		name: 'index',
		redirect: () => ({ name: asyncRoutes[0]?.name as string }),
		// 组件
		component: () => import('@/components/Layout/index.vue'),
		children: [],
	};
	setRouter.setRoutes(asyncRoutes);
	router.addRoute(rootconfig);
	router.addRoute('index', asyncRoutes[0]);
	state = false;
};
