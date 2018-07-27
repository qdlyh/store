<template>
  <div id="app">
    <transition :name="transitionName">
      <navigation>
        <router-view class="child-view"></router-view>
      </navigation>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      wxUserId: 6,
      settingId: 61,
      isCert: 3,
      isIn: 3,
      transitionName: 'vux-pop-in',
      count: null,
    }
  },

  //beforeRouteUpdate(to, from, next) {
  // // 如果isBack为true时，证明是用户点击了回退，执行slide-right动画
  // let isBack = this.$router.isBack
  // if (isBack) {
  //   this.transitionName = 'vux-pop-out'
  // } else {
  //   this.transitionName = 'vux-pop-in'
  // }
  // // 做完回退动画后，要设置成前进动画，否则下次打开页面动画将还是回退
  // this.$router.isBack = false
  // next()
  //},
  //created() {
  // function getUrlParam(key) {
  // // 获取参数
  // var url = window.location.search;
  // // 正则筛选地址栏
  // var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
  // // 匹配目标参数
  // var result = url.substr(1).match(reg);
  // //返回参数值
  // return result ? decodeURIComponent(result[2]) : null;
  // }
  // var type=getUrlParam('type'); //实例化
  // console.log(type);//type为马桶类型
  //},
  mounted() {
    let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    let htmlDom = document.getElementsByTagName('html')[0];
    htmlDom.style.fontSize = htmlWidth / 40 + 'px';
    if (htmlWidth > 750) { htmlWidth = 750; htmlDom.style.fontSize = htmlWidth / 40 + 'px'; }
  },

  // beforeUpdate() {
  //   this.wxUserId = this.$route.query.wxUserId;
  //   this.settingId = this.$route.query.settingId;
  //   if (this.wxUserId != undefined) localStorage.setItem("wxUserId", this.wxUserId);
  //   if (this.settingId != undefined) localStorage.setItem("settingId", this.settingId);
  //   if (this.wxUserId == undefined) this.wxUserId = localStorage.getItem("wxUserId");
  //   if (this.settingId == undefined) this.settingId = localStorage.getItem("settingId");
  //   if (this.settingId == 61 || this.settingId == 63) {
  //     this.$ajax({
  //       method: 'get',
  //       url: this.psta + '/findIsCert?wxUserId=' + this.wxUserId,
  //     })
  //       .then(response => {
  //         //console.log(response)
  //         this.isCert = response.data.data.isCert;
  //         this.isIn = response.data.data.isIn;
  //       })
  //   }

  // },
  watch: {
    '$route'(to, from) {
      this.count = this.$navigation.getRoutes().length; //路由切换动画关键
      if (to.name == 'expertList') {
        //大众论坛，专家论坛拦截
        if (this.settingId != 62) {
          this.$router.push('/');
        } else {
          this.$router.push('/expertList');
        }
      }
      if (to.name == 'enterprise' || to.name == 'resume') {
        //企业认证，志愿者申请拦截
        if (this.settingId != 61) {
          this.$router.push('/');
        }
      }
      if (to.name == 'enterText' || to.name == 'enterForm' || to.name == 'uploadFile') {
        //企业入驻拦截
        if (this.settingId != 63) {
          this.$router.push('/');
        }
      }
    },
    count(enter, leave) {
      if (enter > leave) {
        //进入
        this.transitionName = 'vux-pop-in'
      } else {
        //离开
        this.transitionName = 'vux-pop-out'
      }
    }
  },
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

* {
  padding: 0;
  margin: 0;
  list-style-type: none;
  text-decoration: none;
  box-sizing: border-box;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
i {
  font-style: normal;
}
body {
  background: #f3f3f3;
}
input,
textarea {
  outline: none;
}

#app {
  margin: 0 auto;
  // max-width: 750px;
  letter-spacing: 1px;
  -webkit-overflow-scrolling: touch; //在ios上滑动不流畅样式设置处理
  word-break: break-all; //字母数字强制换行
  //mescroll
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.child-view {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
}
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 0.3s;
  backface-visibility: hidden;
  perspective: 1000;
}

