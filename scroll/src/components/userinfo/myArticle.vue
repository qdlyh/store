<template>
    <div>
        <div class="user-header">
            <i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
            <h1>我的博文</h1>
            <i></i>
        </div>
        <loading v-show="loading"></loading>
        <div class="article-list" v-show="!loading">
            <div id="mescroll" class="mescroll">
                <div id="dataList" class="data-list" v-cloak>
                    <div class="article-box" v-for="(item,index) in list" :key="item.uuid">
                        <div @click="go(item)">
                            <h1>{{item.title}}</h1>
                            <div class="article-img">
                                <img v-for="(src,index) in item.images" v-lazy="src.image" v-if="index<3" alt="">
                            </div>
                            <div class="article-box-bottom">
                                <div class="article-msg">
                                    <span>{{item.count}}浏览</span>
                                    <span>{{item.messageCount}}评论</span>
                                </div>
                                <div>
                                    {{item.modifyDate}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="empty" v-show="!list.length">
                    <img src="../../../static/msg.png" alt="">
                    <p>暂时没有数据</p>
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
            list: [],
            mescroll: null,
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
        go(item){
            this.$router.push({ name: 'article', params: { id: item.uuid } });
            this.$store.state.msgTop = this.mescroll.getScrollTop();
        },
        upCallback(page) {
            this.getListDataFromNet(page.num, page.size, (curPageData) => {
                //curPageData = []; //打开本行注释,可演示列表无任何数据empty的配置
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
                    url: this.psta + '/getWxPersonalCenterPageNext?wxUserId=' + this.$parent.wxUserId + '&type=' + 3 + '&page=' + pageNum + '&size=' + pageSize,
                })
                    .then(response => {
                        //console.log(response)
                        let listData = [];
                        let listPage = response.data.data;
                        this.total = response.data.total;
                        this.loading = false;
                        for (let i = 0; i < listPage.length; i++) {
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
.article-list {
  margin-top: 0.625rem;
  .article-box {
    padding: 1.25rem 1.875rem;
    background: #fff;
    border-bottom: 1px solid #bdbdbd;
    h1 {
      font-size: 1.5rem;
      color: #3c3c3c;
      margin-bottom: 0.625rem;
      font-weight: normal;
      display: -webkit-box;
      /*! autoprefixer: off */
      -webkit-box-orient: vertical;
      /* autoprefixer: on */
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
    .article-img {
      display: flex;
      width: 100%;
      height: 8.75rem;
      overflow: hidden;
      img {
        width: 30%;
        height: 100%;
        margin: 0 5px;
      }
    }
    .article-box-bottom {
      display: flex;
      justify-content: space-between;
      color: #4545;
      font-size: 1.25rem;
      margin-top: 0.625rem;
    }
  }
}
</style>

