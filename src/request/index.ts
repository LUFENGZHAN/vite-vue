import axios, {isCancel, AxiosError,AxiosRequestConfig} from 'axios';
import type { App } from 'vue'
import requestConfig from '@/config';

const options = {
    tokenField: 'Authorization',
    defaultMessage: '接口调用时遇到错误，请重试',
    messageField: ['errorMsg', 'msg', 'message'],
    codeField: 'code',
    successCode: [0,200],
}
const axiosCreate = axios.create({ baseURL: import.meta.env.VITE_API, timeout: 15000 });

const request = (config:AxiosRequestConfig,Loading = true )=>{
    console.log(config,'config');
    axiosCreate.interceptors.request.use(
        (config) => {
            if (!$store.piniaToken.information_auth) {
                const session = requestConfig.sessionStorage ? sessionStorage : localStorage;
                $store.piniaToken.information_auth = session.getItem(requestConfig.tokenField) || '';
            }
            if ($store.piniaToken.information_auth && config.headers) {
                config.headers[options.tokenField] = $store.piniaToken.information_auth
            }
           if (config.isFormDate && config.data) {
            const fromDate = new FormData();
            for(const [key,value] of Object.entries(config.data)){
                fromDate.append(key,value as string)
            }
            config.data = fromDate;
           }
            return config;
        },
    )
    axiosCreate.interceptors.response.use(
        (config) =>{         
            if (options.successCode.includes(config.data[options.codeField])) {
                return config.data 
            } else {
                $message.error('接口错误')
                return Promise.reject(config.data)
            }
        }
    )
}
request.get = (url:string,params?:any,config?:AxiosRequestConfig)=>{
    return request({...config,url,method:'get',params})
}
request.post = (url:string,data?:any,config?:AxiosRequestConfig)=>{
    return request({...config,url,method:'post',data})
}
request.put = (url:string,data?:any,config?:AxiosRequestConfig)=>{
    return request({...config,url,method:'put',data})
}
request.delete = (url:string,data?:any,config?:AxiosRequestConfig)=>{
    return request({...config,url,method:'delete',data})
}
request.install = (app: App<Element>)=>{
    app.config.globalProperties.request = request
    window.request = request
}
declare module 'axios' {
	interface AxiosRequestConfig {
        isFormDate?: boolean;
	}
    interface AxiosResponse<T> {
        code: number;
        data: T;
        message: string;
    }
}
declare global {
    interface Window {
        request: typeof request
    }
}
export default request