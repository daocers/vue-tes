<template>
  <div id="user">
    <el-form :inline="true" ref="userForm" :model="userSelectType" label-width="80">
      <el-form-item label="组织类型">
        <el-select v-model="userSelectType.type">
          <el-option label="分行" value="1"></el-option>
          <el-option label="部门" value="2"></el-option>
          <el-option label="岗位" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="default" @click="queryTreeData('userForm')">查询</el-button>
    </el-form>

    <div class="tree">
      <el-tree
        :data="treeData"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps">
      </el-tree>
    </div>

  </div>

</template>

<script type="text/javascript">
    export default {
      data: function () {
        return {
          scene: {

          },
          userSelectType: {
            type: '',
          },
          treeData: [{
            id: 1,
            label: '一级 1',
            children: [{
              id: 4,
              label: '二级 1-1',
              children: [{
                id: 9,
                label: '三级 1-1-1'
              }, {
                id: 10,
                label: '三级 1-1-2'
              }]
            }]
          }, {
            id: 2,
            label: '一级 2',
            children: [{
              id: 5,
              label: '二级 2-1'
            }, {
              id: 6,
              label: '二级 2-2'
            }]
          }, {
            id: 3,
            label: '一级 3',
            children: [{
              id: 7,
              label: '二级 3-1'
            }, {
              id: 8,
              label: '二级 3-2'
            }]
          }],
          defaultProps: {
            children: 'children',
            label: 'label'
          }
        }
      },
      methods:{
        queryTreeData: function (formName) {
          console.log("查询tree data...")
          console.log("userSelectType: ", JSON.stringify(this.userSelectType));

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
