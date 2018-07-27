<template>
    <div>
        <div class="password">
            <div class="top-box">
                <div class="top-text">
                    交易密码
                </div>
            </div>
            <div class="Phone-input">
                <span>
                    新密码:
                </span>
                <input type="password" placeholder="请输入密码">
            </div>
            <div class="Phone-input">
                <span>
                    确认密码:
                </span>
                <input type="password" placeholder="请确认密码">
            </div>
        </div>
        <div class="btn-blue" style="margin-top:7rem;">
            保存
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
.password {
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
</style>
