<template>
  <div>
    <div class="introduce" v-if="list.length">
      <div class="user-header">
        <i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
        <h1>产品介绍</h1>
        <i></i>
      </div>
      <div class="introduce-box" v-for="(item,index) in list" :key="index">
        <h1>{{item.title}}</h1>
        <img v-lazy="item.image" alt="">
        <p v-html="item.content" class="v-html"></p>
      </div>
      <div class="btn-blue" @click="$router.push('/introduceForm')">
        安装申请
      </div>
    </div>
    <loading v-if="!list.length"></loading>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    }
  },
  activated() {
    this.$ajax({
      method: 'get',
      url: this.psta + '/getWxIntestinalHealth',
    })
      .then(response => {
        //console.log(response)
        this.list = response.data.data;
      })
  },
}
</script>

<style lang="less" scoped>
.introduce {
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
  .introduce-box {
    margin-top: 0.625rem;
    background: #fff;
    padding: 1.875rem;
    h1 {
      font-size: 1.75rem;
      color: #3c3c3c;
      font-weight: normal;
      margin-top: 1.875rem;
    }
    img {
      margin-top: 1.25rem;
      width: 100%;
      max-height: 17.5rem;
    }
    p {
      margin-top: 1.875rem;
      color: #454545;
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
</style>
