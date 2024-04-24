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
				},
				component: () => import('@/views/system/interface-management.vue'),
                children: [
                    {
                        path: 'interface',
                        name: 'interface1',
                        meta: {
                            title: '接口管理1',
                        },
                        component: () => import('@/views/system/interface-management.vue'),
                    },
                ],
			},
			{
				path: 'menu',
				name: 'menu',
				meta: {
					title: '菜单管理',
				},
				component: () => import('@/views/system/menu-management.vue'),
			},
			{
				path: 'role',
				name: 'role',
				meta: {
					title: '角色管理',
				},
				component: () => import('@/views/system/role-management.vue'),
			},
			{
				path: 'user',
				name: 'user',
				meta: {
					title: '用户管理',
				},
				component: () => import('@/views/system/user-management.vue'),
			},
		],
	},
];
export default routes;
