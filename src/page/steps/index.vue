<template>
  <div id="steps">
    <el-steps :active="1" finish-status="success" simple style="margin-top: 20px">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
    </el-steps>

    <router-view class="view" :record="record"></router-view>

    <div class="btn-group">
      <div>
        <el-button @click="next()">下一步</el-button>
        <!--<el-button type="primary">主要按钮</el-button>-->
        <!--<el-button type="success">成功按钮</el-button>-->
        <!--<el-button type="info">信息按钮</el-button>-->
        <!--<el-button type="warning">警告按钮</el-button>-->
        <!--<el-button type="danger">危险按钮</el-button>-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
//    props: ['record'],
    data: function () {
      return {
        record: {
          name: 'allen',
          user: 'daocers',
          region: [1]
        },
        step: 1
      }
    },
    methods: {
      next: function () {
        this.step++;
        this.$router.push({path: '/step/step' + this.step });
      },
    }
  }
</script>


<style>

</style>
