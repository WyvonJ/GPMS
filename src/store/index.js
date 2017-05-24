import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isProgressbar: false,
    isSnackbar: false,
    snackbarText: '',
    user: {
      account: '',
      password: '',
      username: '',
      usertype: '',
      isFirstLogin: true
    },
    notification: '',
    _stu_TopicInCart: [{
      _id: 16,
      title: ' 元素用于在网页中包含对象',
      details: 'form 返回对对象的父表单的引用。height  设置或返回对象的高度。hspace  设置或返回对象的水平外边距。name  设置或返回对象的名称。standby 设置或返回在加载对象时返回的消息。type  设置或返回通过 data 属性下载的数据的内容类型。',
      category: 0
    }, {
      _id: 17,
      title: ' 元素用于在网页中包含对象',
      details: 'form 返回对对象的父表单的引用。height  设置或返回对象的高度。hspace  设置或返回对象的水平外边距。name  设置或返回对象的名称。standby 设置或返回在加载对象时返回的消息。type  设置或返回通过 data 属性下载的数据的内容类型。',
      category: 1
    }],
    _stu_TopicInTable: [{
      _id: 9,
      category: 1,
      title: '基于3ds max的城市小区动画漫游设计与实现',
      details: '3ds max 是三维建模、动画制作的渲染软件，被广泛应用于制作角色动画、室内外效果图、游戏开发、建筑动画、影视动画、虚拟现实等领域。为了更好的让大众了解城市小区的建设和发展情况，我们可以用三维动画的形式来展示其全貌，本课题要求结合专业知识利用3ds max等软件实现虚拟城市小区动画漫游。',
      restriction: 3,
      secondstudents: [],
      thirdstudents: [3]
    }, {
      _id: 2,
      category: 0,
      title: '基于Unity3D的VR项目设计与实现',
      details: 'VR即虚拟现实，指综合利用计算机图形系统和各种实现及控制等接口设备，在计算机上生成的、可交互的三维环境中提供沉浸感觉的技术。虚拟现实技术实现的载体是虚拟现实仿真平台。VR技术可广泛的应用于规划展示、工业仿真、旅游教学等众多领域。利用Unity3D实现一个VR虚拟现实体验项目，给用户带来身临其境的感受。',
      firststudents: [1, 3],
      secondstudents: [],
      thirdstudents: [3]
    }, {
      _id: 3,
      category: 0,
      title: '图像的层次剖分算法及应用',
      details: '对一张数字图像进行剖分，用一些基本的几何面片进行逼近。这样的做法其实建起了离散到连续、数字到矢量、图像到几何的桥梁。应用领域也很广泛，如图像去噪、图像缩放、图像编辑、图像信息安全等多方面。',
      restriction: 2,
      firststudents: [1, 3],
      secondstudents: [],
      thirdstudents: [3]
    },{
      _id: 19,
      category: 1,
      title: '基于3ds max的城市小区动画漫游设计与实现',
      details: '3ds max 是三维建模、动画制作的渲染软件，被广泛应用于制作角色动画、室内外效果图、游戏开发、建筑动画、影视动画、虚拟现实等领域。为了更好的让大众了解城市小区的建设和发展情况，我们可以用三维动画的形式来展示其全貌，本课题要求结合专业知识利用3ds max等软件实现虚拟城市小区动画漫游。',
      restriction: 3,
      secondstudents: [1],
    }, {
      _id: 22,
      category: 0,
      title: '基于Unity3D的VR项目设计与实现',
      details: 'VR即虚拟现实，指综合利用计算机图形系统和各种实现及控制等接口设备，在计算机上生成的、可交互的三维环境中提供沉浸感觉的技术。虚拟现实技术实现的载体是虚拟现实仿真平台。VR技术可广泛的应用于规划展示、工业仿真、旅游教学等众多领域。利用Unity3D实现一个VR虚拟现实体验项目，给用户带来身临其境的感受。',
      firststudents: [1, 3],
      thirdstudents: [3]
    }, {
      _id: 83,
      category: 0,
      title: '图像的层次剖分算法及应用',
      details: '对一张数字图像进行剖分，用一些基本的几何面片进行逼近。这样的做法其实建起了离散到连续、数字到矢量、图像到几何的桥梁。应用领域也很广泛，如图像去噪、图像缩放、图像编辑、图像信息安全等多方面。',
      restriction: 2,
      firststudents: [1, 3],
      secondstudents: [],
      thirdstudents: [3]
    },{
      _id: 79,
      category: 1,
      title: '基于3ds max的城市小区动画漫游设计与实现',
      details: '3ds max 是三维建模、动画制作的渲染软件，被广泛应用于制作角色动画、室内外效果图、游戏开发、建筑动画、影视动画、虚拟现实等领域。为了更好的让大众了解城市小区的建设和发展情况，我们可以用三维动画的形式来展示其全貌，本课题要求结合专业知识利用3ds max等软件实现虚拟城市小区动画漫游。',
      restriction: 3,
      secondstudents: [],
      thirdstudents: [3]
    },
     ],
    _stu_TopicComfirmed: {/*
      name: 'XXX',
      tel: '18812345678',
      email:'vue@gg.com',
      office: 'xxx楼110',
      qq: '10541981',
      wechat: 'wcasd',
      _id: 16,
      title: '于3ds max的城市小区动画漫游设计与实现',
      details: '3ds max 是三维建模、动画制作的渲染软件，被广泛应用于制作角色动画、室内外效果图、游戏开发、建筑动画、影视动画、虚拟现实等领域。为了更好的让大众了解城市小区的建设和发展情况，我们可以用三维动画的形式来展示其全貌，本课题要求结合专业知识利用3ds max等软件实现虚拟城市小区动画漫游。',
      category: 0,
      state: 0*/
    },
    _stu_Account: {},
    _tch_TopicCreated: {
      account: '',
      fields: '',
      category: '',
      title: '',
      detail: '',
      availableSum: ''
    },
    _tch_TopicCreatedAll: [{
      _id: 16,
      category: 0,
      title: '基于java的后端管理系统设计，使用Vuejs技术栈实现',
      details: '每个 Vue 实例在被创建之前都要经过一系列的初始化过程。例如，实例需要配置数据观测(data observer)、编译模版、挂载实例到 DOM ，然后在数据变化时更新 DOM 。在这个过程中，实例也会调用一些 生命周期钩子',
      restriction: 3
    }],
    _tch_StudentInCard: [{
      _id: 1,
      title: '基于java的后端管理系统设计，使用Vuejs技术栈实现',
      available: 3,
      students: [{
        isselected: false,
        _id: '1030513430',
        name: '吴吉',
        intro: '每个实例在被创建之前都要经过一系列的初始化过程。例如，实例需',
        gender: '男',
        gpa: '4.0',

      }, {
        isselected: false,
        _id: '1030513431',
        name: '徐佳文',
        intro: '每个 Vue 实例在被创建之前都要经过一系列的初始化过程。例如，实例需要配置数据观测(data observer)',
        gender: '男',
        gpa: '4.0',

      }, {
        isselected: false,
        _id: '1030513432',
        name: '杨浩天',
        intro: '后埔段',
        gender: '女',
        gpa: '4.0',

      }, {
        isselected: false,
        _id: '1030513433',
        name: '住匆匆',
        intro: 'wusdfhj',
        gender: '女',
        gpa: '4.0',

      }, {
        isselected: false,
        _id: '1030513433',
        name: '住匆匆',
        intro: '66666',
        gender: '男',
        gpa: '4.0',

      }]
    }, {
      _id: 2,
      title: '基于java的后端管理系统设计，使用Vuejs技术栈实现',
      available: 3,
      students: [{
        isselected: false,
        _id: '1030513430',
        name: '陈婷飞',
        intro: '每个 Vue 实例在被创建之前',
        gender: '男',
        gpa: '4.0',

      }, {
        isselected: true,
        _id: '1030513433',
        name: '张晓月',
        intro: 'henhao',
        gender: '女',
        gpa: '4.0',

      }, {
        isselected: false,
        _id: '1030513433',
        name: '段宜康',
        intro: '基于java的后端管理系统设计，使用Vuejs技术栈实现',
        gender: '男',
        gpa: '4.0',

      }]
    }],
    _tch_StudentConfirmed: [{
      _id: 46,
      title: '江南大学图书馆阅读信息的价值发掘与可视化表达',
      finalstudents: [{
        _id: '1030515120',
        name: '异步',
        gender: '男',
        tel: '18861853209',
        email: 'donaldjtrump@gmail.com',
        qq: '852663214',
        wechat: 'donaldjtrump'
      }, {
        _id: '1030515120',
        name: '样式表',
        gender: '女',
        tel: '18861853209',
        email: 'donaldjtrump@gmail.com',
        qq: '852663214',
        wechat: 'donaldjtrump'
      }]
    }, {
      _id: 46,
      title: '江南大学图书馆阅读信学图书馆阅读信息的价值发掘与可视化表达',
      finalstudents: [{
        _id: '1030515120',
        name: '异步',
        gender: '男',
        tel: '18861853209',
        email: 'donaldjtrump@gmail.com',
        qq: '852663214',
        wechat: 'donaldjtrump'
      }]
    }, {
      _id: 46,
      title: '江南大学图书馆阅读信息的价值发掘与可视化表达',
      finalstudents: [{
        _id: '1030515120',
        name: '延时',
        gender: '女',
        tel: '18861853209',
        email: 'donaldjtrump@gmail.com',
        qq: '852663214',
        wechat: 'donaldjtrump'
      }]
    }, {
      _id: 46,
      title: '江南大学图书馆阅读信息的价值发掘与可视化表达',
      finalstudents: [{
        _id: '1030515120',
        name: '异步',
        gender: '男',
        tel: '18861853209',
        email: 'donaldjtrump@gmail.com',
        qq: '852663214',
        wechat: 'donaldjtrump'
      }, {
        _id: '1030515120',
        name: '异步',
        gender: '男',
        tel: '18861853209',
        email: 'donaldjtrump@gmail.com',
        qq: '852663214',
        wechat: 'donaldjtrump'
      }, {
        _id: '1030515120',
        name: '样式表',
        gender: '女',
        tel: '18861853209',
        email: 'donaldjtrump@gmail.com',
        qq: '852663214',
        wechat: 'donaldjtrump'
      }]
    }],
    _tch_Account: {},
    _stu_tch_Group: {},
    _adm_StuAccounts: [],
    _adm_StuTopics: [{
      _id: '1030513410',
      name: '高宇',
      teacher: '陈伟',
      final: {
        _id: 66,
        title: '毕业设计管理大系统'
      }
    }, {
      _id: '1030513410',
      name: '高宇',
      teacher: '陈伟',
      final: {
        _id: 66,
        title: '毕业设计管理大系统'
      }
    }, {
      _id: '1030513410',
      name: '高宇',
      teacher: '陈伟',
      final: {
        _id: 66,
        title: '毕业设计管理大系统'
      }
    }, {
      _id: '1030513410',
      name: '高宇',
      teacher: '陈伟',
      final: {
        _id: 66,
        title: '毕业设计管理大系统'
      }
    }],
    _adm_TchAccounts: [{
      _id:'2030513402',
      name:'李晓光',
      password:'16asdf',
      tel:'18861853209',
      email:'12389q2389@waf.com',
      qq:'46844231',
      office:'503'
    }],
    _adm_TchTopics: [{
      name: '刘云',
      topics: [{
        _id: 110,
        title: '基于java的后端管理系统设计，使用Vuejs技术栈实现',
        finalstudents: [{
          _id: '1030513465',
          name: '高义'
        }]
      }, {
        _id: 16,
        title: '基啊额外人田阿尔泰用Vuejs技术栈实现',
        finalstudents: [{
          _id: '1030513465',
          name: '阿斯蒂芬'
        }, {
          _id: '1030513465',
          name: '高澳网耳塞义'
        }]  
      }]
    },{
      name: '水电',
      topics: [{
        _id: 110,
        title: '基于java的后端管理系统设计，使用Vuejs技术栈实现',
        finalstudents: [{
          _id: '1030513465',
          name: '高义'
        }, {
          _id: '1030513465',
          name: '带哦'
        },{
          _id: '1030513465',
          name: '倒萨'
        }]
      }, {
        _id: 16,
        title: '基啊额外人田阿尔泰用Vuejs技术栈实现',
        finalstudents: [{
          _id: '1030513465',
          name: '阿斯蒂芬'
        }, {
          _id: '1030513465',
          name: '高澳网耳塞义'
        }]  
      }]
    },{
      name: '阿里斯柯达',
      topics: [{
        _id: 110,
        title: '基于java的后端管理系统设计，使用Vuejs技术栈实现',
        finalstudents: [{
          _id: '1030513465',
          name: '高义'
        }, {
          _id: '1030513465',
          name: '带哦'
        },{
          _id: '1030513465',
          name: '倒萨'
        }]
      }, {
        _id: 16,
        title: '基啊额外人田阿尔泰用Vuejs技术栈实现',
        finalstudents: [{
          _id: '1030513465',
          name: '阿斯蒂芬'
        }, {
          _id: '1030513465',
          name: '高澳网耳塞义'
        }]  
      }]
    },{
      name: '阿里斯柯达',
      topics: [{
        _id: 110,
        title: '基于java的后端管理系统设计，使用Vuejs技术栈实现',
        finalstudents: [{
          _id: '1030513465',
          name: '高义'
        }, {
          _id: '1030513465',
          name: '带哦'
        },{
          _id: '1030513465',
          name: '倒萨'
        }]
      }, {
        _id: 16,
        title: '基啊额外人田阿尔泰用Vuejs技术栈实现',
        finalstudents: [{
          _id: '1030513465',
          name: '阿斯蒂芬'
        }, {
          _id: '1030513465',
          name: '高澳网耳塞义'
        }]  
      }]
    },{
      name: '阿里斯柯达',
      topics: [{
        _id: 110,
        title: '基于java的后端管理系统设计，使用Vuejs技术栈实现',
        finalstudents: [{
          _id: '1030513465',
          name: '高义'
        }, {
          _id: '1030513465',
          name: '带哦'
        },{
          _id: '1030513465',
          name: '倒萨'
        }]
      }, {
        _id: 16,
        title: '基啊额外人田阿尔泰用Vuejs技术栈实现',
        finalstudents: [{
          _id: '1030513465',
          name: '阿斯蒂芬'
        }, {
          _id: '1030513465',
          name: '高澳网耳塞义'
        }]  
      }]
    }]
  },
  mutations,
  actions,
  getters,
  strict: process.env.NODE_ENV !== 'production'
})

export default store
