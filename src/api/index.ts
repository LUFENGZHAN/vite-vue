/*eslint-disable*/
// @ts-ignore 
import {App} from "vue";
// @ts-ignore
import auth from '@/api/auth'


export const $apiDate = {
    auth: auth
};

// @ts-ignore
export const import_auth = auth

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
    },
}
