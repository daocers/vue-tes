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
        label="策略名称">
      </el-table-column>
      <el-table-column
        prop="code"
        label="策略编码">
      </el-table-column>
      <el-table-column
        prop="memo"
        label="描述">
      </el-table-column>
      <el-table-column
        prop="singleInfo"
        label="单选信息">
      </el-table-column>
      <el-table-column
        prop="multiInfo"
        label="多选信息">
      </el-table-column>
      <el-table-column
        prop="judgeInfo"
        label="判断信息">
      </el-table-column>
      <el-table-column
        prop="receiptCount"
        label="凭条数量">
      </el-table-column>
      <el-table-column
        prop="numberLength"
        label="数字长度">
      </el-table-column>
      <el-table-column
        prop="branchId"
        label="branchId">
      </el-table-column>
      <el-table-column
        prop="stationId"
        label="stationId">
      </el-table-column>
      <el-table-column
        prop="departmentId"
        label="departmentId">
      </el-table-column>
      <el-table-column
        prop="createUserId"
        label="createUserId">
      </el-table-column>

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

    <el-dialog v-bind:title="dataForEdit.id ? '编辑': '添加'" :visible.sync="editDialogShow" width="60%">
      <el-form ref="editForm" :rules="rules" label-position="left" :model="dataForEdit">
        <el-form-item label="name" prop="name" :label-width="labelWidth">
          <el-input v-model="dataForEdit.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="code" prop="code" :label-width="labelWidth">
          <el-input v-model="dataForEdit.code" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="memo" prop="memo" :label-width="labelWidth">
          <el-input v-model="dataForEdit.memo" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="singleInfo" prop="singleInfo" :label-width="labelWidth">
          <el-input v-model="dataForEdit.singleInfo" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="multiInfo" prop="multiInfo" :label-width="labelWidth">
          <el-input v-model="dataForEdit.multiInfo" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="judgeInfo" prop="judgeInfo" :label-width="labelWidth">
          <el-input v-model="dataForEdit.judgeInfo" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="receiptCount" prop="receiptCount" :label-width="labelWidth">
          <el-input v-model="dataForEdit.receiptCount" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="numberLength" prop="numberLength" :label-width="labelWidth">
          <el-input v-model="dataForEdit.numberLength" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="branchId" prop="branchId" :label-width="labelWidth">
          <el-input v-model="dataForEdit.branchId" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="stationId" prop="stationId" :label-width="labelWidth">
          <el-input v-model="dataForEdit.stationId" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="departmentId" prop="departmentId" :label-width="labelWidth">
          <el-input v-model="dataForEdit.departmentId" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="status" prop="status" :label-width="labelWidth">
          <el-input v-model="dataForEdit.status" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="isDel" prop="isDel" :label-width="labelWidth">
          <el-input v-model="dataForEdit.isDel" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="createUserId" prop="createUserId" :label-width="labelWidth">
          <el-input v-model="dataForEdit.createUserId" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="createTime" prop="createTime" :label-width="labelWidth">
          <el-input v-model="dataForEdit.createTime" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="updateUserId" prop="updateUserId" :label-width="labelWidth">
          <el-input v-model="dataForEdit.updateUserId" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="updateTime" prop="updateTime" :label-width="labelWidth">
          <el-input v-model="dataForEdit.updateTime" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelCommit">取 消</el-button>
        <el-button type="primary" @click="commitData()">确 定</el-button>
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
         * 对话框的label宽度
         */
        labelWidth: '80px',
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
          name:
            [
              {required: true, message: '请输入name', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          code:
            [
              {required: true, message: '请输入code', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          memo:
            [
              {required: true, message: '请输入memo', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          singleInfo:
            [
              {required: true, message: '请输入singleInfo', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          multiInfo:
            [
              {required: true, message: '请输入multiInfo', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          judgeInfo:
            [
              {required: true, message: '请输入judgeInfo', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          receiptCount:
            [
              {required: true, message: '请输入receiptCount', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          numberLength:
            [
              {required: true, message: '请输入numberLength', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          branchId:
            [
              {required: true, message: '请输入branchId', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          stationId:
            [
              {required: true, message: '请输入stationId', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          departmentId:
            [
              {required: true, message: '请输入departmentId', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          status:
            [
              {required: true, message: '请输入status', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          isDel:
            [
              {required: true, message: '请输入isDel', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          createUserId:
            [
              {required: true, message: '请输入createUserId', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          createTime:
            [
              {required: true, message: '请输入createTime', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          updateUserId:
            [
              {required: true, message: '请输入updateUserId', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          updateTime:
            [
              {required: true, message: '请输入updateTime', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
        }

      }
    },


    methods: {
      /**
       * 查询
       */
      findByCondition: async function () {
        let data = await this.http("/paperPolicy/v1/findByCondition?pageNum=" + this.queryForm.pageNum + "&pageSize=" + this.queryForm.pageSize, this.queryForm);
        console.log("data: ", data);
        if (data) {
          this.tableData = data.list;
          this.totalCount = data.total;//总记录数目
        } else {
          this.tableData = [];
          this.totalCount = 0;
        }
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
        this.editDialogShow = true;
        this.dataForEdit = {};
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
      commitData: async function () {
        console.log("更新数据");
        console.log("dataForEdit:", this.dataForEdit);

        this.$refs['editForm'].validate(async (valid) => {
          if (!valid) {
            console.log("参数校验不通过，请处理");
            return false;
          } else {
            var res = await this.http('/paperPolicy/v1/save', this.dataForEdit, 3000);
            if (res) {
              if (this.dataForEdit.id) {
                //                修改
                Vue.set(this.tableData, this.dataForEditIndex, this.dataForEdit);
                //        以下代码变动无法触发页面渲染
                //        this.tableData[this.dataForEditIndex] = Object.assign({},this.dataForEdit);
                //          console.log(this.tableData)
                //        关闭对话框
                this.editDialogShow = false;
              } else {
                //                新增
                this.$confirm('继续添加?查看列表?', '提示', {
                  confirmButtonText: '继续添加',
                  cancelButtonText: '查看列表',
                  type: 'success',
                  center: true
                }).then(() => {
                  this.dataForEdit = {
                    count: 0,
                    questionTypeIdList: [],
                    contentItemList: [],
                  };
                  //                  this.$refs['addForm'].resetFields()
                  ;
                }).catch(() => {
                  this.findByCondition();
                  //        关闭对话框
                  this.addDialogShow = false;
                });
              }

            } else if (res == false) {
              console.log("请求成功，处理失败");
            } else if (res == null) {
              console.error("请求失败")
            }
            //        关闭对话框
            //            this.editDialogShow = false;
          }
        });
      },

      /**
       * 取消
       */
      cancelCommit: async function () {
        this.$refs["editForm"].resetFields();
        if (!this.dataForEdit.id) {
          this.findByCondition();
        }
        this.editDialogShow = false;
      },

      /**
       * 删除数据
       */
      async toRemove(idx, row) {

        this.$confirm('数据删除后无法找回, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {

          console.log("删除：", idx, row)
          let data = await this.http("/paperPolicy/v1/delete?id=" + row.id);
          if (data == true) {
            this.tableData.splice(idx, 1);
            this.tableData = this.tableData;
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          } else if (data == false) {
            console.log("删除失败");
            this.$notify({
              title: '警告',
              message: "删除失败",
              type: 'warning'
            });
          }
        }).catch(() => {
          //  解决uncaught cancel的异常
        });
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
