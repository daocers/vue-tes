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
        prop="name"
        label="属性名称">
      </el-table-column>
      <el-table-column
        prop="code"
        label="属性编号">
      </el-table-column>
      <el-table-column
        prop="memo"
        label="描述">
      </el-table-column>
      <el-table-column
        prop="no"
        label="序号">
      </el-table-column>

      <el-table-column
        prop="status"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="isDel"
        label="删除标志">
      </el-table-column>
      <el-table-column
        prop="createUserId"
        label="创建人">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <!--<el-table-column-->
      <!--prop="updateUserId"-->
      <!--label="updateUserId">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
      <!--prop="updateTime"-->
      <!--label="updateTime">-->
      <!--</el-table-column>-->

      <el-table-column
        fixed="right"
        label="操作"
        width="90">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="toEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="toRemove(scope.$index, scope.row)">删除</el-button>
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


    <el-dialog title="编辑" :visible.sync="editDialogShow">
      <el-form ref="editForm" :rules="rules" label-position="left" :model="dataForEdit">
        <el-form-item label="属性名称" prop="name">
          <el-input v-model="dataForEdit.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="属性编号" prop="code">
          <el-input v-model="dataForEdit.code" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="memo">
          <el-input v-model="dataForEdit.memo" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="序号" prop="no">
          <el-input v-model="dataForEdit.no" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-input v-model="dataForEdit.status" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="删除标志" prop="isDel">
          <el-input v-model="dataForEdit.isDel" placeholder="请输入"></el-input>
        </el-form-item>
        <!--<el-form-item label="createUserId" prop="createUserId">-->
        <!--<el-input v-model="dataForEdit.createUserId" placeholder="请输入"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="createTime" prop="createTime">-->
        <!--<el-input v-model="dataForEdit.createTime" placeholder="请输入"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="updateUserId" prop="updateUserId">-->
        <!--<el-input v-model="dataForEdit.updateUserId" placeholder="请输入"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="updateTime" prop="updateTime">-->
        <!--<el-input v-model="dataForEdit.updateTime" placeholder="请输入"></el-input>-->
        <!--</el-form-item>-->
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="updateData()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加" :visible.sync="addDialogShow">
      <el-form ref="addForm" :rules="rules" label-position="left" :model="dataForAdd">
        <el-form-item label="属性名称" prop="name">
          <el-input v-model="dataForAdd.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="属性编号" prop="code">
          <el-input v-model="dataForAdd.code" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="memo">
          <el-input v-model="dataForAdd.memo" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="序号" prop="no">
          <el-input v-model="dataForAdd.no" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-input v-model="dataForAdd.status" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="删除标志" prop="isDel">
          <el-input v-model="dataForAdd.isDel" placeholder="请输入"></el-input>
        </el-form-item>
        <!--<el-form-item label="创建人" prop="createUserId">-->
        <!--<el-input v-model="dataForAdd.createUserId" placeholder="请输入"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="创建时间" prop="createTime">-->
        <!--<el-input v-model="dataForAdd.createTime" placeholder="请输入"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="updateUserId" prop="updateUserId">-->
        <!--<el-input v-model="dataForAdd.updateUserId" placeholder="请输入"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="updateTime" prop="updateTime">-->
        <!--<el-input v-model="dataForAdd.updateTime" placeholder="请输入"></el-input>-->
        <!--</el-form-item>-->
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
        tableData: [],
        /**
         * 数据总数
         */
        totalCount: null,
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
         * 添加对话框数据
         */
        dataForAdd: {},

        /**
         * 添加对话框是否显示
         */
        addDialogShow: false,
        /**
         * 修改对话框是否显示
         */
        editDialogShow: false,

        /**
         * 修改对话框数据
         */
        dataForEdit: {},

        /**
         * 修改对话框数据索引值
         */
        dataForEditIndex: null,

        /**
         * 校验规则
         */
        rules: {
          code:
            [
              {required: true, message: '请输入code', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          memo:
            [
              {max: 100, message: '长度在3-100个字符', trigger: 'blur'}
            ],
//          no:
//            [
//              {required: true, message: '请输入no', trigger: 'blur'},
//              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
//            ],
          name:
            [
              {required: true, message: '请输入name', trigger: 'blur'},
              {min: 2, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
//          status:
//            [
//              {required: true, message: '请输入status', trigger: 'blur'},
//              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
//            ],
//          isDel:
//            [
//              {required: true, message: '请输入isDel', trigger: 'blur'},
//              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
//            ],
//          createUserId:
//            [
//              {required: true, message: '请输入createUserId', trigger: 'blur'},
//              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
//            ],
//          createTime:
//            [
//              {required: true, message: '请输入createTime', trigger: 'blur'},
//              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
//            ],
//          updateUserId:
//            [
//              {required: true, message: '请输入updateUserId', trigger: 'blur'},
//              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
//            ],
//          updateTime:
//            [
//              {required: true, message: '请输入updateTime', trigger: 'blur'},
//              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
//            ],
        }

      }
    },


    methods: {
      /**
       * 查询
       */
      findByCondition: async function () {
        let data = await this.http("/property/api/findByCondition.do?pageNum=" + this.queryForm.pageNum + "&pageSize=" + this.queryForm.pageSize, this.queryForm);
        console.log("data: ", data);
        this.tableData = data.list;
        this.totalCount = data.total;//总记录数目
      },

      /**
       * 重置查询表单
       */
      reset() {
        this.$refs["queryForm"].resetFields();
      },

      getDetail(row) {
        console.log("查看详情：", row)
      },
      /**
       * 跳转到添加数据页面
       */
      toAdd() {
        console.log("唤起添加对话框")
        this.addDialogShow = true;
      },
      /**
       * 唤起编辑对话框
       */
      toEdit(idx, row) {
        console.log("编辑：", row)
        this.dataForEdit = JSON.parse(JSON.stringify(row));
        this.dataForEditIndex = idx;
        this.editDialogShow = true;
      },
      /**
       * 提交更新数据
       */
      updateData: async function () {
        console.log("更新数据");
        console.log("dataForEdit:", this.dataForEdit);

        this.$refs['editForm'].validate(async (valid) => {
          if (!valid) {
            console.log("参数校验不通过，请处理");
            return false;
          } else {
            var res = await this.http('/property/api/update.do', this.dataForEdit, 1000);
            if (res) {
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
          }
        });
      },
      /**
       * 提交添加数据
       */
      addData: async function () {
        console.log("添加数据");
        console.log("dataForAdd:", this.dataForAdd);

        this.$refs['addForm'].validate(async (valid) => {
          if (!valid) {
            console.log("参数校验不通过，请处理");
            return false;
          } else {
            let res = await this.http("/property/api/save.do", this.dataForAdd, 1000);
            if (res == true) {
              this.$confirm('继续添加?查看列表?', '提示', {
                confirmButtonText: '继续添加',
                cancelButtonText: '查看列表',
                type: 'success',
                center: true
              }).then(() => {
                this.$refs['addForm'].resetFields();
//        关闭对话框
                this.addDialogShow = false;
              }).catch(() => {
                this.findByCondition();
//        关闭对话框
                this.addDialogShow = false;
              });
            }
          }
        });
      },

      /**
       * 删除数据
       */
      async toRemove(idx, row) {
        console.log("删除：", idx, row)
        let data = await this.http("/property/api/delete.do?id=" + row.id);
        if (data == true) {
          this.tableData.splice(idx, 1);
          this.tableData = this.tableData;
        } else if (data == false) {
          console.log("删除失败");
          this.$notify({
            title: '警告',
            message: "删除失败",
            type: 'warning'
          });
        }
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
