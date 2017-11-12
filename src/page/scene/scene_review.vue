<template>
  <div id="review">
    <el-tag style="margin-top: 10px;">基本信息</el-tag><router-link class="view-link" to="/scene">修改</router-link>
    <div class="grid-content">
      <el-row>
        <el-col :span="12"><div class="grid-content bg-purple-dark">场次名称： {{scene.name}}</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-dark">场次编码: {{scene.code}}</div></el-col>
      </el-row>

      <el-row>
        <el-col :span="12"><div class="grid-content bg-purple-dark">考试时长(分钟): {{scene.duration}}</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-dark">递延时间(分钟): {{scene.delay}}</div></el-col>
      </el-row>

      <el-row>
        <el-col :span="12"><div class="grid-content bg-purple-dark">开始时间: {{scene.beginTime}}</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-dark">封场时间: {{scene.endTime}}</div></el-col>
      </el-row>

      <el-row>
        <el-col :span="12"><div class="grid-content bg-purple-dark">试卷类型: {{scene.paperGenerateType}}</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-dark">允许换卷: {{scene.changePaper}}</div></el-col>
      </el-row>

      <el-row>
        <el-col :span="12"><div class="grid-content bg-purple-dark">识别码: {{scene.authCode}}</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-dark"></div></el-col>
      </el-row>
    </div>

    <el-tag style="margin-top: 10px;">试卷策略</el-tag><router-link class="view-link" to="/scene/paper">修改</router-link>
    <div class="grid-content">
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark">策略详情： {{scene.paperPolicyContent}}</div></el-col>
      </el-row>
    </div>

    <el-tag style="margin-top: 10px;">参考人员</el-tag><router-link class="view-link" to="/scene/user">修改</router-link>
    <div class="grid-content">
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark">考生分布： {{scene.joinUserContent}}</div></el-col>
      </el-row>
    </div>
  </div>

</template>

<script type="text/javascript">
  import ElRow from "element-ui/packages/row/src/row";

  export default {
    components: {ElRow},
    data: function () {
      return {
        scene: {

        }
      }
    },
    created: function () {
      console.log("created...")
      this.scene = this.$parent.$data.scene;
      this.scene.name = 'test'
    }
  }
</script>

<style>

  .grid-content {
    min-height: 36px;
    background-color: #f9fafc;
    /*border-right: 1px solid #e5e9f2;*/
    padding-left: 3px;
    line-height: 36px;
  }
  .view-link{
    margin-bottom: 0px;
    padding-bottom: 0px;
    line-height: 32px;
  }
</style>
