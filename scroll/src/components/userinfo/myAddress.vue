<template>
    <div>
        <div class="myAddress">
            <div class="user-header">
                <i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
                <h1>收货地址</h1>
                <i @click="$router.push('/myAddressForm')">添加</i>
            </div>
            <!-- <div>什么也没有哦</div> -->
            <div class="address-list">
                <group>
                    <cell :title="user" :inline-desc="addressValue" is-link></cell>
                </group>
            </div>
        </div>
    </div>
</template>
<script>
import { Group, Cell, } from 'vux'
export default {
    components: {
        Group,
        Cell,
    },
    data() {
        return {
            user: '谢先生(150550000)',
            addressValue: '广州市白云区鸣泉居广州市白云区鸣泉居广州市白云区鸣泉居',
        }
    }
}
</script>
<style lang="less" scoped>
.myAddress {
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
}

.address-list {
  padding: 0 10px;
  margin-top: 0.625rem;
  height: 7.5rem;
  background: #fff;
  .weui-cell {
    height: 7.5rem;
    font-size: 1.75rem;
    color: #454545;
    ::after {
      height: 9px !important;
      width: 9px !important;
      margin-top: -5px !important;
      right: 0px !important;
    }
  }
}
</style>
