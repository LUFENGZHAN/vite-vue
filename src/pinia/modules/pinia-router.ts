import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import type { MenuOption } from 'naive-ui';

export const useRouters = defineStore('setRouter', {
	state: () => {
		return {
			routes: [] as RouteRecordRaw[], // 路由
            flatten: [] as RouteRecordRaw[], // 扁平化路由
			tab: [] as any[], // 标签
            active:'' as string,
		};
	},
	getters: {
		routesing(state) {
			return state.routes.length > 0;
		},
	},
	actions: {
        setActive(active:string){
            this.active = active
        },
        getMenuSiderList(){
            return this.MenuSiderLists(this.routes)
        },
        MenuSiderLists(routes:RouteRecordRaw[]):MenuOption[]{
            return routes.map((item:RouteRecordRaw)=>{
                const label = item.meta?.title || item.meta?.tagTitle || '' as string
                return {
                    label,
                    key:item.path,
                    name:item.name,
                    children:item.children ? this.MenuSiderLists(item.children) : void 0
                }
            })
        },
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
