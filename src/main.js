// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Commodity from './components/Commodity'
import Order from './components/Order'
import Vuex from 'vuex'
import {BusPlugin} from 'vux'
import { AjaxPlugin,LoadingPlugin,ToastPlugin   } from 'vux'
import AddCommondity from './components/AddCommondity'
import geturlpara from './util/MyUtil'
import MyInformation from './components/MyInformation';
import HttpUtil from './util/HttpUtil'


Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(BusPlugin)
Vue.use(AjaxPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)

Vue.prototype.$geturlpara = geturlpara
Vue.prototype.$httputil = HttpUtil

const routes = [{
  path: '/',
  component: Commodity
  },{
    path:'/order',
    component:Order
  },{
    path:'/addCommondity',
    component:AddCommondity
  },{
    path:'/myInformation',
    component:MyInformation
  }]

const router = new VueRouter({
  routes
})

const store = new Vuex.Store({}) // 这里你可能已经有其他 module

store.registerModule('vux', { // 名字自己定义
  state: {
    isLoading: false,
    snsUserInfo:{}
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateSnsUserInfo(state,payload){

      state.snsUserInfo = payload;
    },
    updateUsername(state,payload){
      state.snsUserInfo.username = payload.username;
    }
  }
})

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})
  next()
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
})


FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
