import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store';
import './api/mock';





Vue.config.productionTip = false
Vue.use(ElementUI);

// to: 即将要进入的目标 用一种标准化的方式
// from: 当前导航正要离开的路由 用一种标准化的方式
// 添加全局前置导航守卫
router.beforeEach((to, from, next) => {

  const token = store.state.userInfo.token

  if (!token && to.path !== '/login' && to.path !== '/register') {//token不存在
    next( '/login' )
  } else if (token && to.name === 'login') {//token存在
    next({ name: 'home' })
  } else {
    next();
    console.log("即将要进入的目标", to)
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});