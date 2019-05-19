<template>
  <div class="table">
    <el-form :inline="true" ref="queryForm" :model="queryForm" :rules="queryRules" size="small">
      <el-form-item label="名称" prop="name">
        <el-input v-model="queryForm.name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain icon="iconfont tes-icon-query" @click="findByCondition()">查询</el-button>
        <el-button type="default" plain icon="iconfont tes-icon-reset" @click="reset()">重置</el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button  icon="el-icon-edit" type="primary" @click="toAdd()">添加</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      :row-class-name="tableRowClassName"
      style="width: 100%">
      <el-table-column
        v-if="false"
        prop="id"
        label="id"
        width="10">
      </el-table-column>

      <el-table-column
        prop="questionId"
        label="试题id">
      </el-table-column>
      <el-table-column
        prop="questionType"
        label="题型">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.questionType == 1">单选</el-tag>
          <el-tag type="info" v-if="scope.row.questionType == 2">多选</el-tag>
          <el-tag type="danger" v-if="scope.row.questionType == 3">判断</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="sceneId"
        label="场次id">
      </el-table-column>

      <el-table-column
        prop="sceneName"
        label="场次名称">
      </el-table-column>

      <el-table-column
        prop="rightAnswer"
        label="正确答案">
      </el-table-column>
      <el-table-column
        prop="answer"
        label="答案">
      </el-table-column>

      <el-table-column
        prop="timeUsed"
        label="用时">
        <template slot-scope="scope">
          {{scope.row.timeUsed > 0 ? scope.row.timeUsed: ''}}
        </template>
      </el-table-column>
      <el-table-column
        prop="timeLeft"
        label="剩余时间">
      </el-table-column>

      <el-table-column
        v-if="false"
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
      <el-form size="small" ref="editForm" :rules="rules" label-position="left" :model="dataForEdit">
        <el-form-item label="paperId" prop="paperId">
          <el-input v-model="dataForEdit.paperId" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="questionId" prop="questionId">
          <el-input v-model="dataForEdit.questionId" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="questionTypeId" prop="questionTypeId">
          <el-input v-model="dataForEdit.questionTypeId" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="sceneId" prop="sceneId">
          <el-input v-model="dataForEdit.sceneId" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="answer" prop="answer">
          <el-input v-model="dataForEdit.answer" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="timeUsed" prop="timeUsed">
          <el-input v-model="dataForEdit.timeUsed" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="timeLeft" prop="timeLeft">
          <el-input v-model="dataForEdit.timeLeft" placeholder="请输入"></el-input>
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
        <el-button icon="iconfont tes-icon-cancel" @click="cancelCommit">取 消</el-button>
        <el-button icon="iconfont tes-icon-commit" type="primary" @click="commitData()">确 定</el-button>
      </div>
    </el-dialog>


  </div>

</template>


<script>
  import Vue from 'vue'

  export default {
    data() {
      return {
        tableRowClassName({row, rowIndex}) {
          if (row.answer == row.rightAnswer) {
            return 'success-row';
          } else if (row.answer.indexOf(row.rightAnswer) > -1) {
            return 'warning-row';
          } else if (row.answer != row.rightAnswer) {
            return "danger-row";
          }
          return '';
        },

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
          paperId: null,
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
          paperId:
            [
              {required: true, message: '请输入paperId', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          questionId:
            [
              {required: true, message: '请输入questionId', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          questionTypeId:
            [
              {required: true, message: '请输入questionTypeId', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          sceneId:
            [
              {required: true, message: '请输入sceneId', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          answer:
            [
              {required: true, message: '请输入answer', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          timeUsed:
            [
              {required: true, message: '请输入timeUsed', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          timeLeft:
            [
              {required: true, message: '请输入timeLeft', trigger: 'blur'},
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
        let data = await this.doPost("/answer/api/findByCondition?pageNum=" + this.queryForm.pageNum + "&pageSize=" + this.queryForm.pageSize, this.queryForm);
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
        this.dataForEdit = {
          count: 0,
          questionTypeIdList: [],
          contentItemList: [],
        };
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
            var res = await this.doPost('/paperPolicy/api/save', this.dataForEdit);
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
//                  this.$refs['addForm'].resetFields();
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
        console.log("删除：", idx, row)
        let data = await this.doPost("/answer/api/delete?id=" + row.id);
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
      let paperId = this.$route.query.id;
      console.log("paperId", paperId);
      if (paperId) {
        this.queryForm.paperId = paperId;
      }else{
        console.log("没有试卷id")
        console.log("history", this.$router.history)
        this.$router.push("/");
      }
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
