<template>
  <div id="steps">

    <el-form :inline="true" :model="record"  class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input v-model="record.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="record.region" placeholder="活动区域">
          <el-option label="区域一" value="1"></el-option>
          <el-option label="区域二" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="age">
        <el-input v-model="record.obj.age"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="record.name" placeholder="名称"></el-input>
      </el-form-item>
    </el-form>
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
        <el-button type="info" @click="commit()">提交信息</el-button>
        <el-button type="warning" @click="prev()">警告按钮</el-button>
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
          region: ["1"],
          obj:{
            age: 1,
            num: 2
          }
        },
        step: 1
      }
    },
    methods: {
      next: function () {
        this.step = this.step + 1;
        this.$router.push({path: '/step/step' + this.step });
      },
      prev: function () {
        this.step = this.step - 1;
        this.$router.back(-1)
      },
      commit: function () {
        var res = JSON.stringify(this.record);
        console.log("res: ", res)
      }
    }
  }
</script>


<style>

</style>
