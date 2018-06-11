<template>
  <div class="login">
    <!--<div class="pro">-->
    <!--<div class="msg"><em id="warning"></em>最近有不法分子冒充布谷科技，让用户提供账户和密码。在此声明，我们绝不会通过电话、邮件或短信等形式询问用户名和密码。请用户提高警惕，增强自我保护意识。-->
    <!--</div>-->
    <!--</div>-->
    <div class="header">
      <div class="nag">
        <div class="in">
          <a href="/index.do"><img class="logo" width="40" height="40" src="../../assets/img/logo.png"
                                   alt="布谷培训"></a>
          <img class="slogen" width="180" height="25" src="../../assets/img/slogen.png" alt="在线考试就到布谷培训">

          <span class="gp" style="display:"></span>
          <span class="tl" style="display:">欢迎登录</span>
          <p class="nlink n2">
            <a href="/index.do">首页</a>
            <a href="/help/index.do" target="_blank">帮助中心</a>
          </p>
        </div>
      </div>
    </div>
    <div class="lrcon Fm">
      <div class="lrbox clearfix">
        <div class="lr_lf">
          <div class="lr_c">
            <label class="l5"></label>
            <div class="lr_cn">
              <p>便捷的数据管理</p>
              <div class="c_999 f12">使用office软件 兼容日常办公习惯</div>
            </div>
          </div>
          <div class="lr_c">
            <label class="l6"></label>
            <div class="lr_cn">
              <p>丰富的试题策略</p>
              <div class="c_999 f12">多种试题试卷策略 助您轻松出卷</div>
            </div>
          </div>
          <div class="lr_c">
            <label class="l7"></label>
            <div class="lr_cn">
              <p>实时的状态监控</p>
              <div class="c_999 f12">系统运行数据 实时输出</div>
            </div>
          </div>
          <div class="lr_c">
            <label class="l8"></label>
            <div class="lr_cn">
              <p>个性的管理系统</p>
              <div class="c_999 f12">按需定制系统参数 便捷管理</div>
            </div>
          </div>
        </div>

        <div class="lr_rt">
          <input type="hidden" name="lang" value="c"/>
          <input type="hidden" name="scode" value=""/>
          <div class="lr_h">登 录</div>

          <el-form ref="loginForm" :model="login" :rules="rules">
            <el-form-item label="账号" prop="username">
              <el-input v-model="login.username" placeholder="请输入员工号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="login.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="" prop="rememberMe">
              <el-checkbox v-model="login.rememberMe" :true-label="1" :false-label="2">记住密码</el-checkbox>
              <!--<a type="success" href="http://localhost:8090/branch/">忘记密码?</a>-->
            </el-form-item>
            <el-form-item label="">
              <el-button type="primary" style="width: 100%;" @click="signIn">登录</el-button>
            </el-form-item>
          </el-form>

          <div class="lr_p">
            还不是会员？<a tabindex="7" class="a2"
                     href="/register.do">免费注册</a>
          </div>
          <div class="mind">
            温馨提示：为了避免耽误您的考试，遇到问题请及时联系管理教师。 <a tabindex="8" class="a" target="_blank"
                                              href="#">查看详情</a>
          </div>

        </div>
      </div>
      <div class="lr_bm"></div>
    </div>
    <div class="footer f2">
      <div class="in">
        <p class="note nag">
          <span>未经布谷科技同意，不得转载本网站信息及作品 | 布谷科技版权所有&copy;1999-2017</span>

        </p></div>
    </div>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        login: {
          username: '',
          password: '',
          rememberMe: 1,
        },
        rules: {
          username: [
            {min: 3, max: 20, message: '请输入3-20位账号', trigger: 'blur'},
            {required: true, message: '请输入账号信息', trigger: 'blur'}
          ],
          password: [
            {min: 6, max: 16, message: '请输入6-16位密码', trigger: 'blur'},
            {required: true, message: '请输入密码信息', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
       signIn(){
         let _router = this.$router;
        this.$refs.loginForm.validate(async (valid) => {
          if(valid){
            let res = await this.http('/user/api/signIn.do', this.login);
            if(res){
              console.log("res:::", res);
              let token = res.token;
              let urls = res.urls;

              sessionStorage.setItem("urls", urls);
              //保存条目
              sessionStorage.setItem("token", token);
              this.$router.replace("/");
            }else{
              this.$message.error("用户名/密码错误");
            }
          }
        })
      }
    }
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
    border-top: 1px dotted #ddd
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


</style>
