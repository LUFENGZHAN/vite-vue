import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import config from '@/config';
import api from '@/api/auth';
interface useTokenType {
    userInfo: any | null; // 用户信息
    information_auth: string; // 用户token
    routes: RouteRecordRaw[]; // 用户权限
    requests: any[]; // 请求列表
}
export const useToken = defineStore('token', {
    state: (): useTokenType => {
        return {
            userInfo: null, // 用户信息
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
        async getInformation() {
            try {
                const res = await api.profile()
                const session = config.sessionStorage ? sessionStorage : localStorage;
                this.information_auth = res.data.id;
                this.userInfo = res.data;
                session.setItem(config.tokenField, res.data.id);
            } catch (error) {
                this.setToken('');
                this.userInfo = null;
            }

        },
        setRequests(requests: any) {
            this.requests.push(requests)
        },
        removeRequests() {
            this.requests.pop()
        }
    },
});

export default useToken;
