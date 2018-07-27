<template>
    <div>
        <div class="detail">
            <div class="top-box">
                <div class="top-text">
                    明细
                </div>
            </div>
            <div class="detail-list">
                <div class="list-top-type">
                    <span>
                        财务收入： 支出
                    </span>
                    <i>￥56.00</i>
                </div>
                <div>交易方式：购买商品</div>
                <div>付款方式：余额支付</div>
                <div>创建时间：2018-05-16</div>
            </div>

            <div class="detail-list">
                <div class="list-top-type">
                    <span>
                        财务收入： 支出
                    </span>
                    <i>￥56.00</i>
                </div>
                <div>交易方式：购买商品</div>
                <div>付款方式：余额支付</div>
                <div>创建时间：2018-05-16</div>
            </div>

        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    }
}
</script>
<style lang="less" scoped>
.detail {
  .top-box {
    background: #3eb0ff;
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
  .detail-list {
    background: #fff;
    width: 100%;
    padding: 1.25rem 1.875rem;
    border-bottom: 1px solid #dedede;
    font-size: 1.5rem;
    color: #454545;
    div {
      margin-top: 0.625rem;
    }
    .list-top-type {
      display: flex;
      justify-content: space-between;
      i {
        color: #ff7a31;
        font-size: 1.5rem;
      }
    }
  }
}
</style>
