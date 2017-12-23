// import activePublic from './page/activePublic/index.vue'
import leftMenu from '../components/left-menu.vue'
import SceneList from '../page/scene/list.vue'
import Scene from '../page/scene/index.vue'
import SceneSetting from '../page/scene/scene_setting.vue'
import ScenePaper from '../page/scene/scene_generatePaper.vue'
import SceneUser from '../page/scene/scene_choiceUser.vue'
import SceneReview from '../page/scene/scene_review.vue'
import Step from '../page/steps/index.vue'
import Step1 from '../page/steps/first.vue'
import Step2 from '../page/steps/second.vue'
import Step3 from '../page/steps/third.vue'
import QuestionPolicyEdit from '../page/questionPolicy/edit.vue'
import QuestionPolicyIndex from '../page/questionPolicy/list.vue'
import RoleIndex from '../page/role/list.vue'
import RoleAdd from '../page/role/add.vue'
import CommonQuestionIndex from '../page/commonQuestion/list.vue'
import CommonQuestionAdd from '../page/commonQuestion/add.vue'
import DepartmentIndex from '../page/department/list.vue'
import DepartmentAdd from '../page/department/add.vue'
import BranchIndex from '../page/branch/list.vue'
import BranchAdd from '../page/branch/add.vue'
import StationIndex from '../page/station/list.vue'
import PropertyIndex from '../page/property/list.vue'
import Test from '../page/test.vue'
import PaperPolicyIndex from '../page/paperPolicy/list.vue'

import QuestionTypeIndex from '../page/questionType/list.vue'
import QuestionBankIndex from '../page/questionBank/list.vue'

import PermissionIndex from '../page/permission/list.vue'
import PermissionManage from '../page/permission/manage.vue'

import ExamIndex from '../page/exam/index.vue'
import ExamEntrance from '../page/exam/entrance.vue'
import ExamNotice from '../page/exam/notice.vue'
import ExamMain from '../page/exam/main.vue'

import SceneMyJoin from '../page/scene/myJoin.vue'
import SceneMyOpen from '../page/scene/myOpen.vue'
import UserIndex from '../page/user/list.vue'
import Index from '../page/index/index.vue'


import Login from '../page/index/login.vue'
// import  from '../page/station/list.vue'
// import Station from '../page/station/list.vue'
// import Station from '../page/station/list.vue'
// import Station from '../page/station/list.vue'
// import Station from '../page/station/list.vue'

export default [
  {path: '/login', component: Login},
  {path: '/', component: Index},
  {
    //  配置路由，当路径为'/activePublic'，使用组件activePublic
    //   path: '/activePublic', component: activePublic
    path: '/leftMenu', component: leftMenu,
    // path: '/scene/setting', component: sceneSetting
  },
  {path: '/test', component: Test},
  {path: '/role', component: RoleIndex},
  {path: '/station', component: StationIndex},
  {path: '/branch', component: BranchIndex},
  {path: '/branch/manage', component: BranchAdd},
  {path: '/permission', component: PermissionIndex},
  {path: '/permission/manage', component: PermissionManage},

  {path: '/property', component: PropertyIndex},
  {path: '/role/add', component: RoleAdd},
  // {path:'', component: },
  {path: '/department', component: DepartmentIndex},
  {path: '/department/add', component: DepartmentAdd},
  {path: '/commonQuestion', component: CommonQuestionIndex},
  {path: '/commonQuestion/add', component: CommonQuestionAdd},
  {path: '/scene/list', component: SceneList},
  {
    path: '/scene',
    component: Scene,
    children: [
      {path: '', component: SceneSetting},
      {path: 'paper', component: ScenePaper},
      {path: 'user', component: SceneUser},
      {path: 'review', component: SceneReview}
    ]
  },
  {
    path: '/questionPolicy',
    component: QuestionPolicyIndex,
    children: [
      {path: '', component: QuestionPolicyIndex},
      {path: '/edit', component: QuestionPolicyEdit},
    ]
  },

  {
    path: '/step',
    component: Step,
    children: [
      {path: '', component: Step1},
      {path: 'step2', component: Step2},
      {path: 'step3', component: Step3}
    ]

  },
  {path: '/questionType', component: QuestionTypeIndex},
  {path: '/questionBank', component: QuestionBankIndex},
  {path: '/paperPolicy', component: PaperPolicyIndex},
  {path: '/exam', component: ExamEntrance},
  {path: '/exam/index', component: ExamIndex},
  {path: '/exam/notice', component: ExamNotice},
  {path: '/exam/main', component: ExamMain},
  {path: '/scene/myJoin', component: SceneMyJoin},
  {path: '/scene/myOpen', component: SceneMyOpen},
  {path: '/user/', component: UserIndex},




  // {path: '/scene/setting', component: sceneSetting}
]
