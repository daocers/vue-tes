<template>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="info">
          <div class="icon"><i class="el-icon-tickets"></i> </div>
          <div class="content">新增试题100</div>
        </div>

      </el-col>
      <el-col :span="8">better</el-col>
      <el-col :span="8">best</el-col>
    </el-row>
</template>

<script>
    export default {
        name: "summary"
    }
</script>

<style scoped>
  .info{
    height: 80px;
    width: 100%;
    border-radius: 5px;
  }
  .info > .icon{
    height: 80px;
    width: 80px;
    background-color: #409EFF;
    color: white;
    display: inline-block;
  }

  .info > .content{
    height: 80px;
    font-size: 20px;
    display: inline-block;
  }
</style>
