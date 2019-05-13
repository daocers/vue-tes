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
        <el-button type="primary"  icon="el-icon-edit"  @click="toAdd()">添加</el-button>
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
        prop="code"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="questionTypeInfo"
        label="题型信息">
      </el-table-column>
      <el-table-column
        prop="content"
        label="content">
      </el-table-column>
      <el-table-column
        prop="count"
        label="题量">
      </el-table-column>
      <el-table-column
        prop="score"
        label="分数">
      </el-table-column>
      <el-table-column
        prop="percentable"
        label="是否百分制">
      </el-table-column>
      <el-table-column
        prop="ownerId"
        label="所属单位">
      </el-table-column>
      <el-table-column
        prop="ownerType"
        label="所属单位类型">
      </el-table-column>
      <el-table-column
        prop="questionSelectType"
        label="试卷选择方式">
      </el-table-column>
      <el-table-column
        prop="privaryType"
        label="私有">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
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

        <el-form-item label="策略名称" prop="name">
          <el-input v-model="dataForEdit.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item v-show="dataForEdit.id" label="试卷策略编码" prop="code">
          <el-input disabled v-model="dataForEdit.code" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="题型信息" prop="questionTypeIdList">
          <el-tag style="margin-right: 10px;" v-for="item in questionTypeList" :key="item.id"
                  v-show="dataForEdit.questionTypeIdList.indexOf(parseInt(item.id)) > -1">{{item.name}}
          </el-tag>
          <el-tag v-show="dataForEdit.questionTypeIdList.length == 0">请选择指定题型的选题策略</el-tag>
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
    components: {
      ElCol,
      ElRow
    },
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
         * 试题策略查询参数
         */
        policyQueryForm: {
          name: null,
          pageSize: 10,
          pageNum: 1,
        },

        /**
         * 查询到的试题策略信息
         */
        questionPolicyList: [],
        /**
         * 查询到的试题策略数量
         */
        questionPolicyCount: 0,

        /**
         * 修改对话框是否显示
         */
        editDialogShow: false,

        /**
         * 修改对话框数据
         */
        dataForEdit: {
          questionTypeIdList: [],
          contentItemList: [],
          count: 0,
        },
        /**
         * 修改对话框数据索引值
         */
        dataForEditIndex: null,

        /**
         * 题型列表
         */
        questionTypeList: [{}],


        questionSelectTypeList: [
          {id: 1, name: '随机选择'},
          {id: 2, name: '统一'},
          {id: 3, name: '统一乱序'},
        ],

        /**
         * 校验规则
         */
        rules: {
          name:
            [
              {required: true, message: '请输入name', trigger: 'blur'},
              {min: 2, max: 16, message: '长度在2-16个字符', trigger: 'blur'}
            ],
          content:
            [
              {validator: checkPaperPolicyContent, trigger: 'change'},
            ],
          percentable:
            [
              {type: 'number', required: true, message: '请输入percentable', trigger: 'change'},
            ],
          questionSelectType:
            [
              {required: true, type: 'number', message: '请输入questionSelectType', trigger: 'change'},
            ],
          privaryType:
            [
              {type: 'number', required: true, message: '请输入privaryType', trigger: 'change'},
            ],
        }

      }
    },


    methods: {
      /**
       * 查询
       */
      findByCondition: async function () {
        let data = await this.doPost("/paperPolicy/api/findByCondition?pageNum=" + this.queryForm.pageNum + "&pageSize=" + this.queryForm.pageSize, this.queryForm);
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
            let res = await this.doPost('/paperPolicy/api/save', this.dataForEdit);
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
            let res = await this.doPost("/paperPolicy/api/save", this.dataForAdd);
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
        let data = await this.doPost("/paperPolicy/api/delete?id=" + row.id);
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
       * 删除已经选择的试题信息
       */
      toRemoveContent(idx, row) {
        console.log("idx: ", idx);
        console.log("row: ", row);
        this.dataForEdit.contentItemList.splice(idx, 1);
//        从已选择的记录中删除
        this.choicedMap[row.questionTypeId] = undefined;
      },

      /**
       * 试题策略列表，选中某一行时候执行
       */
      handleQustionPolicyCurrentChange(currentRow, oldCurrentRow) {
        console.log("old: ", oldCurrentRow);
        console.log("new : ", currentRow);
        if (this.choicedMap[currentRow.questionTypeId]) {
          this.$notify({
            title: '警告',
            message: "该题型已经选择策略，如需更改，请先删除已选项",
            type: 'warning'
          });
        } else {
          this.choicedMap[currentRow.questionTypeId] = currentRow;

          let questionTypeIdList = [];
          for (let key in this.choicedMap) {
            questionTypeIdList.push(parseInt(key));
          }
          this.dataForEdit.questionTypeIdList = questionTypeIdList;
          console.log("this.dataForEdit.questionTypeIdList: ", this.dataForEdit.questionTypeIdList);
          this.dataForEdit.contentItemList.push(currentRow);
        }

      },

      /**
       * 试卷策略列表，每页显示条数变化时候执行
       */
      handleSizeChange(val) {
        this.queryForm.pageSize = val;
        console.log(`每页 ${val} 条`);
        this.findByCondition();
      },

      /**
       * 试卷策略列表，页码变动时候执行
       */
      handleCurrentChange(val) {
        this.queryForm.pageNum = val;
        console.log(`当前页: ${val}`);
        this.findByCondition();
      },

      /**
       * 查询试题策略，当页码变动时候执行
       */
      handlePolicyCurrentChange(val) {
        this.policyQueryForm.pageNum = val;
        console.log(`当前页: ${val}`);
        this.getQuestionPolicyList();
      },

      /**
       * 获取试题策略列表
       */
      async getQuestionPolicyList() {
        let questionPolicyList = await this.doPost("/questionPolicy/api/findByCondition?pageNum="
          + this.policyQueryForm.pageNum + "&pageSize=" + this.policyQueryForm.pageSize, this.policyQueryForm);
        if (questionPolicyList) {
          this.questionPolicyList = questionPolicyList.list;
          this.questionPolicyCount = questionPolicyList.total;
        }

      }

    },
    /**
     * 页面初始化时候执行
     **/
    created: async function () {
      console.log("created....")
      this.findByCondition();
      let questionTypeList = await  this.doGet("/questionType/api/findAll");
      if (questionTypeList) {
        this.questionTypeList = questionTypeList;
        for (let i = 0; i < questionTypeList.length; i++) {
          let item = questionTypeList[i];
          console.log("item: ", item);
          this.questionTypeIdNameMap[parseInt(item.id)] = item.name;
        }
        console.log("questionTypeIdNameMap: ", this.questionTypeIdNameMap);
        console.log("题型列表： ", questionTypeList);
      }
    },


    computed: {
      /**
       * 计算题量和总得分
       */
      getCount: function () {
        let count = 0;
        let totalScore = 0;
        for (let i = 0; i < this.dataForEdit.contentItemList.length; i++) {
          let item = this.dataForEdit.contentItemList[i];
          let perScore = item.score;
          let perCount = item.questionCount;
          console.log("perScore: ", perScore);
          console.log("perCount: ", perCount);
          if (perScore) {
            totalScore = parseInt(totalScore) + parseInt(perCount * perScore * 10);
          }
          count = parseInt(count) + parseInt(perCount);
        }
        this.dataForEdit.score = totalScore / 10;
        return count;
      }
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

  #query form-item--mini.el-form-item, #query .el-form-item--small.el-form-item {
    padding-bottom: 5px;
  }
</style>
