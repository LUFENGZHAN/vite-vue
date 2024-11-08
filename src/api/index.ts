/*eslint-disable*/

// @ts-ignore 
import {App} from "vue";

// @ts-ignore
import auth from '@/api/auth'


export const $apiData = {
    auth: auth
};


declare global {
    const $apis:typeof $apiData;
    
    interface Window {
        $apis : typeof $apiData;
    }
    
}



export default {
    install(app:App<Element>){
        app.config.globalProperties.$apis = $apiData;
        
        window.$apis = $apiData;
        
    },
}

