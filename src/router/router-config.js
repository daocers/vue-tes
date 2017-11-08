// import activePublic from './page/activePublic/index.vue'
import leftMenu from '../components/left-menu.vue'
import Scene from '../page/scene/index.vue'
import SceneSetting from '../page/scene/scene_setting.vue'
import ScenePaper from '../page/scene/scene_generatePaper.vue'
import SceneUser from '../page/scene/scene_choiceUser.vue'
import SceneReview from '../page/scene/scene_review.vue'


export default [
  {
    //  配置路由，当路径为'/activePublic'，使用组件activePublic
    //   path: '/activePublic', component: activePublic
    path: '/leftMenu', component: leftMenu,
    // path: '/scene/setting', component: sceneSetting
  },
  {
    path: '/scene',
    name: 'scene index',
    component: Scene,
    children:[
      {path: '', component: SceneSetting, props: {scene: true}},
      {path: 'paper', component: ScenePaper, props: {scene: true}},
      {path: 'user', component: SceneUser},
      {path: 'review', component: SceneReview}
    ]
  },

  // {path: '/scene/setting', component: sceneSetting}
]
