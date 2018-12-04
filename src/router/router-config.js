// // import activePublic from './page/activePublic/index.vue'
// import leftMenu from '../components/left-menu.vue'
// import SceneList from '../page/scene/list.vue'
// import Scene from '../page/scene/index.vue'
// import SceneSetting from '../page/scene/scene_setting.vue'
// import ScenePaper from '../page/scene/scene_generatePaper.vue'
// import SceneUser from '../page/scene/scene_choiceUser.vue'
// import SceneReview from '../page/scene/scene_review.vue'
// import QuestionPolicyEdit from '../page/questionPolicy/edit.vue'
// import QuestionPolicyIndex from '../page/questionPolicy/list.vue'
// import RoleIndex from '../page/role/list.vue'
// import RoleAdd from '../page/role/add.vue'
// import CommonQuestionIndex from '../page/commonQuestion/list.vue'
// import CommonQuestionAdd from '../page/commonQuestion/add.vue'
// import DepartmentIndex from '../page/department/list.vue'
// import DepartmentAdd from '../page/department/add.vue'
// import BranchIndex from '../page/branch/list.vue'
// import BranchManage from '../page/branch/manage.vue'
// import StationIndex from '../page/station/list.vue'
// import PropertyIndex from '../page/property/list.vue'
// import Test from '../page/test.vue'
// import PaperPolicyIndex from '../page/paperPolicy/list.vue'
//
// import QuestionTypeIndex from '../page/questionType/list.vue'
// import QuestionBankIndex from '../page/questionBank/list.vue'
//
// import PermissionIndex from '../page/permission/list.vue'
// import PermissionManage from '../page/permission/manage.vue'
//
// import ExamIndex from '../page/exam/index.vue'
// import ExamEntrance from '../page/exam/entrance.vue'
// import ExamNotice from '../page/exam/notice.vue'
// import ExamMain from '../page/exam/main.vue'
//
// import SceneMyJoin from '../page/scene/myJoin.vue'
// import SceneMyOpen from '../page/scene/myOpen.vue'
// import SceneLive from '../page/scene/sceneLive'
// import UserIndex from '../page/user/list.vue'
// import FastOpen from '../page/scene/fast_open'
// import Index from '../page/index/index.vue'
// import Paper from '../page/paper/list'
//
//
// import Login from '../page/index/login.vue'
// import Single from '../page/single/list'
// import Multi from '../page/multi/list'
// import Judge from '../page/judge/list'

// import Summary from '../page/index/summary'
// import Help from '../page/help/index';


const leftMenu = () => import('../components/left-menu.vue')
const SceneList = () => import('../page/scene/list.vue')
const Scene = () => import('../page/scene/index.vue')
const SceneSetting = () => import('../page/scene/scene_setting.vue')
const ScenePaper = () => import('../page/scene/scene_generatePaper.vue')
const SceneUser = () => import('../page/scene/scene_choiceUser.vue')
const SceneReview = () => import('../page/scene/scene_review.vue')
const QuestionPolicyEdit = () => import('../page/questionPolicy/edit.vue')
const QuestionPolicyIndex = () => import('../page/questionPolicy/list.vue')
const RoleIndex = () => import('../page/role/list.vue')
const RoleAdd = () => import('../page/role/add.vue')
const CommonQuestionIndex = () => import('../page/commonQuestion/list.vue')
const CommonQuestionAdd = () => import('../page/commonQuestion/add.vue')
const DepartmentIndex = () => import('../page/department/list.vue')
const DepartmentAdd = () => import('../page/department/add.vue')
const BranchIndex = () => import('../page/branch/list.vue')
const BranchManage = () => import('../page/branch/manage.vue')
const StationIndex = () => import('../page/station/list.vue')
const PropertyIndex = () => import('../page/property/list.vue')
const Test = () => import('../page/test.vue')
const PaperPolicyIndex = () => import('../page/paperPolicy/list.vue')

const QuestionTypeIndex = () => import('../page/questionType/list.vue')
const QuestionBankIndex = () => import('../page/questionBank/list.vue')

const PermissionIndex = () => import('../page/permission/list.vue')
const PermissionManage = () => import('../page/permission/manage.vue')

const ExamIndex = () => import('../page/exam/index.vue');
const ExamEntrance = () => import('../page/exam/entrance.vue');
const ExamNotice = () => import('../page/exam/notice.vue');
const ExamMain = () => import('../page/exam/main.vue');

const SceneMyJoin = () => import('../page/scene/myJoin.vue')
const SceneMyOpen = () => import('../page/scene/myOpen.vue')
const SceneLive = () => import('../page/scene/sceneLive');
const UserIndex = () => import('../page/user/list.vue');
const FastOpen = () => import('../page/scene/fast_open');
const Index = () => import('../page/index/index.vue');
const Paper = () => import('../page/paper/list');
const PaperOfScene = () => import("../page/paper/score")


const Login = () => import('../page/index/login.vue');
const Single = () => import('../page/single/list');
const Multi = () => import('../page/multi/list');
const Judge = () => import('../page/judge/list');
const Help = () => import("../page/help/index");
const Summary =() => import("../page/index/summary");
// const Login = (r) => require(['../page/index/login.vue'])

export default [
  {path: '/login', component: Login},
  // {path: '/index', component: Index},
  {
    //  配置路由，当路径为'/activePublic'，使用组件activePublic
    //   path: '/activePublic', component: activePublic
    path: '/leftMenu', component: leftMenu,
    // path: '/scene/setting', component: sceneSetting
  },
  {
    path: '/',
    component: Index,
    children: [
      {path: '/', component: Summary},
      {path: '/single', component: Single},
      {path: '/multi', component: Multi},
      {path: '/judge', component: Judge},
      {path: '/role', component: RoleIndex},
      {path: '/station', component: StationIndex},
      {path: '/branch', component: BranchIndex},
      {path: '/branch/manage', component: BranchManage},
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
      {path: '/scene/open', component: FastOpen},

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

      {path: '/paper', component: Paper},
      {path: '/score', component: PaperOfScene},
      {path: '/questionType', component: QuestionTypeIndex},
      {path: '/questionBank', component: QuestionBankIndex},
      {path: '/paperPolicy', component: PaperPolicyIndex},

      //考试
      {path: '/exam', component: ExamIndex},
      {path: '/exam/entrance', component: ExamEntrance},
      {path: '/exam/notice', component: ExamNotice},
      {path: '/exam/main', component: ExamMain},

      {path: '/scene/myJoin', component: SceneMyJoin},
      {path: '/scene/myOpen', component: SceneMyOpen},
      {path: '/user/', component: UserIndex},
      {path: '/scene/live/:sceneId', component: SceneLive},
      {path: '/help', component: Help},
    ]
  },
  {path: '/test', component: Test},
]
