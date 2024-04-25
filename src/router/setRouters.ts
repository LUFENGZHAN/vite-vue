import router, { asyncRoutes, routesPathMatch } from './index';
import { RouteRecordSingleViewWithChildren,RouteRecordRaw } from 'vue-router';
import useRouters from '@/pinia/modules/pinia-router';
export let state = {
	First_login: true,
};
export const filterTree = (routes:RouteRecordRaw[]) =>{
    return routes.filter(v => v.meta && !v.meta.hidden ).map(v => {
        if (v.children) {
            v.children = filterTree(v.children);
        }
        return v;
    })
}
export const flatten = (arr: RouteRecordRaw[]) =>{
    let result:RouteRecordRaw[] = [];
    function flat(arr: RouteRecordRaw[],path?:string,breadcrumb = '') {
        arr.forEach((e:any) => {
            e.path = e.path.includes('/') ? e.path : '/' + e.path;
            const label = e.meta?.title || e.meta?.tagTitle || '' as string
            const newbreadcrumb = breadcrumb ? breadcrumb +'/' + label : label
            if (path) {
                e.path = path + e.path;
            }
            e.breadcrumb = newbreadcrumb;
            if (e.children) {
                flat(e.children,e.path,newbreadcrumb);
            } else {
                result.push(e);
            }
        });
    }
    flat(arr)
    return result;
};
export const setRouters = async (is_login = false) => {
	const setRouter = useRouters();
	const ArrFlatten = flatten(filterTree(asyncRoutes));
	const rootconfig: RouteRecordSingleViewWithChildren = {
		// 路径
		path: '/',
		// 路由名称
		name: 'index',
		redirect: () => ({ name: ArrFlatten[0]?.name as string }),
		// 组件
		component: () => import('@/components/Layout/index.vue'),
		children: [],
	};
	setRouter.setRoutes(filterTree(asyncRoutes));
	setRouter.setFlatten(ArrFlatten);
	router.addRoute(rootconfig);
	ArrFlatten.forEach((route:RouteRecordRaw) => {
		if (router.hasRoute(route.name || '')) {
			router.removeRoute(route.name || '');
		}
		router.addRoute('index', route);
	});
	routesPathMatch.forEach(e => router.addRoute(e));
	state.First_login = false;
};
