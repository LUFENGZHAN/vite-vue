export default {
    list(data?: any) {
        return window.request({
            url: '/online/list',
            method: 'get',
            params: data
        })
    },

}