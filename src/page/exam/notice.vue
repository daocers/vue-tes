<template>
  <div id="notice">
    <el-col :span="16" :offset="4">
      <el-card style="margin-bottom: 10px;">
        <div class="">
          <h3>考试须知：</h3>
          <h4>一、本场考试为：{{scene.name}}, 考试编号：{{scene.code}};</h4>
          <h4>二、本场考试试卷结构如下：</h4>
            <h5 v-if="scene.singleCount > 0"> 单选{{scene.singleCount}}题, 每题 {{scene.singleScore}}分;</h5>
            <h5 v-if="scene.multiCount > 0"> 多选{{scene.multiCount}}题, 每题 {{scene.multiScore}}分;</h5>
            <h5 v-if="scene.judgeCount > 0"> 判断{{scene.judgeCount}}题, 每题 {{scene.judgeScore}}分;</h5>
          <h4 v-if="scene.changePaper == 1">三、本场考试允许更换试卷一次，更换后第一份试卷作废，所答成绩作废;</h4>
          <h4 v-if="scene.changePaper == 2">三、本场考试不允许更换试卷;</h4>
          <h4>四、考试规则，请遵守考试纪律;</h4>
        </div>

        <el-button type="danger" plain @click="exit()">退出咨询</el-button>
        <el-button type="primary" @click="enterCode()">进入考试</el-button>
      </el-card>
    </el-col>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        sceneId: null,
        scene: {},
      }
    },
    methods: {
      exit() {
        this.$router.push("/exam");
      },
      enterCode(){
        this.$router.push("/exam/entrance?id=" + this.sceneId)
      },
      // async toExam() {
      //   console.log("准备考试生成试卷")
      //   let paperId = await this.postParam("/exam/api/getPaper", {sceneId: this.sceneId}, 10000);
      //   if (paperId) {
      //     sessionStorage.setItem("paperId", paperId);
      //     this.$router.push("/exam/main?id=" + this.sceneId + "&paperId=" + paperId);
      //   } else {
      //     this.$alert("生成试卷失败，请重试");
      //   }
      // }
    },
    created: function () {
      console.log("created")
      let sceneId = this.$route.query.id;
      if (sceneId) {
        this.sceneId = sceneId;
        let info = sessionStorage.getItem("scene");
        if(info){
          this.scene = JSON.parse(info);
        }
      } else {
        this.$router.replace("/exam")
      }
    }
  }
</script>


<style scoped>
  h5{
    margin-left: 35px;
  }
</style>
