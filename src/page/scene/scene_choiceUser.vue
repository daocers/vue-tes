<template>
  <div id="user">
    <el-form :inline="true" ref="userForm" label-width="80" size="small">
      <el-form-item label="组织类型">
        <el-select v-model="userSelectType" @change="handleTypeChange">
          <el-option label="机构" value="1"></el-option>
          <el-option label="部门" value="2"></el-option>
          <el-option label="岗位" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" plain @click="getTreeData()" size="small">查询</el-button>
    </el-form>

    <div class="tree">
      <el-tree
        :data="treeData"
        :check-strictly=NotRelation"
        show-checkbox
        default-expand-all
        :default-checked-keys="defaultChecked"
        node-key="id"
        ref="tree"
        @check-change="handleCheckChange"
        highlight-current
        :props="defaultProps">
      </el-tree>
    </div>

    <div class="checked">
      <el-table
        border
        ref="checkedTable"
        :data="checkedList"
        highlight-current-row
        max-height="500px"
        style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          property="typeName"
          label="类型"
          width="120">
        </el-table-column>
        <el-table-column
          property="name"
          label="信息"
          width="120">
        </el-table-column>
      </el-table>
    </div>
  </div>

</template>

<script type="text/javascript">
  export default {
    data: function () {
      return {
        /**
         * 父子是否不进行关联勾选
         */
       NotRelation: true,
        /**
         * tree组件的属性配置
         */
        defaultProps: {
          children: 'children',
          label: 'name',
        },
        /**
         * 树数据信息
         */
        treeData: [],
        /**
         * 已选中的key，obj信息，如果取消，设置obj为undefined
         * key 为 type + "*" + id
         */
        resData: {},
        /**
         * 用户选择方式  1 机构， 2 部门， 3 岗位
         */
        userSelectType: '',

        /**
         * 树状组件默认选择项
         */
        defaultChecked: [],

        /**
         * 已选择的信息
         * type:List<Obj>
         */
//        checkbjInfo: {},

        /**
         * 已选择的id信息
         * type:List<id>
         */
        checkedIdInfo: {},

        /**
         * 已选择的列表
         */
        checkedList: [],

        /**
         * 存放key，用于取消选择时候的删除
         */
        checkedKeyList: [],

      }
    },
    methods: {
      /**
       * 获取树组件数据
       * @returns {Promise.<void>}
       */
      getTreeData: async function () {
        let treeData;
        console.log("查询tree data...")
        if (this.userSelectType == 1) {
          treeData = await this.postEntity("/branch/api/getBranchTree");
        } else if (this.userSelectType == 2) {
          treeData = await  this.postEntity("/department/api/findAll");
        } else if (this.userSelectType == 3) {
          treeData = await this.postEntity("/station/api/findAll");
        }
        if (!treeData) {
          treeData = [];
        }
        this.treeData = treeData;
//          设置默认选中项
        this.defaultChecked = this.checkedIdInfo[this.userSelectType];

        this.$parent.$data.checkedIdInfo = this.checkedIdInfo;
      },
      /**
       * 树状组件勾选状态改变时触发
       */
      handleCheckChange(data, checked, indeterminate) {
        console.log("checked::::", checked);
        let type = this.userSelectType;
        var key = this.userSelectType + "*" + data.id;
        console.log("key: ", key);
        if (checked) {
          console.log("^^^^^^^^^^^^^checked")
          if (this.userSelectType == 1) {
            data['typeName'] = "机构";
            data['type'] = 1;
          } else if (this.userSelectType == 2) {
            data['typeName'] = "部门";
            data['type'] == 2;
          } else if (this.userSelectType == 3) {
            data['typeName'] = "岗位";
            data['type'] == 3;
          }
//          if (!this.checkbjInfo[type]) {
//            this.checkbjInfo[type] = [];
//          }
          if (!this.checkedIdInfo[type]) {
            this.checkedIdInfo[type] = [];
          }
          let idx = this.checkedIdInfo[type].indexOf(data.id);
          if (idx > -1) {
            console.log("已经存在");
          } else {
//            this.checkbjInfo[type].push(data);
            this.checkedIdInfo[type].push(data.id);
            this.checkedList.push(data);
            this.checkedKeyList.push(key);
          }


//          console.log("checkedIdInfo:@@@", this.checkedIdInfo);
//          console.log("checkbjInfo:@@@", this.checkbjInfo);
//          console.log("checkedList:@@", this.checkedList);
        } else {
          console.log("cancel^&^^^^^^^^^^^^")
//          console.log("checkedIdInfo:@@@**", this.checkedIdInfo);
//          console.log("checkbjInfo:@@@**", this.checkbjInfo);
//          console.log("checkedList:@@**", this.checkedList);

          let idx = this.checkedIdInfo[type].indexOf(data.id);
          console.log("idx: ", idx);
          if (idx > -1) {
            this.checkedIdInfo[type].splice(idx, 1);
//            this.checkbjInfo[type].splice(idx, 1);
          }
          let objIdx = this.checkedKeyList.indexOf(key);
          console.log("objIdx: ", objIdx);
          if (objIdx > -1) {
            console.log("good")
            this.checkedList.splice(objIdx, 1);
            this.checkedKeyList.splice(objIdx, 1);
            console.log("******", this.checkedList);
          }

//          console.log("checkedIdInfo:@@@****", this.checkedIdInfo);
//          console.log("checkbjInfo:@@@****", this.checkbjInfo);
//          console.log("checkedList:@@****", this.checkedList);
        }
//        this.$set(this.$parent.$data.scene.checkedList, this.checkedList);
        this.$parent.$data.scene.checkedList = this.checkedList;
        this.$parent.$data.scene.checkedKeyList = this.checkedKeyList;
        this.$parent.$data.scene.checkedIdInfo = this.checkedIdInfo;
      },
      /**
       * 用户选择方式改变时触发
       * 清空已选树状组件内容
       * @param type
       */
      handleTypeChange(type) {
        console.log("type:::", type);
        this.treeData = [];
      }
    },
    created: function () {
      console.log("created...")
      this.checkedList = this.$parent.$data.scene.checkedList;
      this.checkedKeyList = this.$parent.$data.scene.checkedKeyList;
      this.checkedIdInfo = this.$parent.$data.scene.checkedIdInfo;
//      this.checkbjInfo = this.$parent.$data.scene.checkbjInfo;
    }
  }
</script>

<style>
  .tree {
    border: 1px solid rgba(69, 139, 255, 0.62);
    border-radius: 3px;
    padding: 5px;
  }
</style>
