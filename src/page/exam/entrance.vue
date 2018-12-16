<template>
  <div class="entrance">
    <el-row>
      <el-col :span="20">
        <el-card class="box-card" style="margin-bottom: 10px;">
          <div class="clearfix">
            <el-input placeholder="请输入场次授权码" v-model="authCode" class="input-with-select">
              <el-button type="primary" slot="append" icon="el-icon-arrow-right" class="enter" @click="toExam()">进入考试
              </el-button>
            </el-input>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>


<script>
  export default {
    data() {
      return {
        authCode: '',
        sceneId: null,
      }
    },
    methods: {
//       async toNotice() {
//         let data = await this.postEntity("/exam/api/checkAuthCode?authCode=" + this.authCode + "&sceneId=" + this.sceneId);
//         if(data){
//           this.$router.push("/exam/notice?id=" + this.sceneId);
//         }else{
// //          this.$message.error("场次授权码输入错误");
//           return false;
//         }
//       },
      async toExam() {
        //校验场次状态
        let res = await this.doPost("/exam/api/canAccess", {sceneId: this.sceneId, authCode: this.authCode}, "form");
        console.log("res:", res);
        if (res && res.result && res.code == 0) {
          console.log("准备考试生成试卷")
          let paperId = await this.postParam("/exam/api/getPaper", {
            sceneId: this.sceneId,
            authCode: this.authCode
          }, 10000);
          if (paperId) {
            sessionStorage.setItem("paperId", paperId);
            this.$router.push("/exam/main?id=" + this.sceneId + "&paperId=" + paperId);
          } else {
            this.$alert("生成试卷失败，请重试");
          }
        } else {
          this.$alert(res.message, "提示", {
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
      let sceneId = this.$route.query.id;
      console.log("sceneId:::", sceneId);
      if (sceneId) {
        this.sceneId = sceneId;
      } else {
        console.error("无法获取到场次id");
        this.$router.replace("/exam/");
      }

    }
  }

</script>


<style>
  .box-card {
    margin: 80px;
    padding: 80px;
  }

  .enter {
    border: 1px #409eff;
    background-color: #409EFF !important;
    color: white !important;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
</style>
