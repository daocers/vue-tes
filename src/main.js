// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import routeConfig from './router/router-config' //引入router-config.js文件
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$ajax = axios
var host = "http://localhost:8090/";

Vue.prototype.http = async function (url, queryData) {
  let response, res;
  try{
    response = await axios({
        /**
         * 此处必须使用application/json，不能使用text/json
         * */
        headers: {"Content-Type": 'application/json;charset=UTF-8'},
        method: 'post',
        url: host + url,
        data: JSON.stringify(queryData),
      });

    console.log("data: ", response.data);
    console.log("status: ", response.status);
    console.log("statusText: ", response.statusText);
    console.log("headers: ", response.headers);
    console.log("config: ", response.config);
    if(response.status == 200){
      console.debug("请求处理成功");
      var data = response.data;
      if(data.result){
        res = data.data;
      }else{
        console.log("请求成功，数据处理失败");
        res = null;
      }
    }else{
      console.info("请求处理失败");
      res = null;
    }
  }catch(e){
    console.error("请求处理异常")
    console.error("error: ", e)
  }
  return res;
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
