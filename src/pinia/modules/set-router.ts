import {defineStore} from 'pinia';
import {RouteRecordRaw} from 'vue-router';
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
		setToken(router: RouteRecordRaw[]) {
			this.routes = router;
		},
	},
});

export default useRouters;
