<template>
    <div>
        <div class="resume" v-if="$parent.isCert==3">
            <input type="file" id="file-img" @change="onChange" hidden>
            <input type="file" id="file-camera" accept="image/*" capture="camera" @change="onChange" hidden>
            <div class="user-header">
                <i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
                <h1 v-if="$route.params.id==0">专家认证</h1>
                <h1 v-else>志愿者认证</h1>
                <i></i>
            </div>
            <div class="file">
                <h1 v-if="$route.params.id==0">专家证需要上传个人身份证复印件和个人简历</h1>
                <h1 v-else>志愿者认证需要上传个人身份证复印件和个人简历</h1>
                <div class="file-box">
                    <div class="file-div">
                        <span>
                            <div class="show-img" v-if="Image!=''">
                                <div class="picture" :style="'backgroundImage:url('+Image+')'"></div>
                                <i @click="deleteBtn(0)">X</i>
                            </div>
                            <i @click="showBtn(0)" v-else>+</i>
                        </span>
                        <p>身份证复印件</p>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            <div class="resume" :class="{active:isActive}">
                <input id="filejl" type="file" @change="change">
                <div>
                    <i class="iconfont icon-wenjian"></i>
                    <span>个人简历</span>
                </div>
                <div>
                    {{istext}}
                </div>
            </div>
            <actionsheet v-model="show1" :menus="menus1" @on-click-menu="click" show-cancel></actionsheet>
            <toast v-model="cancel" :time="3000" type="cancel">{{(cancelText)}}</toast>
            <div class="btn-blue" id="clickMe" style="margin-top:50px;" @click="submit">提交</div>
        </div>
        <div v-if="$parent.isCert==0">
            <msg :title="('资料审核中')" :description="('审核结果将会以消息形式通知您，请勿重复申请')"></msg>
            <x-button type="primary" style="width:80%;" link="BACK">返回上一页</x-button>
        </div>
    </div>
</template>
<script>
import { Actionsheet, Toast, Msg, XButton } from 'vux'

export default {
    components: {
        Actionsheet,
        Toast,
        Msg,
        XButton
    },
    data() {
        return {
            num: null,
            Image: '',
            show1: false,
            menus1: {
                menu1: '拍照',
                menu2: '从相册中选择'
            },
            cancel: false,
            cancelText: '',
            isActive: false,
            istext: '上传',
            files: '',//文件
            Blob: '',
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
            let image = document.querySelector("#file-img");
            let camera = document.querySelector("#file-camera");
            if (key == 'menu1') {
                //设置重复选择同一张图片，以免重新选择照片或者拍照file的值还是前一张图片
                document.querySelector("#file-img").value = null;
                camera.click();
            }
            if (key == 'menu2') {
                document.querySelector("#file-img").value = null;
                image.click();
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
                if (this.Image == '') {
                    if (this.num == 0) {
                        this.Image = event.target.result;
                        this.dataURItoBlob(this.Image)
                        // let formData = new FormData();
                        // formData.append('wxUserId', this.$parent.wxUserId);
                        // formData.append('settingId', settingId);
                        // formData.append('image', this.Image);
                        // this.$ajax({
                        //     method: 'post',
                        //     url: this.psta + '/submitCertification01',
                        //     data: formData
                        // })
                        //     .then(response => {
                        //         //console.log(response)
                        //     })
                    }
                }
            };
        },
        dataURItoBlob(dataURI) {
            var byteString = atob(dataURI.split(',')[1]);
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            //console.log(new Blob([ab], { type: mimeString }))
            this.Blob = new Blob([ab], { type: mimeString })
            return new Blob([ab], { type: mimeString });
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
            }
        },
        change(e) {
            if (!/\.(word||WORD||pdf||PDF||docx||DOCX)$/.test(e.target.value)) {
                this.cancel = true;
                this.cancelText = '请上传word、pdf、docx简历类型'
                document.querySelector("#filejl").value = null;
                return false;
            } else {
                this.files = e.target.files[0];
                this.isActive = true;
                this.istext = '上传成功';
            }
            // let formData = new FormData();
            // formData.append('wxUserId', this.$parent.wxUserId);
            // formData.append('files', e.target.files[0]);
            // this.$ajax({
            //     method: 'post',
            //     url: this.psta + '/submitCertification02',
            //     data: formData
            // })
            //     .then(response => {
            //         //console.log(response)
            //         this.isActive = true;
            //         this.istext = '上传成功';
            //     })
        },
        submit() {
            console.log(this.Blob)
            let settingId = null;
            if (this.$route.params.id == 0) {
                settingId = 62;
            } else {
                settingId = 64;
            }
            if (this.Image == '' || this.isActive == false) {
                this.cancel = true;
                this.cancelText = '请上传完整信息'
            } else {
                let formData = new FormData();
                formData.append('wxUserId', this.$parent.wxUserId);
                formData.append('settingId', settingId);
                formData.append('files', this.Image);
                formData.append('files', this.files);
                this.$ajax({
                    method: 'post',
                    url: this.psta + '/submitCertification',
                    data: formData,
                })
                    .then(response => {
                        console.log(response)
                        this.$parent.isCert = 0;
                    })
            }
        }
    },
}
</script>
<style lang="less" scoped>
.resume {
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
      justify-content: center;
      align-items: center;
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
  .resume {
    width: 95%;
    height: 5rem;
    line-height: 5rem;
    font-size: 1.75rem;
    color: #454545;
    border-radius: 10px;
    margin: 3.75rem auto;
    border: 1px solid #454545;
    padding: 0 1.875rem;
    position: relative;
    display: flex;
    justify-content: space-between;
    i {
      font-size: 2rem;
      margin-right: 1.875rem;
    }
    input {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
    }
  }
}
.file-input {
  //display: none;
}
.active {
  border: 1px solid #78d034 !important;
  color: #78d034 !important;
}
</style>
