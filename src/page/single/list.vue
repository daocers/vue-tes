<template>
  <div class="table">
    <el-form :inline="true" ref="queryForm" :model="queryForm" :rules="queryRules" size="small">
      <el-form-item label="名称" prop="name">
        <el-input v-model="queryForm.name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="题库" prop="bankId">
        <el-select v-model="queryForm.bankId">
          <el-option v-for="bank in questionBankList" :key="bank.id" :label="bank.name" :value="bank.id"></el-option>
        </el-select>
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
      height="800px"
      style="width: 100%;">
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
        label="选项信息" width="200px">
        <template slot-scope="scope">
          <div v-for="item in JSON.parse(scope.row.content)">{{item}}</div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="false"
        prop="extraInfo"
        label="附加信息">
      </el-table-column>
      <el-table-column
        prop="bankName"
        label="题库">
      </el-table-column>
      <el-table-column
        prop="branchName"
        label="所属分行">
      </el-table-column>
      <el-table-column
        prop="departmentName"
        label="所属部门">
      </el-table-column>
      <el-table-column
        prop="stationName"
        label="所属岗位">
      </el-table-column>

      <el-table-column
        prop="publicFlag"
        label="是否公用">
        <template slot-scope="scope">
          <el-tag type="primary" v-if="scope.row.publicFlag == 1">公用</el-tag>
          <el-tag type="warning" v-if="scope.row.publicFlag == 2">私有</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        prop="attr1"
        label="业务类型">
        <template slot-scope="scope">
          {{busiTypeMap[scope.row.attr1]}}
        </template>
      </el-table-column>
      <el-table-column
        prop="attr2"
        label="难度">
        <template slot-scope="scope">
          {{diffMap[scope.row.attr2]}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="false"
        prop="attr3"
        label="attr3">
      </el-table-column>
      <el-table-column
        v-if="false"
        prop="attr4"
        label="attr4">
      </el-table-column>
      <el-table-column
        v-if="false"
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
          <el-input placeholder="请输入A选项" v-model="dataForEdit.a1">
            <template slot="prepend">A:</template>
          </el-input>
          <el-input placeholder="请输入B选项" v-model="dataForEdit.a2">
            <template slot="prepend">B:</template>
          </el-input>
          <el-input placeholder="请输入C选项" v-model="dataForEdit.a3">
            <template slot="prepend">C:</template>
          </el-input>
          <el-input placeholder="请输入D选项" v-model="dataForEdit.a4">
            <template slot="prepend">D:</template>
          </el-input>
          <el-input placeholder="请输入E选项" v-model="dataForEdit.a5">
            <template slot="prepend">E:</template>
          </el-input>

        </el-form-item>
        <el-form-item label="附加信息" prop="extraInfo" :label-width="labelWidth">
          <el-input v-model="dataForEdit.extraInfo" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="题库" prop="bankId" :label-width="labelWidth">
          <el-select v-model="dataForEdit.bankId">
            <el-option v-for="bank in questionBankList" :key="bank.id" :label="bank.name" :value="bank.id"></el-option>
          </el-select>
          <!--<el-input v-model="dataForEdit.bankId" placeholder="请输入"></el-input>-->
        </el-form-item>
        <el-form-item label="是否公开" prop="publicFlag" :label-width="labelWidth">
          <el-switch
            v-model="dataForEdit.publicFlag"
            :active-value=1
            :inactive-value=2
            active-text="公开"
            inactive-text="私有">
          </el-switch>
        </el-form-item>

        <el-form-item label="业务类型" prop="attr1" :label-width="labelWidth">
          <el-select v-model="dataForEdit.attr1">
            <el-option v-for="(key, val) in busiTypeMap" :key="val" :label="key" :value="val"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="难度" prop="attr2" :label-width="labelWidth">
          <el-select v-model="dataForEdit.attr2">
            <el-option v-for="(key, val) in diffMap" :key="val" :value="val" :label="key"></el-option>
          </el-select>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelCommit">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
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


        <el-upload
          class="upload-demo"
          ref="upload"
          :limit="1"
          action=""
          :data="dataForBatch"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-change="handleChange"
          :file-list="fileList"
          :auto-upload="false">

          <el-button slot="trigger" size="small" type="primary" plain>选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" :disabled="uploadFlag == false" type="primary"
                     @click="batchAdd">上传到服务器
          </el-button>
          <div style="display: inline-block; margin-left: 20px;">
            没有模板？<a type="success" href="#" @click="download">下载模板</a>
          </div>
          <div slot="tip" class="el-upload__tip">只能上传下载的模板文件</div>
        </el-upload>
      </el-form>


      <el-alert v-show="batchAddErrorMessage != ''"
                v-bind:title='batchAddErrorMessage'
                type="error">
      </el-alert>
    </el-dialog>

  </div>

</template>


<script>
  import {busiTypeMap, diffMap} from '../../data.js'

  export default {
    data() {
      return {
        busiTypeMap: busiTypeMap,
        diffMap: diffMap,
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
          bankId: '',
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
          extraInfo:
            [
              {max: 20, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          publicFlag:
            [
              // {required: true, message: '请输入publicFlag', trigger: 'blur'},
              // {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],


        },

        //即将上传的文件
        file: null,

      }
    },


    methods: {
      // 批量添加执行的一系列方法
      handleRemove(file, fileList) {
        console.log(file, fileList);
        fileList.shift(file);
        this.uploadFlag = fileList.length > 0 ? true : false;
        console.log("fileList", this.fileList)
      },
      handleChange(file, fileList) {
        console.info("change file: ", file);
        console.info("change fileList: ", fileList);
        this.fileList = fileList;
        this.file = file;
        this.uploadFlag = fileList.length > 0 ? true : false;

      },
      handlePreview(file) {
        console.log("导入结果：", file.response);
      },

      /**
       * 批量导入
       */
      async batchAdd(param) {
        console.log("批量上传：：：", param)
        this.$refs['batchForm'].validate(async (valid) => {
          if (!valid) {
            console.log("参数校验不通过，请处理");
            return false;
          } else {
            let formData = new FormData();
            formData.append("file", this.file.raw);
            formData.append("questionBankId", this.dataForBatch.questionBankId)
            let resp = await this.uploadFile("/single/api/batchAdd", formData);
            console.log("上传结果:::", resp);
            this.$refs.upload.clearFiles();
            this.batchAddDialogShow = false;
            if (resp) {
              this.findByCondition();
              this.$notify({
                title: '成功',
                message: '批量导入单选试题成功',
                type: 'success',
                // duration: 0
              });
            } else {
              this.$notify({
                title: '失败',
                message: '批量导入单选试题失败',
                type: 'error',
                duration: 0
              });
            }
          }
        });
        return false;
      },
      async handleBefore(file) {
        console.log("提交之前", file);
        let formData = new FormData();
        formData.append("file", this.file);
        formData.append("questionBankId", this.dataForBatch.questionBankId)
        let resp = await this.uploadFile("/single/api/batchAdd", formData);
        console.log("上传结果:::", resp);
        if (resp.result) {
          this.$alert("上传数据成功", "提示", this.findByCondition())
        }
        return false;
      },


      download() {
        this.batchAddErrorMessage = '';
        // window.location.href = "http://localhost:8080/single/api/downloadModel";
        this.downloadFile("/single/api/downloadModel");
      },

      toBatchAdd() {
        console.log("唤起批量导入对话框。。。")
//        this.$refs.upload.clearFiles();
        this.batchAddErrorMessage = '';
        this.batchAddDialogShow = true;
      },
      /**
       * 批量添加对话框关闭时候执行
       */
      handleClose() {
        this.$refs.upload.clearFiles();
        this.batchAddDialogShow = false;
      },


      /*
      * 查找所有题库信息
      * */
      findQuestionBanks: async function () {
        if (this.questionBankList.length > 0) {
          return false;
        }
        let data = await this.doGet("/questionBank/api/findAll");
        this.questionBankList = data;
      },

      /**
       * 查询
       */
      findByCondition: async function () {
        let data = await this.doPost("/single/api/findByCondition?pageNum=" + this.queryForm.pageNum + "&pageSize=" + this.queryForm.pageSize, this.queryForm);
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
        this.dataForEdit = {a1: '', a2: '', a3: '', a4: '', a5: ''};
      },
      /**
       * 唤起编辑对话框
       */
      toEdit(idx, row) {
        console.log("编辑：", row)
        this.dataForEdit = JSON.parse(JSON.stringify(row));
        let itemList = JSON.parse(this.dataForEdit.content);
        if (itemList[0] && itemList[0].length > 0) {
          this.dataForEdit.a1 = itemList[0].substr(2);
        } else {
          this.dataForEdit.a1 = "";
        }
        if (itemList[1] && itemList[1].length > 0) {
          this.dataForEdit.a2 = itemList[1].substr(2);
        } else {
          this.dataForEdit.a2 = "";
        }
        if (itemList[2] && itemList[2].length > 0) {
          this.dataForEdit.a3 = itemList[2].substr(2);
        } else {
          this.dataForEdit.a3 = '';
        }
        if (itemList[3] && itemList[3].length > 0) {
          this.dataForEdit.a4 = itemList[3].substr(2);
        } else {
          this.dataForEdit.a4 = '';
        }
        if (itemList[4] && itemList[4].length > 0) {
          this.dataForEdit.a5 = itemList[4].substr(2);
        } else {
          this.dataForEdit.a5 = '';
        }

        console.log("dataForEdit:", this.dataForEdit)
        this.dataForEditIndex = idx;
        this.editDialogShow = true;
      },

      /**
       * 提交更新数据
       */
      save: async function () {
        console.log("更新数据");
        console.log("dataForEdit:", this.dataForEdit);

        this.$refs['editForm'].validate(async (valid) => {
          if (!valid) {
            console.log("参数校验不通过，请处理");
            return false;
          } else {
            let item = [];
            if (this.dataForEdit.a1.length > 0) {
              item.push(this.dataForEdit.a1)
            }
            if (this.dataForEdit.a2.length > 0) {
              item.push(this.dataForEdit.a2)
            }
            if (this.dataForEdit.a3.length > 0) {
              item.push(this.dataForEdit.a3)
            }
            if (this.dataForEdit.a4.length > 0) {
              item.push(this.dataForEdit.a4)
            }
            if (this.dataForEdit.a5.length > 0) {
              item.push(this.dataForEdit.a5)
            }
            this.dataForEdit.content = JSON.stringify(item);

            let res = await this.doPost('/single/api/save', this.dataForEdit);
            if (res) {
              if (this.dataForEdit.id) {
                //                修改
                this.$set(this.tableData, this.dataForEditIndex, this.dataForEdit);
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
          let data = await this.doPost("/single/api/delete?id=" + row.id);
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
      this.findQuestionBanks();

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
