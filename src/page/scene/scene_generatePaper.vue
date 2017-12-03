<template>
  <div>
    <el-row style="margin-bottom: 30px;">
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
    </el-row>

    <el-row style="border: 1px solid lightblue">
      <el-form :inline="true" ref="queryPolicyForm" :model="queryForm" label-width="80px" size="small">
        <el-form-item label="策略名称">
          <el-input v-model="queryForm.name" placeholeder="输入策略名称"></el-input>
        </el-form-item>
        <el-form-item label="策略模式">
          <el-select v-model="queryForm.questionSelectType" placeholder="策略模式">
            <el-option label="简单模式" value="1"></el-option>
            <el-option label="定制模式" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="策略归属">
          <el-select v-model="queryForm.ownerType" placeholder="选择策略归属">
            <el-option label="本单位" value="1"></el-option>
            <el-option label="全部可见" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="试题数量">
          <el-input type="number" v-model="queryForm.minCount" placeholder="试卷策略试题数量"
                    style="width: 70px;"></el-input>
          —
          <el-input type="number" v-model="queryForm.maxCount" style="width: 70px;"></el-input>
        </el-form-item>

        <el-button type="primary" plain @click="findByCondition()" size="small">查询</el-button>
        <el-button type="default" @click="reset('queryPolicyForm')" size="small">重置</el-button>
      </el-form>

      <!--查询出来的试卷策略-->
      <el-table
        border
        ref="singleTable"
        :data="paperPolicyList"
        highlight-current-row
        @current-change="handleCurrentRowChange"
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
      <el-pagination style="float: right; margin-top: 10px;"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="queryForm.pageNum"
                     :page-sizes="[10, 20, 50]"
                     :page-size="queryForm.pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalCount">
      </el-pagination>
    </el-row>



  </div>
</template>

<script type="text/javascript">
  import ElRow from "element-ui/packages/row/src/row";

  export default {
    components: {ElRow},
    data: function () {
      return {
        scene: {},
        /**
         * 策略查询参数
         * */
        queryForm: {
          questionSelectType: null,
          ownerType: '',
          minCount: 0,
          maxCount: null,
          name: '',
          pageNum: 1,
          pageSize: 10,
        },

        /**
         * 数据总数
         */
        totalCount: 0,
        /**
         * 查询出来的所有策略
         * */
        paperPolicyList: [],
        /**
         * 存放已经选择的试卷策略
         * */
        checkedPaperPolicy: [],
      }
    },
    methods: {
      /**
       * 查询
       */
      findByCondition: async function () {
        let data = await this.http("/paperPolicy/api/findByCondition.do?pageNum=" + this.queryForm.pageNum + "&pageSize=" + this.queryForm.pageSize, this.queryForm);
        console.log("data: ", data);
        if (!data) {
          data = [];
        }
        this.paperPolicyList = data.list;
        this.totalCount = data.total;//总记录数目
      },
      /**
       * 清空查询条件
       */
      reset: function (formName) {
        this.$refs[formName].resetFields();
      },

      /**
       * 表格选中行更改时候执行
       * @param currentRow
       * @param oldCurrentRow
       */
      handleCurrentRowChange: function (currentRow, oldCurrentRow) {
        this.checkedPaperPolicy = [currentRow];
        this.scene.checkedPaperPolicy = [currentRow];
        this.$parent.$data.scene.paperPolicyId = currentRow.id;
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val;
        console.log(`每页 ${val} 条`);
        this.findByCondition();
      },
      handleCurrentChange(val) {
        this.queryForm.pageNum = val;
        console.log(`当前页: ${val}`);
        this.findByCondition();
      },
    },
    created: function () {
      console.log("created...")
      this.scene = this.$parent.$data.scene;
    }
  }
</script>

<style>
  .el-pager > li, button.btn-prev, button.btn-next {
    border: 1px solid gainsboro;
    border-left: none;
  }

  .el-pager > li.active {
    background-color: #3091F2;
    border: none;
    color: white;
  }

  button.btn-prev {
    border-left: 1px solid gainsboro;
  }
</style>
