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
const host = "http://localhost:8080/";
const global_timeout = 3000;

Vue.prototype.httpGet = async function (url) {
  let response = await axios.get(url);
};


/*
* post请求
*
**/
Vue.prototype.postParam = async function (url, params, timeout) {
  let data = new URLSearchParams();
  for (let key in params) {
    data.append(key, params[key]);
  }
  let token = await getToken();
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
  return await processResponse(response);
}

/*
* 发送实体信息，post请求  application/json
*
**/
Vue.prototype.postEntity = async function (url, data, timeout) {
  if (!timeout) {
    timeout = global_timeout;
  }
  let token = await getToken();
  let response = await axios({
    /**
     * 此处必须使用application/json，不能使用text/json
     * */
    headers: {"Content-Type": 'application/json;charset=UTF-8', "token": token},
    // headers: {"Content-Type": 'application/json;charset=UTF-8', "token": token, 'Cookie' : document.cookie},
    method: 'post',
    url: host + url,
    data: JSON.stringify(data),
    timeout: timeout
  })
  return await processResponse(response);
}

/*
*
* 处理响应信息
**/
async function processResponse(response) {
  let res;
  if (response.status == 200) {
    console.debug("请求处理成功");
    var data = response.data;
    console.log("数据实体： ", data);
    console.log("数据结果： ", data.data);
    if (data.result) {
      res = data.data;
    } else {
      if (data.code = '-2') {
        console.log("ajax请求session超时，先登录！")
        // window.href.location = "/login";
        this.$router.push({"path": "/login"});
        return false;
      }
      console.log("请求成功，数据处理失败");
      let msg = data.message;
      if (!msg || msg == '') {
        msg = "服务处理失败";
      }
      this.$notify.error({
        title: '错误',
        message: msg
      });
      res = null;
    }
  } else {
    console.info("请求处理失败");
    this.$notify.error({
      title: '错误',
      message: '请求处理失败'
    });
    res = null;
  }
  console.log("结果：", res);
  return res;
}

/* 获取token*/
async function getToken() {
  let token = sessionStorage.getItem("token");
  return token;
}

Vue.prototype.http = async function (url, queryData, timeout) {
  let response, res;
  try {
    console.log("开始请求： ", url);
    //如果timeout无效，设置为3000ms
    if (null == timeout || timeout == undefined || isNaN(timeout)) {
      timeout = global_timeout;
    }
    let token = sessionStorage.getItem("token");
    // console.log("cookie", document.cookie);
    response = await axios({
      /**
       * 此处必须使用application/json，不能使用text/json
       * */
      headers: {"Content-Type": 'application/json;charset=UTF-8', "token": token},
      // headers: {"Content-Type": 'application/json;charset=UTF-8', "token": token, 'Cookie' : document.cookie},
      method: 'post',
      url: host + url,
      data: JSON.stringify(queryData),
      timeout: timeout
    });

    console.log("得到服务响应：", response);
    // console.log("data: ", response.data);
    console.log("status: ", response.status);
    // console.log("statusText: ", response.statusText);
    // console.log("headers: ", response.headers);
    // console.log("config: ", response.config);
    console.log("code: ", response.data.code);
    if (response.status == 200) {
      console.debug("请求处理成功");
      var data = response.data;
      console.log("数据实体： ", data);
      console.log("数据结果： ", data.code);
      if (data.result) {
        res = data.data;
      } else {
        if (data.code = '-2') {
          console.log("ajax请求session超时，先登录！")
          // window.href.location = "/login";
          this.$router.push({"path": "/login"});
          return false;
        }
        console.log("请求成功，数据处理失败");
        let msg = data.message;
        if (!msg || msg == '') {
          msg = "服务处理失败";
        }
        this.$notify.error({
          title: '错误',
          message: msg
        });
        res = null;
      }
    } else {
      console.info("请求处理失败");
      this.$notify.error({
        title: '错误',
        message: '请求处理失败'
      });
      res = null;
    }
  } catch (e) {
    console.error("请求处理异常")
    console.error("error: ", e)
    this.$notify.error({
      title: '错误',
      message: '请求服务器异常'
    });
  }
  return res;
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
