/*eslint-disable*/

// @ts-ignore 
import {App} from "vue";

// @ts-ignore
import auth from '@/api/auth'
// @ts-ignore
import online from '@/api/online'


export const $apiData = {
    auth: auth,
    online: online
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

