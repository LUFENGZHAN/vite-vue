// 引入App.vue组件
import App from './App.vue';
// 引入createApp函数
import {createApp} from 'vue';
// 使用createApp函数创建app
const app = createApp(App);

// 引入pinia
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

import '@/assets/less/index.less';

// 挂载app
app.mount('#app');
