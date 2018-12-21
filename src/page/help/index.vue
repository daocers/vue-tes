<template>
  <div>
    <el-row>
      <el-card class="box-card">
        <div slot="header">
          <span>快速通道</span>
          <span style="float: right; padding: 3px 0; color: #66b1ff;" type="text">>></span>
        </div>
        <el-row>
          <el-col :span="6">
            <div class="fast-item item-1" >
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
          <div class="title">登录失败<i class="header-icon el-icon-info"></i></div>
        </template>
        <div class="item">1 确定用户名密码是否正确；</div>
        <div class="item">2 用户名正确情况下无法登录，联系管理员重置密码；</div>
        <div class="item">3 获取默认密码后修改密码，然后重新登录;</div>
      </el-collapse-item>
      <el-collapse-item>
        <template slot="title">
          <div class="title">我想参加考试<i class="header-icon el-icon-info"></i></div>
        </template>
        <div class="item">1 根据通知，找到您想参加的考试；</div>
        <div class="item">2 询问考试组织者获取场次验证码；</div>
        <div class="item">3 阅读考试须知后点击进场考试；</div>
        <div class="item">4 考试完毕后，提交试卷；</div>
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

      <el-collapse-item >
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
</template>

<script>
  export default {
    name: "index",
    data(){
      return {

      }
    },
    methods:{
      forgetPassword(){
        console.log("ddf")
        this.$router.push({path:"/user"})
      },
      fastOpen(){
        this.$router.push({path:'/scene/open'})
      },
      questionTypeManage(){
        this.$router.push({path:'/questionType/manage'})
      },
      queryMark(){
        this.$router.push({path: '/paper'})
      }
    }
  }
</script>

<style scoped>
  .box-card{
    margin-bottom: 20px;
  }
  /*.box-card .header{*/
    /*font-size: 16px;*/
    /*color: #606266;*/
  /*}*/

  .fast-item{
    border-radius: 8px;
    height: 80px;
    width: 80%;
    margin: 10px;
    border: 1px solid whitesmoke;
    align-content: center;
    text-align: center;
  }
  .fast-item:hover{
    cursor: pointer;
  }
  .fast-item span{
    line-height: 80px;
    /*vertical-align: middle;*/
    color: white;
    font-size: 20px;
  }

  .item-1{
    background-color: #F56C6C;
  }
  .item-2{
    background-color: #E6A23C;
  }
  .item-3{
    background-color: #409EFF;
  }
  .item-4{
    background-color: #67C23A;
  }
  .title {
    font-size: 16px;
    color: #606266;
    padding-left: 5px;
  }

  .item {
    font-size: 14px;
    padding-left: 15px;
    color: darkgray;
  }
</style>
