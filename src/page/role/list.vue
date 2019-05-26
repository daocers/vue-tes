<template>
  <div class="table">
    <el-form :inline="true" ref="queryForm" :model="queryForm" :rules="queryRules" size="small">
      <el-form-item label="名称" prop="name">
        <el-input v-model="queryForm.name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="iconfont tes-icon-query" plain @click="findByCondition">查询
        </el-button>
        <el-button type="default" icon="iconfont tes-icon-reset" plain @click="reset()">重置</el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button size="small" type="primary" icon="el-icon-edit" @click="toAdd()">添加</el-button>
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
        label="角色名称">
      </el-table-column>
      <el-table-column
        prop="code"
        label="角色编码">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.type == 1">预设</el-tag>
          <el-tag type="primary" v-if="scope.row.type == 2">自定义</el-tag>
        </template>
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
        prop="createUserName"
        label="创建人">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="100px">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="90">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="toEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="toAuth(scope.$index, scope.row)">授权</el-button>
          <el-button v-if="scope.row.type != 1" type="text" size="small" @click="toRemove(scope.$index, scope.row)">删除
          </el-button>
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


    <el-dialog title="编辑" :visible.sync="dialogShow">
      <el-form size="small" ref="editForm" :rules="rules" label-position="left" :model="dataForEdit">
        <el-form-item label="角色名称" prop="name" :label-width="labelWidth">
          <el-input :disabled="dataForEdit.type == 1" v-model="dataForEdit.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="角色编码" prop="code" :label-width="labelWidth">
          <el-input :disabled="dataForEdit.type == 1" v-model="dataForEdit.code" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="memo" :label-width="labelWidth">
          <el-input v-model="dataForEdit.memo" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" icon="iconfont tes-icon-cancel" type="primary" plain @click="cancelCommit()">取 消
        </el-button>
        <el-button size="small" icon="iconfont tes-icon-commit" type="primary" @click="commitData()">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog title="授权" :visible.sync="authDialogShow" :before-close="handleAuthClose">
      <el-input v-model="dataForEdit.name" disabled style="margin-bottom: 20px;"></el-input>
      <el-tree
        :data="treeData"
        show-checkbox
        default-expand-all
        :default-checked-keys="defaultChecked"
        node-key="id"
        ref="tree"
        :check-strictly="true"
        highlight-current
        :props="defaultProps">
      </el-tree>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" icon="iconfont tes-icon-cancel" type="primary" plain @click="cancelAuth()">取 消
        </el-button>
        <!--        <el-button :disabled="dataForEdit.type == 1" type="primary" @click="commitAuth()">确 定</el-button>-->
        <el-button size="small" icon="iconfont tes-icon-commit" type="primary" @click="commitAuth()">确 定</el-button>
      </div>
      <span style="display: block; color: red;">预设角色不允许修改</span>
      <!--      <span v-if="dataForEdit.type == 1"  style="display: block; color: red;">预设角色不允许修改</span>-->
    </el-dialog>

  </div>

</template>


