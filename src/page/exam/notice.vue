<template>
  <div id="notice">
    <el-col :span="16">
      <el-card style="margin-bottom: 10px;">
        <div class="clearfix">
          <h3>考试须知：</h3>
          <h4>一、本场考试为：三综合第一场</h4>
          <h4>二、本场考试有题型 单选：10， 多选：10，判断：10，交易：5</h4>
          <h4>三、本场考试允许更换试卷一次，更换后第一份试卷作废，所答成绩作废</h4>
          <h4>四、考试规则，请遵守考试纪律</h4>
        </div>

        <el-button type="danger" plain @click="exit()">退出咨询</el-button>
        <el-button type="primary" @click="toExam()">进入考试</el-button>
      </el-card>
    </el-col>
  </div>
</template>


<script>
  export default {
    data(){
      return {
        sceneId: null,
      }
    },
    methods:{
      exit(){
        this.$router.push("/");
      },
      toExam(){
        this.$router.push("/exam/main?id=" + this.sceneId);
      }
    },
    created: function () {
      console.log("created")
      let sceneId = this.$route.query.id;
      if(sceneId){
        this.sceneId = sceneId;
      }else{
        this.$router.replace("/exam")
      }
    }
  }
</script>


<style>

</style>
