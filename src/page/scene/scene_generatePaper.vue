<template>
  <div>
    <el-form :inline="true" ref="policyForm" :model="paperPolicy" label-width="80px">
      <el-form-item label="策略模式">
        <el-select v-model="paperPolicy.questionSelectType" placeholder="策略模式">
          <el-option label="简单模式" value="1"></el-option>
          <el-option label="定制模式" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="策略归属">
        <el-select v-model="paperPolicy.ownerType" placeholder="选择策略归属">
          <el-option label="本单位" value="1"></el-option>
          <el-option label="全部可见" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="策略名称">
        <el-input v-model="paperPolicy.name" placeholeder="输入策略名称"></el-input>
      </el-form-item>

      <el-form-item label="试题数量">
        <el-input type="number" v-model="paperPolicy.minCount" placeholder="试卷策略试题数量" style="width: 70px;"></el-input>
        —
        <el-input type="number" v-model="paperPolicy.maxCount" style="width: 70px;"></el-input>
      </el-form-item>

      <el-button type="default" @click="getPaperPolicy('policyForm')">查询</el-button>
      </el-form-item>
    </el-form>

    <!--查询出来的试卷策略-->
    <el-table
      border
      ref="singleTable"
      :data="paperPolicyList"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>

      <el-table-column
        label="id"
        property="id"
        v-if="false">

      </el-table-column>
      <el-table-column
        property="name"
        label="策略名称"
        width="120">
      </el-table-column>
      <el-table-column
        property="ownerName"
        label="所属机构"
        width="120">
      </el-table-column>

      <el-table-column
        property="content"
        label="明细">

      </el-table-column>
      <el-table-column
        property="count"
        label="题量">
      </el-table-column>
    </el-table>

    <el-row>
      <el-pagination
        style="float: right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </el-row>
    <div>

    </div>

    <el-tag style="margin-top: 10px;">已选策略</el-tag>

    <!--已经选择的试卷策略-->
    <el-table
      border
      ref="selectedPaperPolicy"
      :data="checkedPaperPolicy"
      highlight-current-row
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>

      <el-table-column
        label="id"
        property="id"
        v-if="false">

      </el-table-column>
      <el-table-column
        property="name"
        label="策略名称"
        width="120">
      </el-table-column>
      <el-table-column
        property="ownerName"
        label="所属机构"
        width="120">
      </el-table-column>

      <el-table-column
        property="content"
        label="明细">

      </el-table-column>
      <el-table-column
        property="count"
        label="题量">
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/javascript">
  import ElRow from "element-ui/packages/row/src/row";

  export default {
    components: {ElRow},
    data: function () {
      return {
        scene: {

        },
        /**
         * 策略查询参数
         * */
        paperPolicy:{
          questionSelectType: null,
          ownerType: '',
          minCount: 0,
          maxCount: null,
          name: ''
        },
        /**
         * 查询出来的所有策略
         * */
        paperPolicyList:[

        ],
        /**
         * 存放已经选择的试卷策略
         * */
        checkedPaperPolicy:[

        ]
      }
    },
    methods: {
      /**
      * 查询试卷策略
      * */
      getPaperPolicy: function (formName) {
        console.log("查询表单");
        console.log("queryData: ", JSON.stringify(this.paperPolicy))

      },

      handleCurrentChange: function () {

      }
    },
    created: function () {
      console.log("created...")
      this.scene = this.$parent.$data.scene;
    }
  }
</script>

<style>

</style>
