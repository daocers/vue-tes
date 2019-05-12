<template>
  <div id="index">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>场次监控【考试中】</span>
        <!--        <span style="color: #409EFF; float: right;"><i class="el-icon-bell" style="margin-right: 10px; color: #EB9E05;"></i> 提示：点击场次信息，进入考试。</span>-->
      </div>
      <el-table
        :data="tableData"
        style="width: 100%;">
        <el-table-column
          type="index"
          label="序号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="name"
          label="场次名称"
          width="180">
          <template slot-scope="scope">
            <!--<router-link v-bind:to="'/exam/notice?id=' + scope.row.id"> {{scope.row.name}} </router-link>-->
            <!--<router-link v-bind:to="'/exam/notice?id=' + scope.row.id"> {{scope.row.name}} </router-link>-->
            <el-button type="text" @click="showScene(scope.row.id)">{{scope.row.name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="openTime"
          label="开场时间">
        </el-table-column>
        <el-table-column prop="paperCommitCount" label="已提交/总数">
          <template slot-scope="scope">
            {{scope.row.paperCommitCount}}/{{scope.row.paperCount}}
          </template>

        </el-table-column>
        <el-table-column v-if="false"
                         prop="status"
                         label="状态">
          <template slot-scope="scope">
            <el-tag size="mini" type="primary" v-if="scope.row.status == 1">就绪</el-tag>
            <el-tag size="mini" type="warning" v-if="scope.row.status == 2">考试中</el-tag>
            <el-tag size="mini" type="success" v-if="scope.row.status == 3">已封场</el-tag>
            <el-tag size="mini" type="info" v-if="scope.row.status == 4">取消/作废</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="examStatus" label="提交比例(%)">
          <template slot-scope="scope">
            <el-progress :stroke-width="8"
                         :percentage="scope.row.commitRate" :color="scope.row.color"></el-progress>
          </template>
        </el-table-column>
      </el-table>

      <!--      <span style="display: block; color: cornflowerblue; font-size: 14px; margin-top: 15px;">只能查看今天往后一周的考试</span>-->
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
        tableData: [],
      }
    },
    methods: {

      /**
       * 查看考试现场
       */
      showScene(id) {
        this.$router.push({path: `/scene/live/${id}`})
      },

      findByCondition: async function () {
        let data = await this.doPost("/scene/api/findSceneInExaming?pageNum=" + this.queryForm.pageNum + "&pageSize=" + this.queryForm.pageSize);
        console.log("场次信息", data)
        if (data) {
          for (let idx in data.list) {
            let item = data.list[idx];
            if (item.commitRate == 100) {
              item.color = '#67C23A';
            } else if (item.commitRate > 80) {
              item.color = "#409EFF";
            } else if (item.commitRate > 60) {
              item.color = "#8e71c7"
            } else {
              item.color = "#F56C6C"
            }
          }
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
      console.log("created")
      this.findByCondition();
    }
  }
</script>


<style>

</style>
