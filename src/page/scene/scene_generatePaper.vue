<template>
  <!--<div id="paper">-->
    <!--<el-form ref="form" :model="" label-width="80px">-->
      <!--<el-form-item label="试卷策略">-->
        <!--<el-select v-model="" placeholder="请选择活动区域">-->
          <!--<el-option label="随机策略一" value="shanghai"></el-option>-->
          <!--<el-option label="固定策略二" value="beijing"></el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
    <!--</el-form>-->
  <!--</div>-->
  <div>
    <el-form-item label="试卷类型">
      <el-input v-model="scene.paperType"></el-input>
    </el-form-item>
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
  </div>
</template>

<script type="text/javascript">
  export default {
    data: function () {
      return {
        scene: {

        }
      }
    },
    created: function () {
      console.log("created...")
      this.scene = this.$parent.$data.scene;
    }
  }
</script>

<style>

</style>
