import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
export const useRouters = defineStore('setRouter', {
	state: () => {
		return {
			routes: [] as RouteRecordRaw[], // 用户权限
			tab: [] as any[], // 标签
		};
	},
	getters: {
		routesing(state) {
			return state.routes.length > 0;
		},
	},
	actions: {
		setRoutes(router: RouteRecordRaw[]) {
			console.log(router);
			this.routes = router;
		},
		setTab(tab: any[]) {
			this.tab = tab;
		},
	},
});

export default useRouters;
