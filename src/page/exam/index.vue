<template>
  <div id="index">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>待考场次</span>
        <span style="color: #409EFF; float: right;"><i class="el-icon-bell"
                                                       style="margin-right: 10px; color: #EB9E05;"></i> 提示：点击场次信息，进入考试。</span>
      </div>
      <el-table
        :data="sceneList"
        style="width: 100%;">
        <el-table-column
          prop="index"
          label="序号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="name"
          label="场次名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="openTime"
          label="开场时间">
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
    </el-card>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        queryForm: {
          pageNum: 1,
          pageSize: 10,
        },
        totalCount: 0,
        sceneList: [],
      }
    },
    methods: {
      getSceneList: async function () {
        let data = await this.http("/scene/api/myJoin.do?pageNum=" + this.queryForm.pageNum + "&pageSize=" + this.queryForm.pageSize
          + "&status=3");
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
        this.getSceneList(this.queryForm.status);
      },
      handleCurrentChange(val) {
        this.queryForm.pageNum = val;
        console.log(`当前页: ${val}`);
        this.getSceneList(this.queryForm.status);
      }

    },
    created: function () {
      console.log("created")
      this.getSceneList();
    }
  }
</script>


<style>

</style>
