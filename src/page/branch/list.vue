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
        <el-button type="primary" icon="iconfont tes-icon-station2" @click="toManage">层级管理</el-button>
        <el-button type="primary" icon="el-icon-upload" @click="toBatchAdd">批量添加</el-button>
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
        label="机构名称">
      </el-table-column>
      <el-table-column
        prop="code"
        label="机构编码">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="level"
        label="级别">
        <template slot-scope="scope">
          <el-tag size="small" style="background-color: #F2F6FC;" v-if="scope.row.level == 0"> 总 行</el-tag>
          <el-tag size="small" style="background-color: #EBEEF5;" v-if="scope.row.level == 1">一级分行</el-tag>
          <el-tag size="small" style="background-color: #E4E7ED;" v-if="scope.row.level == 2">二级分行</el-tag>
          <el-tag size="small" style="background-color: #DCDFE6;" v-if="scope.row.level == 3">三级分行</el-tag>
        </template>
      </el-table-column>


      <el-table-column
        v-if="false"
        prop="superiorId"
        label="上级机构">
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
        prop="status"
        label="状态">
        <template slot-scope="scope">
          <el-tag size="small" v-if="scope.row.status == '1'">正常</el-tag>
          <el-tag size="small" type="info" v-if="scope.row.status == 2">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        v-if="false"
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
                 target-url="/branch/api/setManager"
                 :target-id="dataForEdit.id"
                 :target-name="dataForEdit.name"></user-select>

    <el-dialog title="编辑" :visible.sync="editDialogShow">
      <el-form size="small" ref="editForm" :rules="rules" label-position="left" :model="dataForEdit">
        <el-form-item label="机构名称" prop="name" :label-width="labelWidth">
          <el-input v-model="dataForEdit.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="机构编号" prop="code" :label-width="labelWidth">
          <el-input v-model="dataForEdit.code" placeholder="请输入" disabled></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address" :label-width="labelWidth">
          <el-input v-model="dataForEdit.address" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="级别" prop="level" :label-width="labelWidth">
          <el-input v-model="dataForEdit.level" placeholder="请输入" disabled></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status" :label-width="labelWidth">
          <!--<el-input v-model="dataForEdit.status" placeholder="请输入"></el-input>-->
          <el-select v-model="dataForEdit.status" placeholder="请选择">
            <el-option v-for="status in statusInfo" :key="status.code" :value="status.code" :label="status.name"/>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" icon="iconfont tes-icon-cancel" @click="editDialogShow = false">取 消</el-button>
        <el-button size="small" icon="iconfont tes-icon-commit" type="primary" @click="save()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="批量添加" :visible.sync="batchAddDialogShow" :before-close="handleClose">
      <el-upload
        class="upload-demo"
        ref="upload"
        :limit="1"
        action=""
        :data="dataForBatch"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-change="handleChange"
        :file-list="fileList"
        :auto-upload="false">

        <el-button slot="trigger" icon="iconfont tes-icon-folder2" size="small" type="primary" plain>选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" v-bind:disabled="uploadFlag == false" type="primary"
                   icon="el-icon-upload"
                   @click="batchAdd">上传到服务器
        </el-button>
        <div style="display: inline-block; margin-left: 20px;">
          没有模板？<a type="success" href="#" @click="download">下载模板</a>
        </div>
        <div slot="tip" class="el-upload__tip">只能上传下载的模板文件</div>
      </el-upload>

      <el-alert v-show="batchAddErrorMessage != ''"
                v-bind:title='batchAddErrorMessage'
                type="error">
      </el-alert>
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
          {code: 1, name: '正常'},
          {code: 2, name: '禁用'},
        ],
        labelWidth: '80px',
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
          name: null,
          pageSize: 10,
          pageNum: 1,
        },

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
              {required: true, message: '请输入名称', trigger: 'blur'},
              {min: 2, max: 10, message: '长度在2-10个字符', trigger: 'blur'}
            ],

          address:
            [
              {max: 100, message: '100个字符以内', trigger: 'blur'}
            ],
          status:
            [
              {required: true, message: '请设置状态', trigger: 'change'},
            ],
        },

        fileList: [],

        uploadUrl: '',
        //是否可以上传
        uploadFlag: false,
        dataForBatch: {},

      }
    },


    methods: {
      /**
       * 查询
       */
      findByCondition: async function () {
        let data = await this.doPost("/branch/api/findByCondition?pageNum=" + this.queryForm.pageNum + "&pageSize=" + this.queryForm.pageSize, this.queryForm);
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

      toManage() {
        console.log("去往管理页面");
        this.$router.push("/branch/manage");
      },
      toBatchAdd() {
        this.$alert("需要根据行内实际需要处理，请先使用单条添加!", "提示", {
          confirmButtonText: '确定',
          callback: action => {

          }
        })
        return false;
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
            var res = await this.doPost('/branch/api/save', this.dataForEdit);
            if (res) {
              this.$set(this.tableData, this.dataForEditIndex, this.dataForEdit);
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
        if (row.level == 0) {
          this.$notify.warning("不能删除总行", "提示");
          return false;
        }
        let data = await this.doPost("/branch/api/delete?id=" + row.id);
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
            message: '批量导入机构信息成功',
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
          message: '批量导入机构信息失败',
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
      },

      //删除管理员
      removeManager: async function (row, rowIndex, user, idx) {
        this.dataForEdit = row;
        this.dataForEditIndex = rowIndex;
        let userId = user.id;
        let branchId = row.id;
        let resp = await this.doPost("/branch/api/removeManager", {
          branchId: branchId,
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
      },
      download() {
        this.batchAddErrorMessage = '';
        this.downloadFile("/branch/api/downloadModel");
      },

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
