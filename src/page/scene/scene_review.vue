<template>
  <div id="review">
    <el-tag style="margin-top: 10px;">基本信息</el-tag><router-link class="view-link" to="/scene">修改</router-link>
    <div class="grid-content">
      <el-form label-position="left" inline class="demo-table-expand">
        <el-form-item label="场次名称">
          <span>{{scene.name}}</span>
        </el-form-item>
        <el-form-item label="场次编码">
          <span>{{ scene.code }}</span>
        </el-form-item>
        <el-form-item label="考试时长(分钟)">
          <span>{{ scene.duration }}</span>
        </el-form-item>
        <el-form-item label="递延时间(分钟)">
          <span>{{ scene.delay }}</span>
        </el-form-item>
        <el-form-item label="开始时间">
          <span>{{ scene.beginTime }}</span>
        </el-form-item>
        <el-form-item label="封场时间">
          <span>{{ scene.endTime }}</span>
        </el-form-item>
        <el-form-item label="试卷类型">
          <span>{{ scene.paperGenerateType }}</span>
        </el-form-item>
        <el-form-item label="允许换卷">
          <span>{{ scene.changePaper }}</span>
        </el-form-item>
        <el-form-item label="识别码">
          <span>{{ scene.authCode }}</span>
        </el-form-item>
      </el-form>
    </div>

    <el-tag style="margin-top: 10px;">试卷策略</el-tag><router-link class="view-link" to="/scene/paper">修改</router-link>
    <div class="grid-content">
      <el-form label-position="left" inline class="demo-table-expand">
        <el-form-item label="场次名称">
          <span>{{scene.paperPolicyContent}}</span>
        </el-form-item>
      </el-form>
      <!--<el-row>-->
        <!--<el-col :span="24"><div class="grid-content bg-purple-dark">策略详情： {{scene.paperPolicyContent}}</div></el-col>-->
      <!--</el-row>-->
    </div>

    <el-tag style="margin-top: 10px;">参考人员</el-tag><router-link class="view-link" to="/scene/user">修改</router-link>
    <div class="grid-content">
      <el-form label-position="left" inline class="demo-table-expand">
        <el-form-item label="考生分布">
          <span>{{scene.joinUserContent}}</span>
        </el-form-item>
      </el-form>
      <!--<el-row>-->
        <!--<el-col :span="24"><div class="grid-content bg-purple-dark">考生分布： {{scene.joinUserContent}}</div></el-col>-->
      <!--</el-row>-->
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

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
