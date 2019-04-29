<template>
  <div id="add">
    <el-row>
      <el-col :span="24">

        <el-form label-position="left" size="small" :model="paperPolicy" :rules="rules" ref="addForm"
                 label-width="80px">
<!--          <el-form-item v-if="!paperPolicy.id" label="编码" prop="code">-->
<!--            <el-input v-model="paperPolicy.code" placeholder="请输入"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="策略名称" prop="name">
            <el-input v-model="paperPolicy.name" placeholder="请输入"></el-input>
          </el-form-item>
          <!--          <el-form-item label="questionTypeInfo" prop="questionTypeInfo">-->
          <!--            <el-input v-model="paperPolicy.questionTypeInfo" placeholder="请输入"></el-input>-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="content" prop="content">-->
          <!--            <el-input v-model="paperPolicy.content" placeholder="请输入"></el-input>-->
          <!--          </el-form-item>-->

          <el-form-item label="单选题" prop="single">
            <el-table :data="paperPolicy.singleInfo" size="small"
                      style="width: 100%">
              <el-table-column prop="busiType" label="业务类型">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.busiType" size="small">
                    <el-option v-for="item in busiList" :key="item.value"
                               :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                </template>
              </el-table-column>

              <el-table-column prop="diff" label="难度">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.difficulty" size="small">
                    <el-option v-for="item in diffList" :key="item.value"
                               :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="count" label="数量">
                <template slot-scope="scope">
                  <el-input :min="1" type="number" size="small" v-model="scope.row.count"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="score" label="分值">
                <template slot-scope="scope">
                  <el-input-number v-model="singleScore" :precision="1" :step="0.5" :max="5"
                                   :min="0.5"></el-input-number>
                </template>
              </el-table-column>

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="small" type="primary" icon="el-icon-edit" circle
                             @click="addLine('single')"></el-button>
                  <el-button size="small" type="danger" icon="el-icon-delete" circle
                             @click="removeLine('single', scope.$index)"></el-button>
                </template>
              </el-table-column>

            </el-table>
          </el-form-item>

          <el-form-item label="多选题" prop="multi">
            <el-table :data="paperPolicy.multiInfo" size="small"
                      style="width: 100%">
              <el-table-column prop="busiType" label="业务类型">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.busiType" size="small">
                    <el-option v-for="item in busiList" :key="item.value"
                               :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                </template>
              </el-table-column>

              <el-table-column prop="diff" label="难度">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.difficulty" size="small">
                    <el-option v-for="item in diffList" :key="item.value"
                               :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="count" label="数量">
                <template slot-scope="scope">
                  <el-input :min="1" type="number" size="small" v-model="scope.row.count"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="score" label="分值">
                <template slot-scope="scope">
                  <el-input-number v-model="multiScore" :precision="1" :step="0.5" :max="5"
                                   :min="0.5"></el-input-number>
                </template>
              </el-table-column>

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="small" type="primary" icon="el-icon-edit" circle
                             @click="addLine('multi')"></el-button>
                  <el-button size="small" type="danger" icon="el-icon-delete" circle
                             @click="removeLine('multi', scope.$index)"></el-button>
                </template>
              </el-table-column>


            </el-table>
          </el-form-item>

          <el-form-item label="判断题" prop="judge">
            <el-table :data="paperPolicy.judgeInfo" size="small"
                      style="width: 100%">
              <el-table-column prop="busiType" label="业务类型">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.busiType" size="small">
                    <el-option v-for="item in busiList" :key="item.value"
                               :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                </template>
              </el-table-column>

              <el-table-column prop="diff" label="难度">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.difficulty" size="small">
                    <el-option v-for="item in diffList" :key="item.value"
                               :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="count" label="数量">
                <template slot-scope="scope">
                  <el-input :min="1" type="number" size="small" v-model="scope.row.count"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="score" label="分值">
                <template slot-scope="scope">
                  <el-input-number v-model="judgeScore" :precision="1" :step="0.5" :max="5"
                                   :min="0.5"></el-input-number>
                </template>
              </el-table-column>

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="small" type="primary" icon="el-icon-edit" circle
                             @click="addLine('judge')"></el-button>
                  <el-button size="small" type="danger" icon="el-icon-delete" circle
                             @click="removeLine('judge', scope.$index)"></el-button>
                </template>
              </el-table-column>

            </el-table>
          </el-form-item>

          <el-form-item label="翻打凭条" prop="receiptFlag">
            <el-switch v-model="receiptFlag"></el-switch>
          </el-form-item>
          <el-col :span="18" v-if="receiptFlag">
            <el-form-item label="凭条张数" prop="receiptCount">
              <el-select v-model="paperPolicy.receiptCount" placeholder="">
                <el-option label="100" :value=100></el-option>
                <el-option label="50" :value=50></el-option>
                <el-option label="10" :value=10></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="数字长度" prop="numberLength">
              <el-input v-model="paperPolicy.numberLength" type="number" :max="10" :min="5"></el-input>
            </el-form-item>
          </el-col>

          <el-form-item>
            <el-button type="primary" @click="add">保存</el-button>
            <el-button type="info" plain @click="goBack">取消</el-button>
          </el-form-item>

        </el-form>


      </el-col>


    </el-row>


  </div>

