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
        :check-strictly="doNotRelation"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        @node-click="handleTreeClick"
        @check-change="handleCheckChange"
        highlight-current
        :props="defaultProps">
      </el-tree>
    </div>

    <div class="checked">
      <el-table
        border
        ref="checkedTable"
        :data="checkedData"
        highlight-current-row
        max-height="500px"
        style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          property="type"
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
          doNotRelation: true,
          /**
           * 场次信息
           */
          scene: {

          },
          /**
           * 已选择信息
           */
          checkedData:[],
          /**
           * 用户选择方式
           */
          userSelectType: '',
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
        }
      },
      methods:{
        /**
         * 获取树组件数据
         * @returns {Promise.<void>}
         */
        getTreeData: async function () {
          let treeData;
          console.log("查询tree data...")
          console.log("userSelectType: ", JSON.stringify(this.userSelectType));
          if(this.userSelectType == 1){
            treeData = await this.http("/branch/api/getBranchTree.do");
          }else if(this.userSelectType== 2){
            treeData = await  this.http("/department/api/findAll.do");
          }else if(this.userSelectType == 3){
            treeData = await this.http("/station/api/findAll.do");
          }
          if(!treeData){
            treeData = [];
          }
          this.treeData = treeData;
        },
        handleTreeClick: function (value, node, tree) {
          console.log("value: ", value);
          console.log("node::", node);
          console.log("tree: ", tree);
        },
        /**
         * 树状组件勾选状态改变时触发
         * @param data
         * @param checked
         * @param indeterminate
         */
        handleCheckChange(data, checked, indeterminate) {
          console.log("data：：", data);
          console.log("checked::", checked);
          console.log("indeterminate:", indeterminate);
          var key = this.userSelectType + "*" + data.id;
          if(checked){
            if(this.userSelectType == 1){
              data['type'] = "机构";
            }else if(this.userSelectType == 2){
              data['type'] = "部门";
            }else if(this.userSelectType == 3){
              data['type'] = "岗位";
            }
            this.resData[key] = data;
            this.checkedData.push(data);
          }else{

            if(this.resData[key]){//已经选中的又取消了
              this.resData[key] = undefined;
              let newCheckedData = [];
              for(let id in this.resData){
                let obj = this.resData[id];
                if(obj){
                  newCheckedData.push(this.resData[id]);
                }
              }
              this.checkedData = newCheckedData;
            }
          }
          console.log("checkedData:::", this.checkedData);

        },
        /**
         * 用户选择方式改变时触发
         * 清空已选树状组件内容
         * @param type
         */
        handleTypeChange(type){
          console.log("type:::", type);
          this.treeData = [];
        }
      },
      created: function () {
        console.log("created...")
        this.scene = this.$parent.$data.scene;
      }
    }
</script>

<style>
  .tree{
    border: 1px solid rgba(69, 139, 255, 0.62);
    border-radius: 3px;
    padding: 5px;
  }
</style>
