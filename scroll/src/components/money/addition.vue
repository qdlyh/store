<template>
    <div>
        <div class="addition">
            <div class="top-box">
                <div class="top-text">
                    充值
                </div>
            </div>

            <div class="addition-input">
                <div>账户充值</div>
                <span class="yan">
                    ￥
                </span>
                <input type="number">
            </div>
        </div>
        <div class="btn-blue" style="margin-top:6.25rem;">
            下一步
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
.addition {
  .top-box {
    background: #01cc9d;
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

  .addition-input {
    background: #fff;
    height: 12.5rem;
    width: 100%;
    margin-top: 0.625rem;
    div {
      height: 40%;
      font-size: 1.75rem;
      color: #454545;
      padding: 1.875rem;
    }
    span {
      display: inline-block;
      width:5.5rem;
      font-size: 3.75rem;
      color: #454545;
      text-align: right;
      margin-right: .625rem;
    }
    input {
      width: 70%;
      height:  60%;
      border: 0;
      font-size: 3.75rem;
      color: #454545;
    //   &::-webkit-input-placeholder {
    //     color: #999;
    //     font-size: 1.75rem;
    //     text-align: left;
    //     padding-left: 0.9375rem;
    //   }
    }
  }
}
</style>
