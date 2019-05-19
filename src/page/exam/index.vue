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
            <!--<router-link v-bind:to="'/exam/notice?id=' + scope.row.id"> {{scope.row.name}} </router-link>-->
            <!--<router-link v-bind:to="'/exam/notice?id=' + scope.row.id"> {{scope.row.name}} </router-link>-->
<!--            <el-button size="small"  type="text" @click="toNotice(scope.row)">{{scope.row.name}}</el-button>-->
            <el-button  type="text" @click="nextStep(scope.row)">{{scope.row.name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="openTime"
          label="开场时间">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <el-tag size="mini" type="primary" v-if="scope.row.status == 1">就绪</el-tag>
            <el-tag size="mini" type="warning" v-if="scope.row.status == 2">考试中</el-tag>
            <el-tag size="mini" type="success" v-if="scope.row.status == 3">已封场</el-tag>
            <el-tag size="mini" type="info" v-if="scope.row.status == 4">取消/作废</el-tag>
          </template>
        </el-table-column>

        <el-table-column v-if="false" prop="examStatus" label="考试情况">
          <template slot-scope="scope">
            <el-tag size="mini" type="primary">占位</el-tag>
          </template>
        </el-table-column>
      </el-table>

      <span
        style="display: block; color: cornflowerblue; font-size: 14px; margin-top: 15px;">只能查看今天往后一周的考试</span>
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
      toNotice(scene){
        let status = scene.status;
        let msg = "";
        if(status == 1){
          msg = "考试未开始";
        }else if(status == 3){
          msg = "考试已结束";
        }
        if(msg){
          this.$message({
            type: 'warning',
            message: "考试未开始"
          });
          return false;
        }
        console.log("scene:", scene);
        sessionStorage.setItem("scene", JSON.stringify(scene));
        this.$router.push("/exam/notice?id=" + scene.id);
      },

      nextStep(scene){
        let status = scene.status;
        let msg = "";
        if(status == 1){
          msg = "考试未开始";
        }else if(status == 3){
          msg = "考试已结束";
        }
        if(msg){
          this.$message({
            type: 'warning',
            message: msg
          });
          return false;
        }
        console.log("scene:", scene);
        sessionStorage.setItem("scene", JSON.stringify(scene));
        //有验证码输入验证码，没验证码直接到考试须知
        if(scene.authCode){
          this.$router.push("/exam/entrance?id=" + scene.id);
        }else{
          this.$router.push("/exam/notice?id=" + scene.id);
        }
      },

      findByCondition: async function () {
        let data = await this.doPost("/exam/api/findReadyScene?pageNum=" + this.queryForm.pageNum + "&pageSize=" + this.queryForm.pageSize);
        console.log("场次信息", data)
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
//     mounted: function(){
//
//       /**
//        * 以下是websocket处理，用来处理强制交卷信息
//        * */
//       let ws;
//       ws = new WebSocket("ws://localhost:8090/ws/my.ws?");
//       console.log("初始化");
//       ws.onopen = function () {
//         console.log("open。。。")
//       }
//
//       ws.onmessage = function (event) {
//         console.log("event", event);
//         var data = event.data;
//         console.log("收到服务器消息：", data);
//
//         var res = "";
//         try {
//           res = JSON.parse(data);
//         } catch (err) {
//           console.log("解析消息失败: ", err);
//         }
//         if (res != '') {
//           var type = res.type;
//           if (type == "4") {
//             swal("", "教师强制提交试卷", "info");
//             zeroModal.loading(3);
//             commitPaper();
// //                    $("#changePaper").trigger("click");
//           }
//         }
//       }
//
//       ws.onclose = function (event) {
//         console.log("event:", event);
//         console.log("close...")
//       }
//     },

    created: function () {
      console.log("created")
      this.findByCondition();
    }
  }
</script>


<style>

</style>
