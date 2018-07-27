<template>
    <div>
        <div class="safety">
            <div class="user-header">
                <i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
                <h1>设置</h1>
                <i></i>
            </div>
            <div class="input-box">
                <span>绑定手机</span>
                <input type="text" v-model="phone" placeholder="未绑定" disabled="disabled" style="background:#fff">
                <i @click="$router.push('/myPhone')">{{isPhone}}</i>
            </div>
            <div class="input-box">
                <span>绑定邮箱</span>
                <input type="text" v-model="email" placeholder="未绑定" disabled="disabled" style="background:#fff">
                <i @click="$router.push('/myEmail')">{{isEmail}}</i>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            phone: '',
            email: '',
            isPhone: '绑定手机',
            isEmail: '绑定邮箱'
        }
    },
    activated() {
        this.$ajax({
            method: 'get',
            url: this.psta + '/getWxPersonalCenterSetting?wxUserId=' + this.$parent.wxUserId,
        })
            .then(response => {
                //console.log(response)
                this.phone = response.data.data.phone;
                this.email = response.data.data.email;
            })
    }
}
</script>
<style lang="less" scoped>
.safety {
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
    }
    i {
      font-size: 2rem;
      color: #0aa6ff;
    }
  }
  .input-box {
    background: #fff;
    height: 5rem;
    line-height: 5rem;
    width: 100%;
    margin-top: 0.625rem;
    position: relative;
    span {
      display: inline-block;
      width: 9.375rem;
      font-size: 1.5rem;
      color: #454545;
      padding-left: 1.25rem;
    }
    i {
      position: absolute;
      right: 3.125rem;
      top: 0.9375rem;
      min-width: 6.25rem;
      height: 3.125rem;
      line-height: 3.125rem;
      display: inline-block;
      font-size: 1.2rem;
      border-radius: 10px;
      border: 1px solid #ccc;
      text-align: center;
      padding: 0 0.625rem;
      color: #454545;
    }
    input {
      width: 60%;
      border: 0;
      font-size: 1.5rem;
      color: #454545;
      &::-webkit-input-placeholder {
        color: #999;
        font-size: 1.5rem;
        text-align: left;
        padding-left: 0.625rem;
      }
    }
  }
}
</style>
