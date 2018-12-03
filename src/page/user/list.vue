<template>
  <div class="table">
    <el-form :inline="true" ref="queryForm" :model="queryForm" :rules="queryRules" size="small">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="queryForm.name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="员工号" prop="username">
        <el-input v-model="queryForm.username" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="findByCondition()">查询</el-button>
        <el-button type="default" plain @click="reset()">重置</el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="primary" @click="toEdit('add')">添加</el-button>
        <el-button type="primary" @click="toBatchAdd()">批量添加</el-button>
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
        prop="username"
        label="员工号">
      </el-table-column>

      <el-table-column
        prop="idNo" width="160"
        label="身份证号码">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="branchName"
        label="机构">
      </el-table-column>
      <el-table-column
        prop="departmentName"
        label="部门">
      </el-table-column>
      <el-table-column
        prop="stationName"
        label="岗位">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
        <template slot-scope="scope">
          <el-tag size="small" v-if="scope.row.status == '1'">正常</el-tag>
          <el-tag size="small" type="info" v-if="scope.row.status == 2">禁用</el-tag>
          <el-tag size="small" v-if="scope.row.status == 3">缺考</el-tag>
          <el-tag size="small" type="warning" v-if="scope.row.status == 4">审核中</el-tag>
          <el-tag size="small" type="danger" v-if="scope.row.status == 5">作弊</el-tag>
        </template>
      </el-table-column>
      <!--<el-table-column-->
      <!--prop="createTime" width="160"-->
      <!--label="创建时间">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
      <!--prop="createUserName"-->
      <!--label="创建人">-->
      <!--</el-table-column>-->

      <el-table-column
        fixed="right"
        label="操作"
        width="160">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="toEdit('edit', scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="toRemove(scope.$index, scope.row)">删除</el-button>
          <el-button type="success" size="mini" @click="toAssign(scope.$index, scope.row)">分派角色</el-button>
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
        <el-form-item label="用户名" prop="username" :label-width="labelWidth">
          <el-input :disabled="dataForEdit.id > 0" v-model="dataForEdit.username" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="idNo" :label-width="labelWidth">
          <el-input v-model="dataForEdit.idNo" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name" :label-width="labelWidth">
          <el-input v-model="dataForEdit.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="机构" prop="branchId" :label-width="labelWidth">
          <!--<el-select v-model="dataForEdit.branchId">-->
          <!--<el-option v-for="item in "-->
          <!--</el-select>-->
          <span @click="showBranchBox" v-model="dataForEdit.branchId">{{dataForEdit.branchName ? dataForEdit.branchName: '未选择'}}</span>
          <!--<el-input v-model="dataForEdit.branchId" placeholder="请输入"></el-input>-->
        </el-form-item>
        <el-form-item label="部门" prop="departmentId" :label-width="labelWidth">
          <el-select v-model="dataForEdit.departmentId">
            <el-option v-for="department in departmentList" :key="department.id"
                       :label="department.name" :value="department.id">

            </el-option>
          </el-select>
          <!--<el-input v-model="dataForEdit.departmentId" placeholder="请输入"></el-input>-->
        </el-form-item>
        <el-form-item label="岗位" prop="stationId" :label-width="labelWidth">
          <el-select v-model="dataForEdit.stationId">
            <el-option v-for="station in stationList" :key="station.id"
                       :label="station.name" :value="station.id">

            </el-option>
          </el-select>
          <!--<el-input v-model="dataForEdit.stationId" placeholder="请输入"></el-input>-->
        </el-form-item>
        <el-form-item label="状态" prop="status" :label-width="labelWidth">
          <el-select v-model="dataForEdit.status">
            <el-option v-for="item in statusInfo" :key="item.code" :value="item.code" :label="item.name">

            </el-option>

          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="分配角色" :visible.sync="assignDialogShow" :before-close="handleAssignClose">
      <el-form ref="assignForm" :rules="rules" :model="dataForAssign">
        <el-form-item label="用户名" prop="username" :label-width="labelWidth">
          <el-input disabled v-model="dataForAssign.username"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roleList" :label-width="labelWidth">
          <el-select v-model="dataForAssign.roleIdList" multiple placeholder="请选择" style="width: 100%;">
            <el-option
              v-for="role in roleList"
              :key="role.id"
              :label="role.name"
              :value="role.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleAssignClose">取 消</el-button>
        <el-button type="primary" @click="commitAssign">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog title="批量添加" :visible.sync="batchAddDialogShow" :before-close="handleClose">
      <el-upload
        class="upload-demo"
        ref="upload"
        :limit="1"
        action="http://localhost:8080/user/api/batchAdd"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-change="handleChange"
        :on-success="handleSuccess"
        :on-error="handleError"
        :file-list="fileList"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary" plain>选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="primary" @click="batchAdd">上传到服务器</el-button>
        <div style="display: inline-block; margin-left: 20px;">
          没有模板？<a type="success" href="http://localhost:8080/user/api/downloadModel">下载模板</a>
          <!--<el-button  size="small" type="success" plain @click="downloadModel">下载模板</el-button>-->
        </div>
        <div slot="tip" class="el-upload__tip">只能上传下载的模板文件</div>
      </el-upload>

      <el-alert v-show="batchAddErrorMessage != ''"
                v-bind:title='batchAddErrorMessage'
                type="error">
      </el-alert>
    </el-dialog>

    <el-dialog title="选择机构" :visible.sync="branchTreeShow" :before-close="closeBranchTree">
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>

      <el-tree
        class="filter-tree"
        :data="branchList"
        :props="defaultProps"
        @node-click="handleNodeClick"
        default-expand-all
        :filter-node-method="filterNode"
        ref="tree2">
      </el-tree>

      <div slot="footer" class="dialog-footer">
        <!--<el-button @click="branchTreeShow = false">取 消</el-button>-->
        <el-button type="primary" @click="branchTreeShow = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>


