<template>
    <div>
        <div class="expertAll">
            <tab>
                <tab-item @on-item-click="onItemClick(index)" :selected="index==isShow" v-for="(item,index) in tab" :key="index">{{item.tab}}</tab-item>
            </tab>

            <scroll ref="scroll" :data="list0" :pullUpLoad="pullUpLoad" @pullingUp="onPullingUp" v-show="isShow==0">
                <div class="user-list" v-for="(item,index) in list0" :key="item.uuid">
                    <div class="user" @click="$router.push({ name: 'expertUser', params: { id: item.uuid } })">
                        <img v-lazy="item.image" alt="">
                        <span>
                            <h1>{{item.nickName}}</h1>
                            <i>{{item.label}}</i>
                            <p>{{item.signature}}</p>
                        </span>
                    </div>
                </div>
            </scroll>

            <div class="article-box" v-show="isShow==1">
                <scroll ref="scroll" :data="list1" :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="onPullingUp" @pullingDown="onPullingDown" @pullingUp="onPullingUp">
                    <div class="article-list" v-for="(item,index) in list1" :key="item.uuid">
                        <div @click="goMsg(item)">
                            <h1>{{item.title}}</h1>
                            <div class="article-box-bottom">
                                <div>
                                    {{item.createDate}}
                                </div>
                                <div class="article-msg">
                                    <span>{{item.replyCount}}回答</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </scroll>
                <div class="questions-btn" @click="go()">
                    提问
                </div>
            </div>

            <scroll ref="scroll" :data="list2" :pullUpLoad="pullUpLoad" @pullingUp="onPullingUp" v-show="isShow==2">
                <div v-for="(item,index) in list2" :key="item.uuid">
                    <div class="questions-history" @click="goMsg(item)">
                        <h1>{{item.title}}</h1>
                        <div class="article-box-bottom">
                            <div>
                                {{item.createDate}}
                            </div>
                            <div class="article-msg">
                                <span>{{item.replyCount}}回答</span>
                            </div>
                        </div>
                    </div>
                </div>
            </scroll>

        </div>
    </div>
</template>
<script>
import Scroll from '../../components/common/Scroll.vue'
import { Tab, TabItem } from 'vux'
import { setTimeout } from 'timers';
export default {
    components: {
        Tab,
        TabItem,
        Scroll
    },
    data() {
        return {
            tab: [{ tab: '专家列表', top: 0, i: 0 }, { tab: '咨询专区', top: 10, i: 1 }, { tab: '我的提问', top: 0, i: 2 }],
            pullUpLoad: {
                threshold: 10,
                txt: { more: '', noMore: '暂无更多数据' }
            },
            isShow: 1,
            page0: 0,
            page1: 0,
            page2: 0,
            size: 10,
            pullDownRefreshObj: true,
            pullUpLoadObj: true,
            pullDownRefresh: true,
            pullUpLoad: true,
            list0: [],
            list1: [],
            list2: [],
        }
    },
    activated() {
        this.onPullingUp();
    },
    methods: {
        onPullingDown() {
            if (this.isShow == 0) {
                this.page0 = 0;
                this.list0 = [];
                this.onPullingUp()
                this.$refs.scroll.forceUpdate();
            }
            if (this.isShow == 1) {
                // this.page1 = 0;
                // this.list1 = [];
                // this.onPullingUp();
                // this.$refs.scroll.forceUpdate();
                setTimeout(() => {
                    this.$ajax({
                        method: 'get',
                        url: this.psta + '/getWxConsultingList?page=' + ++this.page1 + '&size=' + this.size,
                        //headers:{'token':'abc123'}
                    })
                        .then(response => {
                            let data = response.data.data;
                            if (data.length) {
                                let total = response.data.total;
                                for (let i = 0; i < data.length; i++) {
                                    this.list1.unshift(data[i]);
                                }
                            } else {
                                this.onPullingUp();
                            }
                        });
                }, 600)
            }
            if (this.isShow == 2) {
                this.page2 = 0;
                this.list2 = [];
                this.onPullingUp()
                this.$refs.scroll.forceUpdate();
            }
        },

        go() {
            this.$router.push({ name: 'questions', params: { id: 0 } });
        },

        goMsg(item) {
            this.$router.push({ name: 'forumMsg', params: { id: item.uuid } })
        },

        onItemClick(index) {
            this.isShow = index;
            this.onPullingUp();
        },

        onPullingUp() {
            if (this.isShow == 0) {
                this.$ajax({
                    method: 'get',
                    url: this.psta + '/getWxExpertsList?page=' + ++this.page0 + '&size=' + this.size,
                })
                    .then(response => {
                        let data = response.data.data;
                        let total = response.data.total;
                        this.list0 = this.list0.concat(data);
                    });
            }

            if (this.isShow == 1) {
                setTimeout(() => {
                    this.$ajax({
                        method: 'get',
                        url: this.psta + '/getWxConsultingList?page=' + ++this.page1 + '&size=' + this.size,
                    })
                        .then(response => {
                            let data = response.data.data;
                            let total = response.data.total;
                            this.list1 = this.list1.concat(data);
                        });
                }, 500)
            }

            if (this.isShow == 2) {
                this.$ajax({
                    method: 'get',
                    url: this.psta + '/getWxConsultingList?wxUserId=' + this.$parent.wxUserId + '&page=' + ++this.page2 + '&size=' + this.size,
                })
                    .then(response => {
                        let data = response.data.data;
                        let total = response.data.total;
                        this.list2 = this.list2.concat(data)
                    });
            }
        },
    },
}
</script>
<style lang="less" scoped>
.wrapper {
  position: absolute;
  left: 0;
  top: 45px;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.expertAll {
  .user-list {
    .user {
      display: flex;
      height: 14rem;
      margin-top: 0.3125rem;
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
  }
}

.article-box {
  .article-list {
    margin-top: 0.625rem;
    padding: 1.25rem 1.875rem;
    background: #fff;
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
    .article-box-bottom {
      display: flex;
      justify-content: space-between;
      color: #4545;
      font-size: 1.25rem;
      margin-top: 1.875rem;
      .article-msg {
        background: #f3f3f3;
        width: 6.25rem;
        height: 2rem;
        border-radius: 10px;
        color: #454545;
        text-align: center;
        font-size: 1.25rem;
      }
    }
  }
  //提问按钮
  .questions-btn {
    color: #fff;
    position: fixed;
    bottom: 7.5rem;
    right: 20px;
    width: 6.25rem;
    height: 6.25rem;
    line-height: 6.25rem;
    text-align: center;
    border-radius: 100%;
    background: rgba(4, 142, 255, 0.5);
    font-size: 1.75rem;
  }
}

.questions-history {
  margin-top: 0.625rem;
  padding: 1.25rem 1.875rem;
  background: #fff;
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
  .article-box-bottom {
    display: flex;
    justify-content: space-between;
    color: #4545;
    font-size: 1.25rem;
    margin-top: 1.875rem;
    .article-msg {
      background: #f3f3f3;
      width: 6.25rem;
      height: 2rem;
      border-radius: 10px;
      color: #454545;
      text-align: center;
      font-size: 1.25rem;
    }
  }
}
</style>

