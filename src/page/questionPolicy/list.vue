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


    <el-dialog v-bind:title="this.dataForEdit.id > 0 ? '编辑':'添加'" :visible.sync="dialogShow">
      <el-form ref="editForm" :rules="rules" label-position="left" :model="dataForEdit">
        <el-form-item label="题型" prop="questionTypeId" :label-width="labelWidth">
          <el-select v-model="dataForEdit.questionTypeId" clearable placeholder="请选择">
            <el-option
              v-for="type in questionTypeList"
              :key="type.id"
              :label="type.name"
              :value="type.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="name" :label-width="labelWidth">
          <el-input v-model="dataForEdit.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item v-show="dataForEdit.id" label="编号" prop="code" :label-width="labelWidth">
          <el-input :disabled="true" v-model="dataForEdit.code" placeholder="请输入"></el-input>
        </el-form-item>


        <el-form-item label="详情" prop="contentList" :label-width="labelWidth">
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
        <el-form-item label="题量" prop="questionCount" :label-width="labelWidth">
          <el-input type="number" :disabled="true" v-model="getQuestionCount" placeholder="0"></el-input>
        </el-form-item>

        <el-form-item label="私有" prop="privaryType" :label-width="labelWidth">
          <el-switch v-model="dataForEdit.privaryType" :active-value="2" :inactive-value="1"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit()">取 消</el-button>
        <el-button type="primary" @click="commitData">确 定</el-button>
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
        if (this.dataForEdit.itemList.length == 0) {
          callback(new Error("请添加属性组合和试题数量"))
        } else {
          this.dataForEdit.contentItemList = [];
          for (var i = 0; i < this.dataForEdit.itemList.length; i++) {
            let res = [];
            let line = this.dataForEdit.itemList[i];
            let count = line["count"];
            if (count == undefined || count == '') {
              callback(new Error("第" + (i + 1) + "行试题数量不能为空"));
              return;
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
            this.dataForEdit.contentItemList.push(res);

          }
        }
        callback();
      };
      return {

        labelWidth: '80px',
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
        dataForEdit: {
          privaryType: false,
          itemList: [],
          contentItemList: [],//传给后台的值
        },

        /**
         * 修改对话框是否显示
         */
        dialogShow: false,

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
              {validator: checkContent, trigger: 'change'},
          ],
          questionTypeId:
            [
              {type: 'number', required: true, message: '请输入questionTypeId', trigger: 'blur'},
            ],
          privaryType:
            [
              {required: true, message: '请选择是否私有', trigger: 'blur'},
//              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
          ],
        }

      }
    },


    methods: {
      /**
       * 重置dataForEdit
       */
      resetDataForEdit(){
        this.dataForEdit = {
          privaryType: false,
          itemList: [],
          contentItemList: [],//传给后台的值
        };
      },
      /**
       * 查询
       */
      async findByCondition() {
        console.log("开始分页查询")
        let data = await this.http("/questionPolicy/api/findByCondition?pageNum=" + this.queryForm.pageNum + "&pageSize=" + this.queryForm.pageSize, this.queryForm);
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
        this.resetDataForEdit();
        this.dialogShow = true;
        this.flag = "add";
      },
      /**
       * 唤起编辑对话框
       */
      toEdit(idx, row) {
        console.log("编辑：", row)
        this.dataForEdit = JSON.parse(JSON.stringify(row));
        this.dataForEditIndex = idx;
        this.dialogShow = true;
        this.flag = 'edit';
      },

      /**
       * 取消编辑
       */
      cancelEdit(){
        this.dialogShow = false;
        this.resetDataForEdit();
        this.findByCondition();
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
            let url, addFlag;
            if(this.dataForEdit.id > 0){
              url = "/questionPolicy/api/update";
              addFlag = false;
            }else{
              url = "/questionPolicy/api/save";
              addFlag = true;
            }
            var res = await this.http(url, this.dataForEdit, 1000);
            if (res) {
              if(addFlag){
//                新增
                this.$confirm('继续添加?查看列表?', '提示', {
                  confirmButtonText: '继续添加',
                  cancelButtonText: '查看列表',
                  type: 'success',
                  center: true
                }).then(() => {
                  this.$refs['editForm'].resetFields();
                  this.resetDataForEdit();
                }).catch(() => {
                  this.findByCondition();
//        关闭对话框
                  this.dialogShow = false;
                });
              }else{
//                更新
                Vue.set(this.tableData, this.dataForEditIndex, this.dataForEdit);
                //        以下代码变动无法触发页面渲染
                //        this.tableData[this.dataForEditIndex] = Object.assign({},this.dataForEdit);
                //          console.log(this.tableData)
              }

            } else if (res == false) {
              console.log("请求成功，处理失败");
            } else if (res == null) {
              console.error("请求失败")
            }
            //        关闭对话框
//            this.dialogShow = false;
          }
        });
      },


      /**
       * 删除数据
       */
      async toRemove(idx, row) {
        console.log("删除：", idx, row)
        let data = await this.http("/questionPolicy/api/delete?id=" + row.id);
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
        if (this.dialogShow) {
          this.dataForEdit.itemList.push({});
        } else {
          this.dataForEdit.itemList.push({});
        }
      },
      /**
       * 删除明细
       */
      removeLine: function (idx, row) {
        if (this.dialogShow) {
          this.dataForEdit.itemList.splice(idx, 1);
        } else {
          this.dataForEdit.itemList.splice(idx, 1);
        }
      },
    },
    /**
     * 页面初始化时候执行
     **/
    created: async function () {
      console.log("created....")
      this.findByCondition();
      let questionTypeInfo = await this.http("/questionType/api/getQuestionTypeInfo");
      console.log("questionTypeInfo: ", questionTypeInfo);
      this.questionTypeInfo = questionTypeInfo;
      let questionTypeList = await this.http("/questionType/api/findAll");
      this.questionTypeList = questionTypeList;
    },
    computed: {
      getQuestionCount(){
        if(this.dataForEdit.itemList){
          var total = 0;
          for(let i = 0; i < this.dataForEdit.itemList.length;i++){
            let line = this.dataForEdit.itemList[i];
            let count = line['count'];
            if(count != null && count != undefined){
              total = parseInt(total) + parseInt(count);
            }
          }
          return total;
        }
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
