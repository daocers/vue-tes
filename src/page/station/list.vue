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
        <el-button  el-icon="el-icon-edit" type="primary" @click="toAdd()">添加</el-button>
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
        label="岗位名称">
      </el-table-column>
      <el-table-column
        prop="code"
        label="岗位编号">
      </el-table-column>
      <el-table-column
        prop="memo"
        label="描述">
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
        label="管理员">
        <template slot-scope="scope">
          <el-tag type="warning" @close="removeManager(scope.row, scope.$index, item, index)" size="small"
                  v-for="(item , index) in scope.row.userList"
                  :key="item.id"
                  closable>{{item.name}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
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
          <el-button type="text" size="small" @click="toEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="toRemove(scope.$index, scope.row)">删除</el-button>
          <el-button type="text" size="small" @click="toSetManager(scope.$index, scope.row)">设置管理员</el-button>
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


    <user-select @hide="selectShow = false"
                 @done="handleDone"
                 :select-show="selectShow"
                 target-url="/station/api/setManager"
                 :target-id="dataForEdit.id"
                 :target-name="dataForEdit.name"></user-select>

    <el-dialog title="编辑" :visible.sync="editDialogShow">
      <el-form ref="editForm" :rules="rules" label-position="right" :model="dataForEdit">

        <el-form-item label="岗位名称" prop="name" :label-width="labelWidth">
          <el-input v-model="dataForEdit.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item v-if="dataForEdit.id > 0" label="岗位编号" prop="code" :label-width="labelWidth">
          <el-input :disabled="dataForEdit.id > 0" v-model="dataForEdit.code" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="岗位描述" prop="memo" :label-width="labelWidth">
          <el-input v-model="dataForEdit.memo" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status" :label-width="labelWidth">
          <el-select v-model="dataForEdit.status" type="number" placeholder="请选择">
            <el-option v-for="status in statusInfo" :key="status.code" :label="status.value" :value="status.code"/>
            <!--<el-option label="正常" value=1></el-option>-->
            <!--<el-option label="禁用" value=2></el-option>-->
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="updateData()">确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>


<script>

  import UserSelect from '../../components/userSelect'

  export default {
    components: {UserSelect},
    data() {
      return {
        selectShow: false,

        statusInfo: [
          {code: 1, value: '正常'},
          {code: 2, value: '禁用'},
        ],
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
          // code:
          //   [
          //     {required: true, message: '请输入code', trigger: 'blur'},
          //     {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
          //   ],
          name:
            [
              {required: true, message: '请输入name', trigger: 'blur'},
              {min: 2, max: 10, message: '长度在2-10个字符', trigger: 'blur'}
            ],
          memo:
            [
              {max: 100, message: '长度在3-10个字符', trigger: 'blur'}
            ],
//          status:
//            [
//              {required: true, message: '请输入status', trigger: 'blur'},
//              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
//            ],
        }

      }
    },


    methods: {
      /**
       * 查询
       */
      findByCondition: async function () {
        let data = await this.doPost("/station/api/findByCondition?pageNum=" + this.queryForm.pageNum + "&pageSize=" + this.queryForm.pageSize, this.queryForm);
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
      updateData: async function () {
        console.log("更新数据");
        console.log("dataForEdit:", this.dataForEdit);

        this.$refs['editForm'].validate(async (valid) => {
          if (!valid) {
            console.log("参数校验不通过，请处理");
            return false;
          } else {
            let id = this.dataForEdit.id;
            let res = await this.doPost('/station/api/save', this.dataForEdit);
            if (res) {
              if (id) {
                this.$set(this.tableData, this.dataForEditIndex, this.dataForEdit);
              } else {
                this.tableData.unshift(this.dataForEdit);
              }

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
       * 删除数据
       */
      async toRemove(idx, row) {
        console.log("删除：", idx, row)
        let data = await this.doPost("/station/api/delete?id=" + row.id);
        if (data == true) {
          this.tableData.splice(idx, 1);
          this.tableData = this.tableData;
        } else if (data == false) {
          // console.log("删除失败");
          // this.$notify({
          //   title: '警告',
          //   message: "删除失败",
          //   type: 'warning'
          // });
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

      //删除管理员
      removeManager: async function (row, rowIndex, user, idx) {
        this.dataForEdit = row;
        this.dataForEditIndex = rowIndex;
        let stationId = row.id;
        let userId = user.id;
        let resp = await this.doPost("/branch/api/removeManager", {
          stationId: stationId,
          userId: userId
        }, "form");
        if (resp.result && resp.data) {
          let userList = this.dataForEdit.userList;
          userList.splice(idx, 1);
          this.dataForEdit.userList = userList;
          this.$set(this.tableData, this.dataForEditIndex, this.dataForEdit);

          return true;
        } else {
          return false;
        }

      },
      toSetManager: function (idx, obj) {
        console.log("开始设置管理员", obj);
        this.dataForEdit = obj;
        this.dataForEditIndex = idx;
        this.selectShow = true;
      },


      handleDone(obj) {
        this.dataForEdit.userList = obj;
        this.$set(this.tableData, this.dataForEditIndex, this.dataForEdit);
        this.selectShow = false;
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
</style>
