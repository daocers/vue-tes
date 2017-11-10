<template>
  <div id="">
    <div class="steps">
      <el-steps :active="step" simple>
        <el-step title="信息设置" icon="el-icon-setting"></el-step>
        <el-step title="试卷生成" class="paper" icon="el-icon-document"></el-step>
        <el-step title="选择考生" class="user" icon="el-icon-picture"></el-step>
        <el-step title="场次预览" icon="el-icon-view"></el-step>
      </el-steps>
    </div>

    <router-view class="view" :scene="scene"></router-view>

    <div class="btn-group">
      <div>
        <el-button type="primary" @click="next()" v-show="nextStep">下一步</el-button>
        <el-button @click="prev()" v-show="preview">上一步</el-button>
        <el-button type="primary" @click="save()" v-show="commit">保存</el-button>
        <el-button type="info" @click="overview()" v-show="preview">预览</el-button>
      </div>
    </div>
  </div>
</template>

<script>
//  import store from 'src/store.js'
  import $ from 'jquery'

  export default {
    name:'sceneIndex',
    data: function () {
      return {
        preview: true,
        preStep: false,
        nextStep: true,
        commit: false,
        preview: false,
        step: 1,//步骤
        scene:{
          id: null,
          code: '',
          name: '',
          ownerType: null,
          ownerId: null,
          authCode: '',
          changePaper: false,
          delayTime: null,
          duration: null,
          paperPolicyId: null,
          cancelReson: '',
          paperGenerateType: null,
          remark: '',
          questionBankId: null,
          userChoiceType: null,
          totalScore: null,
          percentable: null,
          metaScoreInfo: '',
          openTime: '',
          closeTime: ''
        }
      }
    },
    methods: {
      next: function () {
        console.log("下一步。。。");
      },
      prev: function () {
        console.log("上一步。。。");
      },
      save: function () {
        console.log("保存。。。");
      },
      overview: function(){
        console.log("预览。。。");
      },
      handlePreStep: function () {
        this.$router.go(-1);
        this.step--;
        this.goStep(this.step);
        $('html,body').animate({scrollTop:0},500);
      },
      choicePaper: function () {
        this.step = 2;
        this.$router.push({path: '/scene/paper'});
      },
      handleNextStep: function () {
        this.$router.push('/activePublic/step'+(this.step+1));
        var _this = this;
        setTimeout(function () {
          if(_this.isRouter){
            _this.step++;
            _this.goStep(_this.step);
          }
        })
        $('html,body').animate({scrollTop:0},500);

      },
      handlePublish: function () {
        console.log('发布');
      },
      goStep: function (n) {
        switch (n) {
          case 1 :
            this.preview = true;this.preStep = false;this.nextStep = true;this.publish = false;
            break;
          case 2 :
            this.preview = false;this.preStep = true;this.nextStep = true;this.publish = false;
            break;
          case 3 :
            this.preview = false;this.preStep = true;this.nextStep = true;this.publish = false;
            break;
          case 4 :
            this.preview = false;this.preStep = true;this.nextStep = false;this.publish = true;
            break;
        }
      }
    },
    watch:{
      '$route': function (to,from) {
        this.isRouter = true;
      }
    }
  }

</script>

<style>

</style>
