import {defineStore} from 'pinia';
import {RouteRecordRaw} from 'vue-router';
import config from '@/config';
export const useToken = defineStore('token', {
	state: () => {
		return {
			information: {}, // 用户信息
			information_auth: '', // 用户token
			routes: [] as RouteRecordRaw[], // 用户权限
			requests: [] as any[], // 请求列表
		};
	},
	getters: {
		loading(state) {
			return state.requests.length > 0;
		},
	},
	actions: {
		setToken(token: string) {
			this.information_auth = token;
			const session = config.sessionStorage ? sessionStorage : localStorage;
			if (!token) {
				this.information_auth = '';
				session.removeItem(config.tokenField);
			}
			session.setItem(config.tokenField, token);
		},
		setuserInfo(userInfo: any) {
			this.information = userInfo;
			const session = config.sessionStorage ? sessionStorage : localStorage;
			if (!userInfo) {
				this.information = {};
				session.removeItem('information');
			}
			session.setItem('information', userInfo);
		},
        setRequests(requests: any){
            this.requests.push(requests)
        },
        removeRequests(){
            this.requests.pop()
        }
	},
});

export default useToken;
