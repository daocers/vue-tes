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
      }
    },
    methods: {
      toNotice(){
        this.$router.push("/exam/notice");
      }
    },
    created: function () {

    }
  }

</script>


<style>
  .box-card{
    margin: 80px;
    padding: 80px;
  }
</style>
