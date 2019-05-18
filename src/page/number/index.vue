<template>
  <div class="entrance">
    <el-row>
      <el-col :span="20">
        <el-card class="box-card" style="margin-bottom: 10px;">
          <div class="clearfix">
            <el-input placeholder="凭条页数" type="number" min="10" max="100" v-model="count" class="input-with-select">
              <!--<el-button type="primary" slot="prepend" icon="el-icon-arrow-right" class="enter">开始练习-->
              <template slot="prepend">凭条页数</template>
              <el-button type="primary" slot="append" icon="iconfont tes-icon-next1" class="enter" @click="toInput()">开始练习
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
        count: 100,
      }
    },
    methods: {
      async toInput() {
        if (!this.count) {
          this.$message.warning("请输入凭条页数");
          return false;
        }
        this.$router.push("/practise/main?count=" + this.count);

      }
    },
    created: function () {

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
