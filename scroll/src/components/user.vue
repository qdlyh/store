<template>
    <div>
        <loading v-show="loading"></loading>
        <div class="volunteer" v-show="!loading">
            <div class="volunteer-top" v-for="(user,index) in user" :key="user.uuid">
                <img v-lazy="user.image" alt="">
                <span>
                    <h1>{{user.nickName}}</h1>
                    <i>{{user.label}}</i>
                    <p>{{user.signature}}</p>
                </span>
            </div>
            <div class="volunteer-article" v-for="(item,index) in list" :key="item.uuid">
                <div @click="go(item)">
                    <p>{{item.title}}</p>
                    <div class="volunteer-box-bottom">
                        <div>
                            <span>{{item.count}}浏览</span>
                            <span>{{item.messageCount}}评论</span>
                        </div>
                        <div>
                            {{item.modifyDate}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="empty" v-show="!list.length">
                <img src="../../static/msg.png" alt="">
                <p>暂时没有数据</p>
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
            user: [],
            list: [],
        }
    },
    activated() {
        this.uuid = Number(this.$route.params.id);
        this.$ajax({
            method: 'get',
            url: this.psta + '/getWxCharityYouAndMeByUuid?uuid=' + this.uuid,
        })
            .then(response => {
                //console.log(response)
                this.user = [response.data.data];
                this.list = response.data.data.generals;
                this.loading = false;
            })
        let dom = document.querySelector('.volunteer');
        dom.scrollTop = this.$store.state.itemTop;
    },
    watch: {
        uuid(id) {
            this.loading = true;
        }
    },
    methods: {
        go(item) {
            let dom = document.querySelector('.volunteer');
            this.$router.push({ name: 'article', params: { id: item.uuid } });
            this.$store.state.itemTop = dom.scrollTop;
        },
    }
}
</script>
<style lang="less" scoped>
.volunteer {
  .volunteer-top {
    display: flex;
    min-height: 20rem;
    width: 100%;
    background: #ff6c6c;
    padding: 1.875rem;
    img {
      width: 9.75rem;
      height: 9.75rem;
      border-radius: 100%;
      margin-top: 2.5rem;
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5),
        0px 2px 20px 3px rgba(0, 0, 0, 0.25);
    }
    span {
      margin-top: 0.9375rem;
      color: #fff;
      margin-left: 1.875rem;
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

  .volunteer-article {
    padding: 1.25rem 1.875rem;
    background: #fff;
    border-bottom: 1px solid #bdbdbd;
    p {
      font-size: 1.5rem;
      color: #454545;
      font-weight: normal;
      display: -webkit-box;
      /*! autoprefixer: off */
      -webkit-box-orient: vertical;
      /* autoprefixer: on */
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .volunteer-box-bottom {
      display: flex;
      justify-content: space-between;
      color: #6666;
      font-size: 1.25rem;
      margin-top: 1.25rem;
      span:nth-child(1) {
        margin-right: 1.25rem;
      }
    }
  }
}

</style>
