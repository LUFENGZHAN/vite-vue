// 引入App.vue组件
import App from './App.vue';
// 引入createApp函数
import { createApp } from 'vue';
// 使用createApp函数创建app
const app = createApp(App);
import '@/assets/less/index.less';
import request from './request';
app.use(request);
import pinia from './pinia';
// 使用app.use函数引入pinia
app.use(pinia);


import utils from './utils';
app.use(utils);

import '@/router/beforeEach';
import router from './router';
app.use(router);

// 引入naive-ui
import naive from 'naive-ui';
// 使用app.use函数引入naive-ui
app.use(naive);
import directive from 'vuejs-directive'
app.use(directive);
// 引入自定义组件
import common from '@/components/common';
app.use(common);

import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import 'virtual:uno.css';
app.use(ElementPlus)
// 挂载app
app.mount('#app');
