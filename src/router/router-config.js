// import activePublic from './page/activePublic/index.vue'
import leftMenu from '../components/left-menu.vue'
import Scene from '../page/scene/index.vue'
import SceneSetting from '../page/scene/scene_setting.vue'
import ScenePaper from '../page/scene/scene_generatePaper.vue'
import SceneUser from '../page/scene/scene_choiceUser.vue'
import SceneReview from '../page/scene/scene_review.vue'
import Step from '../page/steps/index.vue'
import Step1 from '../page/steps/first.vue'
import Step2 from '../page/steps/second.vue'
import Step3 from '../page/steps/third.vue'


export default [
  {
    //  配置路由，当路径为'/activePublic'，使用组件activePublic
    //   path: '/activePublic', component: activePublic
    path: '/leftMenu', component: leftMenu,
    // path: '/scene/setting', component: sceneSetting
  },
  {
    path: '/scene',
    component: Scene,
    children:[
      {path: '', component: SceneSetting},
      {path: 'paper', component: ScenePaper},
      {path: 'user', component: SceneUser},
      {path: 'review', component: SceneReview}
    ]
  },

  {
    path: '/step',
    component: Step,
    children:[
      {path: '', component: Step1},
      {path: 'step2', component: Step2},
      {path: 'step3', component: Step3}
    ]

  }

  // {path: '/scene/setting', component: sceneSetting}
]
