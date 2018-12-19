<template>
  <div id="add">
    <el-row :gutter="0">
      <el-col :span="10" style="border: 1px solid gainsboro">
        <el-tag type="success" style="margin-bottom: 10px;">可拖拽节点调整层级和顺序</el-tag>
        <el-tree
          ref="tree"
          :data="branchTree"
          :props="defaultProps"
          node-key="id"
          :highlight-current="true"
          default-expand-all
          @node-click="handleNodeClick"
          :expand-on-click-node="false"

          draggable
          @node-drag-start="handleDragStart"
          @node-drag-enter="handleDragEnter"
          @node-drag-leave="handleDragLeave"
          @node-drag-over="handleDragOver"
          @node-drag-end="handleDragEnd"
          @node-drop="handleDrop"
        >
        </el-tree>

        <el-button v-if="saveTreeShow" type="primary" style="margin: 10px" size="small" @click="saveTree">保存更改
        </el-button>
      </el-col>
      <el-col :span="10" :offset="2">
        <el-card class="box-card" style="margin-bottom: 10px;">
          <div class="clearfix">
            <span style="font-weight: 600;">操作提示: </span>
            <span style="display: block;">双击节点,添加下级机构；</span>
            <span style="display: block">点击节点,编辑当前机构；</span>
            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->


          </div>
        </el-card>
        <div style="margin-bottom: 5px;">
          <el-tag v-if="editFormShow" type="warning">当前操作：编辑</el-tag>
          <el-tag v-if="addFormShow" type="primary">当前操作：添加下级分行</el-tag>
        </div>
        <!--<el-button v-show="addBtnShow" type="primary" plain @click="toAdd()">添加机构</el-button>-->
        <!--<el-button v-show="addBtnShow" type="primary" plain @click="toEdit">编辑</el-button>-->

        <el-form v-show="addFormShow" label-position="left" :model="dataForAdd" :rules="rules" ref="addForm"
                 label-width="80px">
          <el-form-item label="机构名称" prop="name">
            <el-input v-model="dataForAdd.name" placeholder="请输入"></el-input>
          </el-form-item>
          <!--<el-form-item label="机构编码" prop="code">-->
          <!--<el-input v-model="dataForAdd.code" placeholder="请输入"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="地址" prop="address">
            <el-input v-model="dataForAdd.address" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="级别" prop="level">
            <el-input :disabled="true" v-model="dataForAdd.level" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="上级部门" prop="superiorName">
            <el-input :disabled="true" v-model="dataForAdd.superiorName" placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item label="上级编号" prop="superiorCode">
            <el-input :disabled="true" v-model="dataForAdd.superiorCode" placeholder="请输入"></el-input>
          </el-form-item>


          <el-form-item>
            <el-button type="primary" @click="add">添加</el-button>
            <el-button type="info" plain @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>

        <el-form v-show="editFormShow" label-position="left" :model="dataForEdit" :rules="rules" ref="editForm"
                 label-width="80px">
          <el-form-item label="机构名称" prop="name">
            <el-input v-model="dataForEdit.name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="机构编码" prop="code">
            <el-input v-model="dataForEdit.code" placeholder="请输入" disabled></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="dataForEdit.address" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="级别" prop="level">
            <el-input :disabled="true" v-model="dataForEdit.level" disabled placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="save">保存</el-button>
            <el-button type="info" plain @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>


  </div>

</template>

