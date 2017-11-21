<template>
  <div class="table">
    <el-form :inline="true" ref="queryForm" :model="queryForm" :rules="queryRules" size="small">
      <el-form-item label="名称" prop="name">
        <el-input v-model="queryForm.name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="findByCondition()">查询</el-button>
        <el-button type="default" plain @click="reset()">重置</el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="primary" @click="toAdd()">添加</el-button>
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
        prop="title"
        label="title">
      </el-table-column>
            <el-table-column
        prop="answer"
        label="answer">
      </el-table-column>
            <el-table-column
        prop="content"
        label="content">
      </el-table-column>
            <el-table-column
        prop="extraInfo"
        label="extraInfo">
      </el-table-column>
            <el-table-column
        prop="questionTypeId"
        label="questionTypeId">
      </el-table-column>
            <el-table-column
        prop="questionBankId"
        label="questionBankId">
      </el-table-column>
            <el-table-column
        prop="propertyItemInfo"
        label="propertyItemInfo">
      </el-table-column>
            <el-table-column
        prop="ownerType"
        label="ownerType">
      </el-table-column>
            <el-table-column
        prop="ownerId"
        label="ownerId">
      </el-table-column>
            <el-table-column
        prop="privaryType"
        label="privaryType">
      </el-table-column>
            <el-table-column
        prop="status"
        label="status">
      </el-table-column>
            <el-table-column
        prop="isDel"
        label="isDel">
      </el-table-column>
            <el-table-column
        prop="createUserId"
        label="createUserId">
      </el-table-column>
            <el-table-column
        prop="createTime"
        label="createTime">
      </el-table-column>
            <el-table-column
        prop="updateUserId"
        label="updateUserId">
      </el-table-column>
            <el-table-column
        prop="updateTime"
        label="updateTime">
      </el-table-column>
      
      <el-table-column
        fixed="right"
        label="操作"
        width="130">
        <template slot-scope="scope">
          <el-button @click="getDetail(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="toEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="toRemove(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog title="修改信息" :visible.sync="editDialogShow">
      <el-form :model="dataForEdit" ref="editForm" :rules='editRules'  label-width="80px">
                  <el-form-item label="title" prop="title">
            <el-input v-model="dataForEdit.title" placeholder="请输入"></el-input>
          </el-form-item>
                  <el-form-item label="answer" prop="answer">
            <el-input v-model="dataForEdit.answer" placeholder="请输入"></el-input>
          </el-form-item>
                  <el-form-item label="content" prop="content">
            <el-input v-model="dataForEdit.content" placeholder="请输入"></el-input>
          </el-form-item>
                  <el-form-item label="extraInfo" prop="extraInfo">
            <el-input v-model="dataForEdit.extraInfo" placeholder="请输入"></el-input>
          </el-form-item>
                  <el-form-item label="questionTypeId" prop="questionTypeId">
            <el-input v-model="dataForEdit.questionTypeId" placeholder="请输入"></el-input>
          </el-form-item>
                  <el-form-item label="questionBankId" prop="questionBankId">
            <el-input v-model="dataForEdit.questionBankId" placeholder="请输入"></el-input>
          </el-form-item>
                  <el-form-item label="propertyItemInfo" prop="propertyItemInfo">
            <el-input v-model="dataForEdit.propertyItemInfo" placeholder="请输入"></el-input>
          </el-form-item>
                  <el-form-item label="ownerType" prop="ownerType">
            <el-input v-model="dataForEdit.ownerType" placeholder="请输入"></el-input>
          </el-form-item>
                  <el-form-item label="ownerId" prop="ownerId">
            <el-input v-model="dataForEdit.ownerId" placeholder="请输入"></el-input>
          </el-form-item>
                  <el-form-item label="privaryType" prop="privaryType">
            <el-input v-model="dataForEdit.privaryType" placeholder="请输入"></el-input>
          </el-form-item>
                  <el-form-item label="status" prop="status">
            <el-input v-model="dataForEdit.status" placeholder="请输入"></el-input>
          </el-form-item>
                  <el-form-item label="isDel" prop="isDel">
            <el-input v-model="dataForEdit.isDel" placeholder="请输入"></el-input>
          </el-form-item>
                  <el-form-item label="createUserId" prop="createUserId">
            <el-input v-model="dataForEdit.createUserId" placeholder="请输入"></el-input>
          </el-form-item>
                  <el-form-item label="createTime" prop="createTime">
            <el-input v-model="dataForEdit.createTime" placeholder="请输入"></el-input>
          </el-form-item>
                  <el-form-item label="updateUserId" prop="updateUserId">
            <el-input v-model="dataForEdit.updateUserId" placeholder="请输入"></el-input>
          </el-form-item>
                  <el-form-item label="updateTime" prop="updateTime">
            <el-input v-model="dataForEdit.updateTime" placeholder="请输入"></el-input>
          </el-form-item>
              </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="updateData()">确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>


