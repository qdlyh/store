<template>
    <div>
        <div class="yzArticle" v-for="(item,index) in list" :key="item.uuid">
            <div class="yzArticle-box">
                <h1>{{item.title}}</h1>
                <div class="time">
                    <span>{{item.modifyDate}}</span>
                    <span>{{item.address}}</span>
                </div>
                <img v-for="src in item.images" v-lazy="src.image" alt="" style="width: 100%;margin-top:1.25rem;">
                <div class="v-html" v-html="item.content"></div>
            </div>
            <div class="specialist">
                <h1>专家坐诊</h1>
                <div class="specialist-list">
                    <span v-for="(data,index) in item.users" :key="data.uuid">
                        <img v-lazy="data.image" alt="" @click="go(data)">
                        <i>{{data.nickName}}</i>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            uuid: '',
            list: [],
        }
    },
    activated() {
        this.uuid = this.$route.params.id
        this.$ajax({
            method: 'get',
            url: this.psta + '/getWxFreeClinicByUuid?uuid=' + this.uuid,
        })
            .then(response => {
                //console.log(response)
                this.list = [response.data.data];
                //console.log(this.list)
            })
    },
    methods: {
        go(data) {
            this.$router.push({ name: 'expertUser', params: { id: data.uuid } });
        }
    }
}
</script>
<style lang="less" scoped>
.yzArticle {
  background: #fff;
  margin-bottom: 10px;
  .yzArticle-box {
    padding: 1.875rem;
    .time {
      margin-top: 1.25rem;
      display: flex;
      justify-content: space-between;
      color: #9c9c9c;
      font-size: 1.25rem;
    }
    h1 {
      color: #3c3c3c;
    }
  }
  .specialist {
    position: relative;
    bottom: 0;
    height: 9.375rem;
    background: #f3f3f3;
    border-top: 0.5px solid #dedede;
    h1 {
      font-size: 1.2rem;
      color: #454545;
      width: 0px;
      float: left;
      margin: 0 1.875rem;
      margin-top: 1.25rem;
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
        margin-right: 1.875rem;
      }
      img {
        width: 6.25rem;
        height: 6.25rem;
        border-radius: 100%;
      }
      i {
        float: left;
        width: 100%;
        font-size: 1.25rem;
        color: #454545;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>

