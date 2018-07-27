<!-- loading组件 -->
<template>
  <div class="loading">
    <div class="middle"></div>
  </div>
</template>

<style lang="less" scoped>
.loading {
  margin: auto;
  position: absolute;
  //top: 0;
  left: 0;
  right: 0;
  bottom: 0px;
  background: #fff;
  border-radius: 50%;
  width: 30px;
  height: 30px;   
  min-height: 30px;
  line-height: 30px;
  text-align: center;
  z-index: 10;
  .middle {
    display: inline-block;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #00a4ff;
    border-bottom-color: transparent;
    vertical-align: middle;
    animation: rotate 1s linear infinite;
  }
}
@keyframes rotate {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>