<template>
  <div id="exam">
    <el-row :gutter="10">
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="scene.name" disabled>
            <template slot="prepend">考试名称</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="timeLeft" disabled>
            <template slot="prepend">剩余时间</template>
          </el-input>
        </el-form-item>
      </el-form>

    </el-row>

  </div>
</template>


<script>
  export default {
    data() {
      return {
        scene: {
          name: '测试',
        },
        timeLeft: '01:10:09'
      }
    },
    methods: {},
    created: function () {
      console.log("created")
    }
  }
</script>


<style>
  input.el-input__inner{
    color: cornflowerblue;
    background-color: rgba(64, 158, 255, 0.32);
  }
</style>
