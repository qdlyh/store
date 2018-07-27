<template>
    <div>
        <div class="myWallet">
            <div class="top-box">
                <div class="top-text">
                    安全设置
                </div>
            </div>
            <div class="link-box">
                <div class="go-link" @click="$router.push('/password')">
                    <group>
                        <cell title="交易密码" is-link></cell>
                    </group>
                </div>
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

        }
    }
}
</script>
<style lang="less" scoped>
.myWallet {
  .top-box {
    background: #3EB0FF;
    position: relative;
    width: 100%;
    height: 18.75rem;
    color: #fff;
    .top-text {
      position: absolute;
      left: 50%;
      top: 50%;
      margin: auto;
      transform: translate(-50%, -50%);
      font-size: 4.5rem;
    }
  }
  .link-box {
    margin-top: 1.875rem;
  }
  .go-link {
    margin-top: 0.625rem;
  }
}
</style>

