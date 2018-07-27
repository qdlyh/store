<template>
    <div>
        <div class="myAddressForm">
            <div class="user-header">
                <i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
                <h1>编辑地址</h1>
                <i></i>
            </div>
            <div class="redact-msg-input address-input">
                <x-address title="选择城市" v-model="value" :list="addressData" @on-shadow-change="onShadowChange" placeholder="未设置" :show.sync="showAddress"></x-address>
            </div>
            <div class="address-input">
                <span>
                    收件人
                </span>
                <input placeholder="未设置" maxlength="5">
            </div>
            <div class="address-input">
                <span>
                    手机号
                </span>
                <input placeholder="未设置" type="number">
            </div>
            <div class="address-input" style="height:12.5rem">
                <textarea placeholder="填写详细地址，例如街道名称、楼层和门牌等信息" maxlength="100"></textarea>
            </div>
            <div class="check-input">
                <check-icon :value.sync="ischeck"> {{ ('设为默认地址') }}</check-icon>
            </div>
            <div class="btn-blue">
                保存
            </div>
        </div>
    </div>
</template>
<script>
import { CheckIcon, Group, Cell, XAddress, ChinaAddressV4Data } from 'vux'
export default {
    components: {
        CheckIcon,
        Group,
        Cell,
        XAddress
    },
    data() {
        return {
            ischeck: false,
            addressData: ChinaAddressV4Data,
            value: [],
        }
    },
    mounted() {

    }
}
</script>
<style lang="less" scoped>
.myAddressForm {
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
  .address-input {
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
        text-align: right;
        padding-right: 0.9375rem;
      }
    }
    textarea {
      width: 100%;
      border: 0;
      height: 12.5rem;
      font-size: 1.5rem;
      color: #454545;
      resize: none;
      padding: 0.625rem;
      &::-webkit-input-placeholder {
        color: #999;
        font-size: 1.5rem;
        text-align: left;
        padding: 1.25rem 0 0 0.9375rem;
      }
    }
  }
}
</style>
