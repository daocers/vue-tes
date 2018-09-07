<template>
  <div id="index">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>待考场次</span>
        <span style="color: #409EFF; float: right;"><i class="el-icon-bell"
                                                       style="margin-right: 10px; color: #EB9E05;"></i> 提示：点击场次信息，进入考试。</span>
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
          <template  slot-scope="scope">
            <router-link v-bind:to="'/exam/entrance?id=' + scope.row.id"> {{scope.row.name}} </router-link>
          </template>
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
        tableData: [],
      }
    },
    methods: {
      findByCondition: async function () {
        let data = await this.http("/exam/api/list.do?pageNum=" + this.queryForm.pageNum + "&pageSize=" + this.queryForm.pageSize);
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

    //加载之后执行
    mounted: function(){

      /**
       * 以下是websocket处理，用来处理强制交卷信息
       * */
      let ws;
      ws = new WebSocket("ws://localhost:8090/ws/my.ws?");
      console.log("初始化");
      ws.onopen = function () {
        console.log("open。。。")
      }

      ws.onmessage = function (event) {
        console.log("event", event);
        var data = event.data;
        console.log("收到服务器消息：", data);

        var res = "";
        try {
          res = JSON.parse(data);
        } catch (err) {
          console.log("解析消息失败: ", err);
        }
        if (res != '') {
          var type = res.type;
          if (type == "4") {
            swal("", "教师强制提交试卷", "info");
            zeroModal.loading(3);
            commitPaper();
//                    $("#changePaper").trigger("click");
          }
        }
      }

      ws.onclose = function (event) {
        console.log("event:", event);
        console.log("close...")
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
