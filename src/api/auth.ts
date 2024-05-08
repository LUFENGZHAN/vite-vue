export default {
    login(data:any){  
        return window.request({
            url:'/auth/login',
            method:'post',
            isEncrypt:true,
            data
        })
    }
}