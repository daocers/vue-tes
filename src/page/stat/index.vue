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

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>题库分布</span>
        <!--        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
      </div>
      <div>

        <el-col :span="8">
          <el-tag type="success">题库范围：{{bankName? bankName: "所有试题"}}</el-tag>

          <ve-pie :data="bankData" :events="bankEvents" :settings="chartSettings"></ve-pie>
        </el-col>

        <el-col :span="8">
          <el-tag type="primary">业务类型</el-tag>


          <ve-ring :data="busiData"></ve-ring>
        </el-col>

        <el-col :span="8">
          <el-tag type="primary">难度</el-tag>


          <ve-ring :data="diffData"></ve-ring>
        </el-col>

      </div>


    </el-card>

    <el-row>


      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>考场状态监控</span>
          <!--        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
        </div>
        <div>

          <el-row>
            <el-col :span="12">
              提交状态<el-progress :percentage="86"></el-progress>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-tag type="danger">未交卷列表</el-tag> <br/>
              张三 <el-progress :percentage="98"></el-progress>
              李四 <el-progress :percentage="89"></el-progress>
              王五<el-progress :percentage="93"></el-progress>
              赵六<el-progress :percentage="32"></el-progress>
              田七<el-progress :percentage="65"></el-progress>

            </el-col>

            <el-col :span="12">
              <el-tag type="success">已交卷</el-tag> <br/>
              张三 <el-progress :percentage="98"></el-progress>
              李四 <el-progress :percentage="89"></el-progress>
              王五<el-progress :percentage="93"></el-progress>
              赵六<el-progress :percentage="32"></el-progress>
              田七<el-progress :percentage="65"></el-progress>

            </el-col>
          </el-row>


        </div>


      </el-card>



    </el-row>

  </div>
</template>

<script>
  import {VCharts, VeBar, VeHistogram, VeLine, VePie, VeRing} from 'v-charts'
  import {busiTypeMap, diffMap} from '../../data.js'

  export default {
    name: 'stat',
    data() {

      this.extend = {
        'xAxis.0.axisLabel.rotate': 45
      }
      this.chartSettings = {
        showLine: 'rightRate',
        selectedMode: 'single',
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

      var vueSelf = this
      this.bankEvents = {
        click(e) {
          console.log("题库被点击：", e)
          let row = vueSelf.bankData.rows[e.dataIndex];
          let bankId = row.bankId;
          vueSelf.bankName = row.name;
          console.log("bankId:", bankId)
          vueSelf.getQuestionPropStat(bankId);
        }
      }

      return {
        diffMap: diffMap,
        busiTypeMap: busiTypeMap,
        bankName: '',
        joinUserData: {
          columns: ['dateStr', 'joinCount', 'loginCount'],
          rows: []
        },

        sceneQuestionData: {
          columns: ["sceneId", "total", "wrong", "rightRate"],
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
          columns: ["name", "questionCount"],
          rows: []
        },


        busiData: {
          columns: ["busiType", "count"],
          rows: [
            {"busiType": "对公", "count": 123},
          ]
        },

        diffData: {
          columns: ["difficulty", "count"],
          rows: [
            {"difficulty": "高", "count": 123},
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

      this.doGet("/stat/api/getBankStat").then(res => {
        console.log("bankStat:", res)
        this.bankData.rows = res;
      })

      this.getQuestionPropStat();

      this.doGet("/statistics/api/getJoinUserCountByDay?size=15").then(res => {
        console.log("考试人数", res);
        this.joinUserData.rows = res;
      })

      this.doGet("/stat/api/getSceneQuestionStat").then(res => {
        console.log("sceneQuestionStat: ", res);
        this.sceneQuestionData.rows = res;
      })


    },
    methods: {
      getQuestionPropStat(bankId) {
        let url;
        if (!bankId) {
          url = "/stat/api/getQuestionPropStat";
        } else {
          url = "/stat/api/getQuestionPropStat?bankId=" + bankId;

        }

        this.doGet(url).then(res => {
          console.log("questionProp: ", res);
          let busiList = res.busiTypeStatDtoList;
          for (let idx in busiList) {
            let item = busiList[idx];
            item.busiType = this.busiTypeMap[item.busiType]
          }
          this.busiData.rows = busiList;

          let diffList = res.difficultyStatDtoList;
          for (let idx in diffList) {
            let item = diffList[idx];
            item.difficulty = this.diffMap[item.difficulty];
          }
          this.diffData.rows = diffList;
          console.log("diffList", diffList);

        })
      }
    }
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
