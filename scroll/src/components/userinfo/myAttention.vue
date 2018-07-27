<template>
  <div>
    <div class="myAttention">
      <div class="user-header">
        <i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
        <h1>我的关注</h1>
        <i></i>
      </div>
      <loading v-show="loading"></loading>
      <div id="mescroll" class="mescroll" v-show="!loading">
        <div id="dataList" class="data-list" v-cloak>
          <div class="attention">
            <div class="user-list" v-for="(item,index) in list" :key="item.uuid">
              <div class="attention-btn" :class="{active:item.isText=='关注'}" v-if="item.uuid!=$parent.wxUserId" @click="toggle(item)">{{item.isText}}</div>
              <div class="attention-box" @click="go(item)">
                <img v-lazy="item.image" alt="">
                <span>
                  <h1>{{item.nickName}}</h1>
                  <i>{{item.label}}</i>
                  <p>{{item.signature}}</p>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="empty" v-show="!list.length">
          <img src="../../../static/msg.png" alt="">
          <p>还没有任何内容</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: true,
      mescroll: null,
      list: [],
      size: 10,
    }
  },
  activated() {
    if (this.list.length >= 10) {
      this.size = this.list.length;
    }
    this.mescroll = new MeScroll("mescroll", {
      up: {
        auto: true,//初始化完毕,是否自动触发上拉加载的回调
        isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
        callback: this.upCallback, //上拉加载的回调
        page: {
          // num: this.page,
          size: this.size,
        },
        offset: 300,
        noMoreSize: 3,
        //htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p>',
        htmlNodata: '<p class="upwarp-nodata">-- 没有跟多内容 --</p>',
        toTop: { //配置回到顶部按钮
          src: "../../static/mescroll-totop.png", //默认滚动到1000px显示,可配置offset修改
          //offset: 1000
        },
      }
    });
    let dom = document.querySelector('#mescroll'); //找到滚动条主体内容
    dom.scrollTop = this.$store.state.msgTop;
  },
  deactivated() {
    this.mescroll.destroy();
  },
  methods: {
    go(item) {
      this.$router.push({ name: 'expertUser', params: { id: item.uuid } });
      this.$store.state.msgTop = this.mescroll.getScrollTop();
    },
    toggle(item) {
      let formData = new FormData();
      formData.append('expertsUserId', item.uuid);
      formData.append('wxUserId', this.$parent.wxUserId);
      if (item.isText == '关注') {
        this.$ajax({
          method: 'post',
          url: this.psta + '/getWxFocusOnExperts',
          data: formData,
        })
          .then(response => {
            item.isText = '已关注'
            //console.log(response)
          })
      } else {
        this.$ajax({
          method: 'post',
          url: this.psta + '/getWxFocusOnExperts',
          data: formData,
        })
          .then(response => {
            item.isText = '关注'
            //console.log(response)
          })
      }
    },
    upCallback(page) {
      this.getListDataFromNet(page.num, page.size, (curPageData) => {
        //curPageData=[]; //打开本行注释,可演示列表无任何数据empty的配置
        if (page.num == 1) this.list = [];
        let totalPage = this.total;
        //更新列表数据
        this.list = this.list.concat(curPageData);
        this.mescroll.endByPage(curPageData.length, totalPage); //必传参数(当前页的数据个数, 总页数)
      }, function () {
        this.mescroll.endErr();
      });
    },

    getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
      setTimeout(() => {
        this.$ajax({
          method: 'get',
          url: this.psta + '/getWxPersonalCenterPageNext?wxUserId=' + this.$parent.wxUserId + '&type=' + 2 + '&page=' + pageNum + '&size=' + pageSize,
        })
          .then(response => {
            //console.log(response)
            let listData = [];
            let listPage = response.data.data;
            this.total = response.data.total;
            this.loading = false;
            for (let i = 0; i < listPage.length; i++) {
              listPage[i].isText = '已关注';
              listData.push(listPage[i])
            }
            successCallback && successCallback(listData);//成功回调
          });
      }, 500)
    }
  }
}
</script>
<style lang="less" scoped>
.mescroll {
  position: fixed;
  top: 5.3rem;
  bottom: 0;
  height: auto;
}
.myAttention {
  .user-header {
    height: 5rem;
    line-height: 5rem;
    background: #fff;
    padding: 0 1.25rem;
    display: flex;
    justify-content: space-between;
    h1 {
      font-size: 2rem;
      text-align: center;
      color: #454545;
      font-weight: 400;
      margin-left: -1.875rem;
    }
    i {
      font-size: 2rem;
      color: #0aa6ff;
    }
  }
  .attention {
    .user-list {
      position: relative;
      .attention-box {
        display: flex;
        height: 14rem;
        padding: 1.25rem 1.875rem;
        background: #fff;
        img {
          width: 9.75rem;
          height: 9.75rem;
          background: #ccc;
          border-radius: 100%;
        }
        span {
          margin-left: 3.75rem;
          h1 {
            font-size: 1.75rem;
            color: #3c3c3c;
            font-weight: 600;
          }
          i {
            font-size: 1.125rem;
            color: #454545;
          }
          p {
            font-size: 1.25rem;
            color: #9c9c9c;
            display: -webkit-box;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
            -webkit-line-clamp: 3;
            overflow: hidden;
          }
        }
      }
      //关注按钮
      .attention-btn {
        min-width: 6rem;
        height: 2.8125rem;
        text-align: center;
        font-size: 1.5rem;
        color: #fff;
        padding: 5px;
        background: #9ea1a4; // #ff6c6c;
        border-radius: 0.3125rem;
        position: absolute;
        right: 15px;
        top: 10px;
      }
    }
  }
}
.active {
  background: #ff6c6c !important;
}
</style>

