<template>
    <div>
        <div class="article-list">
            <tab>
                <tab-item @on-item-click="onItemClick(index,item)" :selected="index==isShow" v-for="(item,index) in tab" :key="index">{{item.name}}</tab-item>
            </tab>
            <div id="mescroll0" class="mescroll" v-show="isShow==0">
                <div id="dataList0" class="data-list" v-cloak>
                    <div class="article-box" v-for="(item,index) in list0" :key="item.uuid" @click="go(item)">
                        <h1>{{item.title}}</h1>
                        <div class="article-img">
                            <img v-for="(src,index) in item.images" :key="index" v-lazy="src.image" v-if="index<3">
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
            <div id="mescroll1" class="mescroll" v-show="isShow==1">
                <div id="dataList1" class="data-list" v-cloak>
                    <div class="article-box" v-for="(item,index) in list1" :key="item.uuid" @click="go(item)">
                        <h1>{{item.title}}</h1>
                        <div class="article-img">
                            <img v-for="(src,index) in item.images" :key="index" v-lazy="src.image" v-if="index<3">
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
            <div id="mescroll2" class="mescroll" v-show="isShow==2">
                <div id="dataList2" class="data-list" v-cloak>
                    <div class="article-box" v-for="(item,index) in list2" :key="item.uuid" @click="go(item)">
                        <h1>{{item.title}}</h1>
                        <div class="article-img">
                            <img v-for="(src,index) in item.images" :key="index" v-lazy="src.image" v-if="index<3">
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
            <div id="mescroll3" class="mescroll" v-show="isShow==3">
                <div id="dataList3" class="data-list" v-cloak>
                    <div class="article-box" v-for="(item,index) in list3" :key="item.uuid" @click="go(item)">
                        <h1>{{item.title}}</h1>
                        <div class="article-img">
                            <img v-for="(src,index) in item.images" :key="index" v-lazy="src.image" v-if="index<3">
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
            <div id="mescroll4" class="mescroll" v-show="isShow==4">
                <div id="dataList4" class="data-list" v-cloak>
                    <div class="article-box" v-for="(item,index) in list4" :key="item.uuid" @click="go(item)">
                        <h1>{{item.title}}</h1>
                        <div class="article-img">
                            <img v-for="(src,index) in item.images" :key="index" v-lazy="src.image" v-if="index<3">
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
            <div id="mescroll5" class="mescroll" v-show="isShow==5">
                <div id="dataList5" class="data-list" v-cloak>
                    <div class="article-box" v-for="(item,index) in list5" :key="item.uuid" @click="go(item)">
                        <h1>{{item.title}}</h1>
                        <div class="article-img">
                            <img v-for="(src,index) in item.images" :key="index" v-lazy="src.image" v-if="index<3">
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
            <div id="mescroll6" class="mescroll" v-show="isShow==6">
                <div id="dataList6" class="data-list" v-cloak>
                    <div class="article-box" v-for="(item,index) in list6" :key="item.uuid" @click="go(item)">
                        <h1>{{item.title}}</h1>
                        <div class="article-img">
                            <img v-for="(src,index) in item.images" :key="index" v-lazy="src.image" v-if="index<3">
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
            isHave: true,   //判断组件是否缓存
            tab: [{ name: '推荐', top: 0, i: 0 }, { name: '全部', top: 10, i: 1 }, { name: '文化', top: 0, i: 2 }, { name: '常识', top: 0, i: 3 }, { name: '医疗', top: 0, i: 4 }, { name: '保健', top: 0, i: 5 }, { name: '养生', top: 0, i: 6 }],
            total: '',
            isShow: 0,
            mescroll: null,
            mescrollArr: new Array(7),
            list0: [],
            list1: [],
            list2: [],
            list3: [],
            list4: [],
            list5: [],
            list6: [],
        }
    },
    // beforeRouteLeave(to, from, next) {
    //     if (to.name == 'index' && from.name == 'articleList') {
    //         console.log(to, from)   
    //         this.$destroy();
    //         //next()
    //     }
    //     next()
    // },
    mounted() {
        this.isHave = false;
        this.isShow = (this.$store.state.listId == undefined) ? this.$store.state.listId = Number(sessionStorage.getItem('listId')) : this.$store.state.listId;
        this.mescrollArr[this.isShow] = this.initMescroll("mescroll" + this.isShow, "dataList" + this.isShow);
    },
    activated() {
        if (this.isHave) {
            if (this.$store.state.listSize > 10) {
                //Mescroll,就算你缓存了也只会返回第一页并且默认10条数据，所以这里设置下，第一页的数量，使它能够保持上次离开时候的数据
                this.size = this.$store.state.listSize;
            }
            this.isShow = (this.$store.state.listId == undefined) ? this.$store.state.listId = Number(sessionStorage.getItem('listId')) : this.$store.state.listId;
            this.mescrollArr[this.isShow] = this.initMescroll("mescroll" + this.isShow, "dataList" + this.isShow);
            this.$nextTick(() => {
                for (let i = 0; i < this.tab.length; i++) {
                    let dom = document.querySelector('#mescroll' + this.tab[i].i);
                    dom.scrollTop = this.tab[i].top;
                }
            })
        }
    },
    deactivated() {
        this.mescrollArr[this.isShow].destroy();
        this.isHave = true;  //组件离开设置为true，用于下次进入该组件的时候触发缓存中的实例
    },
    watch: {
        uuid(id) {
            this.loading = true;
        },
    },
    methods: {
        go(item) {
            this.$router.push({ name: 'article', params: { id: item.uuid } });
        },
        onItemClick(index, item) {
            if (this.isShow != index) {
                this.isShow = index;
                this.$store.commit('listId', index);
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
                    page: {
                        size: this.size,
                        time: 500,
                    },
                    offset: 300,
                    noMoreSize: 1,
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
            if (this.isShow == 3) {
                this.tab[3].top = y;
            }
            if (this.isShow == 4) {
                this.tab[4].top = y;
            }
            if (this.isShow == 5) {
                this.tab[5].top = y;
            }
            if (this.isShow == 6) {
                this.tab[6].top = y;
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
                        this.$store.state.listSize = this.list0.length;
                        // this.mescroll.endByPage(curPageData.length, totalPage);
                        break;
                    case 1:
                        if (page.num == 1) this.list1 = [];
                        this.list1 = this.list1.concat(curPageData);
                        this.$store.state.listSize = this.list1.length;
                        break;
                    case 2:
                        if (page.num == 1) this.list2 = [];
                        this.list2 = this.list2.concat(curPageData);
                        this.$store.state.listSize = this.list2.length;
                        break;
                    case 3:
                        if (page.num == 1) this.list3 = [];
                        this.list3 = this.list3.concat(curPageData);
                        this.$store.state.listSize = this.list3.length;
                        break;
                    case 4:
                        if (page.num == 1) this.list4 = [];
                        this.list4 = this.list4.concat(curPageData);
                        this.$store.state.listSize = this.list4.length;
                        break;
                    case 5:
                        if (page.num == 1) this.list5 = [];
                        this.list5 = this.list5.concat(curPageData);
                        this.$store.state.listSize = this.list5.length;
                        break;
                    case 6:
                        if (page.num == 1) this.list6 = [];
                        this.list6 = this.list6.concat(curPageData);
                        this.$store.state.listSize = this.list6.length;
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
                type = 1;
            }
            if (dataIndex == 1) {
                type = 0;
            }
            if (dataIndex == 2) {
                type = 50;
            }
            if (dataIndex == 3) {
                type = 51;
            }
            if (dataIndex == 4) {
                type = 52;
            }
            if (dataIndex == 5) {
                type = 53;
            }
            if (dataIndex == 6) {
                type = 54;
            }
            setTimeout(() => {
                this.$ajax({
                    method: 'get',
                    url: this.psta + '/getWxHealthLectureHall?type=' + type + '&page=' + pageNum + '&size=' + pageSize,
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

                        if (dataIndex == 3) {
                            for (let i = 0; i < listPage.length; i++) {
                                listData.push(listPage[i])
                            }
                        }
                        if (dataIndex == 4) {
                            for (let i = 0; i < listPage.length; i++) {
                                listData.push(listPage[i])
                            }
                        }
                        if (dataIndex == 5) {
                            for (let i = 0; i < listPage.length; i++) {
                                listData.push(listPage[i])
                            }
                        }
                        if (dataIndex == 6) {
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
  top: 44px;
  bottom: 0;
  height: auto;
}
.article-list {
  .article-box {
    padding: 0.9375rem 1.875rem;
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
      img {
        width: 30%;
        height: 8.75rem;
        font-size: 8.75rem;
        margin: 0 5px;
      }
    }
    .article-box-bottom {
      display: flex;
      justify-content: space-between;
      color: #454545;
      font-size: 1.25rem;
      margin-top: 1.25rem;
    }
  }
}
</style>
