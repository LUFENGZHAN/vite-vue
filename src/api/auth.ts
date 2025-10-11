export default {
    login(data: any) {
        return window.request({
            url: '/auth/login',
            method: 'post',
            isEncrypt: true,
            data
        })
    },
    profile(data?: any) {
        return window.request({
            url: '/auth/profile',
            method: 'get',
            params: data
        })
    },
    logout() {
        return window.request({
            url: '/auth/logout',
            method: 'post',
        })
    },
    heartbeat() {
        return window.request({
            url: '/online/heartbeat',
            method: 'post',
        }, false)
    },
}