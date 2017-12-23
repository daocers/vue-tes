<template>
  <div class="login">
    <div class="pro">
      <!--<div class="msg"><em id="warning"></em>最近有不法分子冒充布谷科技，让用户提供账户和密码。在此声明，我们绝不会通过电话、邮件或短信等形式询问用户名和密码。请用户提高警惕，增强自我保护意识。-->
      <!--</div>-->
    </div>
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
          <input type="hidden"  name="scode" value=""/>
          <div class="lr_h">登 录</div>
          <div class="errbox" style="display:none"><span class="err" >帐号或密码错误</span><span
            style="display:none" id="seekpwd">
                     ，是否 &nbsp;<a href="#">找回密码</a></span>
          </div>

          <el-form ref="login" :model="login" :rules="rules">
            <el-form-item label="账号" prop="username">
              <el-input v-model="login.username"  placeholder="请输入员工号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="login.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="" prop="rememberMe">
              <el-checkbox v-model="login.rememberMe" :true-label="1" :false-label="2">记住密码</el-checkbox>
              <!--<a type="success" href="http://localhost:8090/branch/">忘记密码?</a>-->
            </el-form-item>
            <el-form-item label="">
              <el-button type="primary" style="width: 100%;">登录</el-button>
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
    data(){
      return {
        login: {
          username: '',
          password: '',
          rememberMe: 1,
        },
        rules:{
          username:[
            {min:3, max: 20, message: '请输入3-20位账号', trigger: 'blur'},
            {required: true, message: '请输入账号信息', trigger: 'blur'}
          ],
          password:[
            {min:6, max: 16, message: '请输入6-16位密码', trigger: 'blur'},
            {required: true, message: '请输入密码信息', trigger: 'blur'}
          ]
        }
      }
    }
  }
</script>


