export default {
    as(){
        return request('/user', {
            method: 'GET',
            headers: {
                'Authorization': `token`
            }
        })
    }
}