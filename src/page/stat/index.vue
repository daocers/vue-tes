<template>
  <div class="stat">
    <el-row :gutter="20">
      <el-col :span="12">
        考试人数（日，周，月） 15个统计单位
        <ve-line :data="joinUserData" :settings="chartSettings" :extend="extend"></ve-line>
      </el-col>
      <el-col :span="12">
        最近场次作答情况（总答题次数，错误量，正确率，三条线）
<!--        <ve-line :data="sceneQuestionData" :settings="chartSettings" :extend="extend"></ve-line>-->
        <ve-histogram :data="sceneQuestionData" :settings="chartSettings" :extend="extend"></ve-histogram>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        成绩统计
        <ve-line :data="scoreData" :settings="chartSettings" :extend="extend"></ve-line>
      </el-col>
    </el-row>

    <el-row>
      题目错误排行（错题数量条形图，答案分布柱状图）(全部，近一个月，近一周)
      <ve-bar :data="questionData" :settings="chartSettings" :extend="extend"></ve-bar>

    </el-row>

    <el-row>
      <el-col :span="12">
        题库分布
        <ve-pie :data="bankData"></ve-pie>

      </el-col>



    </el-row>

    <el-row>

      <el-col :span="12">
        业务类型分布

        <ve-ring :data="busiData"></ve-ring>
      </el-col>

      <el-col :span="12">
        难度分布

        <ve-ring :data="diffData"></ve-ring>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import {VCharts, VeLine, VeHistogram, VeBar, VePie, VeRing} from 'v-charts'

  export default {
    name: 'stat',
    data() {
      this.extend = {
        'xAxis.0.axisLabel.rotate': 45
      }
      this.chartSettings = {
        labelMap: {
          "joinCount": '考试人数',
          "loginCount": '登录人数',
          "data": '日期',
          "sceneCode": '场次',
          "total": '总题量',
          "wrong": '错误数量',
          "rightRate": '正确率'
        },
        // legendName: {
        //   '访问用户': '访问用户 total: 10000'
        // }
      }

      return {
        joinUserData: {
          columns: ['date', 'joinCount', 'loginCount'],
          rows: [
            {'date': '1/1', 'loginCount': 1393, 'joinCount': 1093},
            {'date': '1/2', 'loginCount': 3530, 'joinCount': 3230},
            {'date': '1/3', 'loginCount': 2923, 'joinCount': 2623},
            {'date': '1/4', 'loginCount': 1723, 'joinCount': 1423},
            {'date': '1/5', 'loginCount': 3792, 'joinCount': 3492},
            {'date': '1/6', 'loginCount': 4593, 'joinCount': 4293}
          ]
        },

        sceneQuestionData: {
          columns: ["sceneCode", "total", "wrong", "rightRate"],
          rows: [
            {"sceneCode": '1', "total": 2232, "wrong": 123, "rightRate": 90},
            {"sceneCode": '2', "total": 1232, "wrong": 198, "rightRate": 85},
            {"sceneCode": '3', "total": 2389, "wrong": 265, "rightRate": 76},
            {"sceneCode": '4', "total": 2544, "wrong": 145, "rightRate": 96},
            {"sceneCode": '51', "total": 2987, "wrong": 232, "rightRate": 88},

          ],
        },

        questionData: {
          columns: ['questionId', "total"],
          rows: [

            {"questionId": '115', "total": 100},
            {"questionId": '113', "total": 80},
            {"questionId": '13', "total": 75},
            {"questionId": '12', "total": 30},
            {"questionId": '12', "total": 30},
            {"questionId": '12', "total": 30},
            {"questionId": '12', "total": 30},
            {"questionId": '1q', "total": 123},
          ]
        },

        bankData: {
          columns: ["bankName", "count"],
          rows: [
            {"bankName": "测试题", "count":123},
            {"bankName": "会计部", "count":233},
            {"bankName": "三综合", "count":803},
          ]
        },


        busiData: {
          columns: ["busiType", "count"],
          rows: [
            {"busiType": "对公", "count":123},
            {"busiType": "对私", "count":233},
            {"busiType": "公共", "count":803},
            {"busiType": "国际", "count":309},
          ]
        },

        diffData: {
          columns: ["diffName", "count"],
          rows: [
            {"diffName": "高", "count":123},
            {"diffName": "中", "count":233},
            {"diffName": "低", "count":200},
          ]
        },

        scoreData: {
          columns: ["sceneId", "score"],
          rows: [
            {"sceneId": 1, "score": 89},
            {"sceneId": 2, "score": 94},
            {"sceneId": 3, "score": 89},
            {"sceneId": 4, "score": 81},
            {"sceneId": 5, "score": 86},
            {"sceneId": 6, "score": 92},
            {"sceneId": 7, "score": 91},
            {"sceneId": 8, "score": 80},
            {"sceneId": 9, "score": 85},
            {"sceneId": 10, "score": 93},
          ]
        }
      }
    },
    components: {
      VCharts,
      VeLine,
      VeHistogram,
      VeBar,
      VePie,
      VeRing
    },
    computed: {
      role() {
        return this.name === 'root' ? '超级管理员' : '普通用户';
      }
    },
    created() {
    },
    methods: {}
  }

</script>


<style scoped>
  .grid-con-icon img {
    vertical-align: middle;
  }

  .el-row {
    margin-bottom: 20px;
  }

  .grid-content {
    display: flex;
    align-items: center;
    height: 100px;
  }

  .grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
  }

  .grid-num {
    font-size: 30px;
    font-weight: bold;
  }

  .grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
  }

  .grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
  }

  .grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
  }

  .grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
  }

  .grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
  }

  .grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
  }

  .grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
  }

  .user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
  }

  .user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }

  .user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
  }

  .user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
  }

  .user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
  }

  .user-info-list span {
    margin-left: 70px;
  }

  .mgb20 {
    margin-bottom: 20px;
  }

  .todo-item {
    font-size: 14px;
  }

  .todo-item-del {
    text-decoration: line-through;
    color: #999;
  }

  .el-card__header {
    background-color: gainsboro !important;
  }


</style>
