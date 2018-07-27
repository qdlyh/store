<template>
    <div>
        <div class="myemail">
            <div class="user-header">
                <i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
                <h1>绑定邮箱</h1>
                <i></i>
            </div>
            <div class="email-input">
                <span>
                    邮箱号码:
                </span>
                <input type="text" v-model.trim="email" placeholder="请填写您的邮箱">
            </div>
        </div>
        <toast v-model="cancel" :time="3000" type="cancel">{{(cancelText)}}</toast>
        <div class="btn-blue" style="margin-top:7rem;" @click="sumbit">
            保存
        </div>
    </div>
</template>
<script>
import { Toast, } from 'vux'
export default {
    components: {
        Toast,
    },
    data() {
        return {
            email: '',
            cancel: false,
            cancelText: ''
        }
    },
    methods: {
        sumbit() {
            if (!(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(this.email))) {
                this.cancel = true;
                this.cancelText = '请填写正确的邮箱'
            } else {
                this.$ajax({
                    method: 'get',
                    url: this.psta + '/bindingWxEmail?wxUserId=' + this.$parent.wxUserId + '&email=' + this.email,
                })
                    .then(response => {
                        console.log(response)
                        this.$router.push('/safety');
                    })
            }

        }
    }
}

                // if (!(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(this.email))) {
                //     this.cancel = true;
                //     this.cancelText = '邮箱格式错误'
                //     have = false;
                //     return false;
                // }
</script>
<style lang="less" scoped>
.myemail {
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
  .email-input {
    background: #fff;
    height: 5rem;
    line-height: 5rem;
    width: 100%;
    margin-top: 0.625rem;
    span {
      display: inline-block;
      width: 9.375rem;
      font-size: 1.5rem;
      color: #454545;
      padding-left: 1.25rem;
    }
    input {
      width: 70%;
      border: 0;
      font-size: 1.5rem;
      color: #454545;
      &::-webkit-input-placeholder {
        color: #999;
        font-size: 1.5rem;
        text-align: left;
        padding-left: 0.9375rem;
      }
    }
  }
}
</style>

