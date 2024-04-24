import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
export const useRouters = defineStore('setRouter', {
	state: () => {
		return {
			routes: [] as RouteRecordRaw[], // 路由
            flatten: [] as RouteRecordRaw[], // 扁平化路由
			tab: [] as any[], // 标签
		};
	},
	getters: {
		routesing(state) {
			return state.routes.length > 0;
		},
        getMenuSiderList(state){
            return state.routes
        }
	},
	actions: {
		setRoutes(router: RouteRecordRaw[]) {
			this.routes = router;
		},
		setFlatten(router: RouteRecordRaw[]) {
			this.flatten = router;
		},
		setTab(tab: any[]) {
			this.tab = tab;
		},
	},
});

export default useRouters;
