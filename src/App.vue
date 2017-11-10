<template>
  <div id="app">
    <el-row :gutter=5 class="header">
      <el-col :span=4>
        <!--logo-->
        logo
      </el-col>
      <el-col :span=10>
        学员|教师|管理员
        <!--顶部导航-->
        <!--<el-menu default-active="5" class="el-menu-demo" mode="horizontal" @select="">-->
          <!--<el-menu-item index="1">学员</el-menu-item>-->
          <!--<el-menu-item index="2">我是教师</el-menu-item>-->
          <!--<el-menu-item index="3">我是管理员</el-menu-item>-->
        <!--</el-menu>-->
      </el-col>
      <el-col :span=4 :offset=6>
        <div style="text-align: right; font-size: 15px; vertical-align: middle; margin-right: 10px;">
          <el-dropdown>
            <i class="el-icon-menu" style="margin-right: 15px; color: white"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter=5>
      <el-col :span=4 style=" min-height: 600px;">
        <el-menu
          :router="true"
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>测试</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="/scene">步骤</el-menu-item>
              <el-menu-item index="/scene/setting">参数设置</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="/step">步骤demo</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-setting"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <!--视图区-->
        <router-view class="view"></router-view>
      </el-col>
    </el-row>

    <div style="position: relative;height: 60px;width: 100%;">

    </div>

    <!--<main>-->
    <!--<div class="main-left">-->
    <!--<el-menu default-active="/activePublic" class="el-menu-vertical-demo" :router="true">-->
    <!--<el-menu-item index="/leftMenu" :class="{'isActive': 'active'}">活动</el-menu-item>-->
    <!--<el-menu-item index="/scene/setting" :class="{'isActive':'!active'}">系统管理</el-menu-item>-->
    <!--</el-menu>-->
    <!--</div>-->

    <!--&lt;!&ndash;右侧内容区&ndash;&gt;-->
    <!--<div class="main-right">-->

    <!--</div>-->
    <!--</main>-->
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
        active: true
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
  body {
    margin: 0;
  }

  #app {
    min-width: 1200px;
    margin: 0 auto;
    font-family: "Helvetica Neue", "PingFang SC", Arial, sans-serif;
  }

  /* 头部导航 */
  header {
    z-index: 1000;
    min-width: 1200px;
    transition: all 0.5s ease;
    border-top: solid 4px #3091F2;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
  }

  header.header-fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }

  header .el-menu-demo {
    padding-left: 300px !important;
  }

  /* 主内容区 */
  main {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    min-height: 800px;
    border: solid 40px #E9ECF1;
    background-color: #FCFCFC;
  }

  main .main-left {
    text-align: center;
    width: 200px;
    float: left;
  }

  main .main-right {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    background-color: #fff;
    padding: 50px 70px;
  }

  main .el-menu {
    background-color: transparent !important;
  }

  .header {
    background-color: #545C64;
    text-color: "#fff";
    height: 50px;
  }
  .view{
    margin: 10px;
  }
</style>


<!--<template>-->
<!--<div id="app" class="demo">-->
<!--message: {{message}}-->
<!--<el-row :gutter="20">-->
<!--<el-col :span="16">-->
<!--<div class="grid-content bg-purple"></div>-->
<!--</el-col>-->
<!--<el-col :span="8">-->
<!--<div class="grid-content bg-purple"></div>-->
<!--</el-col>-->
<!--</el-row>-->
<!--<el-row :gutter="20">-->
<!--<el-col :span="8">-->
<!--<div class="grid-content bg-purple">-->
<!--<el-col :span="12">-->
<!--<h5>自定义颜色</h5>-->
<!--<div id="leftMenu">-->

<!--</div>-->
<!--</el-col>-->
<!--</div>-->
<!--</el-col>-->
<!--<el-col :span="8">-->
<!--<div class="grid-content bg-purple"></div>-->
<!--</el-col>-->
<!--<el-col :span="4">-->
<!--<div class="grid-content bg-purple"></div>-->
<!--</el-col>-->
<!--<el-col :span="4">-->
<!--<div class="grid-content bg-purple"></div>-->
<!--</el-col>-->
<!--</el-row>-->
<!--<el-row :gutter="20">-->
<!--<el-col :span="4">-->
<!--<div class="grid-content bg-purple"></div>-->
<!--</el-col>-->
<!--<el-col :span="16">-->
<!--<div class="grid-content bg-purple"></div>-->
<!--</el-col>-->
<!--<el-col :span="4">-->
<!--<div class="grid-content bg-purple"></div>-->
<!--</el-col>-->
<!--</el-row>-->
<!--</div>-->
<!--</template>-->

<!--<script>-->
<!--//  import Vue from 'vue'-->
<!--//-->
<!--//  new Vue({-->
<!--//    el: '#app',-->
<!--//    data: {-->
<!--//      message: 'hello Vue.js!'-->
<!--//    }-->
<!--//  })-->
<!--import ElRow from "element-ui/packages/row/src/row";-->
<!--import ElCol from "element-ui/packages/col/src/col";-->
<!--import leftMenu from './components/left-menu.vue'-->
<!--export default {-->
<!--components: {-->
<!--ElCol,-->
<!--ElRow,-->
<!--leftMenu-->
<!--},-->
<!--data() {-->
<!--return {-->
<!--message: 'hello Vue.js'-->
<!--}-->
<!--},-->
<!--}-->
<!--</script>-->


<!--<style>-->
<!--.el-row {-->
<!--margin-bottom: 20px;-->

<!--&-->
<!--:last-child {-->
<!--margin-bottom: 0;-->
<!--}-->

<!--}-->
<!--.el-col {-->
<!--border-radius: 4px;-->
<!--}-->

<!--.bg-purple-dark {-->
<!--background: #99a9bf;-->
<!--}-->

<!--.bg-purple {-->
<!--background: #d3dce6;-->
<!--}-->

<!--.bg-purple-light {-->
<!--background: #e5e9f2;-->
<!--}-->

<!--.grid-content {-->
<!--border-radius: 4px;-->
<!--min-height: 36px;-->
<!--}-->

<!--.row-bg {-->
<!--padding: 10px 0;-->
<!--background-color: #f9fafc;-->
<!--}-->
<!--</style>-->
