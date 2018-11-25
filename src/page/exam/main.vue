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
            <el-input v-model="timerInfo" disabled style="width: 200px; color: #3091F2">
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
            <el-checkbox-group v-show="currentQuestion.typeCode == 'multi'"
                               v-model="multiAnswer">
              <el-checkbox label="A">A</el-checkbox>
              <el-checkbox label="B">B</el-checkbox>
              <el-checkbox label="C">C</el-checkbox>
              <el-checkbox label="D">D</el-checkbox>
              <el-checkbox label="E">E</el-checkbox>
            </el-checkbox-group>

            <el-checkbox-group v-show="currentQuestion.typeCode == 'judge'"
                               v-model="judgeAnswer">
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
    ws: null,
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
//        剩余时间，单位：秒
        timeLeft: 1000,
//        定时器上显示的信息
        timerInfo: '',

        endTime: new Date(),

        questionList: [
          {no: '单选第一题', id: '', answer: ''},
          {no: '单选第二题', id: '', answer: ''},
          {no: '单选第三题', id: '', answer: ''},
          {no: '多选第一题', id: '', answer: ''},
        ]
      }
    },
    methods: {
      changeTime() {
        let h, m, s;
//        还没有截止
        if (this.endTime.getTime() > new Date().getTime()) {
          let t = this.endTime.getTime() - new Date().getTime();
          h = Math.floor(t / 1000 / 60 / 60 % 24);
          m = Math.floor(t / 1000 / 60 % 60);
          s = Math.floor(t / 1000 % 60);

          if(h < 10){
            h = '0' + h;
          }
          if(m < 10){
            m = '0' + m;
          }
          if(s < 10){
            s = '0' + s;
          }
          this.timerInfo = h + ':' + m + ':' + s;

        }


      },
      /**
       * 下一题
       */
      toNext() {

      },
      /**
       * 上一题
       */
      toPrev() {

      },
      /**
       * 提交试卷
       */
      async commitPaper() {
        console.log("提交试卷！");
        let res = await this.http("/exam/api/commitPaper?paperId=" + this.paperId, this.questionList);
        if (res) {
          this.$notify.success({
            title: "成功",
            message: '交卷成功',
            duration: 0,
          });
        } else {
          this.$notify.error({
            title: "失败",
            message: '试卷提交失败，请联系管理员',
            duration: 0,
          });
        }

        this.endTime = new Date(new Date().getTime() + this.timeLeft);
      },
    },


    //加载之后执行
    mounted: function(){

      /**
       * 以下是websocket处理，用来处理强制交卷信息
       * */
      this.ws = new WebSocket("ws://localhost:8080/ws/hn.ws");
      console.log("初始化");
      ws.onopen = function () {
        console.log("open。。。")
      }

      ws.onmessage = function (event) {
        console.log("event", event);
        var data = event.data;
        console.log("收到服务器消息：", data);

        var res = "";
        try {
          res = JSON.parse(data);
        } catch (err) {
          console.log("解析消息失败: ", err);
        }
        if (res != '') {
          var type = res.type;
          if (type == "4") {
            console("教师强制提交试卷");
            commitPaper();
//                    $("#changePaper").trigger("click");
          }
        }
      }

      ws.onclose = function (event) {
        console.log("event:", event);
        console.log("close...")
      }
    },

    beforeDestroy: function(){
      console.log("准备关闭websocket...")
      this.ws.onclose();
      console.log("ws关闭了")
    },
    created: async function () {
//      场次id，如果找不到，取消
      let sceneId = this.$route.query.id;
      if(sceneId){
        this.sceneId = sceneId;
      }else{
        this.$router.replace("/exam")
        return false;
      }
      console.log("created");
      let questionList = await this.http("/exam/api/getQuestionList?sceneId=" + this.sceneId);
      if (questionList) {
        this.questionList = questionList;
      } else {
        this.$notify.error({
          title: '错误',
          message: '获取试题信息失败',
          duration: 0
        })
      }
//      let end = new Date();
//      end.setMinutes(59);
//      this.endTime = end;

      this.endTime = new Date(2018, 11, 14);
//      定时器
      let _this = this;
      setInterval(function () {
        if(_this.endTime.getTime() > new Date().getTime()){
          _this.changeTime();
        }else{
//          清除定时器
          clearInterval();
//          提交试卷
          _this.$alert('考试时间用完，提交试卷', '时间到！', {
            confirmButtonText: '确定',
            callback: action => {
//              this.$message({
//                type: 'info',
//                message: `action: ${ action }`
//              });
            }
          });
        }
      }, 1000);
    }
  }
</script>


<style>
  /*input.el-input__inner {*/
    /*color: cornflowerblue;*/
    /*background-color: rgba(64, 158, 255, 0.32);*/
  /*}*/

  /*.title {*/
    /*margin-bottom: 10px;*/
  /*}*/

  /*.content {*/
    /*min-height: 300px;*/
    /*max-height: 600px;*/
    /*margin-left: 15px;*/
  /*}*/

  /*.content-item {*/
    /*margin-bottom: 5px;*/
  /*}*/

  /*.answer {*/

  /*}*/
</style>
