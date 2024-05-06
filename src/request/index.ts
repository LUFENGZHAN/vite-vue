import axios from 'axios';
import requestConfig from '@/config';
const successCode = [0,200]
const common = axios.create({ baseURL: import.meta.env.VITE_API, timeout: 15000 });
common.interceptors.request.use(
    (config) => {
        const session = requestConfig.sessionStorage ? sessionStorage : localStorage;
        let token = session.getItem("information_auth")
        if (token && config.headers) {
            config.headers['Authentication'] = token
        }
        return config;
    },
)
common.interceptors.response.use(
    (config) =>{         
        if (successCode.includes(config.data.code)) {
            return config.data 
        } else {
            return $message.error('接口错误') 
        }
    }
)
declare global {
    const request: typeof common;
    interface Window {
        request: typeof common
    }
}
export default window.request=common;