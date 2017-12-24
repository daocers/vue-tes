<template>
  <div class="entrance">
    <el-row>
      <el-col :span="16">
        <el-card class="box-card" style="margin-bottom: 10px;">
          <div class="clearfix">
            <el-input placeholder="请输入场次授权码" v-model="authCode" class="input-with-select">
              <el-button slot="append" icon="el-icon-arrow-right" @click="toNotice()">进入考试</el-button>
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
      async toNotice() {
        let data = await this.http("/exam/api/checkAuthCode.do?authCode=" + this.authCode + "&sceneId=" + this.sceneId);
        if(data){
          this.$router.push("/exam/notice?id=" + this.sceneId);
        }else{
//          this.$message.error("场次授权码输入错误");
          return false;
        }
      }
    },
    created: function () {
      let sceneId = this.$route.query.id;
      console.log("sceneId:::", sceneId);
      if(sceneId){
        this.sceneId = sceneId;
      }else{
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
</style>
