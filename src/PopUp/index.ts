import { DialogOptions, createDiscreteApi, NConfigProvider, DialogReactive } from 'naive-ui';
import { h, defineAsyncComponent } from 'vue';
import { zhCN, dateZhCN } from 'naive-ui';
import './dialog.less';
const { dialog } = createDiscreteApi(['dialog']);
// 弹窗

interface propsType {
	[key: string]: any;
}

interface DialogOptionsTpye extends DialogOptions {
	content: any;
	width?: string;
	height?: number;
	props?: propsType;
}
class popup {
	private dialogClose: Array<DialogReactive> = [];
	private maxHeight: number = 650;
	open(options: DialogOptionsTpye) {
		const dialogApp = dialog.create({
			showIcon: false,
			...options,
			title: options.title ? options.title : '弹窗',
			action: () => {
				return h(
					'div',
					{
						class: 'dialog_footer',
					},
					() => [h('div', {})]
				);
			},
			style: {
				width: options.width ? options.width : 'auto',
			},
			class: 'n-popup',
			content: () =>
				typeof options.content === 'object'
					? h(
							NConfigProvider,
							{
								locale: zhCN,
								dateLocale: dateZhCN,
							},
							() => [
								h(
									defineAsyncComponent({
										loader: () => options.content,
									}),
									{
										...options.props,
										style: {
											maxHeight: `${options.height && options.height > this.maxHeight ? options.height : this.maxHeight}px`,
										},
										class: 'dialog_content',
									}
								),
							]
					  )
					: options.content,
		});
		this.dialogClose.push(dialogApp);
		return dialogApp;
	}
	close() {
		const dialog = this.dialogClose.pop();
		setTimeout(() => {
			dialog?.destroy();
		}, 100);
	}
	closeAll() {
		while (this.dialogClose.length) {
			this.close();
		}
	}
}

export default new popup();
