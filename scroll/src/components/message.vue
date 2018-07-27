<template>
  <div>
    <div class="message">
      <div class="user-header">
        <i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
        <h1>留言列表</h1>
        <i></i>
      </div>
      <loading v-show="loading"></loading>
      <div id="mescroll" class="mescroll" v-show="!loading">
        <div id="dataList" class="data-list" v-cloak>
          <div class="message-box" v-for="(item,index) in list" :key="item.uuid">
            <div class="message-top">
              <img v-lazy="item.image" alt="" @click="goUser(item)">
              <span>
                <i>{{item.nickName}}</i>
                <p>{{item.message}}</p>
              </span>
              <div @click="toggle(item)" :class="{active:item.isPraise==1}">
                <i class="iconfont icon-dianzan"></i>
                <i v-if="item.praiseCount>0">{{item.praiseCount}}</i>
              </div>
            </div>
            <div class="message-bottom">
              <span>{{item.createDate}}</span>
              <div>
                <span class="dialogue" @click="go(item)" v-if="item.replyCount>0">查看对话</span>
                <span class="huifu" @click="replyBtn(index,item)" v-if="item.wxUserId!=$parent.wxUserId">
                  <i v-if="item.replyCount>0">{{item.replyCount}}</i>
                  回复
                </span>
                <span class="huifu" v-if="item.replyCount>0&&item.wxUserId==$parent.wxUserId">
                  <i>{{item.replyCount}}</i>
                  我的回复
                </span>
              </div>
            </div>
            <div class="reply" v-show="index==num">
              <input type="text" :placeholder="'@'+placeholder" v-model.trim="replyMsg"><br/>
              <div>
                <span @click="cancel(index)">取消</span>
                <span :class="{btnActive:replyMsg!=0}" class="btn" @click="comment(item)">评论</span>
              </div>
            </div>
          </div>
        </div>
        <div class="empty" v-show="!list.length">
          <img src="../../static/msg.png" alt="">
          <p>暂时没有数据</p>
        </div>
      </div>

      <div class="msg-input-box" v-show="num==null">
        <div class="msg-input" :class="{activeBtn:msg!=0}">
          <!-- <i class="iconfont icon-xiepinglun"></i> -->
          <input type="text" placeholder="写评论" v-model.trim="msg">
          <i class="iconfont icon-fasong" @click="msgBtn()"></i>
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
      placeholder: '',
      replyMsg: '',
      msg: '',
      uuid: '',
      total: '',
      num: null,
      mescroll: null,
      list: [],
      size: 10,
    }
  },
  activated() {
    this.uuid = Number(this.$route.params.id);
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
          src: '../../static/mescroll-totop.png', //默认滚动到1000px显示,可配置offset修改   ../../static/mescroll-totop.png
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
  watch: {
    uuid(id) {
      this.loading = true;
    }
  },
  methods: {

    toggle(item) {
      item.isPraise = !item.isPraise;
      let formData = new FormData();
      formData.append('messageId', item.uuid);
      formData.append('wxUserId', this.$parent.wxUserId);
      if (item.isPraise == 1) {
        item.praiseCount += 1;
        this.$ajax({
          method: 'post',
          url: this.psta + '/submitPraise',
          data: formData,
        })
          .then(response => {
            //console.log(response)
          })
      } else {
        item.praiseCount -= 1;
        this.$ajax({
          method: 'post',
          url: this.psta + '/submitPraise',
          data: formData,
        })
          .then(response => {
            //console.log(response)
          })
      }
    },

    go(item) {
      this.$router.push({ name: 'dialogue', params: { id: item.uuid, messageId: item.uuid } });
      this.$store.state.msgTop = this.mescroll.getScrollTop();
    },

    goUser(item) {
      if (item.settingId == 62) {
        this.$router.push({ name: 'expertUser', params: { id: item.wxUserId } });
        this.$store.state.msgTop = this.mescroll.getScrollTop();
      } else {
        this.$router.push({ name: 'user', params: { id: item.wxUserId } });
        this.$store.state.msgTop = this.mescroll.getScrollTop();
      }
    },

    replyBtn(index, item) {
      this.num = index;
      this.placeholder = item.nickName;
      this.replyMsg = '';
    },

    cancel(index) {
      this.num = null;
    },

    comment(item) {
      //console.log(this.replyMsg);
      if (this.replyMsg.length != 0) {
        this.num = null;
        let formData = new FormData();
        formData.append('messageId', item.uuid);  //回复谁的uuid
        formData.append('parentId', 0);  //留言列表里parentId为0就可以了
        formData.append('wxUserId', this.$parent.wxUserId); // this.$parent.wxUserId
        formData.append('reply', this.replyMsg);
        this.$ajax({
          method: 'post',
          data: formData,
          url: this.psta + '/submitMessageReply',
        })
          .then(response => {
            //console.log(response)
            item.replyCount += 1;
          })
      }
    },

    //生成唯一id防止unshift评论的时候数据显示错误
    guid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },

    msgBtn() {
      // console.log(this.list)
      if (this.msg.length != 0) {
        let userID = this.guid();
        let formData = new FormData();
        formData.append('generalId', this.uuid);  //这里是的文章id
        formData.append('wxUserId', this.$parent.wxUserId); // this.$parent.wxUserId
        formData.append('message', this.msg);
        this.$ajax({
          method: 'post',
          data: formData,
          url: this.psta + '/submitMessage',
        })
          .then(response => {
            //console.log(response)
            let user = [response.data.data];
            this.list.push({
              createDate: user[0].createDate,
              generalId: user[0].generalId,    //这里是的文章id
              isPraise: user[0].isPraise,
              praiseCount: user[0].praiseCount,
              replyCount: user[0].replyCount,
              image: user[0].image,
              nickName: user[0].nickName,
              message: user[0].message,
              settingId:user[0].settingId,
              uuid: user[0].uuid,
              wxUserId: user[0].wxUserId,
              //id: userID  //生成唯一id防止unshift评论的时候数据显示错误
            })
            this.msg = '';
          })
      }
    },

    upCallback(page) {
      this.getListDataFromNet(page.num, page.size, (curPageData) => {
        //curPageData = [];
        if (page.num == 1) this.list = [];
        let totalPage = this.total;
        if (this.list.length < this.total) this.list = this.list.concat(curPageData);  //更新列表数据
        this.mescroll.endByPage(curPageData.length, totalPage); //必传参数(当前页的数据个数, 总页数)
        //console.log("page.num=" + page.num + ", page.size=" + page.size + ", curPageData.length=" + curPageData.length + ", this.list.length==" + this.list.length);
      }, function () {
        this.mescroll.endErr();
      });
    },

    getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
      setTimeout(() => {
        this.$ajax({
          method: 'get',
          url: this.psta + '/getWxCommentsByUuid?uuid=' + this.uuid + '&wxUserId=' + this.$parent.wxUserId + '&page=' + pageNum + '&size=' + pageSize,
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

  },
}
</script>
<style lang="less" scoped>
.mescroll {
  position: fixed;
  top: 5rem;
  bottom: 6rem;
  height: auto;
}
.message {
  .user-header {
    height: 5rem;
    line-height: 5rem;
    background: #fff;
    padding: 0 1.25rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 0.5px solid #dbdbdb;
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
  .message-box {
    padding: 1.25rem 1.875rem;
    background: #fff;
    border-bottom: 0.5px solid #dbdbdb;
    .message-top {
      display: flex;
      position: relative;
      img {
        border-radius: 100%;
        width: 6.25rem;
        height: 6.25rem;
      }
      span {
        margin-left: 0.625rem;
        i {
          font-weight: 600;
          font-size: 1.75rem;
          color: #3c3c3c;
        }
        p {
          margin-top: 0.9375rem;
          font-size: 1.5rem;
          color: #454545;
        }
      }
      div {
        position: absolute;
        right: 0.9375rem;
        color: #9c9c99;
        z-index: 99999;
        i {
          font-size: 1.75rem;
        }
      }
    }
    .message-bottom {
      margin-top: 1.5625rem;
      display: flex;
      justify-content: space-between;
      color: #9c9c99;
      font-size: 1.5rem;
      div {
        .dialogue {
          margin-right: 3.125rem;
        }
        .huifu {
          background: #f3f3f3;
          color: #3c3c3c;
          border-radius: 10px;
          font-size: 1.25rem;
          padding: 0.625rem;
        }
      }
    }
    .reply {
      margin-top: 1.25rem;
      //   display: none;
      input {
        width: 100%;
        height: 4.375rem;
        border: 0;
        font-size: 1.75rem;
        padding-left: 0.9375rem;
        color: #454545;
        border: 1px solid #007acc;
        &::-webkit-input-placeholder {
          color: #9c9c99;
          font-size: 1.5rem;
        }
      }
      div {
        margin-top: 1.25rem;
        display: flex;
        justify-content: flex-end;
        span {
          color: #9c9c99;
          font-size: 1.75rem;
          line-height: 3.75rem;
        }
        .btn {
          display: inline-block;
          width: 6.25rem;
          height: 3.75rem;
          border-radius: 5px;
          line-height: 3.75rem;
          text-align: center;
          background: #80c2ff;
          color: #fff;
          margin-left: 1.875rem;
        }
      }
    }
  }
  .msg-input-box {
    .msg-input {
      display: flex;
      justify-content: space-between;
      position: fixed;
      width: 100%;
      border-top: 1px solid #d7d7d7;
      padding: 0 3.125rem;
      height: 6.125rem;
      line-height: 6.125rem;
      background: #fff;
      bottom: 0;
      input {
        width: 80%;
        height: 70%;
        border: 0;
        color: #454545;
        font-size: 1.5rem;
        border-bottom: 0.5px solid #ccc;
        margin: 0 0.625rem;
        padding-top: 0.9375rem;
        padding-left: 0.9375rem;
        ::-ms-input-placeholder {
          padding-left: 0.9375rem;
          color: #9c9c9c;
          font-size: 1.5rem;
        }
      }
      i {
        font-size: 2.4rem;
        color: #9c9c9c;
      }
    }
    .activeBtn {
      input {
        border-bottom: 2px solid #007acc;
      }
      i {
        color: #007acc;
      }
    }
  }
}

.btnActive {
  background: #007acc !important;
}
.active {
  color: #ff5959 !important;
}
</style>


