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
        label="策略编号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="策略名称">
      </el-table-column>
      <el-table-column
        prop="content"
        label="策略详情">
      </el-table-column>
      <el-table-column
        prop="questionCount"
        label="题量">
      </el-table-column>
      <el-table-column
        prop="questionTypeId"
        label="题型">
      </el-table-column>
      <el-table-column
        prop="privaryType"
        label="是否私有">
      </el-table-column>
      <el-table-column
        prop="ownerType"
        label="归属单位类型">
      </el-table-column>
      <el-table-column
        prop="ownerId"
        label="归属单位">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="createUserId"
        label="创建人">
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
      <el-form ref="addForm" :rules="rules" label-position="left" :model="dataForAdd">
        <el-form-item label="题型" prop="questionTypeId">
          <el-select v-model="dataForEdit.questionTypeId" clearable placeholder="请选择">
            <el-option
              v-for="type in questionTypeList"
              :key="type.id"
              :label="type.name"
              :value="type.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="dataForEdit.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="编号" prop="code">
          <el-input v-model="dataForEdit.code" placeholder="请输入"></el-input>
        </el-form-item>


        <el-form-item label="详情" prop="contentList">
          <el-table :data="dataForEdit.itemList"
                    border
                    style="width: 100%">
            <el-table-column prop="no" label="序号" width="60px" fixed="left">
              <template slot-scope="scope">
                <span>{{scope.$index + 1}}</span>
              </template>
            </el-table-column>

            <div v-if="dataForEdit.questionTypeId != null && dataForEdit.questionTypeId != undefined">
              <div v-for="(property, idx) in questionTypeInfo[dataForEdit.questionTypeId + '']">
                <el-table-column prop="name" v-bind:label="property.name">
                  <template slot-scope="scope">

                    <el-select v-model="dataForEdit.itemList[scope.$index][property.id]" clearable placeholder="请选择"
                               size="small">
                      <el-option
                        v-for="item in property.propertyItemList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
              </div>
            </div>
            <div v-else>
              <el-table-column
                prop="content"
                label="试题属性信息">
                <template slot-scope="scope">
                  <span>选择题型后，选择试题属性</span>
                </template>
              </el-table-column>
            </div>


            <el-table-column prop="count" label="试题总量" width="80px" fixed="right">
              <template slot-scope="scope">
                <el-input type="number" min="1" max="999" v-model="scope.row.count" size="small"></el-input>
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
          <el-alert v-show="contentCheckMessage != ''"
                    v-bind:title='contentCheckMessage'
                    type="warning">
          </el-alert>
        </el-form-item>
        <el-form-item label="题量" prop="questionCount">
          <el-input type="number" :disabled="true" v-model="dataForEdit.questionCount" placeholder="0"></el-input>
        </el-form-item>

        <el-form-item label="是否私有" prop="privaryType">
          <el-switch v-model="dataForEdit.privaryType"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit()">取 消</el-button>
        <el-button type="primary" @click="updateData">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加" :visible.sync="addDialogShow">
      <el-form ref="addForm" :rules="rules" label-position="left" :model="dataForAdd">
        <el-form-item label="题型" prop="questionTypeId">
          <el-select v-model="dataForAdd.questionTypeId" clearable placeholder="请选择">
            <el-option
              v-for="type in questionTypeList"
              :key="type.id"
              :label="type.name"
              :value="type.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="dataForAdd.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="编号" prop="code">
          <el-input v-model="dataForAdd.code" placeholder="请输入"></el-input>
        </el-form-item>


        <el-form-item label="详情" prop="contentList">
          <el-table :data="dataForAdd.itemList"
                    border
                    style="width: 100%">
            <el-table-column prop="no" label="序号" width="60px" fixed="left">
              <template slot-scope="scope">
                <span>{{scope.$index + 1}}</span>
              </template>
            </el-table-column>

            <div v-if="dataForAdd.questionTypeId != null && dataForAdd.questionTypeId != undefined">
              <div v-for="(property, idx) in questionTypeInfo[dataForAdd.questionTypeId + '']">
                <el-table-column prop="name" v-bind:label="property.name">
                  <template slot-scope="scope">

                    <el-select v-model="dataForAdd.itemList[scope.$index][property.id + '']" clearable placeholder="请选择"
                               size="small">
                      <el-option
                        v-for="item in property.propertyItemList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
              </div>
            </div>
            <div v-else>
              <el-table-column
                prop="content"
                label="试题属性信息">
                <template slot-scope="scope">
                  <span>选择题型后，选择试题属性</span>
                </template>
              </el-table-column>
            </div>


            <el-table-column prop="count" label="试题总量" width="80px" fixed="right">
              <template slot-scope="scope">
                <el-input type="number" min="1" max="999" v-model="scope.row.count" size="small"></el-input>
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
          <el-alert v-show="contentCheckMessage != ''"
                    v-bind:title='contentCheckMessage'
                    type="warning">
          </el-alert>
        </el-form-item>
        <el-form-item label="题量" prop="questionCount">
          <el-input type="number" :disabled="true" v-model="dataForAdd.questionCount" placeholder="0"></el-input>
        </el-form-item>

        <el-form-item label="是否私有" prop="privaryType">
          <el-switch v-model="dataForAdd.privaryType"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd()">取 消</el-button>
        <el-button type="primary" @click="addData()">确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>


