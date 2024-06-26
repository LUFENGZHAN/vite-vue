import {App} from 'vue';
import piniaRouters from './modules/pinia-router';
import piniaToken from './modules/pinia-token';
import {createPinia} from 'pinia';
const getStore = () => {
	return {
		piniaRouters: piniaRouters(),
		piniaToken: piniaToken(),
	};
};
export default {
	install(app: App<Element>) {
		// 使用app.use函数引入pinia
		app.use(createPinia());
		const store = getStore();
		app.config.globalProperties.$store = store;
		window.$store = store;
	},
};

declare global {
	const $store: ReturnType<typeof getStore>;
	interface Window {
		$store: ReturnType<typeof getStore>;
	}
}
