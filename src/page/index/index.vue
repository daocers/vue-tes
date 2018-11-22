<template>
  <div id="main-content">
    <el-row :gutter="0">
      <div class="header">
        <div class="nag">
          <div class="in">
            <a href="/index"><img class="logo" width="40" height="40" src="../../assets/img/logo.png"
                                     alt="布谷培训"></a>
            <img class="slogen" width="180" height="25" src="../../assets/img/slogen.png" alt="在线考试就到布谷培训">

            <span class="gp" style="display:"></span>
            <span class="tl" style="display:">TES考试系统</span>
            <p class="nlink n2">
              <a href="/index">首页</a>
              <a href="/help/index" target="_blank">帮助中心</a>
            </p>
          </div>
        </div>
      </div>
    </el-row>
    <el-row :gutter=0 class="elrow-main">
      <div class="lrcon-idx">
        <div>
          <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                   @select="handleSelect" :unique-opened="true" :router="false"
                   :collapse="isCollapse" :style="menuClass">
            <el-menu-item index="oprBtn">
              <i class="el-icon-menu"></i>
              <span slot="title">展开&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </el-menu-item>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>基础信息</span>
              </template>

              <!--<el-menu-item index="/questionPolicy">试题策略管理</el-menu-item>-->
              <!--<el-menu-item index="/property">属性管理</el-menu-item>-->
              <!--<el-menu-item index="/questionType">题型管理</el-menu-item>-->
              <el-menu-item index="/questionBank">题库管理</el-menu-item>

              <!--<el-menu-item index="/paperPolicy">试卷策略</el-menu-item>-->

            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>试题管理</span>
              </template>
              <el-menu-item index="/commonQuestion">常规试题</el-menu-item>
              <el-menu-item index="/single">单选题</el-menu-item>
              <el-menu-item index="/multi">多选题</el-menu-item>
              <el-menu-item index="/judge">判断题</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item index="/role">角色</el-menu-item>
              <el-menu-item index="/permission">权限</el-menu-item>
              <el-menu-item index="/branch">机构</el-menu-item>
              <el-menu-item index="/department">部门</el-menu-item>
              <el-menu-item index="/station">岗位</el-menu-item>
              <el-menu-item index="/user">用户</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-edit-outline"></i>
                <span>考试管理</span>
              </template>
              <el-menu-item index="/scene">场次管理</el-menu-item>
              <el-menu-item index="/exam">考试</el-menu-item>
              <el-menu-item index="/scene/myJoin">我参加的</el-menu-item>
              <el-menu-item index="/scene/myOpen">我开场的</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
        <div class="main">
          <!--以下是右边的数据-->
          <router-view ref="main" style="padding-left: 8px; padding-top: 10px;"></router-view>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Element from 'element-ui'
  import 'element-ui/lib/theme-chalk/index.css'

  Vue.use(Element);

  export default {
    name: 'app',
    data: function () {
      return {
        isCollapse: false,
        heightInfo: 500,
        active: true,
        menuClass: {
          // width: '240px',
          height: '500px',
        }
      }
    },
    methods: {

      handleOpen(key, keyPath) {
        console.log("open...")
        if (key == 'oprBtn') {
          this.isCollapse = !this.isCollapse;
          return;
        }
        console.log(">>>>")
        console.log(key, keyPath);
        // changeHeight();
      },
      handleClose(key, keyPath) {
        console.log("close...")
        console.log(key, keyPath);
        if (key == 'oprBtn') {
          this.isCollapse = !this.isCollapse;
          return;
        }
        // changeHeight();
      },
      handleSelect(key, keyPath) {
        // console.log("before:", this.isCollapse);
        // this.isCollapse = !this.isCollapse;
        // console.log("after", this.isCollapse);
        if (key == 'oprBtn') {
          console.log("open");
          this.isCollapse = !this.isCollapse;
          return;
        }
        console.log(key, keyPath)
        this.$router.push({path: key})
      }

    },
    created: function () {
      let height = document.documentElement.clientHeight;
      // console.log("height:::", height);
//      this.heightInfo = parseInt(height) - 50;
      let res = parseInt(height) - 58 + 'px';
      // console.log("res:::", res);
      this.menuClass.height = res;
      let token = sessionStorage.getItem("token");
      console.log("token", token)
      if (token == null || token.length == 0) {
        this.$router.push({path: "/login"});
      }
    }
  }
</script>