<script>
  import Vue from 'vue'

  export default {
    data() {
      /**
       * 检查试题策略内容
       */
      var checkContent = (rule, value, callback) => {
        if (this.dataForAdd.itemList.length == 0) {
          callback(new Error("请添加属性组合和试题数量"))
        } else {
          this.dataForAdd.contentItemList = [];
          for (var i = 0; i < this.dataForAdd.itemList.length; i++) {
            let res = [];
            let line = this.dataForAdd.itemList[i];
            var count = line["count"];
            if (count == undefined || count == '') {
              callback(new Error("第" + (i + 1) + "行试题数量不能为空"));
            }
            for (var key in line) {
              res.push(line[key]);
            }
            if (res.length == 1) {
              this.contentCheckMessage = "第" + (i + 1) + "行没有选择属性组合，将随机选择"
            } else {
              this.contentCheckMessage = '';
            }
            console.log("res: ", res);
            this.dataForAdd.contentItemList.push(res);
          }
        }
        callback();
      };
      return {
        contentCheckMessage: "",
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
          name: '',
          pageSize: 10,
          pageNum: 1,
        },
        /**
         * 添加对话框数据
         */
        dataForAdd: {
          privaryType: false,
          itemList: [],
          contentItemList: [],//传给后台的值
        },

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
        dataForEdit: {
          itemList: [],
          contentItemList: [],//传给后台的值
        },

        /**
         * 修改对话框数据索引值
         */
        dataForEditIndex: null,

        /**
         * 题型id和对应的
         */
        questionTypeInfo: {},

        /**
         * 题型列表
         */
        questionTypeList: {},

//        不同题型对应的属性信息
        typeColumnLabelInfo: {},
        /**
         * 校验规则
         */
        rules: {
          name:
            [
              {required: true, message: '请输入试题策略名称', trigger: 'blur'},
              {min: 3, max: 20, message: '长度在3-20个字符', trigger: 'blur'}
            ],
          contentList:
            [
              {validator: checkContent, message: '请输入策略明细', trigger: 'change'},
//              {required: true, message: '请输入content', trigger: 'blur'},
//              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
          ],
//          questionCount:
//            [
//              {required: true, message: '请输入questionCount', trigger: 'blur'},
////              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
//            ],
          questionTypeId:
            [
              {type: 'number', required: true, message: '请输入questionTypeId', trigger: 'blur'},
            ],
          privaryType:
            [
              {type: 'boolean', required: true, message: '请输入privaryType', trigger: 'blur'},
//              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
          ],
        }

      }
    },


    methods: {
      /**
       * 查询
       */
      async findByCondition() {
        console.log("开始分页查询")
        let data = await this.postEntity("/questionPolicy/api/findByCondition?pageNum=" + this.queryForm.pageNum + "&pageSize=" + this.queryForm.pageSize, this.queryForm);
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
       * 取消编辑
       */
      cancelEdit(){
        this.editDialogShow = false;
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
            var res = await this.postEntity('/questionPolicy/api/update', this.dataForEdit, 1000);
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
            let res = await this.postEntity("/questionPolicy/api/save", this.dataForAdd, 1000);
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
        let data = await this.postEntity("/questionPolicy/api/delete?id=" + row.id);
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
      },

      /**
       * 添加属性明细
       */
      addItem: function () {
        if (this.editDialogShow) {
          this.dataForEdit.itemList.push({});
        } else {
          this.dataForAdd.itemList.push({});
        }
      },
      /**
       * 删除明细
       */
      removeLine: function (idx, row) {
        if (this.editDialogShow) {
          this.dataForEdit.itemList.splice(idx, 1);
        } else {
          this.dataForAdd.itemList.splice(idx, 1);
        }
      },
    },
    /**
     * 页面初始化时候执行
     **/
    created: async function () {
      console.log("created....")
      this.findByCondition();
      let questionTypeInfo = await this.postEntity("/questionType/api/getQuestionTypeInfo");
      console.log("questionTypeInfo: ", questionTypeInfo);
      this.questionTypeInfo = questionTypeInfo;
      let questionTypeList = await this.postEntity("/questionType/api/findAll");
      this.questionTypeList = questionTypeList;
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

  /*
* 以下用于修改form中表格中输入框的样式
*/
  form .el-table td {
    padding: 0px;
  }

  form .el-table td:last-child {
    padding-left: 10px;
  }

  form .el-table .cell {
    padding: 0px;
  }

  .el-table--border td:first-child .cell {
    padding-left: 0px;
  }
</style>
