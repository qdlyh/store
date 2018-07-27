<template>
    <div>
        <div class="enterForm" v-if="$parent.isIn==3">
            <div class="user-header">
                <i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
                <h1>入驻申请表</h1>
                <i></i>
            </div>
            <div class="enter-input">
                <span>
                    企业名称
                </span>
                <input placeholder="未设置" v-model.trim="name" maxlength="20">
            </div>
            <div class="enter-input">
                <group>
                    <popup-picker value-text-align="left" title="企业性质" :data="list" v-model="values" :columns="1" :placeholder="('未选择')" show-name></popup-picker>
                </group>
            </div>
            <div class="enter-input">
                <span>
                    经营范围
                </span>
                <input placeholder="例：服务行业" v-model.trim="type" maxlength="20">
            </div>
            <div class="enter-input" style="height:15rem">
                <span style="position: relative;top: -5.5rem;">企业地址</span>
                <textarea type="text" v-model.trim="address" placeholder="填写地址" maxlength="40"></textarea>
            </div>
            <toast v-model="cancel" :time="3000" type="cancel">{{(cancelText)}}</toast>
            <div class="btn-blue" @click="sumbit">
                下一步
            </div>
        </div>
        <div v-if="$parent.isIn==0">
            <msg :title="('资料已提交')" :description="('审核结果将会以消息形式通知您，请勿重复申请')"></msg>
            <x-button type="primary" style="width:80%;" link="BACK">返回上一页</x-button>
        </div>
        <div v-if="$parent.isIn==2">
            <msg :title="('申请认证失败')" icon="warn" :description="('请前往消息通知查看详情原因')"></msg>
            <x-button type="primary" style="width:80%;" link="BACK">返回上一页</x-button>
        </div>
    </div>
</template>
<script>
import { Group, Cell, PopupPicker, Toast, Msg, XButton } from 'vux'
export default {
    components: {
        Group,
        Cell,
        PopupPicker,
        Toast,
        Msg,
        XButton
    },
    data() {
        return {
            cancelText: '',
            cancel: false,
            list: [],
            values: [],
            name: '',
            type: '',
            address: '',
        }
    },
    mounted() {
        if (this.$parent.isIn == 1) {
            this.$router.push('/')
        }
        this.$ajax({
            method: 'get',
            url: this.psta + '/findWxEnterpriseType',
        })
            .then(response => {
                //console.log(response)
                this.list = [response.data.data];
            })
    },
    methods: {
        sumbit() {
            let have = true;
            if (this.name.length == 0 || this.values.length == 0 || this.type.length == 0 || this.address.length == 0) {
                have = false;
                this.cancel = true;
                this.cancelText = '请填写完整的基本信息'
            }
            if (have) {
                let formData = new FormData();
                formData.append('wxUserId', this.$parent.wxUserId);
                formData.append('enterpriseName', this.name);
                formData.append('settingId', this.values[0]);
                formData.append('scope', this.type);
                formData.append('businessAddress', this.address);
                this.$ajax({
                    method: 'post',
                    url: this.psta + '/submitWxEnterprises',
                    data: formData
                })
                    .then(response => {
                        this.$router.push('/uploadFile');
                    })
            }
        }
    }
}
</script>
<style lang="less" scoped>
.enterForm {
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
  .enter-input {
    background: #fff;
    height: 5rem;
    line-height: 5rem;
    width: 100%;
    margin-top: 0.625rem;
    span {
      display: inline-block;
      width: 9.375rem;
      height: 6.25rem;
      font-size: 1.5rem;
      color: #454545;
      padding-left: 1.25rem;
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
</style>
