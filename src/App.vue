<template>
  <div id="app">
    <el-row :gutter=0 class="header">
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
        <div style="text-align: right; font-size: 15px; vertical-align: middle; padding-right: 10px;">
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
    <el-row :gutter=0>
      <el-col :span=4>
        <!--:xl="3" :lg="3" :md="4" :sm="3" :xs="3"-->
        <el-menu
          :router="true"
          default-active="2"
          v-bind:style="menuClass"
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
              <el-menu-item index="/scene">场次管理</el-menu-item>
              <el-menu-item index="/questionPolicy">试题策略管理</el-menu-item>
              <el-menu-item index="/property">属性管理</el-menu-item>
              <el-menu-item index="/questionType">题型管理</el-menu-item>
              <el-menu-item index="/questionBank">题库管理</el-menu-item>
              <el-menu-item index="/commonQuestion">常规试题</el-menu-item>
              <el-menu-item index="/paperPolicy">试卷策略</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="/role">角色</el-menu-item>
              <el-menu-item index="/permission">权限</el-menu-item>
              <el-menu-item index="/branch">机构</el-menu-item>
              <el-menu-item index="/department">部门</el-menu-item>
              <el-menu-item index="/station">岗位</el-menu-item>
              <el-menu-item index="/user">用户</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="/commonQuestion">常规试题</el-menu-item>
              <el-menu-item index="/department">部门</el-menu-item>
            </el-submenu>
            <el-submenu index="1-5">
              <template slot="title">选项5</template>
              <el-menu-item index="/department">部门</el-menu-item>
              <el-menu-item index="/exam">考试</el-menu-item>
              <el-menu-item index="/scene/myJoin">我参加的</el-menu-item>
              <el-menu-item index="/scene/myOpen">我开场的</el-menu-item>
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
        <!--:xl="21" :lg="21" :md="20" :sm="21" :xs="21"-->
        <!--视图区-->
        <router-view class="view"></router-view>
      </el-col>
    </el-row>

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

  /* 头部导航 */
  header {
    z-index: 1000;
    /*min-width: 1200px;*/
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
    /*padding: 50px 70px;*/
  }

  main .el-menu {
    background-color: transparent !important;
  }

  .header {
    background-color: #545C64;
    text-color: "#fff";
    height: 50px;
  }

  .view {
    padding: 10px;
  }
</style>

