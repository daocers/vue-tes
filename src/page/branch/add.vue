<template>
  <div id="add">
    <el-row>
      <el-col :span="18">

        <el-form label-position="left" :model="branch" :rules="rules" ref="addForm" label-width="80px">
          <el-form-item label="分行名称" prop="name">
            <el-input v-model="branch.name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="分行编码" prop="code">
            <el-input v-model="branch.code" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="branch.address" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="级别" prop="level">
            <el-input v-model="branch.level" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="上级分行" prop="superiorId">
            <el-input v-model="branch.superiorId" placeholder="请输入"></el-input>
          </el-form-item>
          <!--<el-form-item label="" prop="isDel">-->
            <!--<el-input v-model="branch.isDel" placeholder="请输入"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="status" prop="status">-->
            <!--<el-input v-model="branch.status" placeholder="请输入"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="createUserId" prop="createUserId">-->
            <!--<el-input v-model="branch.createUserId" placeholder="请输入"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="updateUserId" prop="updateUserId">-->
            <!--<el-input v-model="branch.updateUserId" placeholder="请输入"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="createTime" prop="createTime">-->
            <!--<el-input v-model="branch.createTime" placeholder="请输入"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="updateTime" prop="updateTime">-->
            <!--<el-input v-model="branch.updateTime" placeholder="请输入"></el-input>-->
          <!--</el-form-item>-->

          <el-form-item>
            <el-button type="primary" @click="add">保存</el-button>
            <el-button type="info" plain @click="goBack">取消</el-button>
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
        branch: {},
        rules: {
          name:
            [
              {required: true, message: '请输入name', trigger: 'blur'},
              {min: 3, max: 20, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          code:
            [
              {required: true, message: '请输入code', trigger: 'blur'},
              {min: 3, max: 16, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          address:
            [
              {required: true, message: '请输入address', trigger: 'blur'},
              {min: 3, max: 100, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          level:
            [
              {required: true, message: '请输入level', trigger: 'blur'},
              {min: 1, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          superiorId:
            [
              {required: true, message: '请输入superiorId', trigger: 'blur'},
              {min: 1, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
//          isDel:
//            [
//              {required: true, message: '请输入isDel', trigger: 'blur'},
//              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
//            ],
//          status:
//            [
//              {required: true, message: '请输入status', trigger: 'blur'},
//              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
//            ],
//          createUserId:
//            [
//              {required: true, message: '请输入createUserId', trigger: 'blur'},
//              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
//            ],
//          updateUserId:
//            [
//              {required: true, message: '请输入updateUserId', trigger: 'blur'},
//              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
//            ],
//          createTime:
//            [
//              {required: true, message: '请输入createTime', trigger: 'blur'},
//              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
//            ],
//          updateTime:
//            [
//              {required: true, message: '请输入updateTime', trigger: 'blur'},
//              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
//            ],
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
            let res = await this.http("/branch/api/save.do", this.branch);
            if (res == true) {
              this.$confirm('继续添加?查看列表?', '提示', {
                confirmButtonText: '继续添加',
                cancelButtonText: '查看列表',
                type: 'success',
                center: true
              }).then(() => {
                this.$refs['addForm'].resetFields();
              }).catch(() => {
                this.$router.push("/branch/")
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
