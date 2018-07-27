<template>
    <div>
        <div class="yzList">
            <tab>
                <tab-item @on-item-click="onItemClick(index)" :selected="index==isShow" v-for="(item,index) in tab" :key="index">{{item.tab}}</tab-item>
            </tab>
            <div id="mescroll0" class="mescroll" v-show="isShow==0">
                <div id="dataList0" class="data-list" v-cloak>
                    <div class="yz-box" v-for="(item,index) in list0" :key="item.uuid">
                        <div class="yz-banner" @click="go(item)">
                            <img v-lazy="item.images[0].image" alt="">
                            <span>
                                {{item.title}}
                            </span>
                        </div>
                        <div class="specialist">
                            <h1>专家坐诊</h1>
                            <div class="specialist-list">
                                <span v-for="(user,index) in item.users" :key="user.uuid" @click="goUser(user)">
                                    <img v-lazy="user.image" alt="">
                                    <i>{{user.nickName}}</i>
                                </span>
                            </div>
                            <div class="time">
                                <span>{{item.createDate}}</span>
                                <span>{{item.address}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="mescroll1" class="mescroll" v-show="isShow==1">
                <div id="dataList1" class="data-list" v-cloak>
                    <div class="yz-box" v-for="(item,index) in list1" :key="item.uuid">
                        <div class="yz-banner" @click="go(item)">
                            <img v-lazy="item.images[0].image" alt="">
                            <span>
                                {{item.title}}
                            </span>
                        </div>
                        <div class="specialist">
                            <h1>专家坐诊</h1>
                            <div class="specialist-list">
                                <span v-for="(user,index) in item.users" :key="user.uuid" @click="goUser(user)">
                                    <img v-lazy="user.image" alt="">
                                    <i>{{user.nickName}}</i>
                                </span>
                            </div>
                            <div class="time">
                                <span>{{item.createDate}}</span>
                                <span>{{item.address}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="mescroll2" class="mescroll" v-show="isShow==2">
                <div id="dataList2" class="data-list" v-cloak>
                    <div class="yz-box" v-for="(item,index) in list2" :key="item.uuid">
                        <div class="yz-banner" @click="go(item)">
                            <img v-lazy="item.images[0].image" alt="">
                            <span>
                                {{item.title}}
                            </span>
                        </div>
                        <div class="specialist">
                            <h1>专家坐诊</h1>
                            <div class="specialist-list">
                                <span v-for="(user,index) in item.users" :key="user.uuid" @click="goUser(user)">
                                    <img v-lazy="user.image" alt="">
                                    <i>{{user.nickName}}</i>
                                </span>
                            </div>
                            <div class="time">
                                <span>{{item.createDate}}</span>
                                <span>{{item.address}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Tab, TabItem } from 'vux'
export default {
    components: {
        Tab,
        TabItem,
    },
    data() {
        return {
            mescroll: null,
            tab: [{ tab: '正在进行', top: 0, i: 0 }, { tab: '即将开始', top: 0, i: 1 }, { tab: '已经结束', top: 0, i: 2 }],
            isShow: 0,
            mescrollArr: new Array(3),
            list0: [],
            list1: [],
            list2: [],
        }
    },
    mounted() {
        this.mescrollArr[0] = this.initMescroll("mescroll0", "dataList0");
    },
    activated() {
        this.$nextTick(() => {
            for (let i = 0; i < this.tab.length; i++) {
                let dom = document.querySelector('#mescroll' + this.tab[i].i);
                dom.scrollTop = this.tab[i].top;
            }
        })
    },
    methods: {
        go(item) {
            this.$router.push({ name: 'yzArticle', params: { id: item.uuid } });
        },
        goUser(user) {
            this.$router.push({ name: 'expertUser', params: { id: user.uuid } });
        },
        onItemClick(index) {
            if (this.isShow != index) {
                this.isShow = index;
                if (this.mescrollArr[index] == null) {
                    this.mescrollArr[index] = this.initMescroll("mescroll" + index, "dataList" + index);
                }
                this.$nextTick(() => {
                    let dom = document.querySelector('#mescroll' + index);
                    dom.scrollTop = this.tab[index].top;
                });
            }
        },
        initMescroll(mescrollId, clearEmptyId) {
            this.mescroll = new MeScroll(mescrollId, {
                up: {
                    auto: true,//初始化完毕,是否自动触发上拉加载的回调
                    isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
                    callback: this.upCallback, //上拉加载的回调
                    onScroll: this.upScroll,
                    offset: 300,
                    noMoreSize: 3,
                    //htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p>',
                    htmlNodata: '<p class="upwarp-nodata">-- 没有跟多内容 --</p>',
                }
            });
            return this.mescroll;
        },
        upScroll(mescroll, y, isUp) {
            if (this.isShow == 0) {
                this.tab[0].top = y;
            }
            if (this.isShow == 1) {
                this.tab[1].top = y;
            }
            if (this.isShow == 2) {
                this.tab[2].top = y;
            }
        },

        upCallback(page) {
            let dataIndex = this.isShow;
            this.getListDataFromNet(dataIndex, page.num, page.size, (curPageData) => {
                //curPageData=[]; //打开本行注释,可演示列表无任何数据empty的配置
                let totalPage = this.total
                switch (dataIndex) {
                    case 0:
                        if (page.num == 1) this.list0 = [];
                        this.list0 = this.list0.concat(curPageData);
                        // this.mescroll.endByPage(curPageData.length, totalPage);
                        break;
                    case 1:
                        if (page.num == 1) this.list1 = [];
                        this.list1 = this.list1.concat(curPageData);
                        break;
                    case 2:
                        if (page.num == 1) this.list2 = [];
                        this.list2 = this.list2.concat(curPageData);
                        break;
                }
                this.mescrollArr[dataIndex].endByPage(curPageData.length, totalPage);
                //console.log("dataIndex=" + dataIndex, "page.num=" + page.num + ", page.size=" + page.size + ", curPageData.length=" + curPageData.length);
            }, function () {
                this.mescrollArr[dataIndex].endErr();
            });
        },

        getListDataFromNet(dataIndex, pageNum, pageSize, successCallback, errorCallback) {
            let type = '';
            if (dataIndex == 0) {
                type = 55
            }
            if (dataIndex == 1) {
                type = 56
            }
            if (dataIndex == 2) {
                type = 57
            }
            setTimeout(() => {
                this.$ajax({
                    method: 'get',
                    url: this.psta + '/getWxFreeClinic?type=' + type + '&page=' + pageNum + '&size=' + pageSize,
                })
                    .then(response => {
                        //console.log(response)
                        let listData = [];
                        let listPage = response.data.data;
                        this.total = response.data.total;
                        if (dataIndex == 0) {
                            for (let i = 0; i < listPage.length; i++) {
                                listData.push(listPage[i])
                            }
                        }

                        if (dataIndex == 1) {
                            for (let i = 0; i < listPage.length; i++) {
                                listData.push(listPage[i])
                            }
                        }

                        if (dataIndex == 2) {
                            for (let i = 0; i < listPage.length; i++) {
                                listData.push(listPage[i])
                            }
                        }
                        successCallback && successCallback(listData);//成功回调
                    });
            }, 500)
        }
    },
}
</script>
<style lang="less" scoped>
.mescroll {
  position: fixed;
  top: 45px;
  bottom: 0;
  height: auto;
}
.yzList {
  .yz-box {
    background: #fff;
    padding: 1.25rem 1.875rem;
    .yz-banner {
      position: relative;
      height: 20rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
      span {
        position: absolute;
        left: 0;
        bottom: 0;
        padding-left: 0.625rem;
        border-radius: 0 0 10px 10px;
        height: 3.5rem;
        line-height: 3.5rem;
        width: 100%;
        color: #fff;
        background: rgba(0, 0, 0, 0.4);
        font-size: 1.5rem;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .specialist {
      margin-top: 1.25rem;
      h1 {
        font-size: 1.5rem;
        color: #454545;
        font-weight: 500;
      }
      .specialist-list {
        margin-top: 0.625rem;
        overflow: hidden;
        overflow: auto;
        display: flex;
        &::-webkit-scrollbar {
          display: none;
        }
        span {
          text-align: center;
          margin-right: 3.75rem;
        }
        img {
          width: 6.25rem;
          height: 6.25rem;
          border-radius: 100%;
        }
        i {
          width: 6.25rem;
          display: inline-block;
          font-size: 1.25rem;
          color: #454545;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .time {
        margin-top: 0.9375rem;
        display: flex;
        justify-content: space-between;
        color: #9c9c9c;
        font-size: 1.25rem;
      }
    }
  }
}
</style>
