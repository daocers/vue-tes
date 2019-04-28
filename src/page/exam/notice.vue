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
            <h5 v-if="scene.receiptCount > 0"> 凭条{{scene.receiptCount}}张, 数字长度 {{scene.numberLength}};</h5>
          <h4 v-if="scene.changePaper == 1">三、本场考试允许更换试卷一次，更换后第一份试卷作废，所答成绩作废;</h4>
          <h4 v-if="scene.changePaper == 2">三、本场考试不允许更换试卷;</h4>
          <h4>四、考试规则，请遵守考试纪律;</h4>
        </div>

        <el-button type="danger" plain @click="exit()">退出咨询</el-button>
        <el-button type="primary" @click="toExam()">开始考试</el-button>
      </el-card>
    </el-col>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        scene: {},
      }
    },
    methods: {
      exit() {
        this.$router.push("/exam");
      },

      // enterCode(){
      //   let scene = JSON.parse(sessionStorage.getItem("scene"))
      //   if(scene && scene.authCode){
      //     this.$router.push("/exam/entrance?id=" + this.sceneId)
      //   }else{
      //     this.$router.push("/")
      //   }
      // },
      async toExam() {
        //校验场次状态
        let res = await this.doPost("/exam/api/canAccess", {sceneId: this.scene.id, authCode: this.scene.authCode}, "form");
        console.log("res:", res);
        if (res && res.result && res.code == 0) {
          console.log("准备考试生成试卷")
          let paperId = await this.postParam("/exam/api/getPaper", {
            sceneId: this.scene.id,
            authCode: this.scene.authCode
          }, 10000);
          if (paperId) {
            sessionStorage.setItem("paperId", paperId);
            this.$router.push("/exam/main?id=" + this.scene.id + "&paperId=" + paperId);
          } else {
            this.$alert("生成试卷失败，请重试");
          }
        } else {

          this.$notify.warning(res.message, "提示", {
            confirmButtonText: '确定',
            callback: action => {
              if (res.code != 0) {
                this.$router.push("/exam")
              }
            }
          });
          return false;
        }


      }
    },
    created: function () {
      console.log("created")

      let info = sessionStorage.getItem("scene");
      if(info){
        let scene = JSON.parse(info);
        scene.authCode = sessionStorage.getItem("authCode");
        this.scene = scene;
      }else{
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
