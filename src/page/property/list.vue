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
        prop="questionType"
        label="题型">
        <template slot-scope="scope">
          <div v-if="scope.row.questionType == 1">单选</div>
          <div v-if="scope.row.questionType == 2">多选</div>
          <div v-if="scope.row.questionType == 3">判断</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="属性名称">
      </el-table-column>
      <el-table-column
        prop="code"
        label="属性编号">
      </el-table-column>
      <el-table-column
        prop="memo"
        label="描述">
      </el-table-column>
      <el-table-column
        prop="no"
        label="序号">
      </el-table-column>

      <el-table-column
        prop="status"
        label="状态">
        <template slot-scope="scope">
          <el-tag size="small" v-if="scope.row.status == '1'">正常</el-tag>
          <el-tag size="small" type="info" v-if="scope.row.status == 2">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="createUserName"
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
      <el-form ref="editForm" :rules="rules" label-position="right" :model="dataForEdit">

        <el-form-item label="属性名称" prop="name" :label-width="labelWidth">
          <el-input v-model="dataForEdit.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="题型" prop="questionType" :label-width="labelWidth">
          <el-select v-model="dataForEdit.questionType">
            <el-option v-for="type in types" :key="type.id" :value="type.id" :label="type.name"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="必选" prop="changePaper" :label-width="labelWidth">
          <el-switch v-model="dataForEdit.required" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>

        <el-form-item v-if="dataForEdit.id > 0" label="属性编号" prop="code" :label-width="labelWidth">
          <el-input v-model="dataForEdit.code" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="memo" :label-width="labelWidth">
          <el-input v-model="dataForEdit.memo" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="序号" prop="no" :label-width="labelWidth">
          <el-input type="number" v-model="dataForEdit.no" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="属性值" required>
          <el-table :data="dataForEdit.itemList"
                    border
                    style="width: 100%">
            <el-table-column prop="no" label="序号" width="100px">
              <template slot-scope="scope">
                <span>{{scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="名称">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name" size="small"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="memo" label="描述">
              <template slot-scope="scope">
                <el-input v-model="scope.row.memo" size="small"></el-input>
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
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </div>
    </el-dialog>


  </div>

</template>


<script>

  export default {
    data() {
      var contains = function (arr, item) {
        if (arr == undefined || arr == null || item == undefined || item == null) {
          return false;
        } else {
          let arrItem;
          for (arrItem in arr) {
            if (arrItem == item) {
              return true;
            }
          }
          return false;
        }
      }

      var checkPropertyItem = (rule, value, callback) => {
        console.log("value: ", value);
        var names = new Array();
        if (value.length == 0) {
          callback(new Error("请配置属性明细"));
        } else {
          let item = value[value.length - 1];
          console.log("item: ", item);
          let name = item.name;
          console.log("name: ", name);
          if (name == undefined || name == '') {
            callback(new Error("属性明细名称不能为空"));
          } else if (name.length > 10) {
            callback(new Error("属性明细名称在10位以内"));
          } else if (contains(names, name)) {
            callback(new Error("属性明细名称不能重复"));
          } else {
            names.push(name)
            callback();
          }
        }
      };
      return {
        types: [{id: 1, name: '单选题'}, {id: 2, name: '多选题'}, {id: 3, name: '判断题'}],
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
         * 对话框数据
         */
        dataForEdit: {
          itemList: [
            {id: null, name: '', idx: null}
          ],
        },


        /**
         * 属性条目编号
         */
        itemIndex: 1,

        /**
         * 修改对话框是否显示
         */
        editDialogShow: false,

        /**
         * 修改对话框数据索引值
         */
        dataForEditIndex: null,

        /**
         * 校验规则
         */
        rules: {
          memo:
            [
              {max: 100, message: '长度在3-100个字符', trigger: 'blur'}
            ],
          name:
            [
              {required: true, message: '请输入name', trigger: 'blur'},
              {min: 2, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          itemList:
            [
              {validator: checkPropertyItem, required: true, trigger: 'blur'}
            ]
        }

      }
    },


    methods: {
      /**
       * 查询
       */
      findByCondition: async function () {
        let data = await this.doPost("/property/api/findByCondition?pageNum=" + this.queryForm.pageNum + "&pageSize=" + this.queryForm.pageSize, this.queryForm);
        console.log("data: ", data);
        if (data != null) {
          this.tableData = data.list;
          this.totalCount = data.total;//总记录数目
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
        console.log("唤起添加对话框");
        this.editDialogShow = true;
        this.dataForEdit = {
          itemList: []
        }

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
      save: async function () {
        console.log("更新数据");
        console.log("dataForEdit:", this.dataForEdit);

        this.$refs['editForm'].validate(async (valid) => {
          if (!valid) {
            console.log("参数校验不通过，请处理");
            return false;
          } else {
            let id = this.dataForEdit.id;
            let res = await this.doPost('/property/api/save', this.dataForEdit);
            if (res) {
              this.findByCondition();
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
       * 删除数据
       */
      async toRemove(idx, row) {
        console.log("删除：", idx, row)
        let data = await this.doPost("/property/api/delete?id=" + row.id);
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
       * 添加属性明细
       */
      addItem: function () {
        if (this.editDialogShow) {
          this.dataForEdit.itemList.push({no: this.itemIndex});
        } else {
          this.dataForAdd.itemList.push({no: this.itemIndex});
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
    },
    computed: {
      /**
       * 获取属性明细的编号
       */
      getItemNo: function (index) {
        if (index) {
          return index + 1;
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
  /*form .el-table td {*/
  /*padding: 0px;*/
  /*}*/

  /*form .el-table td:last-child {*/
  /*padding-left: 10px;*/
  /*}*/

  /*form .el-table .cell {*/
  /*padding: 0px;*/
  /*}*/

  /*.el-table--border  td:first-child .cell{*/
  /*padding-left: 0px;*/
  /*}*/
</style>
