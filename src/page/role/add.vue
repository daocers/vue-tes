<template>
  <div id="add">
    <el-row>
      <el-col :span="18">

        <el-form label-position="left" :model="role" :rules="rules" ref="addForm" label-width="80px">
          <el-form-item label="name" prop="name">
            <el-input v-model="role.name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="code" prop="code">
            <el-input v-model="role.code" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="memo" prop="memo">
            <el-input v-model="role.memo" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="status" prop="status">
            <el-input v-model="role.status" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="isDel" prop="isDel">
            <el-input v-model="role.isDel" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="createUserId" prop="createUserId">
            <el-input v-model="role.createUserId" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="createTime" prop="createTime">
            <el-input v-model="role.createTime" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="updateUserId" prop="updateUserId">
            <el-input v-model="role.updateUserId" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="updateTime" prop="updateTime">
            <el-input v-model="role.updateTime" placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button size="small"  type="primary" @click="add">保存</el-button>
            <el-button size="small"  type="info" plain @click="goBack">取消</el-button>
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
          name:
            [
              {required: true, message: '请输入name', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          code:
            [
              {required: true, message: '请输入code', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          memo:
            [
              {required: true, message: '请输入memo', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          status:
            [
              {required: true, message: '请输入status', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          isDel:
            [
              {required: true, message: '请输入isDel', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          createUserId:
            [
              {required: true, message: '请输入createUserId', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          createTime:
            [
              {required: true, message: '请输入createTime', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          updateUserId:
            [
              {required: true, message: '请输入updateUserId', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          updateTime:
            [
              {required: true, message: '请输入updateTime', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
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
            let res = await this.doPost("/role/api/save", this.role);
            if (res == true) {
              this.$confirm('继续添加?查看列表?', '提示', {
                confirmButtonText: '继续添加',
                cancelButtonText: '查看列表',
                type: 'success',
                center: true
              }).then(() => {
                this.$refs['addForm'].resetFields();
              }).catch(() => {
                this.$router.push("/role/")
              });
            }
          }
        });
      },
      goBack() {
        this.$router.go(-1);
      }

    },
    created: function () {

    }
  }
</script>


<style>

</style>
