<template>
    <div>
        <div class="enterprise" v-if="$parent.isCert==3">
            <input type="file" id="file-img" @change="onChange" hidden>
            <input type="file" id="file-camera" accept="image/*" capture="camera" @change="onChange" hidden>
            <div class="user-header">
                <i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
                <h1>企业认证</h1>
                <i></i>
            </div>
            <div class="file">
                <h1>企业认证需要提供商业注册登记复印件，盖公章、企业介绍、法人(授权人)授权书。</h1>
                <div class="file-box">
                    <div class="file-div">
                        <span>
                            <div class="show-img" v-if="Image!=''">
                                <div class="picture" :style="'backgroundImage:url('+Image+')'"></div>
                                <i @click="deleteBtn(0)">X</i>
                            </div>
                            <i @click="showBtn(0)" v-else>+</i>
                        </span>
                        <p>商业注册登记复印件</p>
                    </div>
                    <div class="file-div">
                        <span>
                            <div class="show-img" v-if="Images!=''">
                                <div class="picture" :style="'backgroundImage:url('+Images+')'"></div>
                                <i @click="deleteBtn(1)">X</i>
                            </div>
                            <i @click="showBtn(1)" v-else>+</i>
                        </span>
                        <p>盖公章、企业介绍、法人(授权人)授权书</p>
                    </div>
                </div>
            </div>
            <actionsheet v-model="show1" :menus="menus1" @on-click-menu="click" show-cancel></actionsheet>
            <toast v-model="cancel" :time="3000" type="cancel">{{(cancelText)}}</toast>
            <div class="btn-blue" style="margin-top:100px;" @click="submit">提交</div>
        </div>
        <div v-if="$parent.isCert==0">
            <msg :title="('资料审核中')" :description="('审核结果将会以消息形式通知您，请勿重复申请')"></msg>
            <x-button type="primary" style="width:80%;" link="BACK">返回上一页</x-button>
        </div>
        <loadings v-if="show"></loadings>
    </div>
</template>
<script>
import { Actionsheet, Toast, Msg, XButton } from 'vux'
import loadings from '@/components/common/loadings'
export default {
    components: {
        Actionsheet,
        Toast,
        Msg,
        XButton,
        loadings
    },
    data() {
        return {
            show: false,
            num: null,
            Image: '',
            Images: '',
            show1: false,
            menus1: {
                menu1: '拍照',
                menu2: '从相册中选择'
            },
            cancel: false,
            cancelText: ''
        }
    },
    mounted() {
        if (this.$parent.isCert == 1) {
            this.$router.push('/')
        }
    },
    beforeRouteLeave(to, from, next) {
        if (this.show1) {
            this.show1 = false;
            window.scrollTo(0, 0);
            next(false)
        } else {
            next()
        }
    },
    methods: {
        click(key) {
            let divImage = document.querySelector("#file-img");
            let camera = document.querySelector("#file-camera");
            if (key == 'menu1') {
                //设置重复选择同一张图片，以免重新选择照片或者拍照file的值还是前一张图片
                document.querySelector("#file-img").value = null;
                camera.click();
            }
            if (key == 'menu2') {
                document.querySelector("#file-img").value = null;
                divImage.click();
            }
        },
        showBtn(i) {
            this.show1 = true;
            this.num = i;
        },
        imgs() {
            let file = document.querySelector("#file-img").files[0] || document.querySelector("#file-camera").files[0];
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                if (this.Image == '' || this.Images == '') {
                    if (this.num == 0) {
                        this.Image = event.target.result;
                    }
                    if (this.num == 1) {
                        this.Images = event.target.result
                    }
                }
            };
        },
        onChange(e) {
            if (!/\.(jpg|png|JPG|PNG)$/.test(e.target.value)) {
                this.cancel = true;
                this.cancelText = '请上传jpg或者png图片类型'
                return false
            }
            this.imgs()
        },
        deleteBtn(i) {
            if (i == 0) {
                this.Image = '';
            } else {
                this.Images = '';
            }
        },
        submit() {
            let have = true;
            if (this.Image == '' || this.Images == '') {
                have = false;
                this.cancel = true;
                this.cancelText = '请上传完整信息'
            }
            if (have) {
                let formData = new FormData();
                formData.append('wxUserId', this.$parent.wxUserId);
                formData.append('settingId', 63);
                formData.append('files', this.Image);
                formData.append('files', this.Images);
                this.$ajax.interceptors.request.use((config) => {
                    //在请求发送之前做一些事
                    //console.log(config)
                    this.show = true;
                    return config;
                }, function (error) {
                    //当出现请求错误是做一些事
                    alert('网络发生异常')
                    return Promise.reject(error);
                });
                this.$ajax({
                    method: 'post',
                    url: this.psta + '/submitCertification',
                    data: formData
                })
                    .then(response => {
                        // console.log(response)
                        this.show = false;
                        this.$parent.isCert = 0;
                    })
            }
        }
    }
}
</script>
<style lang="less" scoped>
.enterprise {
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
  .file {
    padding: 1.25rem 3.125rem;
    h1 {
      font-size: 1.5rem;
      color: #454545;
    }
    .file-box {
      display: flex;
      justify-content: space-between;
      margin-top: 3.125rem;
      .file-div {
        width: 12.5rem;
        height: 15rem;
        span {
          position: relative;
          display: inline-block;
          width: 100%;
          height: 100%;
          border: 1px double #ccc;
          overflow: hidden;
          .show-img {
            div {
              width: 100%;
              height: 100%;
              position: absolute;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
              margin: auto;
              overflow: hidden;
              background-position: center center;
              background-repeat: no-repeat;
              background-size: cover;
              //   z-index: 99;
            }
            i {
              position: absolute;
              right: 5px;
              top: 2px;
              color: #fff;
              background: rgba(0, 0, 0, 0.5);
              width: 2rem;
              height: 2rem;
              line-height: 2rem;
              border-radius: 10px;
              font-size: 1.5rem;
              font-weight: 300;
            }
          }
          i {
            font-size: 7.5rem;
            color: #454545;
            text-align: center;
            line-height: 15rem;
            margin: 0 auto;
            width: 100%;
            height: 100%;
            display: inline-block;
            font-weight: 100;
            color: #9c9c9c;
          }
        }
        p {
          margin-top: 0.625rem;
          font-size: 1.25rem;
          color: #454545;
          text-align: center;
        }
      }
    }
  }
}
</style>