</template>

<script>
  export default {
    data() {
      var checkContent = (rule, value, callback) => {
        console.log("真正校验")
        let total = 0;
        for (let idx in this.paperPolicy.singleInfo) {
          let item = this.paperPolicy.singleInfo[idx];
          let count = item.count;
          // if (!count) {
          //   callback(new Error("请设置题量和分值"));
          // }
          if (count) {
            total = total + parseInt(count);
          }
        }

        for (let idx in this.paperPolicy.multiInfo) {
          let item = this.paperPolicy.multiInfo[idx];
          let count = item.count;
          // if (!count) {
          //   callback(new Error("请设置题量和分值"));
          // }
          if (count) {
            total = total + parseInt(count);
          }
        }

        for (let idx in this.paperPolicy.judgeInfo) {
          let item = this.paperPolicy.judgeInfo[idx];
          let count = item.count;
          // if (!count) {
          //   callback(new Error("请设置题量和分值"));
          // }
          if (count) {
            total = total + parseInt(count);
          }
        }
        if (total == 0) {
          callback(new Error("请至少指定一种类型的试题信息"));
        } else {
          callback();
        }

      }
      return {
        //分值
        singleScore: 1,
        multiScore: 1,
        judgeScore: 1,

        receiptFlag: false,
        paperPolicy: {
          singleInfo: [{}],
          multiInfo: [{}],
          judgeInfo: [{}],
        },
        rules: {
          name:
            [
              {required: true, message: '请输入测量名称', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          single: [
            {validator: checkContent, trigger: 'blur'}
          ],
          multi: [
            {validator: checkContent, trigger: 'blur'}
          ],
          judge: [
            {validator: checkContent, trigger: 'blur'}
          ]
        },
        receiptModel: {
          receiptCount: 100,
          numberLength: 6,
        },

        diffList: [
          {label: "简单", value: 1},
          {label: "中等", value: 2},
          {label: "困难", value: 3},
        ],

        busiList: [
          {label: '对公', value: 1},
          {label: '对私', value: 2},
          {label: '公共', value: 3},
          {label: '国际', value: 4},
        ],
      }
    },
    methods: {
      addLine(questionType) {
        if ("single" == questionType) {
          this.paperPolicy.singleInfo.push({})
        } else if ("multi" == questionType) {
          this.paperPolicy.multiInfo.push({})
        } else if ("judge" == questionType) {
          this.paperPolicy.judgeInfo.push({})
        } else {
          console.warn("这是什么", questionType)
        }
      },
      removeLine(questionType, index) {
        let data;
        if ("single" == questionType) {
          data = this.paperPolicy.singleInfo;
        } else if ("multi" == questionType) {
          data = this.paperPolicy.multiInfo;
        } else if ("judge" == questionType) {
          data = this.paperPolicy.judgeInfo;
        } else {
          console.warn("这是什么", questionType)
          return;
        }

        data.splice(index, 1);
        if (data.length == 0) {
          data.push({})
        }

      },
      add() {
        this.$refs['addForm'].validate(async (valid) => {
          console.log("开始校验")
          if (!valid) {
            console.log("参数校验不通过，请处理");
            return false;
          } else {
            console.log("开始提交")
            let res = await this.doPost("/paperPolicy/api/save", this.paperPolicy);
            if (res == true) {
              this.$confirm('继续添加?查看列表?', '提示', {
                confirmButtonText: '继续添加',
                cancelButtonText: '查看列表',
                type: 'success',
                center: true
              }).then(() => {
                this.$refs['addForm'].resetFields();
              }).catch(() => {
                this.$router.push("/paperPolicy/")
              });
            }
          }
        });
      },
      goBack() {
        this.$router.go(-1);
      }

    },
    created: function () {
    }
  }
</script>


<style>

</style>
