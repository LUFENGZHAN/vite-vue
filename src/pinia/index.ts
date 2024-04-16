import {defineStore} from 'pinia';
import {RouteRecordRaw} from 'vue-router';
import {App} from 'vue';
import config from '@/config';
export const useStore = defineStore('store', {
	state: () => {
		return {
			information: {}, // 用户信息
			information_auth: '', // 用户token
			routes: [] as RouteRecordRaw[], // 用户权限
			requests: [] as any[], // 请求列表
		};
	},
	getters: {
		loading(state) {
			return state.requests.length > 0;
		},
	},
	actions: {
		setToken(token: string) {
			this.information_auth = token;
			const session = config.sessionStorage ? sessionStorage : localStorage;
			if (!token) {
				this.information_auth = '';
				session.removeItem('information_auth');
			}
			session.setItem('information_auth', token);
		},
		setuserInfo(userInfo: any) {
			this.information = userInfo;
			const session = config.sessionStorage ? sessionStorage : localStorage;
			if (!userInfo) {
				this.information = {};
				session.removeItem('information');
			}
			session.setItem('information', userInfo);
		},
	},
});

export default {
	install(app: App<Element>) {
		// 使用app.use函数引入pinia
		app.use(createPinia());
		app.config.globalProperties.$store = useStore();
		window.$store = useStore();
	},
};

declare global {
	const $store: ReturnType<typeof useStore>;
	interface Window {
		$store: ReturnType<typeof useStore>;
	}
}
