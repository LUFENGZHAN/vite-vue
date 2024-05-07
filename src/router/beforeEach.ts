import router from './index';
import config from '@/config';
import { setRouters, state } from './setRouters';
// 添加beforeEach钩子，用于打印路径和来源路径
router.beforeEach(async (to, from, next) => {
	try {
		if (to.meta?.title) document.title = to.meta.title;
        $store.piniaRouters.setActive(to.path as string || '');
        const is_login = config.loginRoute.includes(to.name as string || '');
		if (config.needLogin) {
			if (!$store.piniaToken.information_auth) {
				const session = config.sessionStorage ? sessionStorage : localStorage;
				$store.piniaToken.information_auth = session.getItem(config.tokenField) || '';
			}
            if (!$store.piniaToken.information_auth && !is_login) {
			    return next({ name: 'login' });   
            }
		}
        if (state.First_login && !is_login) {
			await setRouters(config.remote);
            next({...to, replace: true});
		}else next();
	} catch (error) {
		throw next({ path: '/error' });
	}
});
