<template>
  <el-form size="medium" ref="sceneForm" :model="scene" :rules="rules" label-width="80px">
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
        <el-option label="15分钟" :value="15"></el-option>
        <el-option label="30分钟" :value="30"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="百分制" prop="percentable">
      <el-switch v-model="scene.percentable" :active-value="1" :inactive-value="2"></el-switch>
    </el-form-item>

    <el-row>
      <el-col :span="12">
        <el-form-item label="试卷类型" prop="paperGenerateType">
          <el-select v-model="scene.paperGenerateType" placeholder="">
            <el-option label="随机" :value=1></el-option>
            <el-option label="统一" :value=2></el-option>
            <el-option label="乱序统一" :value=3></el-option>
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


    <el-form-item label="使用题库" prop="questionBankId">
      <el-select v-model="scene.questionBankId" placeholder="请选择本场使用的题库" @change="findAllAvailablePolicy">
        <el-option v-for="item in questionBankList" :label="item.name" :key="item.id" :value="item.id"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="出卷模式" prop="paperModel">
      <el-select v-model="scene.paperModel" placeholder="试卷策略模式" @change="handlePaperModelChange">
        <el-option label="简单模式" :value="1"></el-option>
        <el-option label="策略模式" :value="2"></el-option>
      </el-select>
      <span v-if="paperPolicy.id">已选策略：<el-tag>{{paperPolicy.name}}</el-tag></span>
    </el-form-item>

    <el-row v-if="scene.paperModel == 1">
      <el-table :data="simpleModel" size="small"
                style="width: 100%">
        <el-table-column prop="type" label="题型" width="180px"></el-table-column>
        <el-table-column prop="count" label="数量">
          <template slot-scope="scope">
            <el-input type="number" size="small" :min="1" v-model="scope.row.count"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="分值">
          <template slot-scope="scope">
            <el-input-number size="small" v-model="scope.row.score" :precision="1" :step="0.5"
                             :max="5"></el-input-number>
          </template>
        </el-table-column>

      </el-table>
    </el-row>

    <el-row v-if="scene.paperModel == 2">
      <el-table :data="paperPolicyList" size="small" :highlight-current-row="true"
                style="width: 100%" @row-click="handleRowClick">
        <!--        <el-table-column type="selection"></el-table-column>-->
        <el-table-column prop="name" label="名称" width="180px"></el-table-column>
        <el-table-column prop="single" label="单选" width="180px">
          <template slot-scope="scope">
            {{scope.row.singleCount}}题 {{scope.row.singleScore}}分
          </template>
        </el-table-column>

        <el-table-column prop="multi" label="多选" width="180px">
          <template slot-scope="scope">
            {{scope.row.multiCount}}题 {{scope.row.multiScore}}分
          </template>
        </el-table-column>

        <el-table-column prop="judge" label="判断题" width="180px">
          <template slot-scope="scope">
            {{scope.row.judgeCount}}题 {{scope.row.judgeScore}}分
          </template>
        </el-table-column>

        <el-table-column prop="judge" label="翻打凭条" width="180px">
          <template slot-scope="scope">
            {{scope.row.receiptCount > 0 ? scope.row.receiptCount : 0}}张
            {{scope.row.numberLength > 0 ? scope.row.numberLength: 0}}位
          </template>
        </el-table-column>

      </el-table>
    </el-row>


    <!--    <el-form-item v-if="scene.paperModel == 2" label="试卷策略" prop="paperPolicyId">-->
    <!--      <el-select v-model="scene.paperPolicyId" placeholder="试卷策略模式">-->
    <!--        <el-option v-for="item in paperPolicyList"-->
    <!--                   :key="item.id"-->
    <!--                   :label="item.name"-->
    <!--                   :value="item.id">-->
    <!--        </el-option>-->
    <!--      </el-select>-->
    <!--    </el-form-item>-->


    <el-form-item label="翻打凭条" prop="receiptFlag">
      <el-switch v-model="receiptFlag"></el-switch>
    </el-form-item>

    <el-row v-if="receiptFlag">
      <el-col :span="8">
        <el-form-item label="数量" prop="receiptCount">
          <el-select v-model="scene.receiptCount" placeholder="">
            <el-option label="100" :value=100></el-option>
            <el-option label="50" :value=50></el-option>
            <el-option label="10" :value=10></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="数字长度" prop="numberLength">
          <el-input v-model="scene.numberLength" type="number" :max="10" :min="5"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="凭条总分" prop="numberLength">
          <el-input-number v-model="scene.receiptScore" :precision="0" :step="5" :max="100"
                           :min="5"></el-input-number>
        </el-form-item>
      </el-col>
    </el-row>


    <el-row style="margin-top: 30px; border: 1px solid #b3d8ff; border-radius: 3px;">
      <el-form-item label="识别码" prop="authCode">
        <el-input v-model="scene.authCode" placeHolder="场次识别码"></el-input>
      </el-form-item>

      <el-form-item label="参考人员" prop="joinInfo">
        <div>
          <el-form-item label="机构" prop="">
            <el-select multiple v-model="scene.branchIds" placeholder="选择参考机构">
              <el-option v-for="item in branchList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <el-checkbox-group v-model="scene.containSub">
              <el-checkbox label="包含下属分行" name="type" :true-label="1" :false-label="2"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>

        <div>
          <el-form-item label="部门" prop="">
            <el-select multiple v-model="scene.departmentIds" placeholder="">
              <el-option v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="岗位" prop="">
            <el-select multiple v-model="scene.stationIds" placeholder="">
              <el-option v-for="item in stationList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form-item>
    </el-row>


    <el-form-item style="margin-top: 30px">
      <!--<el-button type="warning" plain="">取消</el-button>-->
      <el-button type="primary" @click="openScene()">确定，开场</el-button>
    </el-form-item>
  </el-form>

