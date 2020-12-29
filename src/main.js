import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import i18n from './lang'
import './../public/main.css';

import api from './api'
Vue.prototype.$api = api

import dayjs from 'dayjs'
Vue.prototype.$dayjs = dayjs

import auth from './util/auth'
Vue.use(auth)

import tabbar from './util/tabbar'
Vue.use(tabbar)

import cookies from 'vue-cookies'
Vue.use(cookies)

import meta from 'vue-meta'
Vue.use(meta)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.prototype.$ELEMENT = ElementUI
Vue.use(ElementUI, {
    size: store.state.settings.elementSize,
    i18n: (key, value) => i18n.t(key, value)
});

import hotkeys from 'hotkeys-js';
Vue.prototype.$hotkeys = hotkeys;

import Contextmenu from 'vue-contextmenujs'
Vue.use(Contextmenu)
import Viewer from 'v-viewer';
Vue.use(Viewer);
Viewer.setDefaults({
  zIndexInline: 9999
});

// 全局组件自动注册
import './components/autoRegister'

// 自动加载 svg 图标
const req = require.context('./assets/icons', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

import 'remixicon/fonts/remixicon.css'

import './assets/styles/reset.scss'

// 错误日志
import './util/error.log'

import './mock'
import BaiduMap from 'vue-baidu-map';
Vue.use(BaiduMap, {
    ak: 'A4oMBLHn6P3dNgsxz9XxrPxdQAFr7url'
  });

Vue.config.productionTip = false

Vue.prototype.$eventBus = new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
