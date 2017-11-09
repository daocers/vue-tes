<template>
  <div id="second">
    <el-form :inline="true" :model="record" class="demo-form-inline">
      <el-form-item label="活动区域">
        <el-select v-model="record.region" placeholder="活动区域">
          <el-option label="区域一" value="1"></el-option>
          <el-option label="区域二" value="2"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        record: {

        }
      }
    },
    created: function () {
      this.record = this.$parent.$data.record;
      console.log("step2: ", this.$parent.$data.record)
    }
  }
</script>


<style>

</style>
