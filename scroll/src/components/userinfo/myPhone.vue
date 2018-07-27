<template>
    <div>
        <div class="myPhone">
            <div class="user-header">
                <i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
                <h1>绑定手机</h1>
                <i></i>
            </div>
            <div class="Phone-input">
                <span>
                    手机号:
                </span>
                <input type="number" v-model.trim="phone" placeholder="请输入手机号" oninput='if(value.length>11)value=value.slice(0,11)'>
            </div>
            <div class="Phone-input">
                <span>
                    验证码:
                </span>
                <input type="number" v-model.trim="code" placeholder="请输入验证码" style="width:40%">
                <div class="btn-blue verify-btn" @click="getCode()" v-show="show">
                    获取验证码
                </div>
                <div class="btn-blue verify-btn" v-show="!show">
                    {{count}} s
                </div>
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
            phone: '',
            code: '',
            count: '',
            show: true,
            cancel: false,
            timer: null,
            cancelText: ''
        }
    },
    methods: {
        getCode() {
            if (this.phone.length == '') {
                this.cancel = true;
                this.cancelText = '请输入手机号码'
            }
            else {
                if (!(/^1[345789][0-9]{9}$/.test(this.phone))) {
                    this.cancel = true;
                    this.cancelText = '手机号码错误'
                }
                else {
                    if (!this.timer) {
                        this.$ajax({
                            method: 'get',
                            url: this.psta + '/getWxCode?phone=' + this.phone,
                        })
                            .then(response => {
                                //console.log(response)
                            })
                        this.count = 60;
                        this.show = false;
                        this.timer = setInterval(() => {
                            if (this.count > 0) {
                                this.count--;
                            } else {
                                this.show = true;
                                clearInterval(this.timer);
                                this.timer = null;
                            }
                        }, 1000)
                    }
                }
            }
        },
        sumbit() {
            if (!(/^1[345789][0-9]{9}$/.test(this.phone))) {
                this.cancel = true;
                this.cancelText = '请完成基本操作'
            } else {
                this.$ajax({
                    method: 'get',
                    url: this.psta + '/bindingWxPhone?wxUserId=' + this.$parent.wxUserId + '&phone=' + this.phone + '&code=' + this.code,
                })
                    .then(response => {
                        //console.log(response)
                        if (response.data.status == 200) {
                            this.$router.push('/safety')
                        } else {
                            this.cancel = true;
                            this.cancelText = response.data.message;
                        }
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
.myPhone {
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
  .Phone-input {
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

.verify-btn {
  width: 30%;
  height: 100%;
  font-size: 1.5rem;
  border-radius: 0;
  float: right;
  margin-top: 0;
  &:active {
    border-radius: 0;
  }
}
</style>

