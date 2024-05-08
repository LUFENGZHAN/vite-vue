export default {
    login(data:any){  
        return window.request({
            url:'/auth/login',
            method:'post',
            isFormDate:true,
            data
        })
    }
}