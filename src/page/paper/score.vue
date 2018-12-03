<template>
  <div class="table">
    <el-form :inline="true" ref="queryForm" :model="queryForm" :rules="queryRules" size="small">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="queryForm.username" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="findByCondition()">查询</el-button>
        <el-button type="default" plain @click="reset()">重置</el-button>
      </el-form-item>
      <!--<el-form-item style="float: right">-->
        <!--<el-button type="primary" @click="toAdd()">添加</el-button>-->
      <!--</el-form-item>-->
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
        v-if="false"
        prop="userId"
        label="用户ID">
      </el-table-column>

      <el-table-column
        prop="userName"
        label="考生">
      </el-table-column>

      <el-table-column
        prop="originalScore"
        label="原始得分">
      </el-table-column>
      <el-table-column
        prop="score"
        label="百分制得分">
      </el-table-column>

      <el-table-column
        prop="code"
        label="试卷编号">

      </el-table-column>
      <el-table-column
        prop="answerFlag"
        label="做答标志">
        <template slot-scope="scope">
          <el-tag type="info" v-if="scope.row.answerFlag == 1" size="small">未作答</el-tag>
          <el-tag type="success" v-if="scope.row.answerFlag == 2" size="small">已作答</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="beginTime"
        label="入场时间">
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="交卷时间">
      </el-table-column>

      <el-table-column
        prop="sceneName"
        label="场次名称">
      </el-table-column>

      <el-table-column
        prop="status"
        label="状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status == 1" size="small">正常</el-tag>
          <el-tag type="success" v-if="scope.row.status == 3" size="small">作废</el-tag>
          <el-tag type="success" v-if="scope.row.status == 2" size="small">已提交</el-tag>
          <el-tag type="success" v-if="scope.row.status == 4" size="small">已判分</el-tag>
        </template>
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
        <el-form-item label="code" prop="code" :label-width="labelWidth">
          <el-input v-model="dataForEdit.code" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="answerFlag" prop="answerFlag" :label-width="labelWidth">
          <el-input v-model="dataForEdit.answerFlag" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="beginTime" prop="beginTime" :label-width="labelWidth">
          <el-input v-model="dataForEdit.beginTime" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="endTime" prop="endTime" :label-width="labelWidth">
          <el-input v-model="dataForEdit.endTime" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="originalScore" prop="originalScore" :label-width="labelWidth">
          <el-input v-model="dataForEdit.originalScore" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="score" prop="score" :label-width="labelWidth">
          <el-input v-model="dataForEdit.score" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="sceneId" prop="sceneId" :label-width="labelWidth">
          <el-input v-model="dataForEdit.sceneId" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="userId" prop="userId" :label-width="labelWidth">
          <el-input v-model="dataForEdit.userId" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="status" prop="status" :label-width="labelWidth">
          <el-input v-model="dataForEdit.status" placeholder="请输入"></el-input>
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
          sceneId: null,
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
          code:
            [
              {required: true, message: '请输入code', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          answerFlag:
            [
              {required: true, message: '请输入answerFlag', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          beginTime:
            [
              {required: true, message: '请输入beginTime', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          endTime:
            [
              {required: true, message: '请输入endTime', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          originalScore:
            [
              {required: true, message: '请输入originalScore', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          score:
            [
              {required: true, message: '请输入score', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          sceneId:
            [
              {required: true, message: '请输入sceneId', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          userId:
            [
              {required: true, message: '请输入userId', trigger: 'blur'},
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
          createTime:
            [
              {required: true, message: '请输入createTime', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          createUserId:
            [
              {required: true, message: '请输入createUserId', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          updateTime:
            [
              {required: true, message: '请输入updateTime', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          updateUserId:
            [
              {required: true, message: '请输入updateUserId', trigger: 'blur'},
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
        let data = await this.postEntity("/paper/api/findByCondition?pageNum=" + this.queryForm.pageNum + "&pageSize=" + this.queryForm.pageSize, this.queryForm);
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
            var res = await this.postEntity('/paper/api/save', this.dataForEdit, 3000);
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
          let data = await this.postEntity("/paper/api/delete?id=" + row.id);
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
      let sceneId = this.$route.query.sceneId;
      if (sceneId) {
        this.queryForm.sceneId = sceneId;
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
