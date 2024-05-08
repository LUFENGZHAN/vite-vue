import axios, { AxiosRequestConfig } from 'axios'
import type { App } from 'vue'
import requestConfig from '@/config'
import { encrypt, decrypt,debounce } from 'pu-utilsjs'
import { useRouter } from 'vue-router'
const options = {
	tokenField: 'Authorization',
	defaultMessage: '接口调用错误，请重试',
	messageField: ['errorMsg', 'msg', 'message'],
	codeField: 'code',
	successCode: [0, 200],
	key: 'itheimaNo1.^_^',
}
const axiosCreate = axios.create({ baseURL: import.meta.env.VITE_API, timeout: 15000 })

axiosCreate.interceptors.request.use(
	config => {
		if (!$store.piniaToken.information_auth) {
			const session = requestConfig.sessionStorage ? sessionStorage : localStorage
			$store.piniaToken.information_auth = session.getItem(requestConfig.tokenField) || ''
		}
		if ($store.piniaToken.information_auth && config.headers) {
			config.headers[options.tokenField] = $store.piniaToken.information_auth
		}
		if (config.isFormData && !(config.data instanceof FormData)) {
			// 处理formdata
			const fromDate = new FormData()
			for (const [key, value] of Object.entries(config.data)) {
				fromDate.append(key, value as string)
			}
			config.data = fromDate
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
		}
		if (config.isEncrypt && config.data) {
			const key = encrypt(config.data, options.key).value
			config.data.p_data = key
            for (let key in config.data) {
				if (key !== 'p_data') {
                    delete config.data[key]
                }
			}
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)
const requestMsg = debounce((message: string) =>$message.error(message), 500 )
axiosCreate.interceptors.response.use(
	config => {
		if (config.data.key) {
			config.data.data = decrypt(config.data.key, options.key)
		}
		if (options.successCode.includes(config.data[options.codeField])) {
			return config.data
		} else {
			for (const key of options.messageField) {
				if (config.data[key]) {
                    requestMsg(config.data[key])
                    break
				}
			}
			if (config.data[options.codeField] === 401) {
				const router = useRouter()
				const session = requestConfig.sessionStorage ? sessionStorage : localStorage
				session.clear()
				$store.piniaToken.information_auth = ''
				router.push('/login')
			}
			return Promise.reject(config.data)
		}
	},
	error => {
        requestMsg(options.defaultMessage)
		return Promise.reject(error)
	}
)
const request = (config: AxiosRequestConfig, Loading = true) => {
    if (Loading) {
        $store.piniaToken.setRequests(config.url)
    }
	return axiosCreate.request(config).finally(() => {
		$store.piniaToken.removeRequests()
    })
}
request.get = (url: string, params?: any, config?: AxiosRequestConfig) => {
	return request({ ...config, url, method: 'get', params })
}
request.post = (url: string, data?: any, config?: AxiosRequestConfig) => {
	return request({ ...config, url, method: 'post', data })
}
request.put = (url: string, data?: any, config?: AxiosRequestConfig) => {
	return request({ ...config, url, method: 'put', data })
}
request.delete = (url: string, data?: any, config?: AxiosRequestConfig) => {
	return request({ ...config, url, method: 'delete', data })
}
request.install = (app: App<Element>) => {
	app.config.globalProperties.request = request
	window.request = request
}

declare module 'axios' {
	interface AxiosRequestConfig {
		isFormData?: boolean
		isEncrypt?: boolean
	}
	interface AxiosResponse<T> {
		code: number
		data: T
		message?: string
		msg?: string
	}
}
declare global {
	interface Window {
		request: typeof request
	}
}
export default request
