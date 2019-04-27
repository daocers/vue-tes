<template>
  <div id="add">
    <el-row>
      <el-col :span="24">

        <el-form label-position="left" size="small" :model="paperPolicy" :rules="rules" ref="addForm"
                 label-width="80px">
          <el-form-item v-if="!paperPolicy.id" label="编码" prop="code">
            <el-input v-model="paperPolicy.code" placeholder="请输入"></el-input>
          </el-form-item>
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
            <el-table :data="singleModel" size="small"
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
                  <el-input-number v-model="scope.row.score" :precision="1" :step="0.5" :max="5" :min="0.5"></el-input-number>
                </template>
              </el-table-column>

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="small" type="primary" icon="el-icon-edit" circle @click="addLine('single')"></el-button>
                  <el-button size="small" type="danger" icon="el-icon-delete" circle @click="removeLine('single', scope.$index)"></el-button>
                </template>
              </el-table-column>

            </el-table>
          </el-form-item>

          <el-form-item label="多选题" prop="multi">
            <el-table :data="multiModel" size="small"
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
                  <el-input-number v-model="scope.row.score" :precision="1" :step="0.5" :max="5" :min="0.5"></el-input-number>
                </template>
              </el-table-column>

            </el-table>
          </el-form-item>

          <el-form-item label="判断题" prop="judge">
            <el-table :data="judgeModel" size="small"
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
                  <el-input-number v-model="scope.row.score" :precision="1" :step="0.5" :max="5" :min="0.5"></el-input-number>
                </template>
              </el-table-column>

            </el-table>
          </el-form-item>

          <!--          <el-form-item label="翻打凭条" prop="single">-->
          <!--            <el-table :data="simpleModel" size="small"-->
          <!--                      style="width: 100%">-->
          <!--&lt;!&ndash;              <el-table-column prop="type" label="题型" width="180px"></el-table-column>&ndash;&gt;-->
          <!--&lt;!&ndash;              <el-table-column prop="count" label="数量">&ndash;&gt;-->
          <!--&lt;!&ndash;                <template slot-scope="scope">&ndash;&gt;-->
          <!--&lt;!&ndash;                  <el-input type="number" size="small" v-model="scope.row.count"></el-input>&ndash;&gt;-->
          <!--&lt;!&ndash;                </template>&ndash;&gt;-->
          <!--&lt;!&ndash;              </el-table-column>&ndash;&gt;-->
          <!--&lt;!&ndash;              <el-table-column prop="score" label="分值">&ndash;&gt;-->
          <!--&lt;!&ndash;                <template slot-scope="scope">&ndash;&gt;-->
          <!--&lt;!&ndash;                  <el-input type="text" size="small" v-model="scope.row.score"></el-input>&ndash;&gt;-->
          <!--&lt;!&ndash;                </template>&ndash;&gt;-->
          <!--&lt;!&ndash;              </el-table-column>&ndash;&gt;-->
          <!--              <el-col :span="8">-->
          <!--                <el-form-item label="数量" prop="receiptCount">-->
          <!--                  <el-select v-model="scene.receiptCount" placeholder="">-->
          <!--                    <el-option label="100" :value=100></el-option>-->
          <!--                    <el-option label="50" :value=50></el-option>-->
          <!--                    <el-option label="10" :value=10></el-option>-->
          <!--                  </el-select>-->
          <!--                </el-form-item>-->
          <!--              </el-col>-->
          <!--              <el-col :span="8">-->
          <!--                <el-form-item label="数字长度" prop="numberLength">-->
          <!--                  <el-input v-model="scene.numberLength" type="number" :max="10" :min="5"></el-input>-->
          <!--                </el-form-item>-->
          <!--              </el-col>-->

          <!--            </el-table>-->
          <!--          </el-form-item>-->

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
      return {
        paperPolicy: {},
        rules: {
          code:
            [
              {required: true, message: '请输入code', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          name:
            [
              {required: true, message: '请输入name', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          questionTypeInfo:
            [
              {required: true, message: '请输入questionTypeInfo', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          content:
            [
              {required: true, message: '请输入content', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          count:
            [
              {required: true, message: '请输入count', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          score:
            [
              {required: true, message: '请输入score', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          percentable:
            [
              {required: true, message: '请输入percentable', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          ownerId:
            [
              {required: true, message: '请输入ownerId', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          ownerType:
            [
              {required: true, message: '请输入ownerType', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          questionSelectType:
            [
              {required: true, message: '请输入questionSelectType', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          privaryType:
            [
              {required: true, message: '请输入privaryType', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          isDel:
            [
              {required: true, message: '请输入isDel', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          status:
            [
              {required: true, message: '请输入status', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          createUserId:
            [
              {required: true, message: '请输入createUserId', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          updateTime:
            [
              {required: true, message: '请输入updateTime', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          createTime:
            [
              {required: true, message: '请输入createTime', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          updateUserId:
            [
              {required: true, message: '请输入updateUserId', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
        },
        singleModel: [
          {}
        ],
        multiModel: [
          {}
        ],
        judgeModel: [
          {}
        ],

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
          this.singleModel.push({})
        } else if ("multi" == questionType) {
          this.multiModel.push({})
        } else if ("judge" == questionType) {
          this.judgeModel.push({})
        } else {
          console.warn("这是什么", questionType)
        }
      },
      removeLine(questionType, index) {
        let data;
        if ("single" == questionType) {
          data = this.singleModel;
        } else if ("multi" == questionType) {
          data = this.multiModel;
        } else if ("judge" == questionType) {
          data = this.judgeModel;
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
          if (!valid) {
            console.log("参数校验不通过，请处理");
            return false;
          } else {
            let res = await this.postEntity("/paperPolicy/api/save", this.paperPolicy);
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
