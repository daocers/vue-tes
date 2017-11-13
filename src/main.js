// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import routeConfig from './router/router-config'  //引入router-config.js文件
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$ajax = axios
Vue.prototype.host = "http://localhost:8090/";

Vue.prototype.http = function (url, queryData) {
  axios({
    /**
     * 此处必须使用application/json，不能使用text/json
     * */
    headers: {"Content-Type": 'application/json;charset=UTF-8'},
    method: 'post',
    url: "http://localhost:8090" + url,
    data: JSON.stringify(queryData),
  }).then(function (response) {
    console.log("res: ", response);
    let data = eval(res);
    console.log("data: ", res);
  }).catch(function (error) {
    console.log("请求失败：", error);

  })
}
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