<script>
  import Vue from 'vue'

  export default {
    data() {
      return {
        statusInfo: [
          {code: 1, name: '正常'},
          {code: 2, name: '禁用'},
          {code: 3, name: '缺考'},
          {code: 4, name: '审核中'},
          {code: 5, name: '作弊'},
        ],
        branchTreeShow: false,
        branchList: [],
        filterText: '',
        defaultProps: {
          children: 'children',
          label: 'name'
        },

        stationList: [],
        departmentList: [],

        labelWidth: '90px',
        /**
         * 批量导入的错误信息
         */
        batchAddErrorMessage: '',
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
          username: '',
          pageSize: 10,
          pageNum: 1,
        },
        /**
         * 添加对话框数据
         */
        dataForAdd: {},

        roleList: [],

        /**
         * 分派角色使用的信息
         */
        dataForAssign: {
          roleIdList: [],

        },


        /**
         * 分配权限对话框是否显示
         */
        assignDialogShow: false,
        /**
         * 修改对话框是否显示
         */
        editDialogShow: false,

        /**
         * 批量添加对话框
         */
        batchAddDialogShow: false,

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
          name:
            [
              {required: true, message: '请输入name', trigger: 'blur'},
              {min: 2, max: 10, message: '长度在2-10个字符', trigger: 'blur'}
            ],

        },

        fileList: [],

      }
    },

    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },
    methods: {
      showBranchBox() {
        this.branchTreeShow = true;
      },
      closeBranchTree() {
        this.branchTreeShow = false;
      },
      filterNode(value, data) {
        console.log("过滤")
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      handleNodeClick(node) {
        console.log("节点被点击： ", node);
        this.dataForEdit.branchId = node.id;
        // this.formShow = true;
        this.dataForEdit.branchName = node.name;
      },
      /**
       * 查询
       */
      findByCondition: async function () {
        let data = await this.postEntity("/user/api/findByCondition?pageNum=" + this.queryForm.pageNum + "&pageSize=" + this.queryForm.pageSize, this.queryForm);
        console.log("data: ", data);
        if (data) {
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

      toBatchAdd() {
        console.log("唤起批量导入对话框。。。")
//        this.$refs.upload.clearFiles();
        this.batchAddErrorMessage = '';
        this.batchAddDialogShow = true;
      },
      /**
       * 批量导入
       */
      async batchAdd() {
        let res = await this.$refs.upload.submit();
        console.log("上传结果： ", res);
      },
      /**
       * 唤起编辑对话框
       */
      async toEdit(type, idx, row) {

        console.log("编辑：", row)
        if (this.departmentList.length == 0) {
          await this.postEntity("/department/api/findAll").then(res => {
            console.log("获取部门信息", res);
            this.departmentList = res;
          }).catch(e => {
            console.log("获取部门信息失败", e);
          })

        }
        if (this.stationList.length == 0) {
          this.postEntity("/station/api/findAll").then(res => {
            console.log("获取岗位信息", res);
            this.stationList = res;
          }).catch(e => {
            console.log("获取岗位信息失败", e);
          })
        }

        if (!this.branchList || this.branchList.length == 0) {
          this.postEntity("/branch/api/getBranchTree", null).then(res => {
            console.log("获取结构信息", res);
            this.branchList = res;
          }).catch(e => {
            console.log("获取机构信息失败", e);
          })
        }

        if (type == 'add') {
          console.log("唤起添加对话框")
          this.editDialogShow = true;
          this.dataForEdit = {};
        } else if (type == 'edit') {
          this.dataForEdit = JSON.parse(JSON.stringify(row));
          this.dataForEditIndex = idx;
          this.editDialogShow = true;
        }

      },

      /**
       * 唤起分配角色对话框
       */
      async toAssign(idx, row) {
        console.log("分派角色：：", row)
        this.dataForAssign = JSON.parse(JSON.stringify(row));
        console.log("this.dataForAssign:::", this.dataForAssign);
        let roleIds = await this.postEntity("/role/api/findByUserId?userId=" + this.dataForAssign.id);
        this.dataForEditIndex = idx;
        this.assignDialogShow = true;
        this.dataForAssign.roleIdList = roleIds;
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
            let res = await this.postEntity('/user/api/save', this.dataForEdit, 1000);
            if (res) {
              this.dataForEdit.id = res;
              if (id) {
                Vue.set(this.tableData, this.dataForEditIndex, this.dataForEdit);

              } else {
                this.findByCondition();
                // this.tableData.push(this.dataForEdit);
              }
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
        let data = await this.postEntity("/user/api/delete?id=" + row.id);
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
       * 处理分配角色对话框关闭
       */
      handleAssignClose() {
        console.log("分配角色对话框关闭");
        console.log("this.dataForAssign:::", this.dataForAssign)
        this.$refs.assignForm.resetFields();
        this.$refs.assignForm.clearValidate();
        this.assignDialogShow = false;
      },

      /**
       * 提交角色分配信息
       */
      async commitAssign() {
        console.log("roleIdList:", this.dataForAssign.roleIdList)
        let res = await this.postEntity("/user/api/assignRole?userId=" + this.dataForAssign.id, this.dataForAssign.roleIdList);
        if (res) {
          Vue.set(this.tableData, this.dataForEditIndex, this.dataForAssign);
          this.$notify({
            title: '成功',
            message: '角色分配成功',
            type: 'success'
          });
          //        以下代码变动无法触发页面渲染
          //        this.tableData[this.dataForEditIndex] = Object.assign({},this.dataForEdit);
          //          console.log(this.tableData)
        } else if (res == false) {
          console.log("请求成功，处理失败");
        } else if (res == null) {
          console.error("请求失败")
        }
        this.assignDialogShow = false;
      },
      /**
       * 批量添加对话框关闭时候执行
       */
      handleClose() {
        this.$refs.upload.clearFiles();
        this.batchAddDialogShow = false;
      },

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handleChange(file, fileList) {
        console.info("change file: ", file);
        console.info("change fileList: ", fileList);

      },
      handlePreview(file) {
        console.log("导入结果：", file.response);
      },

      /**
       * 服务器成功响应并处理后回调
       */
      handleSuccess(response, file, fileList) {
        console.log("上传结果：", response)
        if (response.result == false) {
          this.batchAddErrorMessage = response.message;
        } else {
          this.findByCondition();
          this.$refs.upload.clearFiles();
          this.batchAddDialogShow = false;
          this.$notify({
            title: '成功',
            message: '批量添加用户成功',
            type: 'success',
            duration: 0
          });
        }
      },
      handleError(err, file, fileList) {
        console.log("上传失败，原因：", err);
        this.$refs.upload.clearFiles();
        this.batchAddDialogShow = false;
        this.$notify({
          title: '失败',
          message: '批量添加用户失败',
          type: 'error',
          duration: 0
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
      let roleList = await this.postEntity("/role/api/findAll");
      this.roleList = roleList;
    },
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

  tbody button.el-button.el-button--mini {
    padding: 6px;
    margin: 2px;
  }
</style>
