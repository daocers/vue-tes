// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import routeConfig from './router/router-config'  //引入router-config.js文件

Vue.config.productionTip = false

//加载路由中间件
Vue.use(VueRouter)

//定义路由
const router = new VueRouter({
  routes: routeConfig
})


/* eslint-disable no-new */
// const app = new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: {
//     App,
//     ElementUI,
//     VueRouter,
//   }
// })


const app = new Vue({
  router,
  // store,
  el: "#app",
  render: h => h(App)
})
