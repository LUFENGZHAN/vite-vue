import {App} from 'vue';
const modules: Record<string, { default: any }> = import.meta.glob('./*.vue', { eager: true });
const components = Object.keys(modules)
export default {
    // 公共组件
    install(app: App<Element>) {
        components.forEach(key => {
            const name = key.replace(/^\.\/(.*)\.\w+$/, '$1');
            const component = modules[key].default;

            // 注册全局组件
            app.component(name, component);
        });
    },
}