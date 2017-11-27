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
        label="题型名称">
      </el-table-column>

      <el-table-column
        prop="code"
        label="题型编号">
      </el-table-column>
      <el-table-column
        prop="memo"
        label="题型描述">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="isDel"
        label="删除标志">
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


    <el-dialog ref="editDialog" title="编辑" :visible.sync="editDialogShow">
      <el-form ref="editForm" :rules="rules" label-position="left" :model="dataForEdit">
        <el-form-item label="题型名称" prop="name">
          <el-input v-model="dataForEdit.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="题型编号" prop="code">
          <el-input v-model="dataForEdit.code" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="题型描述" prop="memo">
          <el-input v-model="dataForEdit.memo" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="题型属性" prop="propertyList">
          <el-table
            border
            ref="editTable"
            :data="propertyList"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              :selectable="handleSelectable"
              width="55">
            </el-table-column>
            <el-table-column
              label="属性名称">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column
              prop="content"
              label="属性明细">
              <template slot-scope="scope">
                <div v-for="item in scope.row.itemList" style="display: inline-block; margin-left: 5px;">
                  {{item.name + ' |'}}
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-tag type="warning">提示：该题型已经添加的表格项禁止勾选</el-tag>
          <!--<span>提示：该题型已经添加的表格项禁止勾选</span>-->
        </el-form-item>
        属性不满足?
        <el-button type="primary" plain size="mini" @click="toAddProperty">管理属性</el-button>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="updateData()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加" :visible.sync="addDialogShow">
      <el-form ref="addForm" :rules="rules" label-position="left" :model="dataForAdd">

        <el-form-item label="题型名称" prop="name">
          <el-input v-model="dataForAdd.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="题型编号" prop="code">
          <el-input v-model="dataForAdd.code" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="题型描述" prop="memo">
          <el-input v-model="dataForAdd.memo" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="题型属性" prop="propertyList">
          <el-table
            border
            ref="multipleTable"
            :data="propertyList"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="属性名称">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column
              prop="content"
              label="属性明细">
              <template slot-scope="scope">
                <div v-for="item in scope.row.itemList" style="display: inline-block; margin-left: 5px;">
                  {{item.name + ' |'}}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        属性不满足?
        <el-button type="primary" plain size="mini" @click="toAddProperty">管理属性</el-button>

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
         * 添加对话框数据
         */
        dataForAdd: {
          propertyList: []
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
          propertyList: [],
        },

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
              {required: true, message: '请输入题型编号', trigger: 'blur'},
              {min: 1, max: 10, message: '长度在1-10个字符', trigger: 'blur'}
            ],
          name:
            [
              {required: true, message: '请输入name', trigger: 'blur'},
              {min: 2, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          memo:
            [
//              {required: true, message: '请输入memo', trigger: 'blur'},
            {max: 100, message: '长度在0-100个字符', trigger: 'blur'}
          ],
        },

        /**
         * 试题属性列表,新增和编辑时候使用
         */
        propertyList: [],

        /**
         *
         */
        editPropertyId: [],

      }
    },


    methods: {
      test() {
        console.log("bbb", this.$refs['editTable'])
      },
      /**
       * 查询
       */
      findByCondition: async function () {
        let data = await this.http("/questionType/api/findByCondition.do?pageNum=" + this.queryForm.pageNum + "&pageSize=" + this.queryForm.pageSize, this.queryForm);
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
//        this.dataForEdit = row;
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
            var res = await this.http('/questionType/api/update.do', this.dataForEdit, 1000);
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
            this.$refs['editTable'].clearSelection();
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
            let res = await this.http("/questionType/api/save.do", this.dataForAdd, 1000);
            if (res == true) {
              this.$refs['addForm'].resetFields();
              this.$refs['editTable'].clearSelection();

              this.$confirm('继续添加?查看列表?', '提示', {
                confirmButtonText: '继续添加',
                cancelButtonText: '查看列表',
                type: 'success',
                center: true
              }).then(() => {
//                this.$refs['addForm'].resetFields();
//                this.$refs['editTable'].clearSelection();
              }).catch(() => {
//                this.$refs['addForm'].resetFields();
//                this.$refs['editTable'].clearSelection();
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
        let data = await this.http("/questionType/api/delete.do?id=" + row.id);
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
       * 去往添加属性页面
       */
      toAddProperty() {
        this.$router.push("/property");
      },

      /**
       * 试题属性选择事件
       */
      handleSelectionChange(selection) {
        console.log("选择行： ", selection);
        if (this.editDialogShow) {
          if(selection.length > 0){
            for(let i = 0; i< selection.length; i++){
              let row = selection[i];
              this.dataForEdit.propertyList.push({id: row.id, name: row.name});
            }
          }
//          this.dataForEdit.propertyList = selection;
//          this.$set(this.dataForEdit, 'propertyList', selection);
//          console.log("号的", this.dataForEdit);
        } else {
          this.dataForAdd.propertyList = selection;
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
       * 处理能否勾选
       */
      handleSelectable(row, index) {
        let id = row.id;
        let propertyList = this.dataForEdit.propertyList;
        if (this.editPropertyId.length == 0) {
          if (propertyList != null && propertyList.length > 0) {
            for (var i = 0; i < propertyList.length; i++) {
              this.editPropertyId.push(propertyList[i].id);
            }
          }
        }

        if (this.editPropertyId.indexOf(id) > -1) {
          return false;
        } else {
          return true;
        }


      }
    },
    /**
     * 页面初始化时候执行
     **/
    created: async function () {
      console.log("created....")
      this.findByCondition();

      let propertyListData = await this.http("/property/api/findByCondition.do?pageNum=1&pageSize=100", null);
      this.propertyList = propertyListData.list;

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
