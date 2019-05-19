<template>
  <div class="nolog">
    <!--<div class="pro">-->
    <!--<div class="msg"><em id="warning"></em>最近有不法分子冒充布谷科技，让用户提供账户和密码。在此声明，我们绝不会通过电话、邮件或短信等形式询问用户名和密码。请用户提高警惕，增强自我保护意识。-->
    <!--</div>-->
    <!--</div>-->
<!--    <div class="header">-->
<!--      <div class="nag">-->
<!--        <div class="in">-->
<!--          <a href="/index"><img class="logo" width="40" height="40" src="../../assets/img/logo.png"-->
<!--                                alt="布谷培训"></a>-->
<!--          <img class="slogen" width="180" height="25" src="../../assets/img/slogen.png" alt="在线考试就到布谷培训">-->

<!--          <span class="gp" style="display:"></span>-->
<!--          <span class="tl" style="display:">欢迎登录</span>-->
<!--          <p class="nlink n2">-->
<!--            &lt;!&ndash;<a href="/index">首页</a>&ndash;&gt;-->
<!--            &lt;!&ndash;<a href="/help/index" target="_blank">帮助中心</a>&ndash;&gt;-->
<!--            <router-link to="/login">登录</router-link>-->

<!--          </p>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <div>
      <el-row>

        <el-card class="box-card">
          <div slot="header">
            <span  v-check-auth="`/scene/open1`">关于我们</span>
            <span style="float: right; padding: 3px 0; color: #66b1ff;" type="text">>></span>
          </div>
          <div class="about">
            <span>TES考试系统致力于解决银行系统的员工培训与考试工作中的问题，通过技术手段实现高效的培训与效果检测，促进无纸化办公。</span>
            <span>使用简介：</span>
            <span>登录流程，找管理员申请相关账号和密码，登录流程；</span>
            <span>批量添加试题，创建题库-> 导出模板 -> 编辑试题 -> 导入试题模板；注：试题会归属到当前用户所在的部门，分行，岗位等；</span>
            <span>修改试题： 查询试题-》修改-》提交；</span>
            <span>考试：设置场次信息 -》 选择试题-》 开始开始后可以进入答题；注：您开的场次只能是您管理的部门，分行或者岗位下的用户才能看到；</span>
            <span>完善用户信息：可以在用户管理模块处理；</span>

          </div>
        </el-card>


        <el-card class="box-card" v-if="false">
          <div slot="header">
            <span>快速通道</span>
            <span style="float: right; padding: 3px 0; color: #66b1ff;" type="text">>></span>
          </div>
          <el-row>
            <el-col :span="6">
              <div class="fast-item item-1">
                <span @click="forgetPassword">忘记密码</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="fast-item item-2">
                <span @click="fastOpen">快速开场</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="fast-item item-3">
                <span @click="questionTypeManage">题型管理</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="fast-item item-4">
                <span @click="queryMark">成绩查询</span>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-row>

      <el-collapse accordion style="border: 1px solid #E4E7ED; border-radius: 5px;">
        <el-collapse-item>
          <template slot="title">
            <div class="title">新人报道<i class="header-icon el-icon-info"></i></div>
          </template>
          <div class="item">1 使用前需要有账号和密码，如果您还没有账号信息，请联系管理员；</div>
          <div class="item">2 登录系统，学员可以使用翻打凭条联系功能；</div>
          <div class="item">3 教师用户能管理自己所在的部门，分行，岗位等相关的信息;</div>
          <div class="item">4 请联系管理员为您的账号设置正确的个人信息等;</div>
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title">
            <div class="title">关于TES系统<i class="header-icon el-icon-info"></i></div>
          </template>
          <div class="item">1 TES是一套针对培训和考试的系统，可以实现线上的智能化培训与测试;</div>
          <div class="item">2 题型包含：单选题，多选题，判断题，翻打凭条；</div>
          <div class="item">3 角色包含：系统管理员，考试管理员，学员；</div>
          <div class="item">4 考试以场次为单位进行，可以定制考试的相关规则；</div>
          <div class="item">5 系统默认考试结束三分钟后自动阅卷；</div>
          <div class="item">6 为了便于控制考试流程，考试中可以查看考生状态，以及管理员控制终端的功能；</div>
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title">
            <div class="title">考试过程电脑关机<i class="header-icon el-icon-info"></i></div>
          </template>
          <div class="item">1 重启机器，确认机器是否有故障，无故障，进行第2步，有故障，第3步</div>
          <div class="item">2 机器启动，重新进入系统，系统会判断以往做答信息，并恢复做答时间；可直接答题；</div>
          <div class="item">3 换机器登录系统，直接进入考试。试卷和答题记录会重新获取；（注：答题记录可能会有少量丢失）</div>
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title">
            <div class="title">我想举办考试<i class="header-icon el-icon-info"></i></div>
          </template>
          <div class="item">1 首先确定您有管理权限，如果有管理权限，会在导航栏有【考试管理】选项;</div>
          <div class="item">2 设置考试信息，开场时间必须晚于当前时间；</div>
          <div class="item">3 通知参考人员考试名称，开始时间，和场次授权码；(注：授权码注意保密，防止太多无关人员进入考试)</div>
          <div class="item">4 考试结束五分钟自动封装，自动判分；</div>
        </el-collapse-item>

        <el-collapse-item>
          <template slot="title">
            <div class="title">题库相关<i class="header-icon el-icon-info"></i></div>
          </template>
          <div class="item">1 一般情况下，题库不能用于个人测试；如果需要对测试开发，需要明确设置；</div>
          <div class="item">2 可对题库添加属性，最多5个属性;</div>
          <div class="item"></div>
          <div class="item"></div>
        </el-collapse-item>

        <el-collapse-item>
          <template slot="title">
            <div class="title">出卷模式<i class="header-icon el-icon-info"></i></div>
          </template>
          <div class="item">1 简单模式，直接指定相关类型的试题数量和分值，分值建议使用整数和一位以内的小数；</div>
          <div class="item">2 策略模式，可以根据属性值选择试题</div>
        </el-collapse-item>

        <el-collapse-item>
          <template slot="title">
            <div class="title">试卷类型<i class="header-icon el-icon-info"></i></div>
          </template>
          <div class="item">决定每张试卷的实体信息：</div>
          <div class="item">随机：每个人的试卷不一样，在指定的题库和其他属性信息中随机选择试题；</div>
          <div class="item">统一：每个人的试卷一样；</div>
          <div class="item">乱序统一： 每个人的试卷内容一样，但是试题的先后不一样；</div>

        </el-collapse-item>
      </el-collapse>
    </div>
    <!--<div class="lrcon Fm">-->
    <!--<div class="lrbox clearfix">-->
    <!--<div class="lr_lf">-->
    <!--<div class="lr_c">-->
    <!--<label class="l5"></label>-->
    <!--<div class="lr_cn">-->
    <!--<p>便捷的数据管理</p>-->
    <!--<div class="c_999 f12">使用office软件 兼容日常办公习惯</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="lr_c">-->
    <!--<label class="l6"></label>-->
    <!--<div class="lr_cn">-->
    <!--<p>丰富的试题策略</p>-->
    <!--<div class="c_999 f12">多种试题试卷策略 助您轻松出卷</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="lr_c">-->
    <!--<label class="l7"></label>-->
    <!--<div class="lr_cn">-->
    <!--<p>实时的状态监控</p>-->
    <!--<div class="c_999 f12">系统运行数据 实时输出</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="lr_c">-->
    <!--<label class="l8"></label>-->
    <!--<div class="lr_cn">-->
    <!--<p>个性的管理系统</p>-->
    <!--<div class="c_999 f12">按需定制系统参数 便捷管理</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->

    <!--<div class="lr_rt">-->
    <!--<input type="hidden" name="lang" value="c"/>-->
    <!--<input type="hidden" name="scode" value=""/>-->
    <!--<div class="lr_h">登 录</div>-->

    <!--<el-form ref="loginForm" :model="login" :rules="rules">-->
    <!--<el-form-item label="账号" prop="username">-->
    <!--<el-input v-model="login.username" placeholder="请输入员工号"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="密码" prop="password">-->
    <!--<el-input v-model="login.password" type="password" placeholder="请输入密码"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="" prop="rememberMe">-->
    <!--<el-checkbox v-model="login.rememberMe" :true-label="1" :false-label="2">记住密码</el-checkbox>-->
    <!--&lt;!&ndash;<a type="success" href="http://localhost:8090/branch/">忘记密码?</a>&ndash;&gt;-->
    <!--</el-form-item>-->
    <!--<el-form-item label="">-->
    <!--<el-button type="primary" style="width: 100%;" @click="signIn">登录</el-button>-->
    <!--</el-form-item>-->
    <!--</el-form>-->

    <!--<div class="lr_p">-->
    <!--还不是会员？<a tabindex="7" class="a2"-->
    <!--href="/register">免费注册</a>-->
    <!--</div>-->
    <!--<div class="mind">-->
    <!--温馨提示：为了避免耽误您的考试，遇到问题请及时联系管理教师。 <a tabindex="8" class="a" target="_blank"-->
    <!--href="#">查看详情</a>-->
    <!--</div>-->

    <!--</div>-->
    <!--</div>-->
    <!--<div class="lr_bm"></div>-->
    <!--</div>-->
    <!--<div class="footer f2">-->
    <!--<div class="in">-->
    <!--<p class="note nag">-->
    <!--<span>未经布谷科技同意，不得转载本网站信息及作品 | 布谷科技版权所有&copy;1999-2017</span>-->

    <!--</p></div>-->
    <!--</div>-->
  </div>
</template>


<script>
  export default {
    data() {
      return {}
    },
    methods: {}
  }
</script>


<style>
  .view {
    padding: 0px;
  }

  .clearfix:before, .clearfix:after {
    content: "";
    display: table;
    clear: both
  }

  .clearfix {
    *zoom: 1; /*ie6,7*/
  }

  .lrcon {
    width: 900px;
    margin: 0 auto;
    padding: 60px 0 20px;
    background: url(../../assets/img/bg_login.png) #fff center 70px no-repeat
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
    border-top: 1px pxtted #dddddd;
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
    float: left;
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

  .about {
    color: #00457d;
  }

  .about span {
    display: block;
  }

  .box-card {
    margin-bottom: 20px;
  }

  .item {
    font-size: 14px;
    padding-left: 15px;
    color: darkgray;
  }
</style>
