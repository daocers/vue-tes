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

        <el-button type="primary" @click="toBatchAdd()">批量添加</el-button>
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
        label="题干">
      </el-table-column>
      <el-table-column
        prop="answer"
        label="最佳答案">
      </el-table-column>
      <el-table-column
        prop="content"
        label="选项信息">
      </el-table-column>
      <el-table-column
        v-if="false"
        prop="extraInfo"
        label="附加信息">
      </el-table-column>
      <el-table-column
        prop="bankId"
        label="题库id">
      </el-table-column>
      <el-table-column prop="bankName" label="题库"></el-table-column>
      <el-table-column
        prop="branchId"
        label="所属分行">
      </el-table-column>
      <el-table-column
        prop="departmentId"
        label="所属部门">
      </el-table-column>
      <el-table-column
        prop="stationId"
        label="所属岗位">
      </el-table-column>
      <el-table-column
        prop="ownerId"
        label="">
      </el-table-column>
      <el-table-column
        prop="publicFlag"
        label="是否公用">
      </el-table-column>

      <el-table-column
        prop="attr1"
        label="attr1">
      </el-table-column>
      <el-table-column
        prop="attr2"
        label="attr2">
      </el-table-column>
      <el-table-column
        prop="attr3"
        label="attr3">
      </el-table-column>
      <el-table-column
        prop="attr4"
        label="attr4">
      </el-table-column>
      <el-table-column
        prop="attr5"
        label="attr5">
      </el-table-column>
      <el-table-column
        prop="createUserId"
        label="创建人">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
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
        <el-form-item label="题干" prop="title" :label-width="labelWidth">
          <el-input v-model="dataForEdit.title" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="最佳答案" prop="answer" :label-width="labelWidth">
          <el-input v-model="dataForEdit.answer" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="选项" prop="content" :label-width="labelWidth">
          <el-input v-model="dataForEdit.content" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="附加信息" prop="extraInfo" :label-width="labelWidth">
          <el-input v-model="dataForEdit.extraInfo" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="题库" prop="bankId" :label-width="labelWidth">
          <el-input v-model="dataForEdit.bankId" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="是否公开" prop="publicFlag" :label-width="labelWidth">
          <el-input v-model="dataForEdit.publicFlag" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="attr1" prop="attr1" :label-width="labelWidth">
          <el-input v-model="dataForEdit.attr1" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="attr2" prop="attr2" :label-width="labelWidth">
          <el-input v-model="dataForEdit.attr2" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="attr3" prop="attr3" :label-width="labelWidth">
          <el-input v-model="dataForEdit.attr3" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="attr4" prop="attr4" :label-width="labelWidth">
          <el-input v-model="dataForEdit.attr4" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="attr5" prop="attr5" :label-width="labelWidth">
          <el-input v-model="dataForEdit.attr5" placeholder="请输入"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelCommit">取 消</el-button>
        <el-button type="primary" @click="commitData()">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog title="批量添加" :visible.sync="batchAddDialogShow" :before-close="handleClose">
      <el-form label-position="left" ref="batchForm" :rules="batchAddRules" :model="dataForBatch" label-width="60px">
        <el-form-item label="题库" prop="questionBankId" :label-width="labelWidth">
          <el-select v-model="dataForBatch.questionBankId" placeholder="请选择题库">
            <el-option v-for="bank in questionBankList"
                       :key="bank.id"
                       :label="bank.name"
                       :value="bank.id">

            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <el-upload
        class="upload-demo"
        ref="upload"
        :limit="1"
        :data="dataForBatch"
        action="http://localhost:8080/multi/api/batchAdd"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-change="handleChange"
        :on-success="handleSuccess"
        :on-error="handleError"
        :file-list="fileList"
        :auto-upload="false">

        <el-button slot="trigger" size="small" type="primary" plain>选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" v-bind:disabled="uploadFlag == false" type="primary" @click="batchAdd">上传到服务器</el-button>
        <div style="display: inline-block; margin-left: 20px;">
          没有模板？<a type="success" href="#" @click="download">下载模板</a>
        </div>
        <div slot="tip" class="el-upload__tip">只能上传下载的模板文件</div>
      </el-upload>

      <el-alert v-show="batchAddErrorMessage != ''"
                v-bind:title='batchAddErrorMessage'
                type="error">
      </el-alert>
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
        //题库列表
        questionBankList: {},
        /**
         * 查询参数
         **/
        queryForm: {
          name: null,
          pageSize: 10,
          pageNum: 1,
        },
        /**
         * 修改对话框是否显示 修改对话框数据, 索引值
         */
        editDialogShow: false,
        dataForEdit: {},
        dataForEditIndex: null,

        /**
         * 批量添加
         * */
        batchAddErrorMessage: '',
        batchAddDialogShow: false,
        batchAddRules: {
          questionBankId: [
            {type: 'number', required: true, message: '请选择题库', trigger: 'change'}
          ]
        },
        // 批量上传下载模板时候的参数信息
        dataForBatch: {
          questionBankId: null,
        },
        //上传文件列表
        fileList: [],
        //是否可以上传
        uploadFlag: false,

        /**
         * 校验规则
         */
        rules: {
          title:
            [
              {required: true, message: '请输入title', trigger: 'blur'},
              {min: 3, max: 50, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          answer:
            [
              {required: true, message: '请输入answer', trigger: 'blur'},
              {max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          content:
            [
              {required: true, message: '请输入content', trigger: 'blur'},
              {max: 100, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          extraInfo:
            [
              {max: 20, message: '长度在3-10个字符', trigger: 'blur'}
            ],


          publicFlag:
            [
              // {required: true, message: '请输入publicFlag', trigger: 'blur'},
              // {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],


        }

      }
    },


    methods: {
      /**
       * 批量添加对话框关闭时候执行
       */
      handleClose() {
        this.$refs.upload.clearFiles();
        this.batchAddDialogShow = false;
      },

      handleRemove(file, fileList) {
        console.log(file, fileList);
        fileList.shift(file);
        this.uploadFlag = fileList.length > 0 ? true: false;
        console.log("fileList", this.fileList)
      },
      handleChange(file, fileList) {
        console.info("change file: ", file);
        console.info("change fileList: ", fileList);
        this.uploadFlag = fileList.length > 0 ? true: false;

      },
      handlePreview(file) {
        console.log("导入结果：", file.response);
      },

      /**
       * 服务器成功响应并处理后回调
       */
      handleSuccess(response, file, fileList) {
        console.log("上传结果：", response)
        if (response.result == false) {
          this.batchAddErrorMessage = response.message;
        } else {
          this.findByCondition();
          this.$refs.upload.clearFiles();
          this.batchAddDialogShow = false;
          this.$notify({
            title: '成功',
            message: '批量导入单选试题成功',
            type: 'success',
            duration: 0
          });
        }
      },
      handleError(err, file, fileList) {
        console.log("上传失败，原因：", err);
        this.$refs.upload.clearFiles();
        this.batchAddDialogShow = false;
        this.$notify({
          title: '失败',
          message: '批量导入单选试题失败',
          type: 'error',
          duration: 0
        });
      },
      download() {
        this.batchAddErrorMessage = '';
        window.location.href = "http://localhost:8080/multi/api/downloadModel";
      },

      toBatchAdd() {
        console.log("唤起批量导入对话框。。。")
//        this.$refs.upload.clearFiles();
        this.batchAddErrorMessage = '';
        this.batchAddDialogShow = true;
        this.findQuestionBanks();
      },
      /**
       * 批量导入
       */
      async batchAdd() {
        this.$refs['batchForm'].validate(async (valid) => {
          if (!valid) {
            console.log("参数校验不通过，请处理");
            return false;
          } else {
            let res = await this.$refs.upload.submit();
            console.log("上传结果： ", res);
          }
        });

      },

      /*
      * 查找所有题库信息
      * */
      findQuestionBanks: async function () {
        let data = await  this.postParam("/questionBank/api/findAll");
        this.questionBankList = data;
      },

      /**
       * 查询
       */
      findByCondition: async function () {
        let data = await this.http("/multi/api/findByCondition?pageNum=" + this.queryForm.pageNum + "&pageSize=" + this.queryForm.pageSize, this.queryForm);
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
            var res = await this.http('/multi/api/save', this.dataForEdit, 3000);
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
                  this.editDialogShow = false;
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
          let data = await this.http("/multi/api/delete?id=" + row.id);
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
