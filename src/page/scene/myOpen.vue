<template>
  <div class="myJoin">
    <el-tabs type="border-card" @tab-click="handleTabClick">
      <el-tab-pane label="全部" tab-click="gettableData()">

      </el-tab-pane>
      <el-tab-pane label="就绪" tab-click="gettableData(1)"></el-tab-pane>
      <el-tab-pane label="考试中" tab-click="gettableData(2)"></el-tab-pane>
      <el-tab-pane label="已封场" tab-click="gettableData(3)"></el-tab-pane>
      <el-tab-pane label="取消/作废" tab-click="gettableData(4)"></el-tab-pane>
      <el-form :inline="true" ref="queryForm" :model="queryForm" size="small">
        <el-form-item label="名称" prop="name">
          <el-input v-model="queryForm.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain icon="iconfont tes-icon-query" @click="findByCondition()">查询</el-button>
          <el-button type="default" plain icon="iconfont tes-icon-reset" @click="reset()">重置</el-button>
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
          prop="openTime"
          label="开场时间">
        </el-table-column>
        <el-table-column
          prop="closeTime"
          label="封场时间">
        </el-table-column>
        <el-table-column
          prop="duration"
          label="作答时间">
        </el-table-column>

        <el-table-column
          label="总分">
          <template slot-scope="scope">
            {{scope.row.singleCount * scope.row.singleScore + scope.row.multiCount * scope.row.multiScore + scope.row.judgeCount * scope.row.judgeScore + scope.row.receiptScore}}
          </template>
        </el-table-column>

        <el-table-column
          label="知识题总分">
          <template slot-scope="scope">
            {{scope.row.singleCount * scope.row.singleScore + scope.row.multiCount * scope.row.multiScore + scope.row.judgeCount * scope.row.judgeScore}}
          </template>
        </el-table-column>
        <el-table-column
          prop="authCode"
          label="授权码">
        </el-table-column>
        <el-table-column
          prop="changePaper"
          label="允许换卷">
          <template slot-scope="scope">
            {{scope.row.percentable == 1? "是": "否"}}
          </template>
        </el-table-column>
        <el-table-column
          prop="delayMinute"
          label="拒绝入场(分钟)">
        </el-table-column>
        <el-table-column
          prop="questionBankName"
          label="题库信息">
        </el-table-column>

        <el-table-column
          prop="receiptScore"
          label="凭条分数">

        </el-table-column>
        <el-table-column
          label="选题方式">
          <template slot-scope="scope">
            <div v-if="scope.row.paperPolicyId < 0">普通模式</div>
            <div v-if="scope.row.paperPolicyId > 0">策略模式</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="paperPolicyName"
          label="试卷策略">
          <template slot-scope="scope">
            <div v-if="scope.row.paperPolicyId < 0">N/A</div>
            <div v-if="scope.row.paperPolicyId > 0">{{scope.row.paperPolicyName}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="cancelReason"
          label="取消原因">
        </el-table-column>
        <el-table-column
          prop="paperGenerateType"
          label="试卷生成方式">
          <template slot-scope="scope">
            <div v-if="scope.row.paperGenerateType == 1">随机</div>
            <div v-if="scope.row.paperGenerateType == 2">统一</div>
            <div v-if="scope.row.paperGenerateType == 3">随机统一</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注信息">
        </el-table-column>

        <el-table-column
          prop="percentable"
          label="百分制">
          <template slot-scope="scope">
            {{scope.row.percentable == 1? "是": "否"}}
          </template>
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

        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>

        <el-table-column
          fixed="right"
          label="操作"
          width="100px"
        >
          <template slot-scope="scope">
            <!--只有考试中才能看在线人数-->
            <el-button style="margin-left: 0" type="primary" plain :disabled="scope.row.status != 2" size="mini"
                       @click="showScene(scope.$index, scope.row)">查看考场
            </el-button>
            <!--只有已经封场才能看成绩-->
            <el-button style="margin-left: 0" type="primary" :disabled="scope.row.status != 3" size="mini"
                       @click="showScore(scope.$index, scope.row)">查看成绩
            </el-button>
            <!--只有就绪状态可以编辑-->
            <el-button style="margin-left: 0" type="success" plain :disabled="scope.row.status != 1" size="mini"
                       @click="toEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button style="margin-left: 0" type="danger" plain :disabled="scope.row.status != 2" size="mini"
                       @click="forceClose(scope.$index, scope.row)">强制封场
            </el-button>
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
          status: '',
          name: '',
          pageNum: 1,
          pageSize: 10,
          status: null,
        },
        totalCount: 0,
      }

    },
    methods: {
      //强制封场
      forceClose(idx, scene) {
        this.$alert("本功能暂不开放");
      },
      toEdit(idx, scene) {
        console.log("scene:", scene);
        this.$router.push({path: '/scene/open?id=' + scene.id})
      },

      // 查看本场考试成绩
      showScore(idx, row) {
        this.$router.push({path: '/paper?sceneId=' + row.id + "&name=" + row.name});
      },

      /**
       * 查看考试现场
       */
      showScene(idx, row) {
        console.log("idx::", idx);
        console.log("row.id::", row.id);

        this.$router.push({path: `/scene/live?sceneId=${row.id}`})
      },
      /**
       * tab页点击事件
       */
      handleTabClick(tab) {
        console.log("tab:::", tab.index);
        let idx = tab.index;
        if (idx == 0) {
          this.queryForm.status = '';
        } else if (idx == 1) {
          this.queryForm.status = 1;
        } else if (idx == 2) {
          this.queryForm.status = 2;
        }else if(idx == 3){
          this.queryForm.status = 3;
        }else if (idx == 4){
          this.queryForm.status = 4;
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
        if(!this.queryForm.status){
          this.queryForm.status = '';
        }
        let data = await this.doPost("/scene/api/myOpen?pageNum=" +
          this.queryForm.pageNum + "&pageSize=" + this.queryForm.pageSize + "&status=" + this.queryForm.status);
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
