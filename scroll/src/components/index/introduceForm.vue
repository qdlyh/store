<template>
    <div>
        <div class="introduceForm" v-show="show==0">
            <div class="user-header">
                <i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
                <h1>安装申请</h1>
                <i></i>
            </div>
            <div class="form">
                <div class="input-box">
                    <group>
                        <popup-picker value-text-align="left" :title="title" :data="list" v-model="values" :columns="1" :placeholder="('选择产品')" show-name>
                        </popup-picker>
                    </group>
                </div>
                <div class="input-box">
                    <span>联系人</span>
                    <input type="text" v-model.trim="name" placeholder="姓名" maxlength="5">
                </div>
                <div class="input-box">
                    <span>联系电话</span>
                    <input type="number" v-model.trim="phone" placeholder="联系电话" oninput='if(value.length>11)value=value.slice(0,11)'>
                </div>
                <div class="input-box">
                    <span>安装地址</span>
                    <input type="text" v-model.trim="address" placeholder="安装地址" maxlength="40">
                </div>
                <div class="input-box" style="height:15rem">
                    <span style="position: relative;top: -5.5rem;">留言</span>
                    <textarea type="text" v-model.trim="msg" placeholder="想说的话" maxlength="100"></textarea>
                </div>
            </div>
            <toast v-model="cancel" :time="3000" type="cancel">{{(cancelText)}}</toast>
            <div class="btn-blue" @click="submit">
                提交
            </div>
        </div>
        <div v-show="show==1">
            <msg :title="('安装申请已提交')" :description="('审核结果将会以消息或者电话形式通知您')"></msg>
            <x-button type="primary" style="width:80%;" link="BACK">返回上一页</x-button>
        </div>
    </div>
</template>
<script>
import { PopupPicker, Group, Toast, Msg, XButton } from 'vux'
export default {
    components: {
        Group,
        PopupPicker,
        Toast,
        Msg,
        XButton
    },
    data() {
        return {
            cancelText: '',
            title: '洁肠仪',
            cancel: false,
            show: 0,
            list: [
                // { name: '国有企业', value: '1' },
                // { name: '集体企业', value: '2' },
                // { name: '联营企业', value: '3' },
                // { name: '三资企业', value: '4' },
                // { name: '私营企业', value: '5' },
                // { name: '其他企业', value: '6' }
            ],
            values: [],
            name: '',
            phone: '',
            address: '',
            msg: '',
        }
    },
    mounted() {
        this.$ajax({
            method: 'get',
            url: this.psta + '/findWxJieChangYiType',
        })
            .then(response => {
                //console.log(response)
                this.list = response.data.data;
            })
    },
    methods: {
        submit() {
            //console.log(this.values)
            let have = true;
            if (this.name.length == 0 || this.phone.length == 0 || this.address.length == 0 || this.values.length == 0) {
                this.cancel = true;
                this.cancelText = '请填写完整的基本信息'
                have = false;
                return false;
            }
            if (!(/^1[345789][0-9]{9}$/.test(this.phone))) {
                this.cancel = true;
                this.cancelText = '手机号码错误'
                have = false;
                return false;
            }
            if (have) {
                this.cancel = true;
                this.cancelText = '已提交'
                let formData = new FormData();
                formData.append('settingId', this.values[0]);
                formData.append('contactName', this.name);
                formData.append('contactPhone', this.phone);
                formData.append('inAddress', this.address);
                formData.append('message', this.msg);
                this.$ajax({
                    method: 'post',
                    url: this.psta + '/getWxInstallApply',
                    data: formData
                })
                    .then(response => {
                        console.log(response)
                        this.show = 1;
                    })
            }
        }
    }
}
</script>
<style lang="less" scoped>
.demo3-slot {
  height: 5rem;
  text-align: center;
  line-height: 5rem;
  font-size: 1.75rem;
  color: #454545;
}
.introduceForm {
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
  .form {
    .input-box {
      height: 6.25rem;
      line-height: 6.25rem;
      margin-top: 0.625rem;
      background: #fff;
      span {
        display: inline-block;
        width: 8.125rem;
        height: 6.25rem;
        line-height: 6.25rem;
        margin-left: 0.9375rem;
        font-size: 1.5rem;
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
        }
      }
      textarea {
        width: 60%;
        height: 8rem;
        border: 0;
        font-size: 1.5rem;
        margin-top: 0.625rem;
        resize: none;
        color: #454545;
        &::-webkit-input-placeholder {
          color: #999;
          font-size: 1.5rem;
          padding-top: 0.7rem;
        }
      }
    }
  }
}
</style>

