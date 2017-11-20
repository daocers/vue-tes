<template>
  <div id="add">
    <el-row>
      <el-col :span="18">

        <el-form :model="role" :rules="rules" ref="addForm" label-width="80px">
          <el-form-item label="名称" prop="name">
            <el-input v-model="role.name" placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item label="编码" prop="code">
            <el-input v-model="role.code" placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="add">保存</el-button>
            <el-button type="info" plain @click="this.$router.go(-1);">取消</el-button>
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
        role: {},
        rules: {
          name: [
            {required: true, message: '请输入', trigger: 'blur'},
            {min: 3, max: 10, message: '长度在3-10位之间', trigger: 'blur'}
          ],
          code: [
            {required: true, message: "请输入", trigger: 'blur'},
            {min: 3, max: 10, message: '长度在3-10位之间', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      add() {
        this.$refs['addForm'].validate(async (valid) => {
          if (!valid) {
            console.log("参数校验不通过，请处理");
            return false;
          } else {
            let res = await this.http("/role/api/save.do", this.role);
            if (res == true) {
              this.$confirm('继续添加?查看列表?', '提示', {
                confirmButtonText: '继续添加',
                cancelButtonText: '查看列表',
                type: 'warning',
                center: true
              }).then(() => {
                this.$router.push("/role/add");
              }).catch(() => {
                this.$router.push("/role/")
              });
            }
          }
        });
      }
    }
  }
</script>


<style>

</style>