<style>
  body {
    margin: 0;
  }
  /*   #main-content{
      width: 1000px;
      display: flex;
      flex-direction: column;
      align-items: center;
    } */

  /*#app {*/
  /*min-width: 1200px;*/
  /*margin: 0 auto;*/
  /*font-family: "Microsoft YaHei UI";*/
  /*font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;*/
  /*}*/

  /*头部导航*/
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

  .header {
    background-color: #545C64;
    text-color: "#fff";
    height: 50px;
  }


  /*header 样式*/

  .clearfix:before, .clearfix:after {
    content: "";
    display: table;
    clear: both
  }

  .clearfix {
    *zoom: 1; /*ie6,7*/
  }

  .lrcon-idx {
    width: 1002px;
    margin: 0 auto;
    display: -webkit-box;
    /*background: url(../../assets/img/bg_login.png) #fff center 70px no-repeat*/
  }
  .main {
    flex: 1;
    display: -webkit-box;
    display: -ms-flexbox;
    min-height: 800px;
    background-color: #FCFCFC;
  }
  .main>div{
    width: 100%;
  }
  .main .main-left {
    text-align: center;
    width: 200px;
  }

  .main .main-right {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    background-color: #fff;
    /*padding: 50px 70px;*/
  }

  .main .el-menu {
    background-color: transparent !important;
  }
  .lrcon .lrbox {
    width: 760px;
    margin: 0 auto;
    background: url(../../assets/img/bg_lr.png) #fff repeat-y
  }

  .lrcon .lr_lf {
    float: left;
    width: 159px;
    padding: 50px 40px 0;
    border-top: 10px solid #339bff
  }

  .lrcon .lr_rt {
    position: relative;
    float: left;
    width: 440px;
    padding: 0 40px 32px;
    border-top: 10px solid #71bdff
  }

  .lrcon .lr_bm {
    width: 760px;
    height: 18px;
    margin: 0 auto;
    background: url(../../assets/img/bg_lrbm.png) no-repeat
  }

  .lrcon .lr_c {
    position: relative;
    margin-bottom: 60px;
    padding-left: 50px
  }

  .lrcon .lr_c label {
    position: absolute;
    width: 32px;
    height: 32px;
    top: 50%;
    left: 0;
    margin-top: -16px;
    background: url(../../assets/img/icon_lr.png) no-repeat
  }

  .lrcon .lr_c label.l5 {
    background-position: 0 -140px
  }

  .lrcon .lr_c label.l6 {
    background-position: 0 -175px
  }

  .lrcon .lr_c label.l7 {
    background-position: 0 -210px
  }

  .lrcon .lr_c label.l8 {
    background-position: 0 -245px
  }

  .lrcon .lr_c .lr_cn p {
    color: #666;
    margin-bottom: 5px
  }

  .lrcon .mind {
    font-size: 12px;
    color: #999;
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1pxtted #ddd
  }

  .en .lrcon .lr_lf {
    width: 197px;
    padding: 50px 21px 0
  }

  .lr_h {
    line-height: 24px;
    font-size: 24px;
    color: #339bff;
    text-align: center;
    padding: 40px 0
  }

  .lr_p {
    font-size: 16px;
    color: #333;
    text-align: center;
    padding-top: 10px
  }

  .lr_p a {
    padding-right: 20px;
    background: url(../../assets/img/icon_go.png) right center no-repeat
  }

  /*标题*/
  .pro {
    height: 30px;
    line-height: 30px;
    background-color: #fff2e3
  }

  .pro .msg em {
    float: right;
    width: 15px;
    height: 30px;
    cursor: pointer;
    margin-right: 10px;
  }

  /*基本链接样式*/
  .a {
    cursor: pointer;
    color: #00457d
  }

  .a:link, .a:active, .a:visited {
    color: #00457d
  }

  .a:hover {
    color: #339bff
  }

  .a2 {
    cursor: pointer;
    color: #339bff
  }

  .a2:link, .a2:active, .a2:visited {
    color: #339bff
  }

  .a2:hover {
    text-decoration: underline
  }

  /*字体大小*/
  .f12 {
    font-size: 12px !important
  }

  /*颜色*/
  .c_999 {
    color: #999 !important
  }

  /*头部*/
  .header {
    position: relative;
    min-width: 1002px;
    font: 14px "Microsoft YaHei";
    z-index: 998
  }

  .header p, .header ul {
    margin: 0;
    padding: 0
  }

  .header li {
    font-family: "Microsoft YaHei";
    list-style: none
  }

  .header a {
    font-family: "microsoft yahei" !important;
    color: #333;
    text-decoration: none
  }

  .header a:visited, .header a:active, .header a:link {
    color: #333
  }

  .header a:hover {
    color: #ff6000 !important
  }

  .header .in {
    width: 1002px;
    margin: 0 auto
  }

  .header .nag, .header {
    height: 56px;
    line-height: 56px;
    background-color: #fff;
    border-bottom: 1px solid #ddd
  }

  .header .nag .logo {
    float: left;
    margin-top: 8px
  }

  .header .nag .nlink {
    float: right
  }

  .header .nag .nlink a {
    float: right;
    height: 56px;
    font-size: 16px;
    margin-left: 40px
  }

  .header .nag .nlink .on {
    height: 52px;
    font-weight: bold;
    color: #409EFF;
    border-bottom: 4px solid #ff6000
  }

  .header .nag .nlink.n2 a {
    font-size: 14px;
    margin-left: 30px
  }

  .header .nag .nlink.n2 .on {
    border-bottom: 0 none
  }

  .header .nag .tl {
    float: left;
    font-size: 22px;
    color: #333
  }

  .header .gp {
    float: left;
    width: 1px;
    height: 22px;
    font-size: 0;
    margin: 17px 10px 0;
    background-color: #ddd
  }

  .header .slogen {
    float: left;
    margin: 20px 0 0 10px
  }

  /*底部*/
  .footer {
    clear: both;
    min-width: 1002px;
    font: 12px "Microsoft YaHei";
    background-color: #fff
  }

  .footer {
    color: #999;
    padding: 35px 0;
    border-top: 1px solid #ddd
  }

  .footer a, .footer * {
    font-size: 12px !important;
    font-family: "Microsoft YaHei" !important
  }

  .footer .in,
  .footer .nag {
    margin-bottom: 15px
  }

  .footer .note {
    position: relative;
    line-height: 24px;
    text-align: center;
    margin: 0;
    padding: 0
  }

  .footer .note span {
    position: relative;
    display: inline-block;
    font-size: 12px;
    padding: 0 5px;
    z-index: 2
  }

  .footer.f2 {
    border-top: 0 none
  }

  li.el-menu-item {
    padding-left: 0px;
  }

  /*ul.el-menu-vertical-demo.el-menu{*/
  /*min-width: 200px;*/
  /*}*/

</style>

