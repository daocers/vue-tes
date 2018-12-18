<template>
  <div id="exam">
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
               :show-close="false">
      <el-form>
        <el-form-item label="做答时间" label-width="80">
          <el-input v-model="getTimeInfo" disabled=""></el-input>
        </el-form-item>

        <el-form-item label="正确数量" lable-width="80">
          <el-input v-model="tCount" disabled></el-input>
        </el-form-item>
        <el-form-item label="错误数量" label-width="80">
          <el-input v-model="fCount" disabled></el-input>
        </el-form-item>

        <el-form-item label="正确率" label-width="80">
          <el-input v-model="rate" disabled></el-input>
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
    data() {
      return {
        number: '',
        numberIndex: 0,
        numberList: [],

        yourInput: '',
        yourInputList: [],

        timeUsed: 0,

        //定时器引用
        timer: null,

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
          let rate = this.tCount / (this.tCount + this.fCount);
          this.rate = rate.toFixed(2);
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
       * 提交试卷
       */
      async commitPractise() {

      },

      toDetail() {
        this.done = false;
      },
      toOnceMore() {
        this.$router.push("/practise")
      },

      closeTimer() {
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
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
    beforeDestroy: function () {
      if (this.timer) {
        this.closeTimer();
      }
    },
    created: async function () {
      console.log("created");
      let count = this.$route.query.count;
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

  .number input.el-input__inner {
    text-align: right;
    font-size: 23px;
    font-weight: 900;
  }

  .index input.el-input__inner {
    color: #3a8ee6 !important;
  }

  .timer input.el-input__inner {
    color: red !important;
  }

  .right-input {
    background-color: whitesmoke;
    color: green;
  }

  .wrong-input {
    background-color: #ff000033;
    color: #bb0000;
  }


</style>
