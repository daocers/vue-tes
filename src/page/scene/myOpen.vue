<template>
  <div class="myJoin">
    <el-tabs type="border-card" @tab-click="handleTabClick">
      <el-tab-pane label="全部" tab-click="gettableData(1)">

      </el-tab-pane>
      <el-tab-pane label="已开场" tab-click="gettableData(2)"></el-tab-pane>
      <el-tab-pane label="未开场" tab-click="gettableData(3)"></el-tab-pane>
      <el-form :inline="true" ref="queryForm" :model="queryForm" size="small">
        <el-form-item label="名称" prop="name">
          <el-input v-model="queryForm.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="findByCondition()">查询</el-button>
          <el-button type="default" plain @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>

      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          v-if="false"
          prop="id"
          label="id"
          width="10">
        </el-table-column>

        <el-table-column
          prop="code"
          label="场次编码">
        </el-table-column>
        <el-table-column
          prop="name"
          label="场次名称">
        </el-table-column>
        <el-table-column
          prop="ownerType"
          label="归属类型">
        </el-table-column>
        <el-table-column
          prop="ownerId"
          label="开场单位">
        </el-table-column>
        <el-table-column
          prop="authCode"
          label="授权码">
        </el-table-column>
        <el-table-column
          prop="changePaper"
          label="允许换卷">
        </el-table-column>
        <el-table-column
          prop="delayTime"
          label="迟到不准入场时间">
        </el-table-column>
        <el-table-column
          prop="duration"
          label="作答时间">
        </el-table-column>
        <el-table-column
          prop="paperPolicyId"
          label="试卷策略">
        </el-table-column>
        <el-table-column
          prop="cancelReason"
          label="取消原因">
        </el-table-column>
        <el-table-column
          prop="paperGenerateType"
          label="试卷生成方式">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注信息">
        </el-table-column>
        <el-table-column
          prop="questionBankId"
          label="题库信息">
        </el-table-column>
        <el-table-column
          prop="userChoiceType"
          label="用户选择方式">
        </el-table-column>
        <el-table-column
          prop="totalScore"
          label="总分">
        </el-table-column>
        <el-table-column
          prop="percentable"
          label="百分制">
        </el-table-column>
        <el-table-column
          prop="metaScoreInfo"
          label="题型信息">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="openTime"
          label="开场时间">
        </el-table-column>
        <el-table-column
          prop="closeTime"
          label="封场时间">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="createUserId"
          label="创建人">
        </el-table-column>

        <el-table-column
          fixed="right"
          label="操作"
          width="90">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="showScene(scope.$index, scope.row)">查看考场</el-button>
            <el-button type="text" size="small" @click="toEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="toRemove(scope.$index, scope.row)">删除</el-button>
          </template>
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
    </el-tabs>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        tableData: [],
        queryForm: {
          name: '',
          pageNum: 1,
          pageSize: 10,
          status: null,
        },
        totalCount: 0,
      }

    },
    methods: {

      /**
       * 查看考试现场
       */
      showScene(idx, row){
        console.log("idx::", idx);
        console.log("row.id::", row.id);

        this.$router.push({path: `/scene/live/${row.id}`})
      },
      /**
       * tab页点击事件
       */
      handleTabClick(tab) {
        console.log("tab:::", tab.index);
        let idx = tab.index;
        if (idx == 0) {
          this.queryForm.status = null;
        } else if (idx == 1) {
          this.queryForm.status = 2;
        } else if (idx == 2) {
          this.queryForm.status = 3;
        }
        this.findByCondition();
      },
      /**
       * 获取场次信息
       * @param status
       * @returns {Promise.<void>}
       */
      findByCondition: async function () {
        console.log("queryForm:::", this.queryForm);
        let data = await this.http("/scene/api/myOpen?pageNum=" +
          this.queryForm.pageNum + "&pageSize=" + this.queryForm.pageSize, this.queryForm);
        console.log("data:::", data);
        if (data) {
          this.tableData = data.list;
          this.totalCount = data.total;//总记录数目
        } else {
          this.tableData = [];
          this.totalCount = 0;
        }
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val;
        console.log(`每页 ${val} 条`);
        this.findByCondition(this.queryForm.status);
      },
      handleCurrentChange(val) {
        this.queryForm.pageNum = val;
        console.log(`当前页: ${val}`);
        this.findByCondition(this.queryForm.status);
      }
    },
    created: function () {
      this.findByCondition();
    }

  }

</script>


<style>

</style>
