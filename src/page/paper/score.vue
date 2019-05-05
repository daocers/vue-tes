<template>
  <div class="table">
    <el-form :inline="true" ref="queryForm" :model="queryForm" :rules="queryRules" size="small">
      <el-form-item style="float: right">
        <el-button type="primary" @click="downloadScore">下载成绩表</el-button>
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
        v-if="false"
        prop="userId"
        label="用户ID">
      </el-table-column>

      <el-table-column
        prop="userName"
        label="考生">
      </el-table-column>

      <el-table-column
        prop="originalScore"
        label="原始得分">
      </el-table-column>
      <el-table-column
        prop="score"
        label="百分制得分">
      </el-table-column>

      <el-table-column
        prop="code"
        label="试卷编号">

      </el-table-column>
      <el-table-column
        prop="answerFlag"
        label="做答标志">
        <template slot-scope="scope">
          <el-tag type="info" v-if="scope.row.answerFlag == 1" size="small">未作答</el-tag>
          <el-tag type="success" v-if="scope.row.answerFlag == 2" size="small">已作答</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="beginTime"
        label="入场时间">
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="交卷时间">
      </el-table-column>

      <el-table-column
        prop="sceneName"
        label="场次名称">
      </el-table-column>

      <el-table-column
        prop="status"
        label="状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status == 1" size="small">正常</el-tag>
          <el-tag type="success" v-if="scope.row.status == 3" size="small">作废</el-tag>
          <el-tag type="success" v-if="scope.row.status == 2" size="small">已提交</el-tag>
          <el-tag type="success" v-if="scope.row.status == 4" size="small">已判分</el-tag>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination style="float: right; margin-top: 10px;"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="queryForm.pageNum"
                   :page-sizes="[10, 20, 50, 100]"
                   :page-size="queryForm.pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="totalCount">
    </el-pagination>


  </div>

</template>


<script>

  export default {
    data() {
      return {
        queryForm: {
          pageNum: 1,
          pageSize: 10,
          sceneId: '',
        },
        /**
         * 对话框的label宽度
         */
        labelWidth: '80px',
        /**
         * 表格数据
         **/
        tableData: [],
        /**
         * 数据总数
         */
        totalCount: null,


      }
    },


    methods: {
      /**
       * 查询
       */
      findByCondition: async function () {
        let data = await this.doPost("/paper/api/findByCondition?pageNum=" + this.queryForm.pageNum + "&pageSize=" + this.queryForm.pageSize, this.queryForm);
        console.log("data: ", data);
        if (data) {
          this.tableData = data.list;
          this.totalCount = data.total;//总记录数目
        } else {
          this.tableData = [];
          this.totalCount = 0;
        }
      },

      downloadScore() {
        this.download("/paper/api/downloadScore?sceneId=" + this.queryForm.sceneId);
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
      }
    },
    /**
     * 页面初始化时候执行
     **/
    created: async function () {
      let sceneId = this.$route.query.sceneId;
      if (sceneId) {
        this.queryForm.sceneId = sceneId;
      }
      console.log("created....")
      this.findByCondition();
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