<script>

  export default {
    data() {
      return {
        _tree: null,
        labelWidth: '80px',
        defaultProps: {
          children: 'children',
          label: 'name',
        },
        defaultChecked: [],
        authDialogShow: false,
        treeData: [],

        /**
         * 被授权的角色id
         */
        authRoleId: '',
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
        dialogShow: false,

        /**
         * 修改对话框数据
         */
        dataForEdit: {
          permissionIdList: [],
        },

        /**
         * 修改对话框数据索引值
         */
        dataForEditIndex: null,

        /**
         * 校验规则
         */
        rules: {
          name:
            [
              {required: true, message: '请输入name', trigger: 'blur'},
              {min: 1, max: 10, message: '10个字符以内', trigger: 'blur'}
            ],
          code:
            [
              {required: true, message: '请输入code', trigger: 'blur'},
              {min: 1, max: 20, message: '20个字符以内', trigger: 'blur'}
            ],
          memo:
            [
              {max: 100, message: '长度在100个字符以内', trigger: 'blur'}
            ],
        }
      }
    },


    methods: {
      /**
       * 查询
       */
      findByCondition: async function () {
        let data = await this.doPost("/role/api/findByCondition?pageNum=" + this.queryForm.pageNum + "&pageSize=" + this.queryForm.pageSize, this.queryForm);
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
        console.log("唤起添加对话框");
        this.dataForEdit = {};
        this.dialogShow = true;
      },

      /**
       * 到授权页面
       */
      async toAuth(idx, row) {
        console.log("授权")
        this.dataForEdit = JSON.parse(JSON.stringify(row));
        this.authRoleId = row.id;
        let permissionIdList = await this.doGet("/permission/api/findPermissionIdList?roleId=" + row.id);
        if (permissionIdList) {
          console.log(":::::", permissionIdList)
          this.dataForEdit.permissionIdList = permissionIdList;
          this.defaultChecked = permissionIdList;
          this.$set(this.defaultChecked, permissionIdList);
        } else {
          console.log("已选择的角色信息为空")
          this.defaultChecked = [];
        }
        if (this._tree) {
          this._tree.setCheckedKeys(permissionIdList);
        }

        this.dataForEditIndex = idx;
        this.authDialogShow = true;
      },
      /**
       * 唤起编辑对话框
       */
      toEdit(idx, row) {
        console.log("编辑：", row)
        this.dataForEdit = JSON.parse(JSON.stringify(row));
        this.dataForEditIndex = idx;
        this.dialogShow = true;
      },

      cancelAuth: function () {
        this.authDialogShow = false;
      },

      commitAuth: async function () {
        let checkedNodes = this.$refs.tree.getCheckedNodes(false, true);
        console.log("checkedNodes", checkedNodes);
        if (!checkedNodes || checkedNodes.length == 0) {
          this.$message.warning("请选择权限菜单");
          return false;
        }
        let checkedIds = new Array();
        for (let idx in checkedNodes) {
          let node = checkedNodes[idx];
          checkedIds.push(node.id);
        }
        console.log("checkedIds", checkedIds);
        let res = await this.doPost("/role/api/authorize?roleId=" + this.authRoleId, checkedIds);
        if (res) {
          this.dataForEdit.permissionIdList = checkedIds;
          this.$message.success("授权成功");
        } else {
          this.$message.error("授权失败");
        }
        //            设置勾选，清空所有已选
        this.$refs.tree.setCheckedKeys([], false);
        this.authDialogShow = false;
      },
      /**
       * 取消提交
       */
      cancelCommit: function () {
        this.$refs['editForm'].clearValidate();
        this.dialogShow = false;
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
            let res, addFlag;
            let id = this.dataForEdit.id;
            if (!id) {
              addFlag = true;
            } else {
              addFlag = false;
            }
            res = await this.doPost("/role/api/save", this.dataForEdit);
            if (res) {
              if (addFlag) {
//                新增
                this.$confirm('继续添加?查看列表?', '提示', {
                  confirmButtonText: '继续添加',
                  cancelButtonText: '查看列表',
                  type: 'success',
                  center: true
                }).then(() => {
                  this.$refs['editForm'].resetFields();
                  this.$refs['editForm'].clearValidate();
                  this.dialogShow = true;
                }).catch(() => {
                  this.findByCondition();
//        关闭对话框
                  this.dialogShow = false;
                });
              } else {
//                更新
                this.$set(this.tableData, this.dataForEditIndex, this.dataForEdit);
                // this.findByCondition();
                this.$refs['editForm'].clearValidate();

//        关闭对话框
                this.dialogShow = false;
              }
            } else if (res == false) {
              console.log("请求成功，处理失败");
            } else if (res == null) {
              console.error("请求失败")
            }
          }
        });
      },

      /**
       * 删除数据
       */
      async toRemove(idx, row) {
        console.log("删除：", idx, row)
        let data = await this.doPost("/role/api/delete?id=" + row.id);
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
       * 授权对话框关闭
       */
      handleAuthClose() {
        console.log("before close:::::")
        this.dataForEdit = {};
        this._tree = this.$refs.tree;
//        this.$refs.tree.setCheckedKeys([])
        this.authDialogShow = false;
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
      let treeData = await this.doPost("/permission/api/getPermissionTree", null);
      if (treeData) {
        this.treeData = treeData;
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
</style>
