import {App} from 'vue';
import {createDiscreteApi} from 'naive-ui';
import utils from './common';
import popup from '@/PopUp';
const {message, dialog} = createDiscreteApi(['message', 'dialog']);
declare global {
	const $message: typeof message;
	const $dialog: typeof dialog;
	const $utils: typeof utils;
    const $alert: typeof popup;
	interface Window {
		// 定义全局变量
		$message: typeof message;
		$dialog: typeof dialog;
		$utils: typeof utils;
        $alert: typeof popup;
	}
}
export default {
	install(app: App<Element>) {
		// 定义全局方法
		app.config.globalProperties.$message = message;
		app.config.globalProperties.$dialog = dialog;
		app.config.globalProperties.$utils = utils;
		app.config.globalProperties.$alert = popup;
		window.$message = message;
		window.$dialog = dialog;
		window.$alert = popup;
		window.$utils = utils;
	},
};