<style>
  .view{
    padding: 0px;
  }

  .clearfix:before,.clearfix:after{content:"";display:table;clear:both}
  .clearfix{*zoom:1;/*ie6,7*/}

  .lrcon{width:1002px;margin:0 auto;padding:60px 0 20px;background:url(../../assets/img/bg_login.png) #fff center 70px no-repeat}
  .lrcon .lrbox{width:760px;margin:0 auto;background:url(../../assets/img/bg_lr.png) #fff repeat-y}
  .lrcon .lr_lf{float:left;width:159px;padding:50px 40px 0;border-top:10px solid #339bff
  }
  .lrcon .lr_rt{position:relative;float:left;width:440px;padding:0 40px 32px;border-top:10px solid #71bdff
  }
  .lrcon .lr_bm{width:760px;height:18px;margin:0 auto;background:url(../../assets/img/bg_lrbm.png) no-repeat}
  .lrcon .lr_ok input[type="checkbox"]{vertical-align:middle}
  .lrcon .lr_ok a{float:right}
  .lrcon .lr_c{position:relative;margin-bottom:60px;padding-left:50px}
  .lrcon .lr_c label{position:absolute;width:32px;height:32px;top:50%;left:0;margin-top:-16px;background:url(../../assets/img/icon_lr.png) no-repeat}
  .lrcon .lr_c label.l5{background-position:0 -140px}
  .lrcon .lr_c label.l6{background-position:0 -175px}
  .lrcon .lr_c label.l7{background-position:0 -210px}
  .lrcon .lr_c label.l8{background-position:0 -245px}
  .lrcon .lr_c .lr_cn p{color:#666;margin-bottom:5px}
  .lrcon .errbox{position:absolute;width:440px;height:26px;line-height:26px;font-size:12px;color:#ff6000;text-align:center;top:70px;left:40px;background-color:#fff2e3}
  .lrcon .errbox .err{float:none;background-position:0 1px}
  .lrcon .errbox a{color:#ff6000;text-decoration:underline}
  .lrcon .err,.lrcab .err,.lr_fb .err{float:right;font-size:12px;font-weight:normal;color:#ff6000;padding-left:20px;background:url(http://img01.51jobcdn.com/im/2016/form/error.png) 0 3px no-repeat}
  .lrcon .h,.lrcab .h{float:right}
  .lrcon .h p,.lrcab .h p{float:left;height:17px;line-height: 10px;font-weight:normal;text-align:center;padding:4px 5px 0;border-right: 1px solid #ffffff}
  .lrcon .mind{font-size:12px;color:#999;margin-top:30px;padding-top:20px;border-top:1px dotted #ddd}
  .lrcon.l2{background-image:url(../../assets/img/bg_register.png)}
  .lrcon.l2 .lr_h{text-align:left}
  .lrcon.l2 .lr_ok a{float:none}
  .en .lrcon .lr_lf{width:197px;padding:50px 21px 0}

  .lr_h{line-height:24px;font-size:24px;color: #339bff;text-align:center;padding:40px 0}
  .lr_h a{float:right;font-size:16px;color:#333}
  .lr_h a:hover{color: #339bff
  }
  .lr_h2{line-height:24px;color:#333;margin-bottom:40px}
  strong.lr_h2{display:block}
  strong.lr_h2 a{float:right;font-weight:normal}

  .lr_p{font-size:16px;color:#333;text-align:center;padding-top:10px}
  .lr_p a{padding-right:20px;background:url(../../assets/img/icon_go.png) right center no-repeat}

  .lr_e{color:#333;margin-bottom:20px}
  .lr_e label{display:block;line-height:20px;font-size:14px;font-weight:bold;color:#333;margin-bottom:10px}
  .lr_e .txt,.lr_e .txt .ef{height:40px;line-height:40px}
  .lr_e .txt .ef{width:401px;padding-right:37px}
  .lr_e .txt.pointer{padding-right:0}
  .lr_e .txt.pointer2 .ef{width:310px;padding-right:128px}
  .lr_e .m10{display:inline;margin-left:10px}
  .lr_e .icon_ok{position:absolute;width:36px;height:40px;text-align:center;top:0;right:0;background:url(http://img01.51jobcdn.com/im/2016/temp/icon_ok.png) center no-repeat}
  .lr_e .txt.pointer2 .hint{position:absolute;font-size:12px;color:#999;top:0;right:14px}
  .lr_e .ac{margin-left:20px;cursor:pointer}
  .lr_e .p_but{width:108px;height:40px;line-height:40px;margin-right:0}
  .lr_e.e2 .txt{float:left;width:318px}
  .lr_e.e2 .txt .ef{width:281px;padding-right:37px}
  .lr_e.e2 .txt.pointer2 .ef{width:218px;padding-right:100px}
  .lr_e .ic{top:11px}
  .en .lr_e .txt.pointer2 .ef{width:270px;padding-right:168px}
  .en .lr_e.e2 .txt.pointer2 .ef{width:198px;padding-right:120px}

  .lr_fb{width:630px;margin:80px auto}
  .lr_fb .lr_b{position:relative;width:520px;line-height:30px;color:#666;margin-bottom:20px;padding-left:110px}
  .lr_fb .lr_b label{position:absolute;width:60px;color:#333;text-align:right;text-align-last:right;top:0;left:10px}
  .lr_fb .lr_b i{position:absolute;height:18px;font-style:normal;top:2px;left:0;color:#ff6000}
  .lr_fb .lr_b textarea{display:block;#display:initial;width:508px;min-height:130px;overflow:auto;resize:none;padding:5px;background-color:#fff;border:1px solid #ddd}
  .lr_fb .btnbox{text-align:center;padding:20px 0}
  .lr_fb .p_but{width:110px;height:40px;line-height:40px;font-size:18px}
  .lr_fb .err{float:none;line-height:20px}

  .lrcab{width:440px;line-height:24px;margin:0 auto}
  .lrcab .btnbox{text-align:center;padding:20px 0}
  .lrcab .btnbox .p_but{width:438px;height:40px;line-height:40px;font-size:18px;margin:0}
  .lrcab .lr_tr{color:#666;text-align:right;margin-bottom:20px}

  .lr_tc{text-align:center}
  .lr_tc .lr_img{padding:80px 0 40px 0}
  .lr_tc .ltit{font-size:20px;font-weight:bold;color:#65bb00;margin-bottom:20px}
  .lr_tc .lmsg{line-height:28px;color:#333;margin-bottom:20px}

  .lr_step{width:760px;height:34px;line-height:34px;font-size:16px;color:#666;margin:0 auto;padding:40px 0;background:url(http://img01.51jobcdn.com/im/2016/temp/bg_gray.png) center no-repeat}
  .lr_step li{float:left;padding-left:110px}
  .lr_step li.on{color:#ff6000}
  .lr_step .step1{width:152px}
  .lr_step .step2{width:156px;margin-left:-15px}
  .lr_step .step3{width:152px;margin-left:-15px}
  .lr_step .step1.on{background:url(http://img01.51jobcdn.com/im/2016/temp/bg_step1.png) no-repeat}
  .lr_step .step2.on{background:url(http://img01.51jobcdn.com/im/2016/temp/bg_step2.png) no-repeat}
  .lr_step .step3.on{background:url(http://img01.51jobcdn.com/im/2016/temp/bg_step3.png) no-repeat}
  .en .lr_step{background-image:url(http://img01.51jobcdn.com/im/2016/temp/bg_gray_en.png)}
  .en .lr_step li{float:left;padding-left:80px}
  .en .lr_step .step1,.en .lr_step .step3{width:182px}
  .en .lr_step .step2{width:186px}
  .en .lr_step .step1.on{background:url(http://img01.51jobcdn.com/im/2016/temp/bg_step1_en.png) no-repeat}
  .en .lr_step .step2.on{background:url(http://img01.51jobcdn.com/im/2016/temp/bg_step2_en.png) no-repeat}
  .en .lr_step .step3.on{background:url(http://img01.51jobcdn.com/im/2016/temp/bg_step3_en.png) no-repeat}

  .lr_pop{position:relative;width:420px;height:274px;font-size:16px;color:#666;text-align:center;background-color:#fff}
  .lr_pop .lr_close{position:absolute;width:16px;height:16px;top:16px;right:20px;background:url(http://img01.51jobcdn.com/im/2016/pop/icon_close2.png) no-repeat;cursor:pointer}
  .lr_pop .lr_img{padding:30px 0 20px}
  .lr_pop .mb20{margin-bottom:20px}
  .lr_pop .p20{padding:20px 0}
  .lr_pop .btnbox{text-align:center;padding:20px}
  .lr_pop .p_but{width:220px;height:40px;line-height:40px;font-size:18px}

  .lr_d .h{line-height:36px;font-weight:bold;color:#333;padding:0 20px;background-color:#f7f7f7;border-bottom:1px dotted #ddd}
  .lr_d .p{line-height:28px;color:#666;padding:20px 20px 60px}

  .lr_o{color:#333;padding:0 20px}

  .fb_cked{height:254px;font-size:22px;color:#ea5800;text-align:center;margin:220px 0 0}
  .fb_cked img{position:relative;vertical-align:middle;top:-2px;margin-right:24px}
  .fb_cked a{font-size:14px;color:#ea5800;text-decoration:underline;margin-left:20px}

  /*标题*/
  .tit{line-height:20px;font-size:20px;color:#333;padding:30px 0 40px}
  .tit span{padding-left:20px;border-left:3px solid #ff6100}

  .pro{height:30px;line-height:30px;background-color:#fff2e3}
  .pro .msg{width:1002px;font-size:12px;color:#ff6000;text-indent:36px;margin:0 auto;background:url(http://img01.51jobcdn.com/im/2016/temp/icon_pro.png) -18px 0 no-repeat;}
  .pro .msg em{float:right;width:15px;height:30px;cursor:pointer;margin-right:10px;background:url(http://img01.51jobcdn.com/im/2016/temp/icon_pro.png) 0 0 no-repeat}

  /*日历样式调整*/
  .Fm .flbox{width:438px;top:40px}
  .Fm .fin{width:378px;*width:377px}
  .Fm .fin.f2,.Fm .fin.f3{width:438px;*width:437px}




  /*base.css*/
  .clearbox:after{display:block;height:0;content:'\00a0';overflow:hidden;clear:both}
  .clear{clear:both}
  .clear_left{clear:left}
  .clear_right{clear:right}
  .at{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}

  /*基本链接样式*/
  .a{cursor:pointer;color:#00457d}
  .a:link,.a:active,.a:visited{color:#00457d}
  .a:hover{color: #339bff
  }
  .a2{cursor:pointer;color: #339bff
  }
  .a2:link,.a2:active,.a2:visited{color: #339bff
  }
  .a2:hover{text-decoration:underline}
  .ahover{text-decoration:underline}

  /*底线*/
  .txline{text-decoration:underline}

  /*字体大小*/
  .f12{font-size:12px !important}
  .f14{font-size:14px !important}
  .f16{font-size:16px !important}
  .f18{font-size:18px !important}
  .f20{font-size:20px !important}
  .f22{font-size:22px !important}
  .f24{font-size:24px !important}
  .f26{font-size:26px !important}
  .f28{font-size:28px !important}
  .f30{font-size:30px !important}

  /*行高*/
  .lh20{line-height:20px !important}
  .lh30{line-height:30px !important}
  .lh40{line-height:40px !important}
  .lh50{line-height:50px !important}
  .lh60{line-height:60px !important}

  /*颜色*/
  .c_333{color:#333 !important}
  .c_666{color:#666 !important}
  .c_999{color:#999 !important}
  .c_bbb,
  .placeholder{color:#bbb !important}
  .c_blue{color:#00457d !important}
  .c_lblue{color:#7c8ea7 !important}
  .c_orange{color:#ff6000 !important}
  .c_yellow{color:#ff9f20 !important}

  /*框架结构*/
  .icon_arrow{width:16px;height:16px;background:url(http://img01.51jobcdn.com/im/2016/icon/arrow.png) no-repeat}
  .container{width:1002px;margin:0 auto}

  /*头部*/
  .header{position:relative;min-width:1002px;font:14px "Microsoft YaHei";z-index:998}
  .header p,.header ul{margin:0;padding:0}
  .header li{font-family:"Microsoft YaHei";list-style:none}
  .header a{font-family:"microsoft yahei" !important;color:#333;text-decoration:none}
  .header a:visited,.header a:active,.header a:link{color:#333}
  .header a:hover{color:#ff6000 !important}
  .header .e_icon{background:url(http://img01.51jobcdn.com/im/2016/icon/header.png) no-repeat}
  .header .in{width:1002px;margin:0 auto}
  .header .bar,.header .nag,.header .snag{position:relative;z-index:1}
  .header .bar{height:32px;line-height:32px;font-size:14px;background-color:#ff6000;z-index:2}
  .header .bar .icon_arrow{position:relative;display:inline-block;top:3px;*top:0;margin-left:3px;background-position:-16px 0}
  .header .bar a{font-size:14px !important}
  .header .language{float:left;width:48px;height:32px}
  .header .language ul{position:absolute;width:48px;height:32px;overflow:hidden}
  .header .language ul:hover{height:auto;background-color:#ea5800}
  .header .language ul:hover .tle em{background-position:-16px -16px}
  .header .language li{font-size:14px;cursor:pointer;border-left:1px solid #ddd;border-right:1px solid #ddd}
  .header .language li.tle{color:#fff;text-indent:9px;border:0 none}
  .header .language li.last{border-bottom:1px solid #ddd}
  .header .language a{display:block;color:#666;text-indent:8px;background-color:#fff}
  .header .language a:hover{background-color:#fff2e2}
  .header .app{float:left;width:106px;height:32px;color:#fff}
  .header .app ul{position:absolute;height:32px;overflow:hidden}
  .header .app ul:hover{height:153px;background-color:#ea5800}
  .header .app ul:hover .icon_arrow{background-position:-16px -16px}
  .header .app li{font-size:14px;padding:12px 12px 5px;cursor:pointer;background-color:#fff;border:1px solid #ddd;border-top:0 none}
  .header .app li:first-child{padding:0;background-color:transparent;border:0 none}
  .header .app li>a,.header .app li>a:hover{color:#fff !important}
  .header .app .e_icon{float:left;width:10px;height:14px;margin:9px 6px 0 10px;background-position:-15px -254px}
  .header .app img{vertical-align:top}
  .header .app p{width:80px;height:18px;line-height:18px;color:#666;text-align:center;clear:both;padding-top:5px}
  .header .app p a{color:#666}
  .header .l{float:left;color:#fff;margin:0 5px}
  .header .rlk{float:right;height:32px;margin-left:15px}
  .header .rlk a,.header .rlk a:hover{font-size:14px;color:#fff !important}
  .header .rlk .l{float:none;margin:0 15px}
  .header .uer .op{float:left;width:140px;height:32px;font-size:14px;color:#fff;text-align:center;background-color:#ffa000}
  .header .uer .op a{color:#fff}
  .header .uer .op a:hover{color:#fff !important;text-decoration:underline}
  .header .uer .l{position:absolute;left:140px;margin:0;z-index:2}
  .header .uer{position:relative;width:280px;float:right}
  .header .uer ul{position:absolute;right:0;top:0;width:140px;height:32px;overflow:hidden;background-color:#ffa000;z-index:1}
  .header .uer ul:hover{overflow:visible;background-color:#ff8900;z-index:3}
  .header .uer ul:hover .tle em{background-position:-16px -16px}
  .header .uer li{height:40px;line-height:40px;cursor:pointer;background-color:#fff;border-left:1px solid #ddd;border-right:1px solid #ddd}
  .header .uer li.tle{height:32px;line-height:32px;color:#fff;text-align:center;background-color:transparent;border:0 none}
  .header .uer li.e_icon:hover{background-color:#fff2e1}
  .header .uer li.last{border-top:1px solid #ddd;border-bottom:1px solid #ddd}
  .header .uer li.last2{border-bottom:1px solid #ddd}
  .header .uer li>a{display:block;height:40px;font-size:14px;color:#666;text-indent:36px}
  .header .uer li>a:hover{color:#ff6000}
  .header .uer li span a{color:#fff !important}
  .header .uer .point{background-image:url(http://img01.51jobcdn.com/im/2016/icon/point.png);background-repeat:no-repeat;background-position:120px 5px}
  .header .uer .e2{background-position:0 -40px}
  .header .uer .e3{background-position:0 -80px}
  .header .uer .e4{background-position:0 -120px}
  .header .uer .e5{background-position:0 -160px}
  .header .uer .e6{background-position:0 -200px}
  .header .uer .uname{display:inline-block;max-width:100px;height:32px;padding-left:26px;background-position:-11px -284px}
  .header .nag,.header .snag{height:56px;line-height:56px;background-color:#fff;border-bottom:1px solid #ddd}
  .header .nag .logo{float:left;margin-top:8px}
  .header .nag .nlink{float:right}
  .header .nag .nlink a{float:left;height:56px;font-size:16px;margin-left:40px}
  .header .nag .nlink .on{height:52px;font-weight:bold;color:#ff6000;border-bottom:4px solid #ff6000}
  .header .nag .nlink.n2 a{font-size:14px;margin-left:30px}
  .header .nag .nlink.n2 .on{border-bottom:0 none}
  .header .nag .tl{float:left;font-size:22px;color:#333}
  .header .gp{float:left;width:1px;height:22px;font-size:0;margin:17px 10px 0;background-color:#ddd}
  .header .slogen{float:left;margin:20px 0 0 10px}
  .header .city{position:relative;float:left;font-size:16px;color:#ff6000;cursor:pointer;margin-left:20px;padding-right:16px}
  .header .city em{position:absolute;top:50%;right:0;margin-top:-6px;background-position:-32px 0}
  .header .ctlink{float:left;font-size:14px;color:#999;margin-left:10px}
  .header .snag{height:35px;line-height:35px}
  .header .snag a{color:#666}
  .header .snag .nlink{float:left}
  .header .snag .nlink a{float:left;height:35px;font-size:14px;margin-left:13px}
  .header .snag .nlink.n2 a{margin-left:30px}
  .header .snag .nlink a:first-child{margin-left:0}
  .header .snag .nlink .on{height:33px;color:#ff6000;border-bottom:2px solid #ff6000}
  .header .snag .nlink.green a:hover{color:#65bb00}
  .header .snag .nlink.green .on{color:#65bb00;border-color:#65bb00}
  .header .snag .nlink.dgreen a:hover{color:#087b3a}
  .header .snag .nlink.dgreen .on{color:#087b3a;border-color:#087b3a}
  .header .snag .more{float:right;font-size:12px;color:#65bb00}
  .header .snag .more:hover{text-decoration:underline}
  .header .sign{float:right;width:110px;color:#ff6000;text-indent:40px;cursor:pointer;background-color:#fff2e3;background-position:0 -322px}
  .header .sign:hover{background-color:#ffe8cd}
  .header .note{position:relative}
  .header .note em{position:absolute;top:50%;right:-18px;margin-top:-8px;background-position:0 0}
  .header .note:hover span{display:block}
  .header .note:hover em{background-position:0 -16px}
  .header .note span{display:none;position:absolute;width:155px;top:35px;left:-10px;border:1px solid #ddd}
  .header .note i{display:block;height:36px;line-height:36px;font-style:normal;text-indent:9px;color:#666;cursor:pointer;background-color:#fff}
  .header .note i:first-child{border-bottom:1px solid #ddd}
  .header .note i:hover{color:#fff;background-color:#ff6000}
  .header .note.mk span,.header .note.mk i:first-child{border-color:#ff6000}
  .header.fix{position:fixed;display:none;width:100%;top:0;left:0}
  .header.fix .bar{height:50px;line-height:50px;background:rgba(255,96,0,.9)}
  .header.fix .slogen{margin:16px 0 0 40px}
  .header.fix .dicon{background:url(http://img01.51jobcdn.com/im/jobs/list_icon_dw.png) no-repeat}
  .header.fix .el{position:relative;float:left;height:30px;line-height:30px;top:10px;left:110px}
  .header.fix .el.on .ul{width:auto;right:0;left:0}
  .header.fix .el ul{position:absolute;width:74px;height:30px;line-height:30px;color:#333;overflow:hidden;cursor:pointer;top:0;left:0;border:1px solid transparent;border-radius:2px;z-index:1}
  .header.fix .el ul em{position:absolute;width:10px;height:6px;top:12px;right:8px;background-position:-170px -60px !important}
  .header.fix .el ul.on{height:60px;background-color:#fff;border-color:#eee;z-index:5}
  .header.fix .el ul.on li{height:30px}
  .header.fix .el ul.on em{top:11px;background-position:-150px -60px !important}
  .header.fix .el li{font-size:14px;text-indent:16px}
  .header.fix .el li a{display:block;height:33px;color:#333}
  .header.fix .el li:hover{background-color:#eee}
  .header.fix .el li:hover a,.header.fix .el li a:hover{color:#333 !important}
  .header.fix .el .ipt{position:relative;float:left;width:380px;height:24px;padding:3px 0 3px 75px;background-color:#fff}
  .header.fix .el .mytxt{float:left;width:100%;height:24px;line-height:24px;font:14px/24px "Microsoft YaHei";color:#333;text-align:left;text-indent:12px;padding:0;border:0 none;border-left:1px solid #ddd;border-right:1px solid #ddd}
  .header.fix .el .addbut{float:left;width:105px;height:30px;font-size:14px;font-family:"Microsoft YaHei";color:#333;cursor:pointer;background-color:#fff}
  .header.fix .el .addbut input{float:left;width:73px;height:30px;line-height:30px;color:#333;cursor:pointer;margin-left:5px;background-color:#fff;border:0 none}
  .header.fix .el .addbut:hover,.header.fix .el .addbut:hover input{background-color:#eee}
  .header.fix .el .addbut em{float:right;width:10px;height:10px;margin:10px 13px 0 0;background-position:-75px -85px}
  .header.fix button{float:right;width:120px;height:30px;line-height:28px;#line-height:25px;font-size:16px;color:#fff;cursor:pointer;margin-top:10px;background-color:#ff6000;border:1px solid #fff}
  .header.fix button:hover{background-color:#ff8900}

  .en .header .nag .nlink a{margin-left:20px}
  .en .header .uer ul:hover .e_icon{width:228px}
  .en .header .uer .e_icon .point{background-position:200px 5px}
  .en .header.fix .el ul{width:98px}
  .en .header .el .ipt{width:357px;padding-left:98px}
  /*底部*/
  .footer{clear:both;min-width:1002px;font:12px "Microsoft YaHei";background-color:#fff}
  .footer{color:#999;padding:35px 0;border-top:1px solid #ddd}
  .footer a,.footer *{font-size:12px !important;font-family:"Microsoft YaHei" !important}
  .footer a{text-decoration:none}
  .footer img{vertical-align:top}
  .footer .in,
  .license .in{width:1002px;margin:0 auto}
  .footer .nag{margin-bottom:15px}
  .footer .nag a{color:#999}
  .footer .nag a:hover{color: #339bff
  }
  .footer .nag .e{float:left;width:120px;line-height:24px;}
  .footer .nag .e_first{position:relative;width:230px;padding-left:74px}
  .footer .nag label{position:absolute;width:70px;font-size:14px;text-align:right;left:0;*margin-top:-5px}
  .footer .nag strong{font-weight:normal;color:#333}
  .footer .code{float:left;width:80px;padding-top:5px}
  .footer .code span{display:block;text-align:center;margin-top:10px}
  .footer .c_first{margin-right:58px}
  .footer .note{position:relative;line-height:24px;text-align:center;margin:0;padding:0}
  .footer .note span{position:relative;display:inline-block;font-size:12px;padding:0 5px;z-index:2}
  .footer.f2{border-top:0 none}
  .footer.fixbottom{position:absolute;width:100%;bottom:0;left:0}
  .license{text-align:center;margin-top:-25px;padding-bottom:68px;background-color:#fff}
  .license a,.license *{font-size:12px;font-family:"Microsoft YaHei" !important}
  .license a{position:relative;display:inline-block;text-decoration:none;margin:0 20px}
  .license span{position:absolute;width:70px;line-height:14px;font-size:12px;color:#999;top:42px;left:50%;margin-left:-35px}
  .license .note{line-height:24px;text-align:center;margin:0;padding:0}
  .license .note .gan{display:inline-block;height:20px;line-height:20px;color:#999;margin-bottom:20px;padding-left:25px;background:url(http://img01.51jobcdn.com/im/2016/license/gongan.png) no-repeat}
  .license .note .gan:hover{color:#ff6000}
  .en .footer .nag .e_first{padding-left:126px}
  .en .footer .nag label{width:122px}
  .en .footer .c_first{margin-right:6px}
</style>
