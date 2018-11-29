<template>
  <el-form ref="sceneForm" :model="scene" :rules="rules" label-width="80px">
    <el-form-item label="场次名称" prop="name" placeholder="3到16位">
      <el-input v-model="scene.name"></el-input>
    </el-form-item>

    <el-row>
      <el-col :span="12">
        <el-form-item label="开始时间" prop="openTime">
          <el-date-picker
            v-model="scene.openTime"
            format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm"
            type="datetime"
            :picker-options="pickerOptions"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="结束时间">
          <el-date-picker
            v-model="getEndTime"
            format="yyyy-MM-dd HH:mm"
            type="datetime"
            :disabled=true
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>

      </el-col>
    </el-row>

    <el-form-item label="作答时间" prop="duration" placeholder="作答时间">
      <el-input type="number" :min="1" v-model="scene.duration" :max="900"></el-input>
    </el-form-item>

    <el-form-item label="顺延时间" prop="delay">
      <el-select v-model="scene.delayMinute" placeholder="迟到多久不准进场">
        <el-option label="15分钟" value="15"></el-option>
        <el-option label="30分钟" value="30"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="百分制" prop="percentable">
      <el-switch v-model="scene.percentable" :active-value="1" :inactive-value="2"></el-switch>
    </el-form-item>

    <el-row>
      <el-col :span="12">
        <el-form-item label="试卷类型" prop="paperGenerateType">
          <el-select v-model="scene.paperGenerateType" placeholder="">
            <el-option label="随机" value=1></el-option>
            <el-option label="统一" value=2></el-option>
            <el-option label="乱序统一" value=3></el-option>
          </el-select>
          <span
            style="display: block; color: cornflowerblue;">随机选择，每张试卷都不一样;<br/> 统一试卷，每张试卷一样; <br/>乱序统一，试题相同，顺序不同</span>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="允许换卷" prop="changePaper">
          <el-switch v-model="scene.changePaper" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-col>
    </el-row>


    <el-form-item label="识别码" prop="authCode">
      <el-input v-model="scene.authCode" placeHolder="场次识别码"></el-input>
    </el-form-item>

    <el-form-item label="使用题库" prop="questionBankId">
      <el-select v-model="scene.questionBankId" placeholder="请选择本场使用的题库">
        <el-option v-for="item in questionBankList" :label="item.name" :key="item.id" :value="item.id"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="出卷模式" prop="paperModel">
      <el-select v-model="scene.paperModel" placeholder="试卷策略模式">
        <el-option label="简单模式" value="1"></el-option>
        <el-option label="策略模式" value="2"></el-option>
      </el-select>
    </el-form-item>

    <el-row v-if="scene.paperModel == 1">
      <el-table :data="simpleModel" size="small"
                style="width: 100%">
        <el-table-column prop="type" label="题型" width="180px"></el-table-column>
        <el-table-column prop="count" label="数量">
          <template slot-scope="scope">
            <el-input type="number" size="small" v-model="scope.row.count"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="分值">
          <template slot-scope="scope">
            <el-input type="text" size="small" v-model="scope.row.score"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <el-form-item v-if="scene.paperModel == 2" label="试卷策略" prop="paperPolicyId">
      <el-select v-model="scene.paperPolicyId" placeholder="试卷策略模式">
        <el-option v-for="item in paperPolicyList"
                   :key="item.id"
                   :label="item.name"
                   :value="item.id"
        >

        </el-option>
      </el-select>
    </el-form-item>


    <el-form-item style="margin-top: 30px">
      <!--<el-button type="warning" plain="">取消</el-button>-->
      <el-button type="primary" @click="openScene()">确定，开场</el-button>
    </el-form-item>
  </el-form>

</template>

