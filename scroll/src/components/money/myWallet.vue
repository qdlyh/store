<template>
    <div>
        <div class="myWallet">
            <div class="top-box">
                <div class="top-title">
                    <span>
                        账号余额(元)
                    </span>
                    <span @click="$router.push('/safety')">
                        设置
                    </span>
                </div>
                <div class="top-text">
                    2333.05
                </div>
            </div>
            <div class="link-box">
                <div class="go-link" @click="$router.push('/addition')">
                    <group>
                        <cell title="充值" is-link></cell>
                    </group>
                </div>
                <div class="go-link" @click="$router.push('/detail')">
                    <group>
                        <cell title="明细" is-link></cell>
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
    background: #01CC9D;
    position: relative;
    width: 100%;
    height: 18.75rem;
    color: #fff;
    .top-title {
      display: flex;
      justify-content: space-between;
      font-size: 1.5rem;
      padding: 1.25rem;
    }
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

