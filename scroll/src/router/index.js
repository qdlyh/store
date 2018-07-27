import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [{
      path: '/',
      name: 'index',
      component: () =>
        import ('@/components/index/index'),
      meta: {
        title: '',
        keepAlive: true
      }
    },
    {
      //页面404返回首页
      path: '*',
      name: 'index',
      component: () =>
        import ('@/components/index/index'),
      meta: {
        title: '',
        keepAlive: true
      }
    },
    {
      //产品介绍
      path: '/introduce',
      name: 'introduce',
      component: () =>
        import ('@/components/index/introduce'),
      meta: {
        title: '',
        keepAlive: true
      }
    },
    {
      //产品安装表
      path: '/introduceForm',
      name: 'introduceForm',
      component: () =>
        import ('@/components/index/introduceForm')
    },
    {
      //用户列表
      path: '/userList',
      name: 'userList',
      component: () =>
        import ('@/components/index/userList'),
      meta: {
        title: '',
        keepAlive: true
      }
    },
    {
      //文章列表
      path: '/articleList',
      name: 'articleList',
      component: () =>
        import ('@/components/index/articleList'),
      meta: {
        title: '',
        keepAlive: true
      }
    },
    {
      //用户类型信息    
      path: '/userType',
      name: 'userType',
      component: () =>
        import ('@/components/userinfo/userType')
    },
    {
      //用户类型信息编辑
      path: '/userTypeForm',
      name: 'userTypeForm',
      component: () =>
        import ('@/components/userinfo/userTypeForm'),
      meta: {
        title: '',
        keepAlive: true
      }
    },
    {
      //我的提问和回答
      path: '/myIssue/:id',
      name: 'myIssue',
      component: () =>
        import ('@/components/userinfo/myIssue'),
      meta: {
        title: '',
        keepAlive: true
      }
    },
    {
      //我的关注
      path: '/myAttention',
      name: 'myAttention',
      component: () =>
        import ('@/components/userinfo/myAttention'),
      meta: {
        title: '',
        keepAlive: true
      }
    },
    {
      //收藏和历史记录
      path: '/mySchistory/:id',
      name: 'mySchistory',
      component: () =>
        import ('@/components/userinfo/mySchistory'),
      meta: {
        title: '',
        keepAlive: true
      }
    },
    {
      //我的博文
      path: '/myArticle',
      name: 'myArticle',
      component: () =>
        import ('@/components/userinfo/myArticle'),
      meta: {
        title: '',
        keepAlive: true
      }
    },
    {
      //我的消息
      path: '/myMessage',
      name: 'myMessage',
      component: () =>
        import ('@/components/userinfo/myMessage'),
      meta: {
        title: '',
        keepAlive: true
      }
    },
    {
      //收货地址
      path: '/myAddress',
      name: 'myAddress',
      component: () =>
        import ('@/components/userinfo/myAddress')
    },
    {
      //收货地址编辑
      path: '/myAddressForm',
      name: 'myAddressForm',
      component: () =>
        import ('@/components/userinfo/myAddressForm')
    },
    {
      //设置
      path: '/safety',
      name: 'safety',
      component: () =>
        import ('@/components/userinfo/safety'),
      meta: {
        title: '',
        keepAlive: true
      }
    },
    {
      //手机绑定
      path: '/myPhone',
      name: 'myPhone',
      component: () =>
        import ('@/components/userinfo/myPhone')
    },
    {
      //邮箱绑定
      path: '/myEmail',
      name: 'myEmail',
      component: () =>
        import ('@/components/userinfo/myEmail')
    },
    {
      //我的钱包
      path: '/myWallet',
      name: 'myWallet',
      component: () =>
        import ('@/components/money/myWallet')
    },
    {
      //充钱
      path: '/addition',
      name: 'addition',
      component: () =>
        import ('@/components/money/addition')
    },
    {
      //明细
      path: '/detail',
      name: 'detail',
      component: () =>
        import ('@/components/money/detail')
    },
    // {
    //   //安全设置
    //   path: '/safety',
    //   name: 'safety',
    //   component: () =>
    //     import ('@/components/money/safety')
    // },
    {
      //修改密码
      path: '/password',
      name: 'password',
      component: () =>
        import ('@/components/money/password')
    },
    {
      //入驻
      path: '/enterText',
      name: 'enterText',
      component: () =>
        import ('@/components/enter/enterText')
    },
    {
      //入驻申请表
      path: '/enterForm',
      name: 'enterForm',
      component: () =>
        import ('@/components/enter/enterForm')
    },
    {
      //入驻资料上传
      path: '/uploadFile',
      name: 'uploadFile',
      component: () =>
        import ('@/components/enter/uploadFile')
    },
    {
      //志愿者/专家认证
      path: '/resume/:id',
      name: 'resume',
      component: () =>
        import ('@/components/ac/resume')
    },
    {
      //企业认证
      path: '/enterprise',
      name: 'enterprise',
      component: () =>
        import ('@/components/ac/enterprise')
    },
    {
      path: '/article/:id',
      name: 'article',
      component: () =>
        import ('@/components/index/article'),
      meta: {
        title: '',
        keepAlive: false
      }
    },
    {
      path: '/dialogue/:id',
      name: 'dialogue',
      component: () =>
        import ('@/components/dialogue'),
      meta: {
        title: '',
        keepAlive: true
      }
    },
    {
      path: '/message/:id',
      name: 'message',
      component: () =>
        import ('@/components/message'),
      meta: {
        title: '',
        keepAlive: true
      }
    },
    {
      path: '/user/:id',
      name: 'user',
      component: () =>
        import ('@/components/user'),
      meta: {
        title: '',
        keepAlive: true
      }
    },
    {
      path: '/questions/:id',
      name: 'questions',
      component: () =>
        import ('@/components/questions')
    },
    {
      //义诊列表
      path: '/yzList',
      name: 'yzList',
      component: () =>
        import ('@/components/yizhen/yzList'),
      meta: {
        title: '',
        keepAlive: true
      }
    },
    {
      //义诊文章
      path: '/yzArticle/:id',
      name: 'yzArticle',
      component: () =>
        import ('@/components/yizhen/yzArticle'),
      meta: {
        title: '',
        keepAlive: true
      }
    },
    {
      //专家信息
      path: '/expertUser/:id',
      name: 'expertUser',
      component: () =>
        import ('@/components/expertUser'),
      meta: {
        title: '',
        keepAlive: true
      }
    },
    {
      //专家大众天地
      path: '/forum',
      name: 'forum',
      component: () =>
        import ('@/components/forum/forum'),
      meta: {
        title: '',
        keepAlive: true
      }
    },
    {
      //专家大众天地
      path: '/forumArticle/:id',
      name: 'forumArticle',
      component: () =>
        import ('@/components/forum/forumArticle'),
      // meta: {
      //   title: '文章',
      //   keepAlive: true
      // }
    },
    {
      //专家大众天地
      path: '/forumMsg/:id',
      name: 'forumMsg',
      component: () =>
        import ('@/components/forum/forumMsg'),
      meta: {
        title: '',
        keepAlive: true
      }
    },
    {
      //专家大众天地
      path: '/forumReply/:id',
      name: 'forumReply',
      component: () =>
        import ('@/components/forum/forumReply'),
      meta: {
        title: '',
        keepAlive: true
      }
    },
    {
      //专家列表
      path: '/expertList',
      name: 'expertList',
      component: () =>
        import ('@/components/expert/expertList'),
      meta: {
        title: '',
        keepAlive: true
      }
    }
  ]
})
export default router;
// router.beforeEach((to, from, next) => {
//   const toDepth = to.path.split('/').length
//   const fromDepth = from.path.split('/').length
//   //console.log(to.path.split('/'))
//   if (toDepth < fromDepth||toDepth == fromDepth) {
//     console.log(toDepth,'|',fromDepth)
//     from.meta.keepAlive = false
//     to.meta.keepAlive = true
//   }
//   if (to.meta.title) {
//     document.title = to.meta.title;
//   }
//   next();
// });
