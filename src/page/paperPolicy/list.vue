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
        prop="singleCount"
        label="单选数量">
      </el-table-column>

      <el-table-column
        prop="singleScore"
        label="单选分值">
      </el-table-column>

      <el-table-column
        prop="multiCount"
        label="多选数量">
      </el-table-column>

      <el-table-column
        prop="multiScore"
        label="多选分值">
      </el-table-column>

      <el-table-column
        prop="judgeCount"
        label="判断数量">
      </el-table-column>

      <el-table-column
        prop="judgeScore"
        label="判断分值">
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
        prop="receiptScore"
        label="凭条总分">
      </el-table-column>
      <el-table-column
        prop="branchName"
        label="机构">
      </el-table-column>
      <el-table-column
        prop="stationName"
        label="岗位">
      </el-table-column>
      <el-table-column
        prop="departmentName"
        label="部门">
      </el-table-column>
      <el-table-column
        prop="createUserName"
        label="创建人">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="90">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="toDetail(scope.$index, scope.row)">查看详情</el-button>
          <el-button type="text" size="small" @click="toCheck(scope.$index, scope.row)">检测</el-button>
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

    <el-dialog title="校验策略可用性" :visible.sync="checkDialogShow" width="80%">
      <el-form ref="checkForm" :rules="rules" label-position="left" :model="dataOfCheck">
        <el-form-item label="策略名称" prop="name" :label-width="labelWidth">
          <el-input :disabled="true" v-model="dataOfCheck.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="选择题库" prop="bankId" :label-width="labelWidth">
          <el-select v-model="dataOfCheck.bankId" @change="checkPaperPolicy">
            <el-option v-for="item in questionBankList"
                       :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
          <span
            style="display: block; color: cornflowerblue;">选择题库校验可用性</span>
        </el-form-item>
      </el-form>

      <div v-if="!detailFlag" slot="footer" class="dialog-footer">

        <el-alert
          v-if="dataOfCheck.valid"
          title="策略可用"
          type="success">
        </el-alert>
        <el-alert
          v-if="dataOfCheck.valid == false"
          title="策略不可用"
          type="error">
        </el-alert>


        <el-alert
          v-if="!dataOfCheck.bankId"
          title=""
          type="info"
          description="选择题库去校验试卷策略可用性"
          show-icon>
        </el-alert>

        <!--              <el-button type="primary" @click="checkPaperPolicy">保存校验数据</el-button>-->
      </div>
      <el-row>
        <el-tag key="单选题">单选题</el-tag>
        <el-table :data="dataOfCheck.singles" :row-class-name="getCheckRowClassName">
          <el-table-column prop="busiType" label="业务类型">
            <template slot-scope="scope">
              {{busiTypeMap[scope.row.busiType]}}
            </template>
          </el-table-column>
          <el-table-column prop="difficulty" label="难度">
            <template slot-scope="scope">
              {{diffMap[scope.row.difficulty]}}
            </template>
          </el-table-column>
          <el-table-column prop="count" label="需要题量"></el-table-column>
          <el-table-column prop="realCount" label="实际数量"></el-table-column>
          <el-table-column label="结果">
            <template slot-scope="scope">
              <el-button size="mini" v-if="scope.row.realCount >= scope.row.count" type="success" icon="el-icon-check"
                         circle></el-button>
              <el-button size="mini" v-if="scope.row.realCount < scope.row.count" type="danger" icon="el-icon-close"
                         circle></el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-tag key="多选题">多选题</el-tag>
        <el-table :data="dataOfCheck.multies" :row-class-name="getCheckRowClassName">
          <el-table-column prop="busiType" label="业务类型">
            <template slot-scope="scope">
              {{busiTypeMap[scope.row.busiType]}}
            </template>
          </el-table-column>
          <el-table-column prop="difficulty" label="难度">
            <template slot-scope="scope">
              {{diffMap[scope.row.difficulty]}}
            </template>
          </el-table-column>
          <el-table-column prop="count" label="需要题量"></el-table-column>
          <el-table-column prop="realCount" label="实际数量"></el-table-column>
          <el-table-column label="结果">
            <template slot-scope="scope">
              <el-button size="mini" v-if="scope.row.realCount >= scope.row.count" type="success" icon="el-icon-check"
                         circle></el-button>
              <el-button size="mini" v-if="scope.row.realCount < scope.row.count" type="danger" icon="el-icon-close"
                         circle></el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-tag key="判断题">判断题</el-tag>
        <el-table :data="dataOfCheck.judges" :row-class-name="getCheckRowClassName">
          <el-table-column prop="busiType" label="业务类型">
            <template slot-scope="scope">
              {{busiTypeMap[scope.row.busiType]}}
            </template>
          </el-table-column>
          <el-table-column prop="difficulty" label="难度">
            <template slot-scope="scope">
              {{diffMap[scope.row.difficulty]}}
            </template>
          </el-table-column>
          <el-table-column prop="count" label="需要题量"></el-table-column>
          <el-table-column prop="realCount" label="实际数量"></el-table-column>
          <el-table-column label="结果">
            <template slot-scope="scope">
              <el-button size="mini" v-if="scope.row.realCount >= scope.row.count" type="success" icon="el-icon-check"
                         circle></el-button>
              <el-button size="mini" v-if="scope.row.realCount < scope.row.count" type="danger" icon="el-icon-close"
                         circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>


    </el-dialog>

    <el-dialog v-bind:title="detailFlag ? '查看详情': dataForEdit.id ? '编辑': '添加'" :visible.sync="editDialogShow"
               width="80%">
      <el-form :disabled="detailFlag" ref="editForm" :rules="rules" label-position="left" :model="dataForEdit">
        <el-form-item label="策略名称" prop="name" :label-width="labelWidth">
          <el-input v-model="dataForEdit.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item v-if="dataForEdit.id" label="策略编码" prop="code" :label-width="labelWidth">
          <el-input v-model="dataForEdit.code" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="memo" :label-width="labelWidth">
          <el-input v-model="dataForEdit.memo" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="单选题" prop="single">
          <el-table :data="dataForEdit.singleList" size="small"
                    style="width: 100%">
            <el-table-column prop="busiType" label="业务类型">
              <template slot-scope="scope">
                <el-select v-model="scope.row.busiType" size="small">
                  <el-option v-for="item in busiList" :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column prop="diff" label="难度">
              <template slot-scope="scope">
                <el-select v-model="scope.row.difficulty" size="small">
                  <el-option v-for="item in diffList" :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="count" label="数量">
              <template slot-scope="scope">
                <el-input :min="1" type="number" size="small" v-model="scope.row.count"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="score" label="分值">
              <template slot-scope="scope">
                <el-input-number size="small" v-model="dataForEdit.singleScore" :precision="1" :step="0.5" :max="5"
                                 :min="0.5"></el-input-number>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="small" type="primary" icon="el-icon-edit" circle
                           @click="addLine('single')"></el-button>
                <el-button size="small" type="danger" icon="el-icon-delete" circle
                           @click="removeLine('single', scope.$index)"></el-button>
              </template>
            </el-table-column>

          </el-table>
        </el-form-item>

        <el-form-item label="多选题" prop="multi">
          <el-table :data="dataForEdit.multiList" size="small"
                    style="width: 100%">
            <el-table-column prop="busiType" label="业务类型">
              <template slot-scope="scope">
                <el-select v-model="scope.row.busiType" size="small">
                  <el-option v-for="item in busiList" :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column prop="diff" label="难度">
              <template slot-scope="scope">
                <el-select v-model="scope.row.difficulty" size="small">
                  <el-option v-for="item in diffList" :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="count" label="数量">
              <template slot-scope="scope">
                <el-input :min="1" type="number" size="small" v-model="scope.row.count"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="score" label="分值">
              <template slot-scope="scope">
                <el-input-number v-model="dataForEdit.multiScore" :precision="1" :step="0.5" :max="5"
                                 :min="0.5"></el-input-number>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="small" type="primary" icon="el-icon-edit" circle
                           @click="addLine('multi')"></el-button>
                <el-button size="small" type="danger" icon="el-icon-delete" circle
                           @click="removeLine('multi', scope.$index)"></el-button>
              </template>
            </el-table-column>


          </el-table>
        </el-form-item>

        <el-form-item label="判断题" prop="judge">
          <el-table :data="dataForEdit.judgeList" size="small"
                    style="width: 100%">
            <el-table-column prop="busiType" label="业务类型">
              <template slot-scope="scope">
                <el-select v-model="scope.row.busiType" size="small">
                  <el-option v-for="item in busiList" :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column prop="diff" label="难度">
              <template slot-scope="scope">
                <el-select v-model="scope.row.difficulty" size="small">
                  <el-option v-for="item in diffList" :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="count" label="数量">
              <template slot-scope="scope">
                <el-input :min="1" type="number" size="small" v-model="scope.row.count"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="score" label="分值">
              <template slot-scope="scope">
                <el-input-number v-model="dataForEdit.judgeScore" :precision="1" :step="0.5" :max="5"
                                 :min="0.5"></el-input-number>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="small" type="primary" icon="el-icon-edit" circle
                           @click="addLine('judge')"></el-button>
                <el-button size="small" type="danger" icon="el-icon-delete" circle
                           @click="removeLine('judge', scope.$index)"></el-button>
              </template>
            </el-table-column>

          </el-table>
        </el-form-item>

        <el-form-item label="翻打凭条" prop="receiptFlag">
          <el-switch v-model="receiptFlag"></el-switch>
        </el-form-item>
        <el-col :span="18" v-if="receiptFlag">
          <el-form-item label="凭条张数" prop="receiptCount">
            <el-select v-model="dataForEdit.receiptCount" placeholder="">
              <el-option label="100" :value=100></el-option>
              <el-option label="50" :value=50></el-option>
              <el-option label="10" :value=10></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数字长度" prop="numberLength">
            <el-input v-model="dataForEdit.numberLength" type="number" :max="10" :min="5"></el-input>
          </el-form-item>

          <el-form-item label="凭条总分" prop="receiptScore">
            <el-input-number v-model="dataForEdit.receiptScore" :precision="0" :step="5" :max="100"
                             :min="5"></el-input-number>
          </el-form-item>
        </el-col>

        <!--        <el-form-item label="拼条数量" prop="receiptCount" :label-width="labelWidth">-->
        <!--          <el-input v-model="dataForEdit.receiptCount" placeholder="请输入"></el-input>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="数字长度" prop="numberLength" :label-width="labelWidth">-->
        <!--          <el-input v-model="dataForEdit.numberLength" placeholder="请输入"></el-input>-->
        <!--        </el-form-item>-->

      </el-form>
      <div v-if="!detailFlag" slot="footer" class="dialog-footer">
        <el-button @click="cancelCommit">取 消</el-button>
        <el-button type="primary" @click="commitData()">确 定</el-button>
      </div>

    </el-dialog>


  </div>

