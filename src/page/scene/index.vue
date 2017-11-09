<template>
  <div id="">
    <div class="steps">
      <el-steps :active="step" simple>
        <el-step title="第一步" icon="el-icon-setting"></el-step>
        <el-step title="第二步" class="paper" icon="el-icon-document"></el-step>
        <el-step title="第三步" class="user" icon="el-icon-picture"></el-step>
        <el-step title="预览" icon="el-icon-view"></el-step>
      </el-steps>
    </div>
    <router-view class="view" :scene="scene"></router-view>

    <div class="btn-group">
      <div>
        <el-button @click="choicePaper()">下一步</el-button>
        <!--<el-button type="primary">主要按钮</el-button>-->
        <!--<el-button type="success">成功按钮</el-button>-->
        <!--<el-button type="info">信息按钮</el-button>-->
        <!--<el-button type="warning">警告按钮</el-button>-->
        <!--<el-button type="danger">危险按钮</el-button>-->
      </div>
    </div>
  </div>
</template>

<script>
//  import store from 'src/store.js'
  import $ from 'jquery'

  export default {
    name:'sceneIndex',
    props: ['scene'],
//    props:{
//      scene1:{
//        name: '12',
//        region: '12',
//        date1: '',
//        date2: '',
//        delivery: false,
//        type: [],
//        resource: '',
//        desc: '',
//        beginTime: new Date(),
//        endTime: '',
//        duration: '',
//        delay: '',
//        paperType: 'test'
//      }
//    },
//    props: ['scene'],
    data: function () {
      return {
        isRouter: false,
        preview: true,
        preStep: false,
        nextStep: true,
        publish: false,
        step: 1,
        scene:{
          name: '12',
          region: '12',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          beginTime: new Date(),
          endTime: '',
          duration: '',
          delay: '',
          paperType: 'test'
        }
      }
    },
    methods: {
      handlePreview: function () {
        console.log('预览');
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
