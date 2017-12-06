<template>
  <div id="add">
    <el-row :gutter="20">
      <el-col :span="8" style="border: 1px solid gainsboro">
        <el-tree
          ref="tree"
          :data="permissionTree"
          :props="defaultProps"
          node-key="id"
          :highlight-current="true"
          default-expand-all
          @node-click="handleNodeClick"
          :expand-on-click-node="false"
        >
        </el-tree>
      </el-col>
      <el-col :span="8" :offset="2">
        <el-card class="box-card" style="margin-bottom: 10px;">
          <div class="clearfix">
            <span>操作提示: 选中菜单，新增下级菜单/编辑当前菜单</span>
            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
          </div>
        </el-card>
        <el-button v-show="addBtnShow" type="primary" plain @click="toAdd()">添加权限</el-button>
        <el-button v-show="addBtnShow" type="primary" plain @click="toEdit">编辑</el-button>

        <el-form v-show="addFormShow" label-position="left" :model="dataForAdd" :rules="rules" ref="addForm"
                 label-width="80px">

          <el-form ref="addForm" :rules="rules" label-position="left" :model="dataForEdit">
            <el-form-item label="权限编码" prop="code">
              <el-input v-model="dataForAdd.code" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="名称" prop="name">
              <el-input v-model="dataForAdd.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="controller" prop="controller">
              <el-input v-model="dataForAdd.controller" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="action" prop="action">
              <el-input v-model="dataForAdd.action" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="httpMethod" prop="httpMethod">
              <el-input v-model="dataForAdd.httpMethod" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="序号" prop="no">
              <el-input v-model="dataForAdd.no" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="memo">
              <el-input v-model="dataForAdd.memo" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="type">
              <el-select v-model="dataForAdd.type">
                <el-option label="菜单" value="1"></el-option>
                <el-option label="子菜单" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="addDialogShow = false">取 消</el-button>
            <el-button type="primary" @click="updateData()">确 定</el-button>
          </div>

        </el-form>

        <el-form v-show="editFormShow" label-position="left" :model="dataForEdit" :rules="rules" ref="editForm"
                 label-width="80px">

          <el-form ref="editForm" :rules="rules" label-position="left" :model="dataForEdit">
            <el-form-item label="code" prop="code">
              <el-input v-model="dataForEdit.code" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="name" prop="name">
              <el-input v-model="dataForEdit.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="controller" prop="controller">
              <el-input v-model="dataForEdit.controller" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="action" prop="action">
              <el-input v-model="dataForEdit.action" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="httpMethod" prop="httpMethod">
              <el-input v-model="dataForEdit.httpMethod" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="no" prop="no">
              <el-input v-model="dataForEdit.no" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="memo" prop="memo">
              <el-input v-model="dataForEdit.memo" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="type" prop="type">
              <el-input v-model="dataForEdit.type" placeholder="请输入"></el-input>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="editDialogShow = false">取 消</el-button>
            <el-button type="primary" @click="updateData()">确 定</el-button>
          </div>

        </el-form>
      </el-col>
    </el-row>


  </div>

</template>

