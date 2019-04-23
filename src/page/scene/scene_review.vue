<template>
  <div id="review">
    <el-tag style="margin-top: 10px;">基本信息</el-tag>
    <a type="success" href="#" @click="toSetting()">修改</a>
    <div class="grid-content">
      <el-form label-position="left" inline class="demo-table-expand" label-width="120px">
        <el-form-item label="场次名称">
          <span>{{$parent.$data.scene.name}}</span>
        </el-form-item>
        <el-form-item label="场次编码">
          <span>{{ $parent.$data.scene.code }}</span>
        </el-form-item>
        <el-form-item label="考试时长(分钟)">
          <span>{{ $parent.$data.scene.duration }}</span>
        </el-form-item>
        <el-form-item label="递延时间(分钟)">
          <span>{{ $parent.$data.scene.delay }}</span>
        </el-form-item>
        <el-form-item label="开始时间">
          <span>{{ $parent.$data.scene.beginTime }}</span>
        </el-form-item>
        <el-form-item label="封场时间">
          <span>{{ $parent.$data.scene.endTime }}</span>
        </el-form-item>
        <el-form-item label="试卷类型">
          <span>{{ $parent.$data.scene.paperGenerateType }}</span>
        </el-form-item>
        <el-form-item label="允许换卷">
          <span>{{ $parent.$data.scene.changePaper }}</span>
        </el-form-item>
        <el-form-item label="识别码">
          <span>{{ $parent.$data.scene.authCode }}</span>
        </el-form-item>
      </el-form>
    </div>

    <el-tag style="margin-top: 10px;">试卷策略</el-tag>
    <a type="success" href="#" @click="toPaper()">修改</a>
    <div class="grid-content">
      <el-form label-position="left" inline class="demo-table-expand">
        <el-form-item label="策略名称">
          <span>{{paperPolicy.name}}</span>
        </el-form-item>
        <el-form-item label="策略编码">
          <span>{{paperPolicy.code}}</span>
        </el-form-item>
        <el-form-item label="策略明细">
          <span>{{paperPolicy.content}}</span>
        </el-form-item>
        <el-form-item label="题量">
          <span>{{paperPolicy.count}}</span>
        </el-form-item>
        <el-form-item label="总分值">
          <span>{{paperPolicy.score}}</span>
        </el-form-item>
      </el-form>
      <!--<el-row>-->
      <!--<el-col :span="24"><div class="grid-content bg-purple-dark">策略详情： {{scene.paperPolicyContent}}</div></el-col>-->
      <!--</el-row>-->
    </div>

    <el-tag style="margin-top: 10px;">参考人员</el-tag>
    <a type="success" href="#" @click="toUser()">修改</a>
    <div class="grid-content">
      <el-form label-position="left" inline class="demo-table-expand">
        <el-form-item label="考生分布">
          <!--<span>{{scene.joinUserContent}}</span>-->
          <div class="checked">
            <el-table
              border
              ref="reviewCheckedTable"
              :data="$parent.$data.scene.checkedList"
              highlight-current-row
              max-height="500px"
              style="width: 100%">
              <el-table-column
                type="index"
                width="50">
              </el-table-column>
              <el-table-column
                property="typeName"
                label="类型"
                width="120">
              </el-table-column>
              <el-table-column
                property="name"
                label="信息"
                width="120">
              </el-table-column>
            </el-table>
          </div>
        </el-form-item>
      </el-form>
      <!--<el-row>-->
      <!--<el-col :span="24"><div class="grid-content bg-purple-dark">考生分布： {{scene.joinUserContent}}</div></el-col>-->
      <!--</el-row>-->
    </div>
  </div>

</template>

<script type="text/javascript">

  export default {
    components: {ElRow},
    data: function () {
      return {
        paperPolicy: {},
      }
    },
    methods: {
      toSetting: function () {
        this.$parent.$data.step = 1;
        this.$parent.previewFlag = true;
        this.$router.push({path: '/scene'});
//        this.$router.go(-3);
      },
      toUser: function () {
        this.$parent.previewFlag = true;
        this.$parent.$data.step = 3;
        this.$router.push({path: '/scene/user'});
//        this.$router.go(-1);
      },
      toPaper: function () {
        this.$parent.previewFlag = true;
        this.$parent.$data.step = 2;
        this.$router.push({path: '/scene/paper'});
//        this.$router.go(-2);
      }
    },
    created: function () {
      console.log("created...");
      this.paperPolicy = this.$parent.$data.scene.checkedPaperPolicy[0];
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

  .view-link {
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
