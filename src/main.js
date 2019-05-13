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
// const host = "http://47.93.189.30/hn";
//测试使用
const host = "http://localhost:9999/hn";
const wsUrl = "ws://localhost:9999/hn";

//线上使用
// const host = "http://www.bugu.co/hn";
// const wsUrl = "ws://www.bugu.co/hn";

// 全局超时时间
const global_timeout = 60000;

Vue.prototype.host = host;
Vue.prototype.wsUrl = wsUrl;

//token 过期标志
var tokenInvalid = false;

/**
 * get请求
 **/
Vue.prototype.doGet = async function (url) {
  let token = sessionStorage.getItem("token");
  if (!token) {
    if (!token) {
      this.$notify({
        title: '提示',
        message: '会话超时',
        type: "info",
      })
      this.router.push("/login")
      return false;
    }
  }
  url = host + url;
  if (url.indexOf("?") > -1) {
    url = url + "&token=" + token;
  } else {
    url = url + "?token=" + token;
  }
  let response = await axios.get(url);
  return await handleResponse(response, this);
};

/**
 * 下载文件
 * @param url
 * @returns {Promise<void>}
 */
Vue.prototype.downloadFile = async function (url) {
  let token = sessionStorage.getItem("token");
  if (url.indexOf("?") > -1) {
    url = url + "&token=" + token;
  } else {
    url = url + "?token=" + token;
  }
  window.location.href = host + url;
}


/**
 * 上传文件
 * @param url
 * @param formData
 * @returns {Promise<*|boolean>}
 */
Vue.prototype.uploadFile = async function (url, formData, timeout) {
  let token = sessionStorage.getItem("token");
  let response = await axios({
    headers: {"Content-Type": "multipart/form-data", "token": token},
    url: host + url,
    method: 'post',
    data: formData,
    timeout: timeout ? timeout : 60000
  })
  return await handleResponse(response, this);
}


/**
 * 执行post请求
 * @param url
 * @param data
 * @param type
 * @param timeout
 * @returns {Promise<{}|boolean|*>}
 */
Vue.prototype.doPost = async function (url, data, type, timeout) {
  let token = sessionStorage.getItem("token");
  if (!token) {
    this.$notify({
      title: '提示',
      message: '会话超时',
      type: "info",
    })
    this.$router.push("/login")
    return false;
  }

  if (!timeout) {
    timeout = global_timeout;
  }
  if (!type) {
    type = 'JSON';
  }

  let contentType = '';
  if (type.toUpperCase() == "FORM") {
    contentType = 'application/x-www-form-urlencoded';
    let params = new URLSearchParams();
    for (let key in data) {
      params.append(key, data[key]);
    }
    data = params;
  } else {
    contentType = 'application/json;charset=UTF-8';
  }

  let response = await axios({
    headers: {"Content-Type": contentType, "token": token},
    url: host + url,
    method: 'post',
    data: data,
    timeout: timeout
  })

  console.log("响应数据：", response);
  return handleResponse(response, this);
}


/**
 * 处理请求响应
 * @param response
 * @param vue
 * @returns {Promise<{}|boolean|*>}
 */
function handleResponse(response, vue) {
  if (response.status == 200) {
    let data = response.data;
    let code = data.code;
    let result = data.result;
    let message = data.message;

    if (!result) {
      if (code) {
        //  请求失败，
        if (-1 == code) {
          console.log("用户信息异常", message);
          if (tokenInvalid == false) {
            vue.$notify.error({
              title: '错误',
              message: 'Token已失效，重新登录'
            })
          }
          tokenInvalid = true;
          vue.$router.push({path: "/login"});
          return false;
        } else if (-100 == code) {
          console.log("参数异常, message", message)
        } else if (-10000 == code) {
          console.log("系统异常", message)
        }
        tokenInvalid = false;
        vue.$notify.error({
          title: '错误',
          message: !message ? "系统异常" : message
        })
        return false;
      } else {
        vue.$notify.error({
          title: "错误",
          message: !message ? "系统异常" : message
        })
        return false;
      }
    }
    return data.data;
  } else {
    vue.$notify.error({
      title: '错误',
      message: '网络异常'
    });
    return {};
  }
}


Vue.prototype.loading = function () {
  const loading = this.$loading({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  return loading;
}

let urlList = [];

//加载路由中间件
Vue.use(VueRouter)

//定义路由
const router = new VueRouter({
  routes: routeConfig
})

router.beforeEach((to, from, next) => {
  let vue = router.app;
  let toPath = to.path;
  if(toPath == '/' || toPath == '/login'){
    next();
    return;
  }
  if(!urlList || urlList.length == 0){
    console.log("处理一遍urlList  ******")
    urlList = JSON.parse(sessionStorage.getItem("urlList"));
  }
  if(!urlList){
    console.log("还没有权限，先登录")
    next({path: '/login'});
    return;
  }
  if (urlList.indexOf(toPath) > -1) {
    next();
  } else {
    console.log("没有跳转的页面权限，toPath: ", toPath);

    // todo 没有权限先提示然后登录到首页，  后续修改为跳转到错误提示页面
    vue.$notify.warning({
      title: '警告',
      message: '您没有页面访问权限，请联系管理员'
    })

    next({path: '/'})
    return;
  }
})

const app = new Vue({
  router,
  // store,
  el: "#app",
  render: h => h(App)
})