<script>
  export default {
    data() {
      return {
//        添加按钮是否显示
        addBtnShow: true,
//        添加表单是否显示
        addFormShow: false,
//        编辑表单是否显示
        editFormShow: false,
        permissionTree: [],
        defaultProps: {
          children: 'children',
          label: 'name',
        },
        dataForEdit: {},
        dataForAdd: {},
        rules: {
          name:
            [
              {required: true, message: '请输入name', trigger: 'blur'},
              {min: 2, max: 10, message: '长度在2-10个字符', trigger: 'blur'}
            ],
          code:
            [
              {required: true, message: '请输入code', trigger: 'blur'},
              {min: 3, max: 20, message: '长度在3-20个字符', trigger: 'blur'}
            ],
          address:
            [
//              {required: true, message: '请输入address', trigger: 'blur'},
            {min: 3, max: 10, message: '长度在3-100个字符', trigger: 'blur'}
          ],
//          level:
//            [
//              {required: true, message: '请输入level', trigger: 'blur'},
//              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
//          ],
          superiorId:
            [
              {required: true, message: '请输入superiorId', trigger: 'blur'},
//              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      setAddData: function () {
        var node = this.$refs['tree'].getCurrentNode();
        console.log("当前选中的node: ", node);
        if (node == null) {
          this.$message.warning("请选择上级菜单");
        } else {
          this.dataForAdd.superiorId = node.id;
          this.dataForAdd.level = node.level + 1;
          this.dataForAdd.superiorName = node.name;
        }
      },
      setEditData: function () {
        var node = this.$refs['tree'].getCurrentNode();
        console.log("当前选中的node: ", node);
        if (node == null) {
          this.$message.warning("请选择上级机构");
        } else {
          this.dataForEdit.id = node.id ;
          this.dataForEdit.name = node.name ;
          this.dataForEdit.address = node.address ;
          this.dataForEdit.code = node.code ;
          this.dataForEdit.level = node.level ;
        }
      },
      /**
       * 展示添加表单
       */
      toAdd() {
        if(this.permissionTree.length == 0){
          this.dataForAdd.superiorId = null;
          this.dataForAdd.level = 0;
          this.dataForAdd.superiorName = null;
          this.addBtnShow = false;
          this.addFormShow = true;
          this.editFormShow = false;
        }else{
          var node = this.$refs['tree'].getCurrentNode();
          console.log("当前选中的node: ", node);
          if (node == null) {
            this.$message.warning("请选择上级机构");
          } else {
            this.setAddData();
            this.addBtnShow = false;
            this.addFormShow = true;
            this.editFormShow = false;
          }
        }

      },
      /**
       * 展示编辑表单
       */
      toEdit() {
        var node = this.$refs['tree'].getCurrentNode();
        console.log("当前选中的node: ", node);
        if (node == null) {
          this.$message.warning("请选择机构");
        } else {
          this.setEditData();
          this.addBtnShow = false;
          this.addFormShow = false;
          this.editFormShow = true;
        }
      },

      /**
       * 添加表单数据保存
       */
      add() {
        this.$refs['addForm'].validate(async (valid) => {
          if (!valid) {
            console.log("参数校验不通过，请处理");
            return false;
          } else {
            let res = await this.http("/branch/api/save.do", this.dataForAdd);
            if(res != null && res != undefined){
              this.dataForAdd.id = res;
              var currentNode = this.$refs['tree'].getCurrentNode();
              currentNode.children.push(this.dataForAdd);
              this.addBtnShow = true;
              this.addFormShow = false;
            }
          }
        });
      },

      /**
       * 取消添加
       */
      cancel() {
        this.$refs['addForm'].resetFields();
        this.$refs['editForm'].resetFields();
        this.addFormShow = false;
        this.addBtnShow = true;
        this.editFormShow = false;
      },
      /**
       * 编辑表单提交
       */
      save() {
        this.$refs['editForm'].validate(async (valid) => {
          if (!valid) {
            console.log("参数校验不通过，请处理");
            return false;
          } else {
            let res = await this.http("/branch/api/update.do", this.dataForEdit);
            if(res == true){
              this.dataForAdd.id = res;
              var currentNode = this.$refs['tree'].getCurrentNode();
              currentNode.name = this.dataForEdit.name;
              currentNode.address = this.dataForEdit.address;
              currentNode.code = this.dataForEdit.code;
              this.addBtnShow = true;
              this.editFormShow = false;
            }
          }
        });
      },
      /**
       * 取消编辑
       */
      cancelEdit() {

      },
      goBack() {
        this.$router.go(-1);
      },
      /**
       * 节点点击事件
       * @param data
       */
      handleNodeClick(node) {
        console.log("节点被点击： ", node);
        if (this.addFormShow) {
          console.log("add ... ", node);
          this.setAddData();
        } else if (this.editFormShow) {
          console.log("edit ... ", node);
          this.setEditData();
        }
      }

    },
    created: async function () {
      let data = await this.http("/permission/api/getPermissionTree.do", null);
      if(data == null || data == undefined){
        data  = [];
      }
      console.log("data: ", data);
      this.permissionTree = data;
    }
  }
</script>


<style>

  .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    background-color: #daecff;
  }

  .el-tree-node__content {
    height: 35px;
  }

  .el-checkbox, .el-tree-node__label {
    font-size: 16px;
  }
</style>
