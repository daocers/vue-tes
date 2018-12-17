<template>
  <div id="exam">
    <el-row :gutter="10">
      <el-form :inline="true">
        <el-form-item>
          <el-input :value="numberIndex + 1" disabled>
            <template slot="prepend">凭条序号</template>
          </el-input>
        </el-form-item>
        <div style="float: right">
          <el-form-item>
            <el-input v-model="getTimeInfo" disabled style="width: 230px; color: red;">
              <template slot="prepend">已用时间</template>
            </el-input>
          </el-form-item>

          <el-button type="primary" @click="commitPractise()">提交练习</el-button>
        </div>

      </el-form>

    </el-row>

    <el-row>
      <el-col :span="18">
        <el-card style="margin-bottom: 10px; font-size: 18px; margin-right: 10px;">
          <el-row>
            <el-col :span="16">
              <el-card shadow="always">
                当前数字：{{numberList[numberIndex]}}
              </el-card>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-input ref="number" @keyup.enter.native="handleBlur" v-model="yourInput"></el-input>
            </el-col>
          </el-row>


        </el-card>

        <el-button type="primary" plain @click="toPrev()">上一题</el-button>
        <el-button type="primary" @click="toNext()" style="margin-left: 100px;">下一题</el-button>
      </el-col>
      <el-col :span="6">
        <el-table
          :data="[]"
          border
          height="500px"
          max-height="600px"
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
</template>


<script>
  export default {
    data() {
      return {
        number: '',
        numberIndex: 0,
        numberList: [],

        yourInput: '',
        yourInputList: [],

        timeUsed: 0,
//        定时器上显示的信息
        timerInfo: '',

        //定时器引用
        timer: null,
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

      handleBlur() {
        let num = this.yourInput;
        if(!num){
          return false;
        }

        this.yourInputList.push(num);
        //录完了
        if(this.numberIndex == this.numberList.length - 1){
          //结束定时器
          this.clearInterval(this.timer);
          return;
        }
        this.yourInput = '';
        this.numberIndex++;
      },

      /**
       * 提交试卷
       */
      async commitPractise() {

      },

      closeTimer() {
        if (this.timer) {
          clearInterval(this.timer);
        }
      }
    },

    computed: {
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
      //定时器
      this.timer = setInterval(() => {
        this.timeUsed++;
      }, 1000)
      this.$refs.number.focus();
    },
    created: async function () {
      console.log("created");
      let count = this.$route.query.count;
      console.log("count:", count);
      let nums = [];
      for (let i = 0; i < count; i++) {
        let len = Math.abs(Math.random() * 100000);
        let randomNum = Math.random() * len;
        let res = randomNum.toFixed(2);
        nums.push(res);
      }
      this.numberList = nums;
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
