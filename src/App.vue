<template>
  <div id="app">
    <router-view></router-view>

  </div>
</template>

<script>
  import Vue from 'vue'
  import Element from 'element-ui'
  import 'element-ui/lib/theme-chalk/index.css'
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";

  Vue.use(Element)

  export default {
    components: {
      ElCol,
      ElRow
    },
    name: 'app',
    data: function () {
      return {
        heightInfo: 500,
        active: true,
        menuClass: {
          width: '240px',
          height: '500px',
        }
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
      let height = document.documentElement.clientHeight;
      console.log("height:::", height);
//      this.heightInfo = parseInt(height) - 50;
      let res = parseInt(height) - 50 + 'px';
      console.log("res:::", res);
      this.menuClass.height = res;
    }
  }
</script>

<style>
  body {
    margin: 0;
  }

  #app {
    /*min-width: 1200px;*/
    margin: 0 auto;
    /*font-family: "Microsoft YaHei UI"*/
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

   /*头部导航*/
  /*header {*/
    /*z-index: 1000;*/
    /*!*min-width: 1200px;*!*/
    /*transition: all 0.5s ease;*/
    /*border-top: solid 4px #3091F2;*/
    /*background-color: #fff;*/
    /*box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);*/
  /*}*/

  /*header.header-fixed {*/
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    /*right: 0;*/
  /*}*/

  /*header .el-menu-demo {*/
    /*padding-left: 300px !important;*/
  /*}*/

  /* 主内容区 */
  /*main {*/
    /*display: -webkit-box;*/
    /*display: -ms-flexbox;*/
    /*display: flex;*/
    /*min-height: 800px;*/
    /*border: solid 40px #E9ECF1;*/
    /*background-color: #FCFCFC;*/
  /*}*/

  /*main .main-left {*/
    /*text-align: center;*/
    /*width: 200px;*/
    /*float: left;*/
  /*}*/

  /*main .main-right {*/
    /*-webkit-box-flex: 1;*/
    /*-ms-flex: 1;*/
    /*flex: 1;*/
    /*background-color: #fff;*/
    /*!*padding: 50px 70px;*!*/
  /*}*/

  /*main .el-menu {*/
    /*background-color: transparent !important;*/
  /*}*/

  /*.header {*/
    /*background-color: #545C64;*/
    /*text-color: "#fff";*/
    /*height: 50px;*/
  /*}*/

</style>

