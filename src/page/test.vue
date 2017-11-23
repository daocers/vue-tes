<template>
  <div id="test">
    <el-table :data="list"
              border
              highlight-current-row
              @current-change="handleCurrentChange"
              style="width: 100%">
      <el-table-column prop="no" label="编号" width="80px">
        <template slot-scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="name" label="名称" width="80px">
        <!--<template v-if="scope.row.name != current"  slot-scope="scope" >-->
          <!--<el-input v-model="scope.row.name" size="small"></el-input>-->
        <!--</template>-->

        <template slot-scope="scope"  v-if="scope.row.name == current" >
        <el-date-picker
        v-model="value1"
        type="date"
        placeholder="选择日期">
        </el-date-picker>
        </template>
        <!--<template slot-scope="scope" v-if="scope.row.name == current">-->
        <!--<template v-if="scope.row.name != current" slot-scope="scope">-->
          <!--<span>{{scope.row.name}}</span>-->
        <!--</template>-->
      </el-table-column>
      <el-table-column prop="name" label="名称" width="80px">
        <template slot-scope="scope" v-if="scope.row.name == current">
          <el-input v-model="scope.row.name" size="small"></el-input>
        </template>
      </el-table-column>

      <el-table-column prop="date" label="日期">
        <!--<template slot-scope="scope">-->
          <!--<el-date-picker-->
            <!--v-model="value1"-->
            <!--type="date"-->
            <!--placeholder="选择日期">-->
          <!--</el-date-picker>-->
        <!--</template>-->
      </el-table-column>
      <el-table-column prop="value" label="值">
        <template slot-scope="scope" v-if="scope.row.name == current">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="90">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="removeLine(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
  export default {
    data(){
      return {
        current: 'name1',
        options: [
          {label: '月度', value: 1},
          {label: '季度', value: 2},
          {label: '年度', value: 3},
          {label: '半年度', value: 4},
        ],
        list:[],
      }
    },
    methods: {
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
        console.log("选中：", val.name);
        this.current = val.name;
      }
    },
    created: function () {
      for(var i = 0; i < 1000; i++){
        this.list.push({no: 'no'+i, name: 'name' + i,  date: new Date(), value: new Date().getTime()});
      }
    }
  }

</script>

<style>

</style>
