<!-- loading组件 -->
<template>
    <div>
        <div class="shade"></div>
        <div class="loading">
            <div class="middle"></div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.loading {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background: #fff;
  width: 70px;
  height: 70px;
  min-height: 70px;
  line-height: 70px;
  text-align: center;
  border-radius: 5px;
  z-index: 999;
  .middle {
    display: inline-block;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 2px solid #00a4ff;
    border-bottom-color: transparent;
    vertical-align: middle;
    animation: rotate 1s linear infinite;
  }
}
.shade {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
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