<template>
    <div>
        <loading v-show="loading"></loading>
        <div class="specialistUser" v-show="!loading">
            <div v-for="(item,index) in list" :key="item.uuid">
                <div class="specialist-top">
                    <div class="user-message">
                        <img v-lazy="item.image" alt="">
                        <div class="user">
                            <h1>{{item.nickName}}</h1>
                            <i>{{item.label}}</i>
                            <p>{{item.signature}}</p>
                            <span class="attention" v-if="item.uuid!=$parent.wxUserId" @click="toggle(item)" :class="{active:item.isFocus==1}">{{isText}}</span>
                        </div>
                    </div>
                    <div class="number">
                        <span>
                            <p>帮助</p>
                            <i>{{item.helpCount}}</i>
                        </span>
                        <span>
                            <p>关注</p>
                            <i>{{item.focusCount}}</i>
                        </span>
                    </div>
                </div>
                <div class="issue" v-if="item.uuid!=$parent.wxUserId" @click="$router.push({name:'questions',params:{id:item.uuid}})">我要提问</div>
                <div class="specialist-article" v-for="(text,index) in item.questions" :key="index">
                    <div @click="go(text)">
                        <p>{{text.title}}</p>
                        <div class="specialist-box-bottom">
                            <div>
                                {{text.createDate}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="empty" v-show="!list[0].questions.length">
                    <img src="../../static/msg.png" alt="">
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
            uuid: '',
            list: [],
            isText: '关注'
        }
    },
    activated() {
        this.uuid = Number(this.$route.params.id);
        this.$ajax({
            method: 'get',
            url: this.psta + '/getWxExpertsByUuid?uuid=' + this.uuid + '&wxUserId=' + this.$parent.wxUserId,
        })
            .then(response => {
                //console.log(response)
                this.list = [response.data.data];
                this.loading = false;
                if (this.list[0].isFocus == 1) {
                    this.isText = '已关注'
                }
            })
        let dom = document.querySelector('.specialistUser');
        dom.scrollTop = this.$store.state.itemTop;
    },
    watch: {
        uuid(id) {
            this.loading = true;
        }
    },
    methods: {
        go(text) {
            let dom = document.querySelector('.specialistUser');
            this.$router.push({ name: 'forumMsg', params: { id: text.uuid } });
            this.$store.state.itemTop = dom.scrollTop;
        },
        toggle(item) {
            item.isFocus = !item.isFocus;
            let formData = new FormData();
            formData.append('expertsUserId', item.uuid);
            formData.append('wxUserId', this.$parent.wxUserId);
            if (item.isFocus == 1) {
                this.$ajax({
                    method: 'post',
                    url: this.psta + '/getWxFocusOnExperts',
                    data: formData,
                })
                    .then(response => {
                        this.isText = '已关注'
                        //console.log(response)
                    })
            } else {
                this.$ajax({
                    method: 'post',
                    url: this.psta + '/getWxFocusOnExperts',
                    data: formData,
                })
                    .then(response => {
                        this.isText = '关注'
                        //console.log(response)
                    })
            }
        },
    }
}
</script>
<style lang="less" scoped>
.specialistUser {
  .specialist-top {
    min-height: 22.5rem;
    width: 100%;
    background: linear-gradient(to top, rgb(97, 144, 232), rgb(167, 191, 232));
    padding: 1.875rem;
    img {
      width: 9.75rem;
      height: 9.75rem;
      border-radius: 100%;
      margin-top: 4.5rem;
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5),
        0px 2px 20px 3px rgba(0, 0, 0, 0.25);
    }
    .user-message {
      display: flex;
      position: relative;
      .user {
        margin-top: 3.125rem;
        color: #fff;
        margin-left: 1.875rem;
        .attention {
          position: absolute;
          right: 0;
          top: 3.125rem;
          width: 6.25rem;
          height: 3rem;
          border-radius: 15px;
          background: #ff6c6c;
          color: #fff;
          font-size: 1.5rem;
          text-align: center;
          line-height: 3rem;
          display: inline-block;
          border: 0.5px solid #fff;
        }
        h1 {
          font-size: 2rem;
        }
        i {
          margin-top: 1rem;
          font-size: 1.25rem;
        }
        p {
          margin-top: 1rem;
          font-size: 1.25rem;
          display: -webkit-box;
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
          /* autoprefixer: on */
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
      }
    }
    .number {
      width: 100%;
      display: flex;
      margin-top: 2.5rem;
      span {
        width: 50%;
        display: inline-block;
        color: #fff;
        text-align: center;
        p {
          font-size: 1.5rem;
        }
        i {
          font-size: 2rem;
        }
      }
      span:nth-child(1) {
        border-right: 0.5px solid #fff;
      }
    }
  }
  .issue {
    width: 100%;
    height: 4.375rem;
    text-align: center;
    color: #454545;
    font-size: 1.75rem;
    line-height: 4.375rem;
    border-bottom: 1px solid #bdbdbd;
  }
  .specialist-article {
    padding: 1.25rem 1.875rem;
    background: #fff;
    border-bottom: 1px solid #bdbdbd;
    p {
      font-size: 1.5rem;
      color: #3c3c3c;
      font-weight: normal;
      display: -webkit-box;
      /*! autoprefixer: off */
      -webkit-box-orient: vertical;
      /* autoprefixer: on */
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .specialist-box-bottom {
      display: flex;
      justify-content: space-between;
      color: #666;
      font-size: 1.25rem;
      margin-top: 1.25rem;
      span:nth-child(1) {
        margin-right: 1.25rem;
      }
    }
  }
}
.active {
  background: #9c9c9c !important;
}
</style>

