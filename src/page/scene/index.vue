<template>
  <div id="">
    <div class="steps">
      <el-steps :active="step" simple>
        <el-step title="信息设置" icon="el-icon-setting"></el-step>
        <el-step title="试卷生成" class="paper" icon="el-iconcument"></el-step>
        <el-step title="选择考生" class="user" icon="el-icon-picture"></el-step>
        <el-step title="场次预览" icon="el-icon-view"></el-step>
      </el-steps>
    </div>

    <router-view class="view" :scene="scene" ref="view"></router-view>

    <div class="btn-group">
      <div>
        <el-button type="primary" @click="next()" v-show="step != 4">下一步</el-button>
        <el-button type="default" plain @click="prev()" v-show="step != 1">上一步</el-button>
        <el-button type="primary" @click="save()" v-show="step == 4">保存</el-button>
        <el-button type="success" plain @click="toPreview()" v-show="previewFlag">预览</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  //  import store from 'src/store.js'
  import $ from 'jquery'

  export default {
    name: 'sceneIndex',
    data: function () {
      return {
        /**
         * 试卷策略
         */
        paperPolicyAvailable: null,
        preStep: false,
//        nextStep: true,
        commit: false,
        /**
         * 预览按钮是否显示
         */
        previewFlag: false,
//        preview: false,
        step: 1,//步骤
        scene: {
          id: null,
          code: '',
          name: '',
          ownerType: null,
          ownerId: null,
          authCode: '',
          changePaper: 2,
          delayTime: null,
          duration: null,
          paperPolicyId: null,
          cancelReason: '',
          paperGenerateType: null,
          remark: '',
          questionBankId: null,
          userChoiceType: null,
          totalScore: null,
          percentable: null,
          metaScoreInfo: '',
          openTime: '',
          closeTime: '',
          /**
           * 已选中的试卷策略，只有一个
           */
          checkedPaperPolicy: [],

//          /**
//           * 用户选择，已选择的类型和id列表map
//           */
//          checkedTypeIdListMap: {},

          /**
           * 已选择的信息
           * type:List<Obj>
           */
//          checkbjInfo: {},

          /**
           * 已选择的id信息
           * type:List<id>
           */
          checkedIdInfo: {},

          /**
           * 已选择的列表
           */
          checkedList: [],

          /**
           * 存放key，用于取消选择时候的删除
           */
          checkedKeyList: [],

        }
      }
    },
    methods: {
      /**
       * 下一步操作
       */
      next: async function () {
        console.log("scene： ", this.scene);
        if (this.step == 1) {
//          跳转到选择试卷策略
//          参数校验，不通过返回false，不予跳转
          this.$refs.view.$refs['sceneForm'].validate((valid) => {
            if (valid) {
              this.step++;
              this.$router.push({path: '/scene/paper'});
            } else {
              return false;
            }
          });
        } else if (this.step == 2) {
//          试卷策略必选
          if (this.scene.paperPolicyId) {
            console.log("available:::", this.paperPolicyAvailable)
            let message = '';
            if (this.paperPolicyAvailable == true) {

            } else if (this.paperPolicyAvailable == false) {
              message = "试卷策略校验不通过，无法生成考卷，请核对"
            } else {
              message = "请校验试卷策略";
            }
            if (message != '') {
              this.$notify({
                title: '警告',
                message: message,
                type: 'warning'
              });
              return false;
            } else {
              this.step++;
              this.$router.push({path: '/scene/user'});
            }

          } else {
            this.$notify({
              title: '警告',
              message: '请选择试卷策略用于生成试卷',
              type: 'warning'
            });
            return false;
          }
//          跳转到选择用户
        } else if (this.step == 3) {
          if (this.scene.checkedList && this.scene.checkedList.length > 0) {
            //          跳转到预览
            this.step++;
            this.$router.push({path: '/scene/review'});
          } else {
            this.$notify({
              title: '警告',
              message: '请选择考生所在机构/部门/岗位',
              type: 'warning'
            });
            return false;
          }

        } else if (this.step == 4) {
          let data = this.http("/scene/api/save", this.scene);
          if (data) {
            console.log("保存成功");
          } else {
            console.log("保存失败");
          }
        } else {
//          理论上不能跳转到此处
          console.log("步骤紊乱。。。")
          return false;
        }

      },
      /**
       * 上一步按钮执行操作
       */
      prev: function () {
        console.log("scene： ", this.scene);

        console.log("上一步。。。");
        if (this.step == 4) {
          this.$router.push({path: '/scene/user'});
        } else if (this.step == 3) {
          this.$router.push({path: '/scene/paper'});
        } else if (this.step == 2) {
          this.$router.push({path: '/scene'});
        } else {
          console.log("理论上不能到达此处");
        }
        this.step--;
        $('html,body').animate({scrollTop: 0}, 500);
      },
      save: async function () {
        console.log("保存。。。");
        console.log("scene:::::#### ", this.scene);
        let res = await this.http("/scene/api/save", this.scene);
        if (res) {
          if (res == -1) {
            this.$notify({
              title: '警告',
              message: "试卷策略校验不通过，无法生成试卷，请重新选择",
              type: 'warning'
            });
          } else {
            this.$alert('开场成功，即将跳转到场次列表', '成功', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.push("/scene/list");
              }
            });
          }

        }
      },
      handlePublish: function () {
        console.log('发布');
      },

      toPreview() {
        this.step = 4;
        this.previewFlag = false;
        this.$router.push({path: "/scene/review"})

      },
    },

    watch: {
      '$route': function (to, from) {
        this.isRouter = true;
      }
    }
  }

</script>

<style>

</style>
