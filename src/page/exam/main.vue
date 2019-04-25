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
            <el-input v-model="timerInfo" disabled style="width: 230px; color: red;">
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
          <div class="title">{{currentQuestion.title}}</div>
          <div class="content">
            <div class="content-item" v-for="item in currentQuestion.items">{{item}}</div>
          </div>

          <div class="answer">
            <el-radio-group @change="handleAnswer" v-show="currentQuestion.questionType == '1'" v-model="checkedItems">
              <el-radio v-for="value in currentChoiceItems" :label="value" :key="value">{{value}}</el-radio>
            </el-radio-group>

            <el-checkbox-group @change="handleAnswer" v-show="currentQuestion.questionType == '2'"
                               v-model="checkedItems">
              <el-checkbox v-for="item in currentChoiceItems" :label="item" :key="item">{{item}}</el-checkbox>
            </el-checkbox-group>

            <el-checkbox-group @change="handleAnswer" v-show="currentQuestion.questionType == '3'"
                               :max="1"
                               v-model="checkedItems">
              <el-checkbox label="T">正确</el-checkbox>
              <el-checkbox label="F">错误</el-checkbox>
            </el-checkbox-group>

          </div>
        </el-card>
        <el-button type="primary" plain @click="toPrev()" :disabled="this.currentQuestionIdx == 0">上一题</el-button>
        <el-button type="primary" @click="toNext()" style="margin-left: 100px;" :disabled="this.currentQuestionIdx == this.questionList.length - 1">下一题</el-button>
        <el-button type="warning" @click="toReceipt()" style="margin-left: 100px;" >开启翻打凭条答题  </el-button>
      </el-col>
      <el-col :span="6">
        <el-table
          :data="questionList"
          border
          height="500px"
          max-height="600px"
          :row-class-name="setRowClass"
          style="width: 100%;">
          <el-table-column
            type="index"
            label="序号"
            width="60">
            <template slot-scope="scope">
              <a @click="jumpTo(scope.$index)" href="#" class="no">
                <div style="height: 100%;width: 100%;">{{scope.$index + 1}}</div>
              </a>
            </template>
          </el-table-column>
          <el-table-column
            prop="questionType"
            label="题型"
            width="70">
            <template slot-scope="scope">
              {{scope.row.questionType == 1 ? "单选题": ''}}
              {{scope.row.questionType == 2 ? "多选题": ''}}
              {{scope.row.questionType == 3 ? "判断题": ''}}
            </template>
          </el-table-column>
          <el-table-column
            prop="realAnswer"
            label="作答信息"
            width="70">
            <template slot-scope="scope">
              {{scope.row.realAnswer ? scope.row.realAnswer: ''}}
            </template>
          </el-table-column>
        </el-table>

      </el-col>
    </el-row>

  </div>

  <div id="receipt">
    <el-row :gutter="10" style="padding: 5px;">
      <el-form :inline="true">
        <el-form-item>
          <el-input class="index" :value="numberIndex + 1" disabled>
            <template slot="prepend">凭条序号</template>
          </el-input>
        </el-form-item>
        <div style="float: right">
          <el-form-item>
            <el-input class="timer" v-model="getTimeInfo" disabled style="width: 200px; color: red;">
              <template slot="prepend">已用时间</template>
            </el-input>
          </el-form-item>

          <el-button v-if="showResult" type="primary" @click="commitPractise()">提交练习</el-button>
        </div>

      </el-form>

    </el-row>

    <el-dialog title="做答结束" :visible.sync="done"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               width="50%"
               :show-close="false">
      <el-form label-position="left">
        <el-form-item label="做答时间" label-width="80px">
          <el-input v-model="getTimeInfo" disabled=""></el-input>
        </el-form-item>

        <el-form-item label="正确数量" label-width="80px">
          <el-input v-model="tCount" disabled></el-input>
        </el-form-item>


        <el-form-item label="错误数量" label-width="80px">
          <el-input v-model="fCount" disabled></el-input>
        </el-form-item>

        <el-form-item label="正确率" label-width="80px">
          <el-input v-model="rate" disabled>
            <template slot="append"> %</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="toOnceMore">再练一场</el-button>
        <el-button type="primary" @click="toDetail">查看详情</el-button>
      </div>
    </el-dialog>

    <el-row>
      <el-col :span="16">
        <el-card style="margin-bottom: 10px; font-size: 18px; margin-right: 10px;">
          <el-row style="margin-top: 50px;">
            <el-col :span="16" :offset="4">
              <el-card style="font-weight: 900; font-size: 23px;" shadow="always">
                当前数字：{{numberList[numberIndex]}}
              </el-card>
            </el-col>
          </el-row>

          <el-row style="margin-top: 100px; margin-bottom: 100px;">
            <el-col :span="16" :offset="4">
              <el-input class="number" style="float: right;" ref="number" @keyup.enter.native="handleBlur"
                        v-model="yourInput">
                <template slot="prepend">录入框</template>
              </el-input>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="8" v-if="showResult">
        <el-table
          :data="numberList"
          border
          height="500px"
          max-height="600px"
          :row-class-name="setRowClass"
          style="width: 100%;">
          <el-table-column
            type="index"
            label="序号"
            width="60">
          </el-table-column>
          <el-table-column
            prop="number"
            label="数字"
            width="80">
            <template slot-scope="scope">
              {{scope.row}}
            </template>
          </el-table-column>
          <el-table-column
            prop="yourNumber"
            label="我录入的"
            width="80">
            <template slot-scope="scope">
              {{yourInputList[scope.$index]}}
            </template>
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
        /*被选中的选项*/
        checkedItems: [],
        scene: {},

