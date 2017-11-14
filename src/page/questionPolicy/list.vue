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
          <el-button type="text" size="small" @click="remove(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog title="修改策略信息" v-model="dialogFormVisible">
      <el-form :model="selectTable">
        <el-form-item label="策略名称" label-width="100px">
          <el-input v-model="selectTable.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" label-width="100px">
          <el-autocomplete
            v-model="address.address"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入地址"
            style="width: 100%;"
            @select="addressSelect"
          ></el-autocomplete>
          <span>当前城市：{{city.name}}</span>
        </el-form-item>
        <el-form-item label="店铺介绍" label-width="100px">
          <el-input v-model="selectTable.description"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" label-width="100px">
          <el-input v-model="selectTable.phone"></el-input>
        </el-form-item>
        <el-form-item label="店铺分类" label-width="100px">
          <el-cascader
            :options="categoryOptions"
            v-model="selectedCategory"
            change-on-select
          ></el-cascader>
        </el-form-item>
        <el-form-item label="商铺图片" label-width="100px">
          <el-upload
            class="avatar-uploader"
            :action="baseUrl + '/v1/addimg/shop'"
            :show-file-list="false"
            :on-success="handleServiceAvatarScucess"
            :before-upload="beforeAvatarUpload">
            <img v-if="selectTable.image_path" :src="baseImgPath + selectTable.image_path" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateShop">确 定</el-button>
      </div>
    </el-dialog>
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
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }],
        /**
         * 查询参数校验规则
         **/
        queryRules: {},
        /**
         * 查询参数
         **/
        queryForm: {}
      }
    },
    methods: {
      findByCondition() {
        this.http("/questionPolicy/api/list.do", this.queryForm);
      },

      getDetail(row) {
        console.log("查看详情：", row)
      },
      edit(row) {
        console.log("编辑：", row)
      },
      remove(idx, row) {
        console.log("删除：", idx, row)
        this.tableData.splice(idx, 1);
        this.tableData = this.tableData;
        console.log("tableData: ", this.tableData)
      },
    }
  }
</script>

<style>

</style>
