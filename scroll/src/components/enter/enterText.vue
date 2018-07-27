<template>
  <div>
    <loading v-show="loading"></loading>
    <div class="enterText" v-show="list0.length">
      <div class="user-header">
        <i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
        <h1>申请入驻</h1>
        <i></i>
      </div>
      <div v-for="(item,index) in list0" :key="index">
        <div class="enter-title">
          <h1>{{item.text}}：</h1>
          <p>{{item.children[0].text}}</p>
        </div>
        <div class="enter-flow" v-for="(item,index) in list1">
          <h1>{{item.text}}</h1>
          <div class="flow-title">
            <div v-for="src in item.children">
              <img :src="src.icon" alt="">
              <p>{{src.text}}</p>
            </div>
          </div>
        </div>
        <div class="accessory" v-for="(item,index) in list2">
          <h1>{{item.text}}：</h1>
          <p v-for="text in item.children">{{text.text}}</p>
        </div>
      </div>
      <div class="btn-blue" @click="$router.push('/enterForm')">
        申请入驻
      </div>
    </div>
    <br/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading:true,
      list0: [],
      list1: [],
      list2: []
    }
  },
  mounted() {
    this.$ajax({
      method: 'get',
      url: this.psta + '/findBySettingId?settingId=88',
    })
      .then(response => {
        //console.log(response)
        this.list0 = [response.data.data[0]];
        this.list1 = [response.data.data[1]];
        this.list2 = [response.data.data[2]];
        this.loading = false;
      })
  }
}
</script>
<style lang="less" scoped>
.enterText {
  .user-header {
    height: 5rem;
    line-height: 5rem;
    background: #fff;
    padding: 0 1.25rem;
    display: flex;
    justify-content: space-between;
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
  .enter-title {
    padding: 1.25rem;
    width: 100%;
    min-height: 200px;
    background: #fff;
    margin-top: 0.625rem;
    h1 {
      font-size: 1.5rem;
      color: #454545;
    }
    p {
      margin-top: 1.25rem;
      font-size: 1.25rem;
      color: #454545;
      margin: 1.25rem 0 0 2.5rem;
    }
  }
  .enter-flow {
    width: 100%;
    height: 15.625rem;
    padding: 1.25rem;
    background: #fff;
    margin-top: 0.625rem;
    h1 {
      font-size: 1.5rem;
      color: #454545;
    }
    .flow-title {
      text-align: center;
      width: 90%;
      display: flex;
      justify-content: space-between;
      margin: 1.25rem 0 0 1.875rem;
      div {
        img {
          border-radius: 50%;
          width: 6.25rem;
          height: 6.25rem;
        }
        p {
          font-size: 1.25rem;
          color: #454545;
        }
      }
    }
  }
  .accessory {
    padding: 1.25rem;
    background: #fff;
    margin-top: 0.625rem;
    h1 {
      font-size: 1.5rem;
      color: #454545;
    }
    p {
      font-size: 1.25rem;
      color: #454545;
      margin: 1.25rem 0 0 2.5rem;
    }
  }
}
</style>