</template>

<script>

  export default {

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
      let checkPaperPolicy = (rule, value, callback) => {
        console.log("校验paperPolicy", value);
        if (this.scene.paperModel == 1) {
          //  简单方式
          let list = this.simpleModel;
          let totalCount = 0;
          for (let idx in list) {
            let item = list[idx];
            let count = item.count;
            let score = item.score;
            if (count) {
              totalCount = totalCount + count;
            }
          }
          console.log("totalCount:", totalCount)
          if (totalCount < 1) {
            callback(new Error("请指定试题数量和分值"))
          }
        } else {
          //  策略方式
          if (!this.scene.paperPolicyId || this.scene.paperPolicyId < 0) {
            callback(new Error("请选择试卷策略"))
          }
        }
        callback();
      };
      var checkAuthCode = (rule, value, callback) => {
        // if (!value || value == '' || value == undefined) {
        //   callback(new Error("请输入6-10位场次识别码"));
        // } else {
        //
        // }
        let reg = /^[0-9a-zA-Z]{6,10}$/;
        if (!reg.test(value)) {
          value = '';
          callback(new Error("非法识别码，请输入6-10位字母或数字"));
        } else {
          callback();
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

      var checkJoinInfo = (rule, value, callback) => {
        console.log("开始校验参考人员信息")
        let branchIds = this.scene.branchIds;
        let stationIds = this.scene.stationIds;
        let departmentIds = this.scene.departmentIds;
        let authCode = this.scene.authCode;
        if (!this.branchList && !this.departmentList && !this.stationList) {
          console.log("不是管理员")
          callback(new Error("您还不是管理员，请联系系统负责人申请！"))
        } else if ((!branchIds || branchIds.length == 0)
          && (!stationIds || stationIds.length == 0)
          && (!departmentIds || departmentIds.length == 0)
          && !authCode) {
          console.log("没有选择参考范围")
          callback(new Error("请设置参考人员范围或者识别码"))
        } else {
          callback();
        }
      }
      return {
        time: '',
        departmentList: [],
        stationList: [],
        branchList: [],

        //是否有翻打凭条试题
        receiptFlag: false,

        /*题库id*/
        questionBankList: [],

        pickerOptions: {
          /*
          * 禁用时间
          * */
          disabledDate(time) {
            return time.getTime() + 24 * 60 * 60 * 1000 <= Date.now();
          },

        },
        scene: {
          paperModel: 1,
          percentable: 1,
          delayMinute: 15,
        },
        /* 试卷策略 */
        paperPolicyList: [],
        //已选的策略
        paperPolicy: {},
        //简单策略的信息
        simpleModel: [
          {type: '单选题', score: 1},
          {type: '多选题', score: 1},
          {type: '判断题', score: 1},
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
          joinInfo: [
            {validator: checkJoinInfo, trigger: 'change'}
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
            {required: true, message: '请选择试卷生成方式', trigger: 'change'},
          ],
          paperModel: [
            {validator: checkPaperPolicy, trigger: 'blur'}
          ],
          authCode: [
            {validator: checkAuthCode, trigger: 'blur'},
          ],
          questionBankId: [
            {required: true, message: '请选择本场考试使用的题库', trigger: 'change'}
          ]

        }
      }
    },

    created:  async function () {
      console.log("created...");
      let sceneId = this.$route.query.id;
      console.log("sceneId:", sceneId);
      if (sceneId) {
        this.doPost("/scene/api/findById?id=" + sceneId).then(res =>{
          console.log("场次信息:", res);
          res.paperModel = res.paperPolicyId < 1 ? 1 : 2
          // data.branchIds = [];
          // data.stationIds = [];
          // data.departmentIds = [];
          this.scene = res;
          let single = {type: '单选题', count: res.singleCount, score: res.singleScore};
          let multi = {type: '多选题', count: res.multiCount, score: res.multiScore};
          let judge = {type: '判断题', count: res.judgeCount, score: res.judgeScore};
          let arr = [single, multi, judge];
          this.simpleModel = arr;
          if (res.receiptCount > 0) {
            this.receiptFlag = true;
          }
        });
      }


      //  获取题库列表
      let bankList = this.doPost("/questionBank/api/findAll").then(res =>{
        console.log("bankList:", bankList);
        this.questionBankList = res;
      });


      await this.doPost("/department/api/getUnderManager").then(res => {
        if (res) {
          this.departmentList = res;
        }
      });

      await this.doPost("/branch/api/getUnderManager").then(res => {
        if (res) {
          this.branchList = res;
        }
      });

      await this.doPost("/station/api/getUnderManager").then(res => {
        if (res) {
          this.stationList = res;
        }
      });

      // await this.doPost("/paperPolicy/api/findAll").then(res => {
      //   if (res) {
      //     this.paperPolicyList = res;
      //   }
      // })
    },

    methods: {
      handlePaperModelChange(data) {
        if (data == 1) {
          this.paperPolicy = {}
          this.scene.paperPolicyId = '';
        } else {
          let bankId = this.scene.questionBankId;
          if (!bankId) {
            this.$message.warning("请选择题库以获取试题策略信息");
            return;
          } else {
            this.findAllAvailablePolicy(bankId);
          }
        }
      },

      /**
       * 查找全部可用的策略，根据指定的题库id
       */
      findAllAvailablePolicy: function (bankId) {
        let paperModel = this.scene.paperModel;
        if (paperModel == 2) {
          this.doPost("/paperPolicy/api/findAvailable", {"bankId": bankId}, "form").then(res => {
            if (!res || res.length == 0) {
              this.$message.warning("本题库没有满足的试卷策略")
            }
            this.paperPolicyList = res;
          });

        }

      },
      //试题策略
      handleRowClick(row, column, event) {
        console.log("table-click", row)
        this.paperPolicy = row;
        this.scene.paperPolicyId = row.id;
        if (row.receiptCount > 0) {
          this.receiptFlag = true;
          this.scene.receiptCount = row.receiptCount;
          this.scene.numberLength = row.numberLength;
          this.scene.receiptScore = row.receiptScore;
        } else {
          this.receiptFlag = false;
          this.scene.receiptCount = '';
          this.scene.numberLength = '';
          this.scene.receiptScore = '';
        }
      },
      //开场
      openScene: async function () {
        console.log("scene:", this.scene);
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

            let res = await this.doPost("/scene/api/save", this.scene);

            if (res) {
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
              // this.$alert(res.message ? res.message : "开场失败!", "警告", {
              //   confirmButtonText: '确定',
              //   type: 'warning'
              // })
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
