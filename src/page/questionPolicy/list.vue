<template>
  <div class="table">
    <el-form :inline="true" ref="queryForm" model="queryForm" :rules="queryRules">
      <el-form-item label="名称" prop="name">
        <el-input v-model="queryForm.name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-button type="default" @click="findByCondition()">查询</el-button>
    </el-form>

    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="110">
        <template slot-scope="scope">
          <el-button @click="getDetail(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>


<script>
  export default {
    data() {
      return {
        /**
         * 表格数据
         **/
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }],
        /**
         * 查询参数校验规则
         **/
        queryRules: {

        },
        /**
         * 查询参数
         **/
        queryForm:{

        }
      }
    },
    methods:{
      findByCondition() {
        this.http("/questionPolicy/api/list.do", this.queryForm);
      },

      getDetail(row){
        console.log("查看详情：", row)
      },
      edit(row){
        console.log("编辑：", row)
      },
      remove(row){
        console.log("删除：", row)
        this.tableData.pop(row);
      },
    }
  }
</script>

<style>

</style>
