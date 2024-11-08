import {RouteRecordRaw} from 'vue-router';
const routes: Array<RouteRecordRaw> = [
	{
		path: 'home',
		name: 'home',
		component: () => import('@/views/home/index.vue'),
		meta: {
            title: '首页',
        },
	},
	{
		path: 'waterfall-flow',
		name: 'waterfall-flow',
		component: () => import('@/views/waterfall-flow/index.vue'),
		meta: {
            title: '大屏',
            isFullPage:true // 是否全屏
        },
	},
];
export default routes;
