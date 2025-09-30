import { RouteRecordRaw } from 'vue-router';
const routes: Array<RouteRecordRaw> = [
	{
		path: 'system',
		name: 'system',
		meta: {
			title: '系统管理',
		},
        redirect: '/system/interface',
		children: [
			{
				path: 'interface',
				name: 'interface',
				meta: {
					title: '接口管理',
                    keepAlive:true,
                    permissions:['add','edit','delete']
				},
				component: () => import('@/views/system/interface/index.vue'),
			},
			{
				path: 'menu',
				name: 'menu',
				meta: {
					title: '菜单管理',
                    keepAlive:true,
                    permissions:['add','edit','delete']

				},
				component: () => import('@/views/system/menus/index.vue'),
			},
			{
				path: 'role',
				name: 'role',
				meta: {
					title: '角色管理',
                    permissions:['add','edit','delete']

				},
				component: () => import('@/views/system/roles/index.vue'),
			},
			{
				path: 'user',
				name: 'user',
				meta: {
					title: '用户管理',
                    permissions:['add','edit','delete']
				},
				component: () => import('@/views/system/users/index.vue'),
			},
		],
	},
];
export default routes;
