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
// Vue.prototype.$ajax = axios
const host = "http://localhost:8080";
const global_timeout = 3000;

/**
 * get请求
 **/
Vue.prototype.httpGet = async function (url) {
  let response = await axios.get(url);
  return await processResponse(response, this);
};


/**
 * post请求
 * 服务器success，返回请求实体，
 * 如果失败，直接按照系统统一抛异常
 *
 **/
Vue.prototype.postParam = async function (url, params, timeout) {
  let data = new URLSearchParams();
  for (let key in params) {
    data.append(key, params[key]);
  }
  let token = sessionStorage.getItem("token");
  if (!timeout) {
    timeout = global_timeout;
  }
  let response = await axios({
    headers: {"Content-Type": 'application/x-www-form-urlencoded', "token": token},
    url: host + url,
    method: 'post',
    data: data,
    timeout: timeout
  })
  return await processResponse(response, this);
}

/*
* 发送实体信息，post请求  application/json
* 成功，返回实体，失败直接按照系统提示抛异常
*
**/
Vue.prototype.postEntity = async function (url, data, timeout) {
  console.log("url:", url);
  console.log("data:", data);
  if (!timeout) {
    timeout = global_timeout;
  }
  let token = sessionStorage.getItem("token");
  let response = await axios({
    /**
     * 此处必须使用application/json，不能使用text/json
     * */
    headers: {"Content-Type": 'application/json;charset=UTF-8', "token": token},
    method: 'post',
    url: host + url,
    data: JSON.stringify(data),
    timeout: timeout
  })
  console.log("response:::", response);
  return await processResponse(response, this);
}


/**
 * 发送post请求，得到原始数据，逻辑层控制数据处理
 * @param url
 * @param params
 * @param timeout
 * @returns {Promise<*>}
 */
Vue.prototype.post4Original = async function (url, params, timeout) {
  let data = new URLSearchParams();
  for (let key in params) {
    data.append(key, params[key]);
  }
  let token = sessionStorage.getItem("token");
  if (!timeout) {
    timeout = global_timeout;
  }
  let response = await axios({
    headers: {"Content-Type": 'application/x-www-form-urlencoded', "token": token},
    url: host + url,
    method: 'post',
    data: data,
    timeout: timeout
  })
  if (response.status == 200) {
    return response.data;
  } else {
    console.info("请求处理失败");
    this.$notify.error({
      title: '错误',
      message: '请求处理失败'
    });
    return null;
  }
}

/*
*
* 处理响应信息
**/
async function processResponse(response, vue) {
  console.log("响应数据：", response);
  let res;
  if (response.status == 200) {

    var response = response.data;
    let code = response.code;
    let result = response.result;
    let message = response.message;
    let data = response.data;

    //请求成功
    if (result) {
      return data;
    } else {
      //  请求失败，
      if (-1 == code) {
        console.log("用户未登录");
        vue.$router.push({path: "/login"});
      } else if (-2 == code) {
        console.log("登录失败")
        vue.$router.push({path: "/login"});
      } else if (-3 == code) {
        console.log("无效token")
        vue.$router.push({path: "/login"});
      } else if (-4 == code) {
        console.log("其他异常")
      }
      vue.$notify.error({
        title: '错误',
        message: !message ? "系统异常" : message
      })

      return false;
    }
  } else {
    this.$notify.error({
      title: '错误',
      message: '请求处理失败'
    });
  }
}

//加载路由中间件
Vue.use(VueRouter)

//定义路由
const router = new VueRouter({
  routes: routeConfig
})

const app = new Vue({
  router,
  // store,
  el: "#app",
  render: h => h(App)
})