//        剩余时间，单位：秒
        timeLeft: 1000,
//        定时器上显示的信息
        timerInfo: '',

        endTime: new Date(),

        //  试题列表
        questionList: [],
        //  试题序号
        currentQuestionIdx: -1,
        //   当前试题
        currentQuestion: {},

        //   当前选项集合
        currentChoiceItems: [],

        //定时器引用
        timer: null,

        //考试剩余时间
        secondsLeft: 0,

/*以下是翻打凭条的数据*/
        number: '',
        numberIndex: 0,
        numberList: [],

        yourInput: '',
        yourInputList: [],

        timeUsed: 0,

        //定时器引用
        receiptTimer: null,

        //是否处理完
        done: false,

        //正确数量，错误数量
        tCount: 0,
        fCount: 0,

        rate: 0,
        //是否显示结果
        showResult: false,
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

          if (h < 10) {
            h = '0' + h;
          }
          if (m < 10) {
            m = '0' + m;
          }
          if (s < 10) {
            s = '0' + s;
          }
          this.timerInfo = h + ':' + m + ':' + s;

        }


      },

      setRowClass(row) {
        if (row.rowIndex == this.currentQuestionIdx) {
          return "current-row"
        }
      },

      jumpTo(idx) {
        console.log("准备跳转到第几题：", idx);
        this.handleQuestionChange(idx);
      },
      /**
       * 下一题
       */
      toNext() {
        if (this.currentQuestionIdx == this.questionList.length - 1) {
          console.log("已经是最后一题了")
          return false;
        }
        this.handleQuestionChange(this.currentQuestionIdx + 1);
      },
      /**
       * 上一题
       */
      toPrev() {
        if (this.currentQuestionIdx == 0) {
          console.log("已经是第一题了")
          return false;
        }
        this.handleQuestionChange(this.currentQuestionIdx - 1);
      },

      //翻打凭条考试
      toReceipt(){
      //  todo 1 设置常规试题div不可见，设置翻打凭条部分可见
      //  2 设置凭条定时器
      //   3 获取凭条数据信息（加载试题信息时候获取或者点击时候获取，倾向于前者）
      //   4 设置其他参数
      },
      /**
       * 提交试卷
       */
      async commitPaper() {
        console.log("提交试卷！");
        let paperId = sessionStorage.getItem("paperId");
        let res = await this.postEntity("/exam/api/commitPaper?paperId=" + paperId, this.questionList);
        if (res) {
          this.closeTimer();
          this.$notify.success({
            title: "成功",
            message: '交卷成功',
            duration: 10,
          });
          //五秒后跳转到摘要页面
          setTimeout(() => {
            this.$router.push({path: '/help'})
          }, 5000)

        } else {
          this.$notify.error({
            title: "失败",
            message: '试卷提交失败，请联系管理员',
            duration: 0,
          });
        }

        this.endTime = new Date(new Date().getTime() + this.timeLeft);
      },

      /*处理答案*/
      handleAnswer(checked) {
        if (this.checkedItems instanceof Array) {
          this.checkedItems = this.checkedItems.sort(function (x, y) {
            if (x < y) {
              return -1;
            } else if (x > y) {
              return 1;
            } else {
              return 0;
            }
          });
          this.currentQuestion.realAnswer = this.checkedItems.join("");
        } else {
          this.currentQuestion.realAnswer = this.checkedItems;
        }
      },

      /* 处理试题变化 */
      handleQuestionChange(targetQuestionIdx) {
        console.log("处理试题")
        console.log("idx;", this.currentQuestionIdx);
        console.log("checkedItems:", this.checkedItems);

        //如果正在答题，把答案和剩余时间保存一下
        if (this.currentQuestionIdx > -1) {
          this.currentQuestion.leftTimeInfo = this.timerInfo;
          if (this.checkedItems instanceof Array) {
            this.currentQuestion.realAnswer = this.checkedItems.join("");
          } else {
            this.currentQuestion.realAnswer = this.checkedItems;
          }
          this.checkedItems = [];
          console.log("realAnswer:", this.currentQuestion.realAnswer);
          //有答案，直接提交
          if (this.currentQuestion.realAnswer.length > 0) {
            //有答案，直接发送信息
            let msg = {};
            msg.type = 1;
            msg.content = this.currentQuestion;
            this.ws.send(JSON.stringify(msg))
          }
        }


        //调到指定题目
        this.currentQuestionIdx = targetQuestionIdx;
        this.currentQuestion = this.questionList[targetQuestionIdx];

        let content = this.currentQuestion.content;
        if (content) {
          let items = JSON.parse(content);
          let chars = 'ABCDEFG'
          let choiceItems = [];
          for (var idx = 0; idx < items.length; idx++) {
            console.log("idx:", idx);
            choiceItems.push(chars.charAt(idx));
          }
          this.currentQuestion.items = items;
          this.currentChoiceItems = choiceItems;
        }

        // 跳转后，设置以前的答案
        let realAnswer = this.currentQuestion.realAnswer;
        console.log("realAnswer", realAnswer);
        if (!realAnswer) {

        }
        if (realAnswer) {
          let type = this.currentQuestion.questionType;
          if (type == 1) {
            this.checkedItems = realAnswer;
          } else {
            this.checkedItems = realAnswer.split("");
          }
        }
      },

      closeTimer() {
        if (this.timer) {
          clearInterval(this.timer);
        }
      }


      /*以下为翻打凭条的数据*/
      setRowClass(row) {
        let num = row.row;
        let index = row.rowIndex;
        if (num == this.yourInputList[index]) {
          return "right-input";
        } else {
          return "wrong-input"
        }
      },


      /**
       * 处理最后结果
       */
      processResult() {
        for (let i = 0; i < this.numberList.length; i++) {
          let num = this.numberList[i];
          let yourNum = this.yourInputList[i];
          if (num == yourNum) {
            this.tCount++;
          } else {
            this.fCount++;
          }
          let rate = this.tCount / (this.tCount + this.fCount) * 100;
          this.rate = rate.toFixed(1);
          this.showResult = true;
        }
      },
      handleBlur() {
        let num = this.yourInput;
        if (!num) {
          return false;
        }
        this.yourInputList.push(num);
        //录完了
        if (this.numberIndex == this.numberList.length - 1) {
          //结束定时器
          this.closeTimer();
          this.processResult();
          this.done = true;
          return;
        }
        this.yourInput = '';
        this.numberIndex++;
      },

      /**
       * 提交练习信息
       */
      async commitPractise() {
        this.doPost("/receiptRecord/api/save", {
          size: this.numberList.length,
          seconds: this.timeUsed,
          rightCount: this.tCount,
          falseCount: this.fCount,
          rate: this.rate
        }).then(res => {
          console.log("提交练习", res);
        })
      },

      toDetail() {
        this.done = false;
      },
      toOnceMore() {
        this.$router.push("/practise")
      },

      closeReceiptTimer() {
        if (this.receiptTimer) {
          clearInterval(this.receiptTimer);
          this.receiptTimer = null;
        }
      }
    },


    computed: {
      // 单打凭条使用时间信息
      getTimeInfo() {
        let timeUsed = this.timeUsed;
        let s = timeUsed % 60;
        let m = Math.floor(timeUsed / 60);
        let h = Math.floor(timeUsed / 3600);
        if (h < 10) {
          h = '0' + h;
        }
        if (m < 10) {
          m = '0' + m;
        }
        if (s < 10) {
          s = '0' + s;
        }
        return h + ':' + m + ':' + s;
      }
    },

    //加载之后执行
    mounted: function () {
      // sessionStorage.setItem("userId", 1);

      /**
       * 以下是websocket处理，用来处理强制交卷信息
       * */
      let userId = sessionStorage.getItem("userId");
      let ws = new WebSocket(this.wsUrl + "/ws/hn.ws?userId=" + userId + "&sceneId=" + this.sceneId);
      this.ws = ws;
      console.log("初始化");
      ws.onopen = function () {
        console.log("open。。。")
      }

      ws.onmessage = event => {
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
          if (type == "3") {
            console.log("教师强制提交试卷");
            this.commitPaper();
          }
        }
      }

      ws.onclose = function (event) {
        console.log("event:", event);
        console.log("close...")
      }
    },

    beforeDestroy: function () {
      console.log("准备关闭websocket...")
      let info = {};
      info.type = "5";

      this.ws.send(JSON.stringify(info));
      this.ws.onclose();
      console.log("ws关闭了")
    },
    created: async function () {
      console.log("created");

//      场次id，如果找不到，取消
      let sceneId = this.$route.query.id;
      if (sceneId) {
        this.sceneId = sceneId;
      } else {
        this.$router.replace("/exam")
        return false;
      }
      let res = await this.doPost("/exam/api/getQuestionList?sceneId=" + this.sceneId);
      if (!res.result) {
        this.$notify({
          title: '提示',
          message: res.message,
        })
        this.$router.push("/exam")
        return false;
      }
      let questionList = res.data;
      if (questionList && questionList.length > 0) {
        this.postParam("/exam/api/getTimeLeft?sceneId=" + this.sceneId).then(res => {
          console.log("获取剩余时间", res);
          let leftSeconds = res;
          this.endTime = new Date(new Date().getTime() + res * 1000);

          console.log("endTime::", this.endTime)
          //      定时器
          let _this = this;
          this.timer = setInterval(() => {
            if (_this.endTime.getTime() > new Date().getTime()) {
              _this.changeTime();
            } else {
//          清除定时器
              this.timerInfo = "00:00:00"
              this.closeTimer();
//          提交试卷
              _this.$alert('考试时间用完，提交试卷', '时间到！', {
                confirmButtonText: '确定',
                callback: action => {

                  this.$router.push("/scene/myJoin");
                }
              });
            }
          }, 1000);
        })
        console.log("questionList:", questionList)
        // 获取列表，设置初始化的数据
        this.questionList = questionList;
        // this.currentQuestionIdx = 0;
        // this.currentQuestion = questionList[0];
        this.handleQuestionChange(0);
      } else {
        this.$notify.error({
          title: '错误',
          message: '获取试题信息失败',
          duration: 0
        })
        return false;
      }

      // let scene = await this.postEntity("/scene/api/findById?id=" + sceneId);
      // if (scene) {
      //   this.scene = scene;
      //   let time = new Date();
      //   this.endTime = new Date(time.getTime() + scene.duration * 60000);
      // } else {
      //   this.$notify.error(({
      //     title: '错误',
      //     message: '没有找到该场次'
      //   }))
      //   return false;
      // }

    }
  }
</script>


<style>
  .content {
    margin-top: 15px;
    min-height: 300px;
    max-height: 600px;
  }

  .content-item {
    margin-bottom: 5px;
  }

  .current-row {
    background-color: dodgerblue;
    color: red;
  }

  .no {
    text-decoration: none;
    /*padding: 10px;*/
  }

  .title, .answer {
    font-weight: 600;
    background-color: aliceblue;
    padding: 10px;
  }


</style>
