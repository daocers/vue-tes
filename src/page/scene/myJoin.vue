<template>
  <div class="myJoin">
    <!--<el-tabs type="border-card" @tab-click="handleTabClick">-->
    <!--<el-tab-pane label="全部" tab-click="getSceneList()">-->

    <!--</el-tab-pane>-->
    <!--<el-tab-pane label="已开场" tab-click="getSceneList(2)"></el-tab-pane>-->
    <!--<el-tab-pane label="未开场" tab-click="getSceneList(3)"></el-tab-pane>-->
    <!--<el-form :inline="true" ref="queryForm" :model="queryForm" size="small">-->
    <!--<el-form-item label="名称" prop="name">-->
    <!--<el-input v-model="queryForm.name" placeholder="请输入"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item>-->
    <!--<el-button type="primary" plain icon="iconfont tes-icon-query" @click="findByCondition()">查询</el-button>-->
    <!--<el-button type="default" plain icon="iconfont tes-icon-reset" @click="reset()">重置</el-button>-->
    <!--</el-form-item>-->
    <!--</el-form>-->
    <el-tag type="primary" style="margin-bottom: 15px;">提示： 按照考试时间倒序排列</el-tag>
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
        <template slot-scope="scope">{{scope.row.scene.code}}</template>

      </el-table-column>
      <el-table-column
        prop="name"
        label="场次名称">
        <template slot-scope="scope">{{scope.row.scene.name}}</template>
      </el-table-column>

      <el-table-column
        prop="score"
        label="百分制得分">
      </el-table-column>
      <el-table-column
        prop="originalScore"
        label="原始分数">
      </el-table-column>
      <el-table-column
        prop="commonScore"
        label="知识类得分">
      </el-table-column>
      <el-table-column
        prop="receiptScore"
        label="凭条得分">
      </el-table-column>
      <el-table-column
        prop="sceneStatus"
        label="场次状态">
        <template slot-scope="scope">
          <el-tag size="mini" type="primary" v-if="scope.row.scene.status == 1">就绪</el-tag>
          <el-tag size="mini" type="warning" v-if="scope.row.scene.status == 2">考试中</el-tag>
          <el-tag size="mini" type="success" v-if="scope.row.scene.status == 3">已封场</el-tag>
          <el-tag size="mini" type="info" v-if="scope.row.scene.status == 4">取消/作废</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="beginTime"
        label="进场时间">
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="交卷时间">
      </el-table-column>

      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="场次名称">
              <span>{{ props.row.scene.name }}</span>
            </el-form-item>
            <el-form-item label="场次编码">
              <span>{{ props.row.scene.code }}</span>
            </el-form-item>
            <el-form-item label="单选题数量">
              <span>{{ props.row.scene.singleCount}}</span>
            </el-form-item>
            <el-form-item label="分值">
              <span>{{ props.row.scene.singleScore }}</span>
            </el-form-item>
            <el-form-item label="多选题数量">
              <span>{{ props.row.scene.multiCount }}</span>
            </el-form-item>
            <el-form-item label="分值">
              <span>{{ props.row.scene.multiScore }}</span>
            </el-form-item>
            <el-form-item label="判断题数量">
              <span>{{ props.row.scene.judgeCount }}</span>
            </el-form-item>
            <el-form-item label="分值">
              <span>{{ props.row.scene.judgeScore }}</span>
            </el-form-item>
            <el-form-item label="凭条张数">
              <span>{{ props.row.scene.receiptCount }}</span>
            </el-form-item>
            <el-form-item label="分值">
              <span>{{ props.row.scene.receiptScore }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <!--<el-table-column-->
      <!--v-show="false"-->
      <!--fixed="right"-->
      <!--label="操作"-->
      <!--width="90">-->
      <!--<template slot-scope="scope">-->
      <!--<el-button type="text" size="small" @click="toEdit(scope.$index, scope.row)">编辑</el-button>-->
      <!--<el-button type="text" size="small" @click="toRemove(scope.$index, scope.row)">删除</el-button>-->
      <!--</template>-->
      <!--</el-table-column>-->
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

    <!--</el-tabs>-->
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
        let data = await this.doPost("/scene/api/myJoin?pageNum=" +
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


<style scoped>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 120px;
    color: #99a9bf;
    font-weight: 900;
  }

  .demo-table-expand span {
    color: #409eff;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  el-form el-form-item > label {
    width: 100px;
  }
</style>
