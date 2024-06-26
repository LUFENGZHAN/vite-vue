export default {
	/** 是否使用远程路由 */
	remote: false,
	/**
	 * 系统是否需要登录
	 */
	needLogin: false,
    /**
     * token缓存名称
     */
    tokenField: 'information_auth',
	// 免登路由
	loginRoute: ['login', 'NotFound'],
	/**
	 * 本地缓存方式
	 */
	sessionStorage: true,
};
