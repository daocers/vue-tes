<template>
  <div class="table">
    <el-form :inline="true" ref="queryForm" :model="queryForm" :rules="queryRules" size="small">
      <el-form-item label="名称" prop="name">
        <el-input v-model="queryForm.name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="findByCondition()">查询</el-button>
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
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="code"
        label="编号">
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


    <el-dialog title="修改角色信息" :visible.sync="editDialogShow">
      <el-form :model="dataForEdit">
        <el-form-item label="名称" prop="name">
          <el-input v-model="dataForEdit.name" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="编码" prop="code">
          <el-input v-model="dataForEdit.code" placeholder="请输入" :disabled="true"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="updateData()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加角色信息" :visible.sync="addDialogShow">
      <el-form :model="dataForAdd">
        <el-form-item label="名称" prop="name">
          <el-input v-model="dataForAdd.name" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="编码" prop="code">
          <el-input v-model="dataForAdd.code" placeholder="请输入" :disabled="true"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="addData()">确 定</el-button>
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
        tableData: [{
          id: 1,
          name: '超级管理员',
          code: 'admin'
        }, {
          id: 2,
          name: '教师',
          code: 'teacher'
        }, {
          id: 3,
          name: '学员',
          code: 'student'
        }],
        /**
         * 查询参数校验规则
         **/
        queryRules: {},
        /**
         * 查询参数
         **/
        queryForm: {
          name: null,
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
        let data = await this.http("/role/api/findByCondition.do?pageNum=" + this.queryForm.pageNum + "&pageSize=" + this.queryForm.pageSize, this.queryForm);
        console.log("data: ", data);
        this.tableData = data.list;
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
        this.$router.push("/role/add");
      },
      updateData: async function () {
        console.log("更新数据");
        console.log("dataForEdit:", this.dataForEdit)
        var res = await this.http('/role/api/update.do', this.dataForEdit, 1000);
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
        var res = await this.http('/role/api/save.do', this.dataForAdd, 1000);
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
      let data = await this.http("/role/api/findByCondition.do?pageNum=" + this.queryForm.pageNum + "&pageSize=" + this.queryForm.pageSize, this.queryForm);
      console.log("data: ", data);
      this.tableData = data.list;
      console.log("data: ", data);
    }
  }
</script>

<style>

</style>
