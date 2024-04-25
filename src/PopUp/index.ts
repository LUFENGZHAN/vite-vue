import {DialogOptions,createDiscreteApi} from "naive-ui"
import {h,defineAsyncComponent} from "vue"
import './dialog.less'
const {dialog} = createDiscreteApi(['dialog']);
// 弹窗

interface propsType{
    [key:string]:any,
}

interface DialogOptionsTpye extends DialogOptions{
    content:any,
    width?:string,
    height?:number,
    props?:propsType,
}
class popup {
    private dialogClose:any;
    private maxHeight:number = 650;
    open(options:DialogOptionsTpye) {
        this.dialogClose = dialog.create({
            showIcon: false,
            ...options,
            style: {
                width: options.width ? options.width : 'auto',
            },
            class: 'n-popup',
            content: () => typeof options.content === 'object' ? h(
                defineAsyncComponent({
                    loader: () => import('@/components/Layout/component/info.vue'),
                }), {
                    ...options.props,
                    style: {
                        maxHeight:`${options.height && options.height > this.maxHeight ? options.height : this.maxHeight}px`,
                    },
                    class: 'dialog_content',
                }
            ) : options.content,
        });
    }
    close() {
        setTimeout(() => {
            console.log(this.dialogClose);
            this.dialogClose.destroy();
        }, 100);
    
    }
    closeAll() {
        setTimeout(() => {
            dialog.destroyAll();
            this.dialogClose = null;
        }, 100);
    }
}

export default new popup();