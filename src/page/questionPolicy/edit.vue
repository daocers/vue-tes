<template>
  <div id="edit">
    <el-row>
      <el-col :span="16">
        <el-form ref="editForm" :model="questionPolicy" :rules="rules" label-width="80px">
          <el-form-item label="策略名称" prop="name">
            <el-input v-model="questionPolicy.name" placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item label="策略编码" prop="code">
            <el-input v-model="questionPolicy.code" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="题型" prop="questionTypeId">
            <el-select v-model="questionPolicy.questionTypeId" placeholder="请选择">
              <el-option label="单项选择" value="1"></el-option>
              <el-option label="不定项选择" value="2"></el-option>
              <el-option label="判断" value="3"></el-option>
            </el-select>
          </el-form-item>

          <el-button type="primary" @click="save('editForm')">提交</el-button>
          <el-button type="default" @click="goBack()">返回</el-button>
        </el-form>
      </el-col>
    </el-row>

  </div>
</template>


<script>
  export default {
    data() {
      return {
        /**
         * 数据信息
         */
        questionPolicy: {},

        /**
         * 校验信息
         */
        rules: {
          name: [
            {required: true, message: '请输入试题策略名称', trigger: 'blur'},
          ]
        }
      }
    },

    methods: {
      save(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.postEntity("/questionPolicy/api/save", this.questionPolicy)
          } else {
            console.log("参数校验失败，不提交");
//           弹窗
//            const h = this.$createElement;
//            this.$notify({
//              title: '标题名称',
//              message: h('i', { style: 'color: teal'}, '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案')
//            });
          }
        })
      },
      goBack(){
        this.$router.go(-1);
      }
    }
  }
</script>


<style>

</style>
