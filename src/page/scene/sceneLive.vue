<template>
  <div class="live-info">
    <el-table
      :data="tableData"
      style="width: 100%;">
      <el-table-column
        type="index"
        label="序号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="username"
        label="考生"
        width="180">
      </el-table-column>
      <el-table-column
        label="试卷状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status == 1" size="small">正常</el-tag>
          <el-tag type="success" v-if="scope.row.status == 2" size="small">换卷</el-tag>
          <el-tag type="success" v-if="scope.row.status == 3" size="small">作废</el-tag>
          <el-tag type="success" v-if="scope.row.status == 4" size="small">已提交</el-tag>
          <el-tag type="success" v-if="scope.row.status == 5" size="small">已判分</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="考生状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.online == 1" size="small">考试中</el-tag>
          <el-tag type="info" v-if="scope.row.online == 2" size="small">已离场</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="90">
        <template slot-scope="scope">
          <el-button type="warning" size="small" @click="forceCommit(1)">强制交卷</el-button>
          <!--<el-button type="text" size="small" @click="toRemove(scope.$index, scope.row)">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style=" margin-top: 10px;"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="queryForm.pageNum"
                   :page-sizes="[10, 20, 50]"
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
        sceneId: null,
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
       * 强制交卷
       */
      forceCommit: async function (userId) {
        console.log("userId:::", userId)
        let data = await this.http("/paper/api/forceCommit.do?sceneId=" + this.sceneId + "&userId=" + userId);
        if (data) {
          console.log("强制提交试卷成功");
        }
      },
      /**
       * 获取考场信息，包括试卷提交与否
       * @param status
       * @returns {Promise.<void>}
       */
      findByCondition: async function () {
        console.log("queryForm:::", this.queryForm);
        let data = await this.http("/paper/api/findSceneLiveData.do?sceneId=" + this.sceneId + "&pageNum=" +
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
      this.sceneId = this.$route.params.sceneId;
      console.log("sceneId::: ", this.$route.params);
      this.findByCondition();
    }

  }
</script>

<style scoped>

</style>
