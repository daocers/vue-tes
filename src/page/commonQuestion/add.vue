<template>
  <div id="add">
    <el-row>
      <el-col :span="18">

        <el-form :model="commonQuestion" :rules="rules" ref="addForm" label-width="80px">
                       <el-form-item label="title" prop="title">
              <el-input v-model="commonQuestion.title" placeholder="请输入"></el-input>
            </el-form-item>
                       <el-form-item label="answer" prop="answer">
              <el-input v-model="commonQuestion.answer" placeholder="请输入"></el-input>
            </el-form-item>
                       <el-form-item label="content" prop="content">
              <el-input v-model="commonQuestion.content" placeholder="请输入"></el-input>
            </el-form-item>
                       <el-form-item label="extraInfo" prop="extraInfo">
              <el-input v-model="commonQuestion.extraInfo" placeholder="请输入"></el-input>
            </el-form-item>
                       <el-form-item label="questionTypeId" prop="questionTypeId">
              <el-input v-model="commonQuestion.questionTypeId" placeholder="请输入"></el-input>
            </el-form-item>
                       <el-form-item label="questionBankId" prop="questionBankId">
              <el-input v-model="commonQuestion.questionBankId" placeholder="请输入"></el-input>
            </el-form-item>
                       <el-form-item label="propertyItemInfo" prop="propertyItemInfo">
              <el-input v-model="commonQuestion.propertyItemInfo" placeholder="请输入"></el-input>
            </el-form-item>
                       <el-form-item label="ownerType" prop="ownerType">
              <el-input v-model="commonQuestion.ownerType" placeholder="请输入"></el-input>
            </el-form-item>
                       <el-form-item label="ownerId" prop="ownerId">
              <el-input v-model="commonQuestion.ownerId" placeholder="请输入"></el-input>
            </el-form-item>
                       <el-form-item label="privaryType" prop="privaryType">
              <el-input v-model="commonQuestion.privaryType" placeholder="请输入"></el-input>
            </el-form-item>
                       <el-form-item label="status" prop="status">
              <el-input v-model="commonQuestion.status" placeholder="请输入"></el-input>
            </el-form-item>
                       <el-form-item label="isDel" prop="isDel">
              <el-input v-model="commonQuestion.isDel" placeholder="请输入"></el-input>
            </el-form-item>
                       <el-form-item label="createUserId" prop="createUserId">
              <el-input v-model="commonQuestion.createUserId" placeholder="请输入"></el-input>
            </el-form-item>
                       <el-form-item label="createTime" prop="createTime">
              <el-input v-model="commonQuestion.createTime" placeholder="请输入"></el-input>
            </el-form-item>
                       <el-form-item label="updateUserId" prop="updateUserId">
              <el-input v-model="commonQuestion.updateUserId" placeholder="请输入"></el-input>
            </el-form-item>
                       <el-form-item label="updateTime" prop="updateTime">
              <el-input v-model="commonQuestion.updateTime" placeholder="请输入"></el-input>
            </el-form-item>

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
        commonQuestion: {},
        rules: {
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
                let res = await this.http("/commonQuestion/api/save.do", this.commonQuestion);
                if (res == true) {
                    this.$confirm('继续添加?查看列表?', '提示', {
                        confirmButtonText: '继续添加',
                        cancelButtonText: '查看列表',
                        type: 'warning',
                        center: true
                    }).then(() => {
                      this.$router.push("/commonQuestion/add");
//                      Vue.set(this.data, "commonQuestion", {})
                      Vue.set(this.$data, "commonQuestion", {})
                    }).catch(() => {
                        this.$router.push("/commonQuestion/")
                    });
                }
            }
        });
      },
      goBack(){
          this.$router.go(-1);
      }

    }
  }
</script>


<style>

</style>