<script>

  export default {

    components: {},
    data() {
      var checkDuration = (rule, value, callback) => {
        console.log("duration: ", value)
        if (!value || value == undefined) {
          callback(new Error("请输入考试时长"));
        } else if (value < 1) {
          callback(new Error("考试时间必须大于0"));
        } else if (value > 999) {
          callback(new Error("考试时间不能超过1000分钟"));
        } else {
          callback();
        }
      };
      var checkAuthCode = (rule, value, callback) => {
        if (!value || value == '' || value == undefined) {
          callback(new Error("请输入10位场次识别码"));
        } else {
          let reg = /^[0-9a-zA-Z]{10}$/;
          if (!reg.test(value)) {
            value = '';
            callback(new Error("非法字符，请输入十位字母或数字"));
          } else {
            callback();
          }
        }
      };

      var checkOpenTime = (rule, value, callback) => {
        console.log("openTime:::", value);
        if (!value) {
          callback(new Error("请设置开场时间"));
        } else {
          let now = new Date();
          value = value.replace(":", '-');
          value = value.replace(" ", '-');
          let arr = value.split("-");
          let openTime = new Date(arr[0], arr[1], arr[2], arr[3], arr[4], 0);
          console.log("open,", openTime)
          if (openTime.getTime() < now.getTime()) {
            callback(new Error("开场时间要大于当前时间"));
          } else {
            callback();
          }
        }
      };
      return {
        /*题库id*/
        questionBankList: [],

        pickerOptions: {
          /*
          * 禁用时间
          * */
          disabledDate(time) {
            return time.getTime() + 24 * 60 * 60 * 1000 <= Date.now();
          }
        },
        scene: {
          paperModel: "1",
        },
        /* 试卷策略 */
        paperPolicyList: [],
        //简单策略的信息
        simpleModel: [
          {type: '单选题'},
          {type: '多选题'},
          {type: '判断题'},
        ],
        rules: {
          name: [
            {required: true, message: '请输入场次名称', trigger: 'blur'},
            {min: 2, max: 16, message: '场次名称在2到16个字之间', trigger: 'blur'}
          ],
          openTime: [
//            {type: 'date', required: true, message: '请设置开场时间', trigger: 'change'},
            {validator: checkOpenTime, trigger: 'blur'}
          ],
          duration: [
            {validator: checkDuration, required: true, trigger: 'change'}
          ],
          delayMinute: [
            {required: true, message: '请选择顺延时间', trigger: 'change'}
          ],
          changePaper: [
            {type: 'number', required: true, message: "请设置是否允许换卷", trigger: 'change'}
          ],
          percentable: [
            {type: 'number', required: true, message: '请设置是否百分制', trigger: 'change'}
          ],
          paperGenerateType: [
            {required: true, message: '请选择试卷生成方式', trigger: 'change'}
          ],
          authCode: [
            {required: true, message: '请输入场次识别码', trigger: 'blur'},
            {validator: checkAuthCode, trigger: 'blur'},
          ],
          questionBankId: [
            {required: true, message: '请选择本场考试使用的题库', trigger: 'change'}
          ]

        }
      }
    },
    //获取全部试卷策略
    getAllPaperPolicy: async function () {
      let data = await  this.http("/paperPolicy/api/findAll")
      this.paperPolicyList = data;
    },
    created: async function () {
      console.log("created...");
      let sceneId = this.$route.query.id;
      console.log("sceneId:", sceneId);
      if (sceneId) {
        let data = await this.http("/scene/api/findById?id=" + sceneId);
        if (data) {
          console.log("data:", data);
          data.paperModel = data.paperPolicyId < 1 ? 1 : 2
          this.scene = data;
          let single = {type: '单选题', count: data.singleCount, score: data.singleScore};
          let multi = {type: '多选题', count: data.multiCount, score: data.multiScore};
          let judge = {type: '判断题', count: data.judgeCount, score: data.judgeScore};
          let arr = [single, multi, judge];
          this.simpleModel = arr;
        } else {
          console.log("查询无数据")
        }
      }


      //  获取题库列表
      let bankList = await this.http("/questionBank/api/findAll");
      console.log("bankList:", bankList);
      if (bankList) {
        this.questionBankList = bankList;
      }
      console.log("bankList: ", this.questionBankList);
    },

    methods: {
      //开场
      openScene: async function () {
        let _this = this;
        this.$refs['sceneForm'].validate(async (valid) => {
          if (!valid) {
            console.log("参数校验不通过，请处理");
            return false;
          } else {
            console.log("simpleModel: ", this.simpleModel)
            let single = this.simpleModel[0];
            this.scene.singleCount = single.count;
            this.scene.singleScore = single.score;
            let multi = this.simpleModel[1];
            this.scene.multiCount = multi.count;
            this.scene.multiScore = multi.score;
            let judge = this.simpleModel[2];
            this.scene.judgeCount = judge.count;
            this.scene.judgeScore = judge.score;
            console.log("开场数据，data:", this.scene)

            let data = await this.postEntity("/scene/api/save", this.scene);
            if (data && data > 0) {
              let msg = '';
              if (this.scene.id) {
                msg = "修改成功！";
              } else {
                msg = "开场成功!";
              }
              this.$alert(msg, '提示', {
                confirmButtonText: "确定",
                callback: action => {
                  this.$router.push({path: '/scene/myOpen'})
                }
              })
            } else {
              this.$alert("开场失败!", "警告", {
                confirmButtonText: '确定',
              })
            }
          }
        });
      },
    },


    computed: {
      /**
       * 计算结束时间
       * */
      getEndTime: function () {
        console.log("openTime:", this.scene.openTime)

        let openTime;
        if (this.scene.openTime) {
          let timeStr = this.scene.openTime;
          timeStr = timeStr.replace(":", '-');
          console.log(timeStr);
          timeStr = timeStr.replace(" ", '-');
          let arr = timeStr.split("-");
          console.log("arr", arr);
          arr.push("00");
          console.log(timeStr.substr(0, 4), timeStr.substr(5, 7), timeStr.substr(8, 10), timeStr.substr(11, 13), timeStr.substr(14, 15))
          let tempTime = new Date(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]);
          console.log(tempTime)
          openTime = tempTime.getTime();
          console.log("tempTime: ", tempTime);
        }
        let duration = this.scene.duration;
        let delay = this.scene.delay;
        if (!delay) {
          delay = 0;
        } else {
          delay = parseInt(delay);
        }
        console.log("delay:::", delay);
        if (openTime && duration) {
          openTime = openTime + duration * 60 * 1000 + delay * 60 * 1000;
          return new Date(openTime)
        }
      },


    }
  }
</script>

<style>

</style>
