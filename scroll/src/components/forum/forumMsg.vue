<template>
    <div>
        <div class="message">
            <div class="user-header">
                <i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
                <h1>问题详情</h1>
                <i></i>
            </div>
            <loading v-show="loading"></loading>
            <scroll ref="scroll" :data="list" :pullUpLoad="pullUpLoad" @pullingUp="onPullingUp">
                <div class="pullup">
                    <div class="expertArticle" v-for="(item,index) in data" :key="item.uuid">
                        <div class="article-box">
                            <h1>{{item.title}}</h1>
                            <div>
                                <i>提问者：{{item.nickName}}</i>
                                <i class="time">{{item.createDate}}</i>
                            </div>
                            <div class="article-text">{{item.describe}}</div>
                        </div>
                    </div>
                    <div class="message-box" v-for="(item,index) in list" :key="item.uuid">
                        <div class="message-top">
                            <h1>{{item.uuid}}</h1>
                            <img v-lazy="item.image" alt="" @click="goUser(item)">
                            <span>
                                <i class="name">{{item.nickName}}</i>
                                <i class="status" v-if="item.settingId==62">专家认证</i>
                                <p>{{item.reply}}</p>
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
                    <div class="empty" v-show="!list.length">
                        <img src="../../../static/msg.png" alt="">
                        <p>暂时没有数据</p>
                    </div>
                </div>
            </scroll>

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
            uuid: null,
            num: null,
            pullUpLoad: {
                threshold: 10,
                txt: { more: '', noMore: '暂无更多数据' }
            },
            total:0,
            data: [],
            list: [],
            page: 0,
            size: 10,
        }
    },
    // mounted() {
    //     console.log('x')
    //     this.uuid = Number(this.$route.params.id);
    //     //console.log(this.uuid)
    //     this.$ajax({
    //         method: 'get',
    //         url: this.psta + '/getWxProblemInFoByUuid?uuid=' + this.uuid,
    //     })
    //         .then(response => {
    //             this.data = [response.data.data];
    //         })
    //     this.onPullingUp();
    // },
    activated() {
        this.uuid = Number(this.$route.params.id);
        this.$ajax({
            method: 'get',
            url: this.psta + '/getWxProblemInFoByUuid?uuid=' + this.uuid,
        })
            .then(response => {
                this.data = [response.data.data];
            })
        //this.onPullingUp();
    },
    watch: {
        uuid(id) {
            this.loading = true;
            this.page = 0;
            this.list = [];
            this.onPullingUp();
        },
    },
    methods: {
        pullDown() {
            alert('1')
        },
        onPullingUp() {
            this.$ajax({
                method: 'get',
                url: this.psta + '/getWxExpertsReplyByUuid?uuid=' + this.uuid + '&wxUserId=' + this.$parent.wxUserId + '&page=' + ++this.page + '&size=' + this.size,
            })
                .then(response => {
                    let data = response.data.data;
                    //console.log(data)
                    this.total = response.data.total;
                    this.list = this.list.concat(data);
                    this.loading = false;
                });
        },
        toggle(item) {
            item.isPraise = !item.isPraise;
            let formData = new FormData();
            formData.append('questionReplyId', item.uuid);
            formData.append('wxUserId', this.$parent.wxUserId);
            if (item.isPraise == 1) {
                item.praiseCount += 1;
                this.$ajax({
                    method: 'post',
                    url: this.psta + '/submitQuestionReplyPraise',
                    data: formData,
                })
                    .then(response => {
                        //console.log(response)
                    })
            } else {
                item.praiseCount -= 1;
                this.$ajax({
                    method: 'post',
                    url: this.psta + '/submitQuestionReplyPraise',
                    data: formData,
                })
                    .then(response => {
                        //console.log(response)
                    })
            }
        },

        go(item) {
            this.$router.push({ name: 'forumReply', params: { id: item.uuid, messageId: item.uuid } });
        },
        goUser(item) {
            if (item.settingId == 62) {
                this.$router.push({ name: 'expertUser', params: { id: item.wxUserId } });
            } else {
                this.$router.push({ name: 'user', params: { id: item.wxUserId } });
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
            if (this.replyMsg.length != 0) {
                this.num = null;
                let formData = new FormData();
                formData.append('questionId', this.uuid);  //问题uuid
                formData.append('parentId', item.uuid); //回复谁的uuid
                formData.append('wxUserId', this.$parent.wxUserId); // this.$parent.wxUserId
                formData.append('reply', this.replyMsg);
                this.$ajax({
                    method: 'post',
                    data: formData,
                    url: this.psta + '/submitAskQuestionsReply',
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

        //留言
        msgBtn() {
            if (this.msg.length != 0) {
                //let userID = this.guid();
                let formData = new FormData();
                formData.append('questionId', this.uuid);  //这里是的文章id
                formData.append('parentId', 0);
                formData.append('wxUserId', this.$parent.wxUserId); // this.$parent.wxUserId
                formData.append('reply', this.msg);
                this.$ajax({
                    method: 'post',
                    data: formData,
                    url: this.psta + '/submitAskQuestionsReply',
                })
                    .then(response => {
                        //console.log(response)
                        if (this.list.length == this.total) {
                            let user = [response.data.data];
                            this.list.push({
                                createDate: user[0].createDate,
                                generalId: user[0].generalId,    //这里是的文章id
                                isPraise: user[0].isPraise,
                                praiseCount: user[0].praiseCount,
                                replyCount: user[0].replyCount,
                                image: user[0].image,
                                nickName: user[0].nickName,
                                reply: user[0].reply,
                                settingId: user[0].settingId,
                                uuid: user[0].uuid,
                                wxUserId: user[0].wxUserId,
                                //id: userID  //生成唯一id防止unshift评论的时候数据显示错误
                            })
                        }
                        this.msg = '';
                    })
            }
        },
    },
}
</script>
<style lang="less" scoped>
.wrapper {
  position: absolute;
  left: 0;
  top: 5rem;
  right: 0;
  bottom: 60px;
  overflow: hidden;
}

.expertArticle {
  background: #fff;
  margin-bottom: 1.25rem;
  .article-box {
    padding: 1.875rem;
    div {
      display: flex;
      justify-content: space-between;
      margin: 1.875rem 0;
      i {
        color: #3c3c3c;
        font-size: 1.5rem;
      }
      .time {
        color: #9a9a9a;
        font-size: 1.25rem;
      }
    }
    h1 {
      font-size: 2rem;
      font-weight: 400;
      color: #3c3c3c;
    }
    .article-text {
      font-size: 1.7rem;
      color: #3c3c3c;
    }
    img {
      width: 100%;
      height: auto;
    }
  }
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
        .name {
          font-weight: 600;
          font-size: 1.75rem;
          color: #3c3c3c;
        }
        .status {
          position: relative;
          top: -3px;
          display: inline-block;
          min-width: 5rem;
          height: 1.5rem;
          line-height: 1.5rem;
          padding: 1px;
          text-align: center;
          font-size: 1rem;
          border-radius: 10px;
          border: 1px solid #f5f100;
          // background: #f5f100;
          color: #f5f100;
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


