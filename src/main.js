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

  // 获取JWT令牌
  const token = localStorage.getItem('jwtToken');
  const sportsUser = localStorage.getItem('sportsUser')
  if(sportsUser){
    const User = JSON.parse(sportsUser)
    store.state.userInfo.username=User.userName;
    store.state.userInfo.userId=User.id;
    store.state.userInfo.img=User.img;
    store.state.userInfo.type=User.type

    
  }
  if (!token && to.path !== '/login' && to.path !== '/register' && to.path !== '/' ) {//token不存在
    next('/login')
  } else if (token && to.name === 'login') {//token存在
    
    if(from.name==  'home'){
      next()
    }
    next({ name: 'home' })
  } else {
    next();
    
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});