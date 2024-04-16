import {App} from 'vue';
import {createDiscreteApi} from 'naive-ui';
import utils from './common';
const {message, dialog} = createDiscreteApi(['message', 'dialog']);
declare global {
	const $message: typeof message;
	const $dialog: typeof dialog;
	const $utils: typeof utils;
	interface Window {
		// 定义全局变量
		$message: typeof message;
		$dialog: typeof dialog;
		$utils: typeof utils;
	}
}
export default {
	install(app: App<Element>) {
		// 定义全局方法
		app.config.globalProperties.$message = message;
		app.config.globalProperties.$dialog = dialog;
		app.config.globalProperties.$utils = utils;
		window.$message = message;
		window.$dialog = dialog;
		window.$utils = utils;
	},
};
