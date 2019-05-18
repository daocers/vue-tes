
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
const SceneLive = () => import('../page/scene/live');
const UserIndex = () => import('../page/user/list.vue');
const ManagerSelect = () => import('../page/user/select.vue');
const ChangePass = () => import("../page/user/changePass.vue")
const FastOpen = () => import('../page/scene/fast_open');
const Index = () => import('../page/index/index.vue');
const Paper = () => import('../page/paper/list');
const PaperOfScene = () => import("../page/paper/score")


const Login = () => import('../page/index/login.vue');
const About = () => import('../page/index/about.vue');
const Single = () => import('../page/single/list');
const Multi = () => import('../page/multi/list');
const Judge = () => import('../page/judge/list');
const Help = () => import("../page/help/index");
const Summary = () => import("../page/index/summary");
const Practise = () => import("../page/number/index")
const PractiseMain = () => import("../page/number/practise")
const PractiseList = () => import("../page/number/practiseList")

const PaperPolicyIndex = () => import('../page/paperPolicy/list.vue')
const PaperPolicyAdd = () => import("../page/paperPolicy/add")

const Stat = () => import("../page/stat/index")
const SceneMonitor = () => import("../page/scene/monitor")


const Answer = () => import("../page/answer/list")
// const Login = (r) => require(['../page/index/login.vue'])

export default [
  {path: '/login', component: Login},
  {
    path: '/',
    component: Index,
    children: [
      {path: '/', component: Summary},
      {path: '/stat', component: Stat},
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
      {path: '/practise', component: Practise},
      {path: '/practise/main', component: PractiseMain},
      {path: '/practise/list', component: PractiseList},
      {path: '/scene/monitor', component: SceneMonitor},
      {path: "/answer", component: Answer},

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
      //试卷策略编辑
      {path: '/paperPolicy', component: PaperPolicyIndex},
      {path: '/paperPolicy/edit', component: PaperPolicyAdd},

      //考试
      {path: '/exam', component: ExamIndex},
      {path: '/exam/entrance', component: ExamEntrance},
      {path: '/exam/notice', component: ExamNotice},
      {path: '/exam/main', component: ExamMain},

      {path: '/scene/myJoin', component: SceneMyJoin},
      {path: '/scene/myOpen', component: SceneMyOpen},
      {path: '/user/', component: UserIndex},
      {path: '/user/changePass', component: ChangePass},
      {path: '/user/select', component: ManagerSelect},
      {path: '/scene/live', component: SceneLive},
      {path: '/help', component: Help},
      {path: '/about', component: About},

    ]
  },
  {path: '/test', component: Test},
]