</template>


<script>
  import Vue from 'vue'
  import {busiTypeMap, diffMap} from "../../data"

  export default {
    data() {
      return {
        diffMap: diffMap,
        busiTypeMap: busiTypeMap,
        dataOfCheck: {},
        questionBankList: [],
        checkDialogShow: false,

        receiptFlag: false,
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

        //默认非查看详情
        detailFlag: false,

        /**
         * 修改对话框数据
         */
        dataForEdit: {},

        /**
         * 修改对话框数据索引值
         */
        dataForEditIndex: null,

        diffList: [
          {label: "简单", value: 1},
          {label: "中等", value: 2},
          {label: "困难", value: 3},
        ],

        busiList: [
          {label: '对公', value: 1},
          {label: '对私', value: 2},
          {label: '公共', value: 3},
          {label: '国际', value: 4},
        ],

        /**
         * 校验规则
         */
        rules: {
          name:
            [
              {required: true, message: '请输入名称', trigger: 'blur'},
              {max: 10, message: '长度在10个字符以内', trigger: 'blur'}
            ],
          memo:
            [
              {max: 100, message: '长度在100个字符以内', trigger: 'blur'}
            ],
          receiptCount:
            [
              {required: true, message: '请输入receiptCount', trigger: 'blur'},
              {min: 10, type: 'number', max: 100, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          numberLength:
            [
              {required: true, message: '请输入numberLength', trigger: 'blur'},
              // {min: 3, max: 10, type: 'number', message: '长度在3-10个字符', trigger: 'blur'}
            ],
          bankId: [
            {required: true, message: '请选择题库', trigger: 'blur'},

          ]
        }

      }
    },


    methods: {
      getCheckRowClassName: function (row, idx) {
        // if(row.realCount >= row.count){
        //   return "row-valid";
        // }else{
        //   return "row-invalid";
        // }
      },
      /**
       * 查询
       */
      findByCondition: async function () {
        let data = await this.doPost("/paperPolicy/api/findByCondition?pageNum=" + this.queryForm.pageNum + "&pageSize=" + this.queryForm.pageSize, this.queryForm);
        console.log("data: ", data);
        if (data) {
          this.tableData = data.list;
          console.log("this.tableData:", this.tableData)
          this.totalCount = data.total;//总记录数目
        } else {
          this.tableData = [];
          this.totalCount = 0;
        }
      },


      /**
       * 获取全部的题库
       *
       */
      findAllQuestionBank: async function () {
        let data = await this.doPost("/questionBank/api/findAll");
        if (data) {
          this.questionBankList = data;
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
          singleList: [{}],
          multiList: [{}],
          judgeList: [{}],
          singleScore: 1,
          multiScore: 1,
          judgeScore: 1,
        };

      },
      /**
       * 唤起编辑对话框
       */
      toEdit(idx, row) {
        console.log("编辑：", row)
        this.dataForEdit = JSON.parse(JSON.stringify(row));
        if (this.dataForEdit.singleList.length == 0) {
          this.dataForEdit.singleList = [{}]
        }
        if (this.dataForEdit.multiList.length == 0) {
          this.dataForEdit.multiList = [{}]
        }
        if (this.dataForEdit.judgeList.length == 0) {
          this.dataForEdit.judgeList = [{}]
        }
        this.dataForEditIndex = idx;
        this.editDialogShow = true;
        this.detailFlag = false;
        if (this.dataForEdit.receiptCount > 0) {
          this.receiptFlag = true;
        } else {
          this.receiptFlag = false;
        }
      },

      /**
       * 检查试卷策略可用性
       */
      toCheck(idx, row) {
        if (this.questionBankList.length == 0) {
          this.findAllQuestionBank();
        }
        this.dataOfCheck = {};
        this.dataOfCheck.name = row.name;
        this.dataOfCheck.id = row.id;
        this.checkDialogShow = true;

      },

      /**
       * 校验策略
       */
      async checkPaperPolicy() {
        this.$refs['checkForm'].validate(async (valid) => {
          if (!valid) {
            console.log("参数校验不通过，请处理");
            return false;
          } else {
            this.doPost("/paperPolicy/api/checkPolicy", {
              "paperPolicyId": this.dataOfCheck.id,
              "bankId": this.dataOfCheck.bankId
            }, "form").then(res => {
              this.dataOfCheck = res;
            })
          }
        });
      },

      /**
       * 查看详情
       */
      toDetail(idx, row) {
        console.log("编辑：", row)
        this.dataForEdit = JSON.parse(JSON.stringify(row));
        if (this.dataForEdit.singleList.length == 0) {
          this.dataForEdit.singleList = [{}]
        }
        if (this.dataForEdit.multiList.length == 0) {
          this.dataForEdit.multiList = [{}]
        }
        if (this.dataForEdit.judgeList.length == 0) {
          this.dataForEdit.judgeList = [{}]
        }
        this.dataForEditIndex = idx;
        this.editDialogShow = true;
        this.detailFlag = true;
        if (this.dataForEdit.receiptCount > 0) {
          this.receiptFlag = true;
        } else {
          this.receiptFlag = false;
        }
      },


      addLine(questionType) {
        if ("single" == questionType) {
          this.dataForEdit.singleList.push({})
        } else if ("multi" == questionType) {
          this.dataForEdit.multiList.push({})
        } else if ("judge" == questionType) {
          this.dataForEdit.judgeList.push({})
        } else {
          console.warn("这是什么", questionType)
        }
      },
      removeLine(questionType, index) {
        let data;
        if ("single" == questionType) {
          data = this.dataForEdit.singleList;
        } else if ("multi" == questionType) {
          data = this.dataForEdit.multiList;
        } else if ("judge" == questionType) {
          data = this.dataForEdit.judgeList;
        } else {
          console.warn("这是什么", questionType)
          return;
        }

        data.splice(index, 1);
        if (data.length == 0) {
          data.push({})
        }

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
                this.dataForEdit.singleInfo = JSON.stringify(this.dataForEdit.singleList)
                this.dataForEdit.multiInfo = JSON.stringify(this.dataForEdit.multiList)
                this.dataForEdit.judgeInfo = JSON.stringify(this.dataForEdit.judgeList)
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
          let data = await this.doPost("/paperPolicy/api/delete?id=" + row.id);
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

  .el-table .row-valid {
    background: #94c293;
  }

  .el-table .row-invalid {
    background: #ff9798;
  }
</style>
