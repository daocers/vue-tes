<template>
  <div class="table">
    <el-form :inline="true" ref="queryForm" :model="queryForm" :rules="queryRules" size="small">
      <el-form-item label="题库" prop="questionBankId">
        <el-select v-model="queryForm.questionBankId">
          <el-option v-for="bank in questionBankList"
                     :key="bank.id" :label="bank.name" :value="bank.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="题型" prop="questionTypeId">
        <el-select v-model="queryForm.questionTypeId">
          <el-option v-for="type in questionTypeList"
                     :key="type.id" :label="type.name" :value="type.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="题目" prop="title">
        <el-input v-model="queryForm.title" placeholder="支持模糊"></el-input>
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
        label="题目">
      </el-table-column>
      <el-table-column
        prop="answer"
        label="答案">
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容">
      </el-table-column>
      <el-table-column
        prop="extraInfo"
        label="附件信息">
      </el-table-column>
      <el-table-column
        prop="questionTypeId"
        label="题型">
      </el-table-column>
      <el-table-column
        prop="questionBankId"
        label="题库">
      </el-table-column>
      <el-table-column
        prop="propertyItemInfo"
        label="属性信息">
      </el-table-column>
      <el-table-column
        prop="ownerType"
        label="试题归属类型">
      </el-table-column>
      <el-table-column
        prop="ownerId"
        label="试题归属">
      </el-table-column>
      <el-table-column
        prop="privaryType"
        label="是否私有">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="isDel"
        label="删除标识">
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


    <el-dialog title="编辑" :visible.sync="editDialogShow">
      <el-form ref="editForm" :rules="rules" label-position="left" :model="dataForEdit">
        <el-form-item label="题目" prop="title" :label-width="labelWidth">
          <el-input v-model="dataForEdit.title" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="答案" prop="answer" :label-width="labelWidth">
          <el-input v-model="dataForEdit.answer" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content" :label-width="labelWidth">
          <el-input v-model="dataForEdit.content" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="附加信息" prop="extraInfo" :label-width="labelWidth">
          <el-input v-model="dataForEdit.extraInfo" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="题型" prop="questionTypeId" :label-width="labelWidth">
          <el-input v-model="dataForEdit.questionTypeId" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="题库" prop="questionBankId" :label-width="labelWidth">
          <el-input v-model="dataForEdit.questionBankId" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="属性信息" prop="propertyItemInfo" :label-width="labelWidth">
          <el-input v-model="dataForEdit.propertyItemInfo" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="是否私有" prop="privaryType" :label-width="labelWidth">
          <el-input v-model="dataForEdit.privaryType" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="updateData()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加" :visible.sync="addDialogShow">
      <el-form ref="addForm" :rules="rules" label-position="left" :model="dataForAdd">
        <el-form-item label="题型" prop="questionTypeId" :label-width="labelWidth">
          <el-select v-model="dataForAdd.questionTypeId" placeholder="请选择">
            <el-option
              v-for="type in questionTypeList"
              :key="type.id"
              :label="type.name"
              :value="type.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题库" prop="questionBankId" :label-width="labelWidth">
          <el-select v-model="dataForAdd.questionBankId" placeholder="请选择">
            <el-option
              v-for="bank in questionBankList"
              :key="bank.id"
              :label="bank.name"
              :value="bank.id">
            </el-option>
          </el-select>
          <!--<el-input v-model="dataForAdd.questionBankId" placeholder="请输入"></el-input>-->
        </el-form-item>
        <el-form-item label="题目" prop="title" :label-width="labelWidth">
          <el-input v-model="dataForAdd.title" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="答案" v-show="dataForAdd.questionTypeId != null" prop="answerItemList"  :label-width="labelWidth">
          <div v-if="questionTypeMap[dataForAdd.questionTypeId] == 'single'">
            <el-radio v-model="dataForAdd.answerItemList" label="A" border size="medium">A</el-radio>
            <el-radio v-model="dataForAdd.answerItemList" label="B" border size="medium">B</el-radio>
            <el-radio v-model="dataForAdd.answerItemList" label="C" border size="medium">C</el-radio>
            <el-radio v-model="dataForAdd.answerItemList" label="D" border size="medium">D</el-radio>
          </div>
          <div v-else-if="questionTypeMap[dataForAdd.questionTypeId] == 'multi'">
            <el-checkbox-group v-model="dataForAdd.answerItemList" @change="handleCheckBox">
              <el-checkbox label="A">A</el-checkbox>
              <el-checkbox label="B">B</el-checkbox>
              <el-checkbox label="C">C</el-checkbox>
              <el-checkbox label="D">D</el-checkbox>
              <el-checkbox label="E">E</el-checkbox>
            </el-checkbox-group>
          </div>
          <div v-else-if="questionTypeMap[dataForAdd.questionTypeId] == 'judge'">
            <el-radio v-model="dataForAdd.answerItemList" label="T" border size="medium">正确</el-radio>
            <el-radio v-model="dataForAdd.answerItemList" label="F" border size="medium">错误</el-radio>
          </div>
          <!--<el-input v-model="dataForAdd.answer" placeholder="请输入"></el-input>-->
        </el-form-item>
        <el-form-item label="内容" v-show="questionTypeMap[dataForAdd.questionTypeId] != 'judge'" prop="contentItemList">
          <!--<div v-for="line in dataForAdd.contentList">-->
          <!--<el-input v-model="line" placeholder="请输入"></el-input>-->
          <!--</div>-->
          <el-table :data="dataForAdd.contentItemList"
                    border
                    style="width: 100%">
            <el-table-column prop="no" label="序号" width="60px">
              <template slot-scope="scope">
                <span>{{getItemNo(scope.$index)}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="内容">
              <template slot-scope="scope">
                <el-input v-model="scope.row.item" size="small"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="removeLine(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button type="primary" plain @click="addItem()" icon="el-icon-plus" size="mini">添加</el-button>
        </el-form-item>
        <el-form-item label="附加信息" prop="extraInfo"  :label-width="labelWidth">
          <el-input v-model="dataForAdd.extraInfo" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="属性" prop="propertyItemInfo">
          <!--<el-input v-model="dataForAdd.propertyItemInfo" placeholder="请输入"></el-input>-->

          <div v-for="questionType in questionTypeList">
            <div v-if="dataForAdd.questionTypeId == questionType.id">
              <div v-for="property in questionType.propertyList">
                <el-checkbox-group
                  v-model="dataForAdd.propertyItemList"
                  :min="1"
                  :max="1">
                  <el-checkbox v-for="itme in property.propertyItemList" :label="item.name" :key="item.id">
                    {{item.name}}
                  </el-checkbox>
                </el-checkbox-group>
              </div>

            </div>

          </div>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd()">取 消</el-button>
        <el-button type="primary" @click="addData()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="批量添加" :visible.sync="batchAddDialogShow" :before-close="handleClose">
      <el-form label-position="left" ref="batchForm" :rules="batchAddRules" :model="dataForBatch" label-width="60px">
        <el-form-item label="题库" prop="questionBankId"  :label-width="labelWidth">
          <el-select v-model="dataForBatch.questionBankId" placeholder="请选择题库">
            <el-option v-for="bank in questionBankList"
                       :key="bank.id"
                       :label="bank.name"
                       :value="bank.id">

            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型" prop="questionTypeId"  :label-width="labelWidth">
          <el-select v-model="dataForBatch.questionTypeId" placeholder="请选择题型">
            <el-option
              v-for="type in questionTypeList"
              :key="type.id"
              :label="type.name"
              :value="type.id">

            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-upload
        class="upload-demo"
        ref="upload"
        :limit="1"
        :data="dataForBatch"
        action="http://localhost:8090/commonQuestion/api/batchAdd.do"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-change="handleChange"
        :on-success="handleSuccess"
        :on-error="handleError"
        :file-list="fileList"
        :auto-upload="false">

        <el-button slot="trigger" size="small" type="primary" plain>选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="primary" @click="batchAdd">上传到服务器</el-button>
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
  import SceneIndex from "../scene/index.vue";

  export default {
    components: {SceneIndex},
    data() {
      var checkContentInfo = (rule, value, callback) => {
        console.log("value: ", value);
        let contentList;
        if (this.addDialogShow) {
          contentList = this.dataForAdd.contentList;
        } else if (this.editDialogShow) {
          contentList = this.dataForEdit.contentList;
        } else {
//          只校验单选多选，其他题型不对内容校验
          callback();
        }
        if (contentList.length == 0) {
          callback(new Error("请添加试题明细"));
        } else {
          let item = contentList[contentList.length - 1];
          console.log("item: ", item);
          let info = item.item;
          if (info == undefined || info == '') {
            callback(new Error("试题选项不能为空"));
          } else if (info.length > 50) {
            callback(new Error("试题选项在50位以内"));
          } else {
            callback();
          }
        }
      };
      return {
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
          title: null,
          questionTypeId: null,
          questionBankId: null,
          pageSize: 10,
          pageNum: 1,
        },
        /**
         * 添加对话框数据
         */
        dataForAdd: {
          contentItemList: [],
          answerItemList: [],
          propertyItemList: [],
        },

        /**
         * 添加对话框是否显示
         */
        addDialogShow: false,
        /**
         * 修改对话框是否显示
         */
        editDialogShow: false,

        batchAddErrorMessage: '',
        batchAddDialogShow: false,
        /**
         * 批量上传下载模板时候的参数信息
         */
        dataForBatch: {
          questionTypeId: null,
          questionBankId: null,
        },

        /**
         * 修改对话框数据
         */
        dataForEdit: {
          contentItemList: [],
          answerItemList: [],
          propertyItemList: [],
        },

        /**
         * 修改对话框数据索引值
         */
        dataForEditIndex: null,

        /**
         * 题型信息
         */
        questionTypeList: [],

        /**
         * 题库信息
         */
        questionBankList: [],

        /**
         * 题目属性信息
         */
        propertyList: [],

        /**
         * 试题类型信息{id:code}
         */
        questionTypeMap: {},

        fileList: [],

        /**
         * 校验规则
         */
        rules: {
          title:
            [
              {required: true, message: '请输入题目', trigger: 'blur'},
              {max: 100, message: '长度在3-100个字符', trigger: 'blur'}
            ],
          answerList:
            [
              {type: 'array', required: true, message: '请输入answer', trigger: 'change'},
//              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
          ],
          content:
            [
              {validator: checkContentInfo, trigger: 'blur'},
//              {required: true, message: '请输入content', trigger: 'blur'},
//              {min: 3, max: 100, message: '长度在3-100个字符', trigger: 'blur'}
          ],
          extraInfo:
            [
              {required: true, message: '请输入extraInfo', trigger: 'blur'},
              {min: 3, max: 100, message: '长度在3-100个字符', trigger: 'blur'}
            ],
          questionTypeId:
            [
              {type: 'number', required: true, message: '请输入questionTypeId', trigger: 'change'},
            ],
          questionBankId:
            [
              {type: 'number', required: true, message: '请输入questionBankId', trigger: 'change'},
            ],
          propertyItemInfo:
            [
              {required: true, message: '请输入propertyItemInfo', trigger: 'blur'},
            ],
          privaryType:
            [
              {required: true, message: '请输入privaryType', trigger: 'blur'},
//              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
          ],
        },

        /**
         * 上传的校验
         */
        batchAddRules: {
          questionTypeId: [
            {type: 'number', required: true, message: '请选择题型', trigger: 'change'}
          ],
          questionBankId: [
            {type: 'number', required: true, message: '请选择题库', trigger: 'change'}
          ]
        },

      }
    },


    methods: {
      download() {
        if (this.dataForBatch.questionTypeId == null) {
          this.batchAddErrorMessage = "请选择题型";
        } else {
          this.batchAddErrorMessage = '';
          window.location.href = "http://localhost:8090/commonQuestion/downloadModel.do?questionTypeId=" + this.dataForBatch.questionTypeId;
        }
      },

      toBatchAdd() {
        console.log("唤起批量导入对话框。。。")
//        this.$refs.upload.clearFiles();
        this.batchAddErrorMessage = '';
        this.batchAddDialogShow = true;
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

      /**
       * 查询
       */
      findByCondition: async function () {
        let data = await this.http("/commonQuestion/api/findByCondition.do?pageNum=" + this.queryForm.pageNum + "&pageSize=" + this.queryForm.pageSize, this.queryForm);
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
            var res = await this.http('/commonQuestion/api/update.do', this.dataForEdit, 1000);
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
            let res = await this.http("/commonQuestion/api/save.do", this.dataForAdd, 1000);
            if (res == true) {
              this.$confirm('继续添加?查看列表?', '提示', {
                confirmButtonText: '继续添加',
                cancelButtonText: '查看列表',
                type: 'success',
                center: true
              }).then(() => {
                this.$refs['addForm'].resetFields();
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
       * 取消添加
       */
      cancelAdd: async function () {
        this.findByCondition();
        this.addDialogShow = false;
      },

      /**
       * 删除数据
       */
      async toRemove(idx, row) {
        console.log("删除：", idx, row)
        let data = await this.http("/commonQuestion/api/delete.do?id=" + row.id);
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

      /**
       * 添加明细
       */
      addItem: function () {
        if (this.editDialogShow) {
          this.dataForEdit.contentItemList.push({});
        } else {
          this.dataForAdd.contentItemList.push({});
        }
      },
      /**
       * 删除明细
       */
      removeLine: function (idx, row) {
        if (this.editDialogShow) {
          this.dataForEdit.contentItemList.splice(idx, 1);
        } else {
          this.dataForAdd.contentItemList.splice(idx, 1);
        }
      },


      handleCheckBox(value) {
        console.log("复选框选中的值：", value);
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
      },
      getItemNo: function (no) {
        console.log("no: ", no);
        let info = {0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F'}
        let res = info[no];
        console.log("res: ", res);
        return res;
      },


      /**
       * 批量添加对话框关闭时候执行
       */
      handleClose() {
        this.$refs.upload.clearFiles();
        this.batchAddDialogShow = false;
      },

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handleChange(file, fileList) {
        console.info("change file: ", file);
        console.info("change fileList: ", fileList);

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
            message: '批量导入机构信息成功',
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
          message: '批量导入机构信息失败',
          type: 'error',
          duration: 0
        });
      },
    },
    /**
     * 页面初始化时候执行
     **/
    created: async function () {
      console.log("created....")
      this.findByCondition();
      let questionTypeList = await this.http("/questionType/api/findAll.do");
      this.questionTypeList = questionTypeList;
      console.log("题型信息： ", questionTypeList)
      if (questionTypeList != null) {
        for (let i = 0; i < questionTypeList.length; i++) {
          let questionType = questionTypeList[i];
          this.questionTypeMap[questionType.id] = questionType.code;
        }
        console.log("questionTypeMap: {}", this.questionTypeMap)
      }
      let questionBankList = await this.http("/questionBank/api/findAll.do");
      this.questionBankList = questionBankList;
      let propertyList = await this.http("/property/api/findAll.do");
      this.propertyList = propertyList;
    },
    computed: {}
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
