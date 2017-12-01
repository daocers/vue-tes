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
        <el-form-item v-show="this.dataForEdit.id" label="试卷策略编码" prop="code">
          <el-input :disabled="false" v-model="dataForEdit.code" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="题型信息" prop="questionTypeIdList">
          <el-tag style="margin-right: 10px;" v-for="item in questionTypeList" :key="item.id"
                  v-show="dataForEdit.questionTypeIdList.indexOf(item.id) > -1">{{item.name}}
          </el-tag>
          <el-tag v-show="dataForEdit.questionTypeIdList.length == 0">请选择指定题型的选题策略</el-tag>
        </el-form-item>


        <el-form-item label="策略内容" prop="content">

          <el-table ref="contentTable" border :data="contentItemList"
                    highlight-current-row
                    size="small"
                    style="width: 100%">
            <el-table-column
              label="题型">
              <template slot-scope="scope">
                <span>{{questionTypeIdNameMap[scope.row.questionTypeId]}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="试题策略名称"
              property="name">
            </el-table-column>
            <el-table-column
              label="策略归属"
              property="ownerName">
            </el-table-column>

            <el-table-column
              label="题量"
              property="questionCount"
              width="60px">
            </el-table-column>
            <el-table-column
              label="分值"
              property="score"
              width="80px">
              <template slot-scope="scope">
                <el-input v-model="scope.row.score"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="90">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="toRemoveContent(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>

        <el-row>

          <div id="query" style="border: 1px solid gainsboro; margin-top: 10px; padding: 3px;">
            <el-form :inline="true" ref="policyQueryForm" :model="policyQueryForm">
              <el-form-item label="名称" prop="name" size="small">
                <el-input v-model="policyQueryForm.name" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="题型" prop="questionTypeId" size="small">
                <el-select v-model="policyQueryForm.questionTypeId">
                  <el-option
                    v-for="item in questionTypeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item size="small">
                <el-button type="primary" plain @click="getQuestionPolicyList">查询</el-button>
                <el-button type="default" plain @click="reset()">重置</el-button>
              </el-form-item>
            </el-form>
          </div>


          <el-table
            ref="quesPolicyTable"
            border
            :data="questionPolicyList"
            highlight-current-row
            @current-change="handleQustionPolicyCurrentChange"
            max-height="250px"
            style="width: 100%">
            <el-table-column
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              property="name"
              label="试题策略名称">
            </el-table-column>
            <el-table-column
              property="createUserName"
              label="创建人">
            </el-table-column>
            <el-table-column
              property="createTime"
              label="创建时间">
            </el-table-column>
            <el-table-column
              property="questionCount"
              label="题量">
            </el-table-column>
          </el-table>
          <el-pagination style="float: right; margin-top: 10px;"
                         @current-change="handlePolicyCurrentChange"
                         :current-page="policyQueryForm.pageNum"
                         :page-size="policyQueryForm.pageSize"
                         layout="total, prev, pager, next, jumper"
                         :total="questionPolicyCount">
          </el-pagination>
        </el-row>


        <el-form-item label="试卷选择方式" prop="questionSelectType">
          <el-select v-model="dataForEdit.questionSelectType" placeholder="请选择试卷选择方式">
            <el-option v-for="item in questionSelectTypeList" :key="item.id" :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
          <span style="display: block; color: cornflowerblue;">随机选择，每张试卷都不一样; 统一试卷，每张试卷一样; 乱序统一，试题相同，顺序不同</span>
        </el-form-item>
        <el-row>
          <el-col :span="10">
            <el-form-item label="总题量" prop="count">
              <el-input v-model="getCount" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="2">
            <el-form-item label="总得分" prop="score">
              <el-input v-model="dataForEdit.score" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item label="是否私有" prop="privaryType">
              <el-switch v-model="dataForEdit.privaryType" active-value="1" inactive-value="2"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="2">
            <el-form-item label="是否百分制" prop="percentable">
              <el-switch v-model="dataForEdit.percentable" active-value="1" inactive-value="2"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
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
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";


  export default {
    components: {
      ElCol,
      ElRow
    },
    data() {
      var checkPerScore = (score) => {
        if(score == 0){
          return false;
        }
        console.log(score);
        let regex = /^(\d{1,2})(\.[5])?$/g;
        return regex.exec(score);
      };
      /**
       * 校验试卷策略信息
       * @param rule
       * @param value
       * @param callback
       */
      var checkPaperPolicyContent = (rule, value, callback) => {
        console.log("contentItemList: ", this.contentItemList);
        console.log("value:   :::", value);
        let lineCount = this.contentItemList.length;
        for (let i = 0; i < lineCount; i++) {
          let line = this.contentItemList[i];
          let questionPolicy = line.id;
          let perScore = line.score;
          if (!checkPerScore(perScore)) {
            callback(new Error("第" + (i + 1) + "行分值输入有误\n只能输入100以内的正整数或者以为小数，如果为小数只能为*.5结束"));
          }
        }
        callback();
      };
      return {
        /**
         * 试卷策略和对应的分值信息
         */
        quesPolicyAndScoreInfo: {},
        /**
         * 已经选择的试题系列表
         */
        contentItemList: [],
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
         * 已选择的试题策略信息  id: obj
         */
        choicedMap: {},

        /**
         * 试题信息 id:name map
         */
        questionTypeIdNameMap: {},
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
              {required: true, message: '请输入percentable', trigger: 'change'},
            ],
          questionSelectType:
            [
              {required: true, type: 'number', message: '请输入questionSelectType', trigger: 'change'},
            ],
          privaryType:
            [
              {required: true, message: '请输入privaryType', trigger: 'change'},
            ],
        }

      }
    },


    methods: {
      handleCheckBox(value) {
        console.log("checked : ", value);
      },
      /**
       * 查询
       */
      findByCondition: async function () {
        let data = await this.http("/paperPolicy/api/findByCondition.do?pageNum=" + this.queryForm.pageNum + "&pageSize=" + this.queryForm.pageSize, this.queryForm);
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
        this.editDialogShow = true;
        this.dataForEdit = {
          count: 0,
          questionTypeIdList: [],
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
      updateData: async function () {
        console.log("更新数据");
        console.log("dataForEdit:", this.dataForEdit);

        this.$refs['editForm'].validate(async (valid) => {
          if (!valid) {
            console.log("参数校验不通过，请处理");
            return false;
          } else {
            this.dataForEdit.contentItemList = this.contentItemList;
            var res = await this.http('/paperPolicy/api/save.do', this.dataForEdit, 1000);
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
            let res = await this.http("/paperPolicy/api/save.do", this.dataForAdd, 1000);
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
        let data = await this.http("/paperPolicy/api/delete.do?id=" + row.id);
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
        this.contentItemList.splice(idx, 1);
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
          this.contentItemList.push(currentRow);
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
        let questionPolicyList = await this.http("/questionPolicy/api/findByCondition.do?pageNum="
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
      let questionTypeList = await  this.http("/questionType/api/findAll.do");
      this.questionTypeList = questionTypeList;
      for (let i = 0; i < questionTypeList.length; i++) {
        let item = questionTypeList[i];
        console.log("item: ", item);
        this.questionTypeIdNameMap[item.id + ""] = item.name;
      }
      console.log("questionTypeIdNameMap: ", this.questionTypeIdNameMap);
      console.log("题型列表： ", questionTypeList);
    },

    computed: {
      getCount: function () {
        let count = 0;
        let totalScore = 0;
        for (let i = 0; i < this.contentItemList.length; i++) {
          let item = this.contentItemList[i];
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
