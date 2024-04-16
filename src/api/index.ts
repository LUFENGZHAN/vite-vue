/*eslint-disable*/
// @ts-ignore 
import {App} from "vue";
// @ts-ignore
import auth_index from '@/api/auth/index'


export const $apiDate = {
    auth: {
        index: auth_index
    }
};

// @ts-ignore
export const import_auth_index = auth_index

declare global {
    const $apis:typeof $apiDate;
    interface Window {
        $apis : typeof $apiDate;
    }
}
export default {
    install(app:App<Element>){
        app.config.globalProperties.$apis = $apiDate;
        window.$apis = $apiDate;
    }
}
