<template>
  <div id="third">
    <el-form :inline="true" :model="record" class="demo-form-inline">
      <el-form-item label="名称">
        <el-input v-model="record.name" placeholder="名称"></el-input>
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
      console.log("step3: ", this.$parent.$data.record)
    }
  }
</script>


<style>

</style>
