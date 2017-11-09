<template>
  <div id="first">
    <el-form :inline="true" :model="record"  class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input v-model="record.user" placeholder="审批人"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        record:{
        }
      }
    },
    created: function () {
      this.record = this.$parent.$data.record;
      console.log("created...")
      console.log("router： {}", this.$router)
      console.log("step1: ", this.$parent.$data.record)
    }
  }
</script>


<style>

</style>