.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.vux-pop-in-leave-active {
    opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

//msg.png
.empty {
  margin: 3.125rem auto;
  text-align: center;
  color: #9a9a9a;
  font-size: 1.5rem;
  img {
    width: 100%;
    height: 100%;
  }
}

/* 懒加载图片过渡效果 */
// img[lazy='loaded'] {
//   animation: fade 0.5s;
// }
// @keyframes fade {
//   0% {
//     opacity: 0;
//   }
//   100% {
//     opacity: 1;
//   }
// }

img[lazy='loading'] {
  /*width: 100px;*/
  background-position: center center !important;
  background: #ccc;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

//首页轮播
// .swiper-img {
//   width: 100%;
//   height: 100%;
//   overflow: hidden;
//   background-position: center center;
//   background-repeat: no-repeat;
//   background-size: cover;
// }

.header {
  display: flex;
  justify-content: space-between;
  background: #00cc9e;
  height: 5rem;
  line-height: 5rem;
  padding: 0 3rem;
  span {
    color: #fff;
    height: 4rem;
    font-size: 1.75rem;
  }
  .headerActive {
    border-bottom: 2px solid #fff;
  }
}

/* 按钮 */
.btn-blue {
  width: 60%;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
  margin: 3.125rem auto;
  background: #3eb0ff;
  border-radius: 0.625rem;
  font-size: 1.75rem;
  color: #fff;
  &:active {
    border-radius: 0.625rem;
    background: #3e90ff;
  }
}

//安装产品介绍
.introduce {
  .v-html {
    img {
      width: 100%;
    }
  }
}
.article {
  .article-html {
    font-size: 1.5rem;
    color: #454545;
    img {
      width: 100%;
    }
  }
}

//义诊文章
.yzArticle {
  .v-html {
    font-size: 1.5rem;
    color: #454545;
    img {
      width: 100%;
    }
  }
}

//申请安装页面
.input-box {
  .weui-cell {
    height: 6.25rem !important;
    line-height: 6.25rem !important;
  }
  //底部选择器选中文字，input placeholder提示文字
  .vux-popup-picker-placeholder,
  .vux-cell-placeholder {
    font-size: 1.5rem;
  }
  //底部选择器左侧标题文字大小
  .weui-label {
    width: 8.5rem !important;
    font-size: 1.5rem;
    color: #454545;
    margin-left: -7px;
  }
  //选中颜色
  .vux-cell-value {
    font-size: 1.5rem;
    color: #454545 !important;
  }
}

//弹出洁肠仪高度
.weui-cell__bd {
  font-size: 1.75rem;
  height: 5rem;
  line-height: 5rem;
}
//弹出洁肠仪产品钩
.weui-icon-checked {
  &::before {
    font-size: 1.75rem !important;
  }
}

// vux框margin
.weui-cells {
  margin: 0 !important;
}
.redact-msg {
  .weui-cell__ft {
    // padding-right: 1.125rem !important;
    font-size: 1.5rem;
  }
}

//城市选择器
.redact-msg-input {
  .weui-cell {
    height: 5rem;
    line-height: 5rem;
    ::after {
      margin-top: -5px !important;
      right: 0px !important;
    }
  }
  .weui-label {
    font-size: 1.5rem;
    color: #454545;
    margin-left: -3px;
  }
  .vux-cell-placeholder {
    font-size: 1.5rem;
  }
  .vux-cell-value {
    color: #454545 !important;
    font-size: 1.5rem;
  }
}

//入驻表单
.enter-input {
  .vux-cell-box {
    height: 5rem;
    line-height: 5rem;
    font-size: 1.5rem;
    color: #454545;
    padding-left: 1.25rem;
  }
  .weui-cell {
    padding: 0 15px 0 0 !important;
  }
  .vux-popup-picker-select {
    // text-align: left !important;
    padding: 0 0 0 1.875rem !important;
  }
  .vux-cell-value {
    color: #454545 !important;
    font-size: 1.5rem;
  }
}

//收货地址
.address-list {
  .vux-label-desc {
    display: -webkit-box;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 1.25rem !important;
    color: #9c9c9c;
    padding-top: 0.3125rem;
  }
}

//勾选设为默认地址
.check-input {
  margin: 1.875rem 0 3.125rem 0;
  text-align: center;
  .vux-check-icon > span {
    color: #9c9c9c !important;
    font-size: 1.5rem !important;
  }
}

//错误提示框
.weui-toast {
  padding: 10px !important;
  min-width: 15.625rem !important;
}

//tab下横线
.vux-tab-ink-bar {
  z-index: 999;
}

//userTypeForm性别和城市选择
.Form-user {
  .vux-popup-picker-placeholder {
    color: #454545 !important;
  }
}

//自定义没有更多内容，不是mescroll的
.isHave {
  text-align: center;
  margin: 1.25rem auto;
  color: gray;
  font-size: 12px;
}
</style>
