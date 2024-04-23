import router from './index';
import config from '@/config';
import { setRouters, state } from './setRouters';
// 添加beforeEach钩子，用于打印路径和来源路径
router.beforeEach(async (to, from, next) => {
	try {
		if (state) {
			await setRouters(config.remote);
		}
		if (to.meta?.title) document.title = to.meta.title;
		if (config.needLogin) {
			if (!$store.settoken.information_auth) {
				const session = config.sessionStorage ? sessionStorage : localStorage;
				$store.settoken.information_auth = session.getItem('information_auth') || '';
			}
			if (!to.meta.requiresAuth && (config.loginRoute.includes(to.name as string) || !!$store.settoken.information_auth)) return next();
			else return next({ path: '/login' });
		} else next();
	} catch (error) {
		throw next({ path: '/error' });
	}
});
