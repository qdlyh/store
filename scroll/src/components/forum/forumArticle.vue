<template>
    <div>
        <!-- <h2>{{ $route.params.id }}</h2> -->
        <div class="expertArticle" v-for="(item,index) in list" :key="item.uuid">
            <div class="article-box">
                <h1>{{item.title}}</h1>
                <div>
                    <i>提问者：{{item.nickName}}</i>
                    <i class="time">{{item.createDate}}</i>
                </div>
                <div>{{item.describe}}</div>
            </div>
            <div class="articleFooter">
                <div class="footer">
                    <div class="message-box">
                        <span class="message" @click="go(item)">
                            <i class="iconfont icon-liuyan"></i>
                            <span>{{item.replyCount}}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            uuid: '',
            list: [],
        }
    },
    mounted() {
        this.uuid = this.$route.params.id;
        if (this.article.hasOwnProperty(this.uuid)) {
            this.list = this.article[this.uuid];
        } else {
            this.$ajax({
                method: 'get',
                url: this.psta + '/getWxProblemInFoByUuid?uuid=' + this.uuid,
            })
                .then(response => {
                    // console.log(response)
                    this.article[this.uuid] = [response.data.data];
                    this.list = [response.data.data];
                })
        }
        //console.log(this.article[this.uuid])
    },
    methods: {
        go(item) {
            this.$router.push({ name: 'forumMsg', params: { id: item.uuid } });
        }
    },
    computed: {
        ...mapState(['article'])
    },
}
</script>
<style lang="less" scoped>
.expertArticle {
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
    img {
      width: 100%;
      height: auto;
    }
  }

  .articleFooter {
    width: 100%;
    margin-top: 6.25rem;
    position: relative;
    .footer {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      border-top: 1px solid #d7d7d7;
      padding: 0 3.125rem;
      height: 6.125rem;
      line-height: 6.125rem;
      background: #fff;
      position: fixed;
      bottom: 0;
      .num {
        background: #f3f3f3;
        min-width: 7.5rem;
        min-height: 2.5rem;
        line-height: 2.5rem;
        border-radius: 10px;
        padding: 0.3125rem 1.25rem;
        color: #9c9c9c;
        display: inline-block;
        font-size: 1.25rem;
        text-align: center;
      }
      .message-box {
        i {
          font-size: 3.4375rem;
        }
        .message {
          margin-right: 1.875rem;
          span {
            position: relative;
            top: -25px;
            left: -10px;
            color: #fff;
            background: #e01414;
            min-width: 2.5rem;
            min-height: 0.5rem;
            line-height: 0.5rem;
            display: inline-block;
            text-align: center;
            padding: 0.625rem;
            border-radius: 10px;
            font-size: 0.75rem;
          }
        }
      }
    }
  }
}
</style>
