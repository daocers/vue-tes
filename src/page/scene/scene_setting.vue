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
            format="yyyy-MM-dd HH:mm:00"
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
            type="datetime"
            :disabled=true
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>

      </el-col>
    </el-row>

    <el-form-item label="作答时间" prop="duration" placeholder="作答时间">
      <el-input type="number" :min="1" v-model="scene.duration"></el-input>
    </el-form-item>

    <el-form-item label="顺延时间" prop="delay">
      <el-select v-model="scene.delay" placeholder="迟到多久不准进场">
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
            <el-option label="随机" value="1"></el-option>
            <el-option label="统一" value="2"></el-option>
            <el-option label="乱序统一" value="3"></el-option>
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
  </el-form>

</template>

<script>
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";

  export default {

    components: {
      ElCol,
      ElRow
    },
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
      var checkAuthcode = (rule, value, callback) => {
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
      return {

        pickerOptions: {
          /*
          * 禁用时间
          * */
          disabledDate(time) {
            return time.getTime() + 24 * 60 * 60 * 1000 <= Date.now();
          }
        },
        scene: {},
        rules: {
          name: [
            {required: true, message: '请输入场次名称', trigger: 'blur'},
            {min: 2, max: 16, message: '场次名称在2到16个字之间', trigger: 'blur'}
          ],
          openTime: [
            {type: 'date', required: true, message: '请设置开场时间', trigger: 'change'}
          ],
          duration: [
            {validator: checkDuration, required: true, trigger: 'change'}
          ],
          delay: [
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
            {validator: checkAuthcode, trigger: 'blur'},
          ]

        }
      }
    },
    created: function () {
      console.log("created...")
      this.scene = this.$parent.$data.scene;
      console.log("settings scene: ", JSON.stringify(this.scene))
    },
    computed: {
      /**
       * 计算结束时间
       * */
      getEndTime: function () {
        console.log(this.scene.openTime)

        let openTime;
        if (this.scene.openTime) {
          openTime = this.scene.openTime.getTime();
        }
        let duration = this.scene.duration;
        if (openTime && duration) {
          openTime = openTime + duration * 60 * 1000;
          return new Date(openTime)
        }
      },


    }
  }
</script>

<style>

</style>
