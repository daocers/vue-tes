<template>
  <div id="exam">
    <el-row :gutter="10">
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="scene.name" disabled>
            <template slot="prepend">考试名称</template>
          </el-input>
        </el-form-item>
        <div style="float: right">
          <el-form-item>
            <el-input v-model="timeLeft" disabled style="width: 200px;">
              <template slot="prepend">剩余时间</template>
            </el-input>
          </el-form-item>

          <el-button type="primary" @click="commitPaper()">提交试卷</el-button>
        </div>

      </el-form>

    </el-row>

    <el-row>
      <el-col :span="18">
        <el-card style="margin-bottom: 10px; font-size: 18px; margin-right: 10px;">
          <div class="title">我国最大的银行是？</div>
          <div class="content">
            <div class="content-item">A: 工商；</div>
            <div class="content-item">B: 农业银行；</div>
            <div class="content-item">C: 交通银行；</div>
            <div class="content-item">D: 建行；</div>
          </div>

          <div class="answer">
            <el-radio-group v-show="currentQuestion.typeCode == 'single'" v-model="singleAnswer">
              <el-radio label="A">A</el-radio>
              <el-radio label="B">B</el-radio>
              <el-radio label="C">C</el-radio>
              <el-radio label="D">D</el-radio>
            </el-radio-group>
            <el-checkbox-group  v-show="currentQuestion.typeCode == 'multi'"
              v-model="multiAnswer">
              <el-checkbox label="A">A</el-checkbox>
              <el-checkbox label="B">B</el-checkbox>
              <el-checkbox label="C">C</el-checkbox>
              <el-checkbox label="D">D</el-checkbox>
              <el-checkbox label="E">E</el-checkbox>
            </el-checkbox-group>

            <el-checkbox-group v-show="currentQuestion.typeCode == 'judge'"
              v-model="judgeAnswer" >
              <el-checkbox label="T">正确</el-checkbox>
              <el-checkbox label="F">错误</el-checkbox>
            </el-checkbox-group>

          </div>
        </el-card>
        <el-button type="primary" plain @click="toPrev()">上一题</el-button>
        <el-button type="primary" @click="toNext()" style="margin-left: 100px;">下一题</el-button>
      </el-col>
      <el-col :span="6">
        <el-table
          :data="questionList"
          border
          style="width: 100%;max-height: 800px;">
          <el-table-column
            prop="no"
            label="序号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="answer"
            label="作答信息"
            width="180">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

  </div>
</template>


<script>
  export default {
    data() {
      return {
        scene: {
          name: '测试',
        },
        currentQuestion: {
          typeCode: 'single',
        },
        singleAnswer: '',
        multiAnswer: [],
        judgeAnswer: [],
        timeLeft: '01:10:09',

        questionList:[
          {no: '单选第一题', answer: ''},
          {no: '单选第二题', answer: ''},
          {no: '单选第三题', answer: ''},
          {no: '多选第一题', answer: ''},
        ]
      }
    },
    methods: {
      /**
       * 下一题
       */
      toNext(){

      },
      /**
       * 上一题
       */
      toPrev(){

      },
      /**
       * 提交试卷
       */
      commitPaper(){
        console.log("提交试卷！");
      },
    },
    created: async function () {
      console.log("created");
      let questionList = await this.http("/paper/api/getQuestionList.do?paperId=" + this.paperId);
      if(questionList){
        this.questionList = questionList;
      }else{
        this.$notify.error({
          title: '错误',
          message: '获取试题信息失败',
          duration: 0
        })
      }
    }
  }
</script>


<style>
  input.el-input__inner{
    color: cornflowerblue;
    background-color: rgba(64, 158, 255, 0.32);
  }

  .title{
    margin-bottom: 10px;
  }

  .content{
    min-height: 300px;
    max-height: 600px;
    margin-left: 15px;
  }

  .content-item{
    margin-bottom: 5px;
  }
  .answer{

  }
</style>
