<template>
  <div id="app">
    <router-view></router-view>

  </div>
</template>

<script>
  import Vue from 'vue'
  import Element from 'element-ui'
  import 'element-ui/lib/theme-chalk/index.css'

  Vue.use(Element)
  Vue.directive("hasRole", {
    bind: function (el, bindings) {
      let value = bindings.expression;
      if (!value) {
        throw new Error("has-role需要指定角色编码")
      }
      let flag = false;
      if (value == "root") {
        let isRoot = sessionStorage.getItem("isRoot");
        if ("true" == isRoot) {
          flag = true;
        }
      } else if (value = "admin") {
        let isAdmin = sessionStorage.getItem("isAdmin");
        if ("true" == isAdmin) {
          flag = true;
        }
      } else {
        let roles;
        let roleInfo = sessionStorage.getItem("roleList");
        if (roleInfo && roleInfo.length > 0) {
          roles = JSON.parse(roleInfo);
        }
        if (roles && roles.indexOf(value)) {
          flag = true;
        }
      }

      if (flag) {
        //  有权限
        el.style.visibility = "visible";
      } else {
        el.style.visibility = "hidden";
      }
    },
    update: function (el, bindings) {

    },
    unbind: function () {
      console.log("绑定解除")
    }
  });
  Vue.directive("isAdmin", {
    bind: function (el, bindings) {
      let isAdmin = sessionStorage.getItem("idAdmin");
      if (isAdmin == 'true') {
        el.style.visibility = "visible";
      } else {
        el.style.visibility = "hidden";
      }
    }
  });
  Vue.directive("isRoot", {
    bind: function (el, bindings) {
      let isRoot = sessionStorage.getItem("isRoot");
      if (isRoot == 'true') {
        el.style.visibility = "visible";
      } else {
        el.style.visibility = "hidden";
      }
    }
  });

  Vue.directive("checkAuth", {
    bind: function (el, bindings) {
      let url = bindings.expression;
      if (!url) {
        throw new Error("check-auth需要指定url")
      }

      let urlListInfo = sessionStorage.getItem("urlList");
      let urls;
      if (urlListInfo) {
        urls = JSON.parse(urlListInfo);
      }

      let showFlag = false;
      if (urls && urls.indexOf(url) > -1) {
        showFlag = true;
      }

      if (showFlag) {
        //  有权限
        el.style.visibility = "visible";
      } else {
        el.style.visibility = "hidden";
      }
    }
  })

  export default {
    name: 'app',
    data: function () {
      return {
//        heightInfo: 500,
//        active: true,
//        menuClass: {
//          width: '240px',
//          height: '500px',
//        }
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },

    },

    created: function () {
//      let height = document.documentElement.clientHeight;
//      console.log("height:::", height);
////      this.heightInfo = parseInt(height) - 50;
//      let res = parseInt(height) - 50 + 'px';
//      console.log("res:::", res);
//      this.menuClass.height = res;
    }
  }
</script>

<style>
  body {
    margin: 0;
  }

  /*解决表格位置错位*/
  td, th {
    display: table-cell !important;
  }

  #app {
    /*min-width: 1200px;*/
    margin: 0 auto;
    /*font-family: "Microsoft YaHei UI"*/
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .el-table .danger-row {
    background: #f5dbe5;
  }
</style>

