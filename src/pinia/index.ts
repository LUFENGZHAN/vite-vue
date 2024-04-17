import {App} from 'vue';
import setRouters from './modules/set-router';
import settoken from './modules/set-token';
import {createPinia} from 'pinia';
const getStore = () => {
	return {
		returnRouters: setRouters(),
		settoken: settoken(),
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