<script>
  export default {
    data() {
      return {
        saveTreeShow: false,

//        添加按钮是否显示
        addBtnShow: true,
//        添加表单是否显示
        addFormShow: false,
//        编辑表单是否显示
        editFormShow: false,
        branchTree: [],
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
              {max: 20, message: '20个字符以内', trigger: 'blur'}
            ],
          address:
            [
              {max: 100, message: '100个字符以内', trigger: 'blur'}
            ],
          superiorId:
            [
              {required: true, message: '请设置superiorId', trigger: 'blur'},
            ],
        },

        times: [0, 0],
      }
    },
    methods: {
      async getBranchTree() {
        let data = await this.postEntity("/branch/api/getBranchTree", null);
        if (data == null || data == undefined) {
          data = [];
        }
        console.log("data: ", data);
        this.branchTree = data;
      },

      setAddData: function (node) {
        this.addFormShow = true;
        this.editFormShow = false;
        // var node = this.$refs['tree'].getCurrentNode();
        console.log("当前选中的node: ", node);
        if (node == null) {
          this.$message.warning("请选择上级机构");
        } else {
          this.dataForAdd.id = null;
          this.dataForAdd.superiorId = node.id;
          this.dataForAdd.level = node.level + 1;
          this.dataForAdd.superiorName = node.name;
          this.dataForAdd.superiorCode = node.code;
        }
      },
      setEditData: function (node) {
        this.editFormShow = true;
        this.addFormShow = false;
        // var node = this.$refs['tree'].getCurrentNode();
        console.log("当前选中的node: ", node.name);
        if (node == null) {
          this.$message.warning("请选择要编辑的机构");
        } else {
          this.dataForEdit = node;
          // this.dataForEdit.id = node.id;
          // this.dataForEdit.name = node.name;
          // this.dataForEdit.address = node.address;
          // this.dataForEdit.code = node.code;
          // this.dataForEdit.level = node.level;
          // console.log("ddfdf", this.dataForEdit)
        }
      },
      /**
       * 展示添加表单
       */
      toAdd() {
        if (this.branchTree.length == 0) {
          this.dataForAdd.superiorId = null;
          this.dataForAdd.level = 0;
          this.dataForAdd.superiorName = null;
          this.addBtnShow = false;
          this.addFormShow = true;
          this.editFormShow = false;
        } else {
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
            let res = await this.postEntity("/branch/api/save", this.dataForAdd);
            if (res) {
              this.dataForAdd.id = res;
              let nodeData = JSON.parse(JSON.stringify(this.dataForAdd));
              var currentNode = this.$refs['tree'].getCurrentNode();
              if (!currentNode) {
                this.branchTree.push(nodeData)
              } else if (!currentNode.children) {
                currentNode.children = [];
                currentNode.children.push(nodeData);
              } else {
                currentNode.children.push(nodeData);
              }
              this.$refs['addForm'].resetFields();

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
        // this.$refs['addForm'].resetFields();
        // this.$refs['editForm'].resetFields();
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
            let res = await this.postEntity("/branch/api/save", this.dataForEdit);
            if (res == true) {
              this.dataForAdd.id = res;
              let currentNode = this.$refs['tree'].getCurrentNode();
              currentNode.name = this.dataForEdit.name;
              currentNode.address = this.dataForEdit.address;
              currentNode.code = this.dataForEdit.code;
              this.addBtnShow = true;
              this.editFormShow = false;
            }
          }
        });
      },

      async saveTree() {
        let res = await this.postEntity("/branch/api/saveTree", this.branchTree);
        if (res) {
          this.$notify.success("保存成功");
          this.saveTreeShow = false;
        }
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
        let time = new Date().getTime();
        this.times.push(time);
        this.times.shift();
        console.log("times::", this.times);
        if (this.times[1] - this.times[0] < 500) {
          console.log("双击事件成立")
          this.setAddData(node);

        } else {
          console.log("单击事件")
          this.setEditData(node);

        }


        // console.log("节点被点击： ", node);
        // if (this.addFormShow) {
        //   console.log("manage ... ", node);
        // } else if (this.editFormShow) {
        //   console.log("edit ... ", node);
        // }
      },

      /**
       *
       *拖拽事件处理
       *
       **/
      handleDragStart(node, ev) {
        // console.log('drag start', node);
      },
      handleDragEnter(draggingNode, dropNode, ev) {
        // console.log('tree drag enter: ', dropNode.label);
      },
      handleDragLeave(draggingNode, dropNode, ev) {
        // console.log('tree drag leave: ', dropNode.label);
      },
      handleDragOver(draggingNode, dropNode, ev) {
        // console.log('tree drag over: ', dropNode.label);
      },
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        // console.log('tree drag end: ', dropNode && dropNode.label, dropType);
      },
      handleDrop(draggingNode, dropNode, dropType, ev) {
        console.log('tree drop: ', draggingNode.data, dropNode.data, dropType);
        this.saveTreeShow = true;
        let draggingData = draggingNode.data;
        if ("inner" == dropType) {
          draggingData.superiorId = dropNode.data.id;
          draggingData.level = dropNode.data.level + 1;
        } else if ("before" == dropType) {
          draggingData.superiorId = dropNode.data.superiorId;
          draggingData.level = dropNode.data.level;
        } else if ("after" == dropType) {
          draggingData.superiorId = dropNode.data.superiorId;
          draggingData.level = dropNode.data.level;
        }
        console.log("treeData:", this.branchTree)
      },

    },
    created: async function () {
      this.getBranchTree();
    },

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