<script>
  import Vue from 'vue'


  export default {
    data() {
      return {
        /**
         * 表格数据
         **/
        tableData: [],
        /**
         * 查询参数校验规则
         **/
        queryRules: {},
        /**
         * 修改的校验规则
         **/
        editRules: {},
        /**
         * 查询参数
         **/
        queryForm: {
          id: null,
          pageSize: 10,
          pageNum: 1,
        },

        /**
         * 修改对话框是否显示
         */
        editDialogShow: false,

        /**
         * 修改对话框数据
         */
        dataForEdit: {},

        /**
         * 新增对话框是否显示
         */
        addDialogShow: false,

        /**
         *  新增对话框数据
         */
        dataForAdd: {},

        /**
         * 修改对话框数据索引值
         */
        dataForEditIndex: null,

      }
    },


    methods: {
      async findByCondition() {
        let data = await this.http("/commonQuestion/api/findByCondition.do?pageNum=" + this.queryForm.pageNum + "&pageSize=" + this.queryForm.pageSize, this.queryForm);
        console.log("data: ", data);
        this.tableData = data.list;
      },

      reset(){
        this.$refs["queryForm"].resetfieldList();
      },

      getDetail(row) {
        console.log("查看详情：", row)
      },
      toEdit(idx, row) {
        console.log("编辑：", row)
        this.dataForEdit = JSON.parse(JSON.stringify(row));
        this.dataForEditIndex = idx;
        this.editDialogShow = true;
      },
      toAdd(){
        console.log("准备跳转到添加页面")
        this.$router.push("/commonQuestion/add");
      },
      updateData: async function () {
        console.log("更新数据");
        console.log("dataForEdit:", this.dataForEdit)
        var res = await this.http('/commonQuestion/api/update.do', this.dataForEdit, 2000);
        if (res) {
//        用Vue.set使数据处于监控之下
          Vue.set(this.tableData, this.dataForEditIndex, this.dataForEdit);
//        以下代码变动无法触发页面渲染
//        this.tableData[this.dataForEditIndex] = Object.assign({},this.dataForEdit);
//          console.log(this.tableData)
        } else if (res == false) {
          console.log("请求成功，处理失败");
        } else if (res == null) {
          console.error("请求失败")
        }
//        关闭对话框
        this.editDialogShow = false;
      },

      /**
       * 新增数据
       */
      addData: async function () {
        console.log("新增数据");
        console.log("dataForEdit:", this.dataForAdd)
        var res = await this.http('/commonQuestion/api/save.do', this.dataForAdd, 1000);
        if (res) {
          this.$confirm('继续添加?查看列表?', '提示', {
            confirmButtonText: '继续添加',
            cancelButtonText: '查看列表',
            type: 'warning',
            center: true
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
//        用Vue.set使数据处于监控之下
          Vue.set(this.tableData, this.dataForEditIndex, this.dataForEdit);
//        以下代码变动无法触发页面渲染
//        this.tableData[this.dataForEditIndex] = Object.assign({},this.dataForEdit);
//          console.log(this.tableData)
        } else if (res == false) {
          console.log("请求成功，处理失败");
        } else if (res == null) {
          console.error("请求失败")
        }
//        关闭对话框
        this.editDialogShow = false;
      },

      toRemove(idx, row) {
        console.log("删除：", idx, row)
        this.tableData.splice(idx, 1);
        this.tableData = this.tableData;
        console.log("tableData: ", this.tableData)
      },
    },
    /**
     * 页面初始化时候执行
     **/
    created: async function () {
      console.log("created....")
      let data = await this.http("/commonQuestion/api/findByCondition.do?pageNum=" + this.queryForm.pageNum + "&pageSize=" + this.queryForm.pageSize, this.queryForm);
      console.log("data: ", data);
      this.tableData = data.list;
      console.log("data: ", data);
    }
  }
</script>

<style>

</style>
