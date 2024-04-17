import {RouteRecordRaw} from 'vue-router';
const routes: Array<RouteRecordRaw> = [
	{
		path: '/system',
		name: 'system',
		component: () => import('@/views/home/index.vue'),
		meta: {},
	},
];
export default routes;
