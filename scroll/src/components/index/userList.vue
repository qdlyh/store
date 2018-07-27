<template>
  <div>
    <div class="userList">
      <tab>
        <tab-item @on-item-click="onItemClick(index)" :selected="index==isShow" v-for="(item,index) in tab" :key="index">{{item.tab}}</tab-item>
      </tab>

      <scroll ref="scroll" :data="list0" :listenScrollEnd="true" :pullUpLoad="pullUpLoad" @pullingUp="onPullingUp" v-show="isShow==0">
        <div class="personnel">
          <div class="personnel-box" v-for="(item,index) in list0" :key="index">
            <div class="user-text" @click="$router.push({ name: 'user', params: { id: item.uuid } })">
              <span>
                <img v-lazy="item.image" alt="">
              </span>
              <span class="right">
                <h1>{{item.nickName}}</h1>
                <p>{{item.signature}}</p>
              </span>
            </div>
          </div>
        </div>
      </scroll>

      <scroll ref="scroll" :data="list1" :listenScrollEnd="true" :pullUpLoad="pullUpLoad" @pullingUp="onPullingUp" v-show="isShow==1">
        <div class="volunteer">
          <div v-for="(item,index) in list1" :key="item.uuid">
            <div class="volunteer-box" @click="$router.push({ name: 'user', params: { id: item.uuid } })">
              <img v-lazy="item.image" alt="">
              <span>
                <h1>{{item.nickName}}</h1>
                <i>{{item.signature}}</i>
                <p>2013年参加志愿</p>
              </span>
            </div>
          </div>
        </div>
      </scroll>

    </div>
  </div>
  </div>
</template>

<script>
import Scroll from '../../components/common/Scroll.vue'
import { Tab, TabItem } from 'vux'
export default {
  components: {
    Tab,
    TabItem,
    Scroll
  },
  data() {
    return {
      tab: [{ tab: '慈善企业', top: 0, i: 0 }, { tab: '志愿者', top: 0, i: 1 }],
      pullUpLoad: {
        threshold: 10,
        txt: { more: '', noMore: '暂无更多数据' }
      },
      isShow: 0,
      page0: 0,
      page1: 0,
      size: 10,
      list0: [],
      list1: [],
    }
  },
  mounted() {
    this.onPullingUp();
  },
  activated() {
    // this.$nextTick(() => {
    //   for (let i = 0; i < this.tab.length; i++) {
    //     let dom = document.querySelector('#mescroll' + this.tab[i].i);
    //     dom.scrollTop = this.tab[i].top;
    //   }
    // })
  },
  watch: {
    isShow() {
      this.onPullingUp();
    }
  },
  methods: {
    go() {
      this.$router.push({ name: 'questions', params: { id: 0 } });
    },
    onPullingUp() {
      if (this.isShow == 0) {
        let type = 63;
        this.$ajax({
          method: 'get',
          url: this.psta + '/getWxCharityYouAndMe?type=' + type + '&page=' + ++this.page0 + '&size=' + this.size,
        })
          .then(response => {
            let data = response.data.data;
            this.total = response.data.total;
            this.list0 = this.list0.concat(data)
          });
      }
      if (this.isShow == 1) {
        let type = 64;
        this.$ajax({
          method: 'get',
          url: this.psta + '/getWxCharityYouAndMe?type=' + type + '&page=' + ++this.page1 + '&size=' + this.size,
        })
          .then(response => {
            let data = response.data.data;
            this.total = response.data.total;
            this.list1 = this.list1.concat(data)
          });
      }
    },

    onItemClick(index) {
      this.isShow = index;
      //   this.$nextTick(() => {
      //     let dom = document.querySelector('#mescroll' + index);
      //     dom.scrollTop = this.tab[index].top;
      //   });
      // }
    },

    upScroll(mescroll, y, isUp) {
      if (this.isShow == 0) {
        this.tab[0].top = y;
      }
      if (this.isShow == 1) {
        this.tab[1].top = y;
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
// 慈善企业
.personnel {
  .personnel-box {
    height: 14rem;
    background: #fff;
    margin-bottom: 0.3125rem;
    padding: 1.25rem 1.875rem;
    .user-text {
      display: flex;
      img {
        width: 9.75rem;
        height: 9.75rem;
      }
      .right {
        margin-left: 1.25rem;
        h1 {
          font-size: 1.75rem;
          color: #3c3c3c;
          font-weight: normal;
        }
        p {
          color: #454545;
          margin-top: 1.25rem;
          font-size: 1.375rem;
          display: -webkit-box;
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
          /* autoprefixer: on */
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
      }
    }

    .user-theme {
      display: flex;
      justify-content: space-between;
      height: 4rem;
      line-height: 4rem;
      .left-theme {
        width: 80%;
        font-size: 1.5rem;
        color: #454545;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .right-time {
        width: 20%;
        text-align: right;
        font-size: 1.25rem;
        color: #9c9c9c9c;
      }
    }
  }
}

//志愿者
.volunteer {
  .volunteer-box {
    display: flex;
    height: 14rem;
    margin-bottom: 0.3125rem;
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
</style>
