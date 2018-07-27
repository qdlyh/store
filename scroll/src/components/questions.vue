<template>
    <div>
        <div class="questions">
            <div class="questions-box">
                <div class="questions-title">填写问题</div>
                <div class="input">
                    <input type="text" v-model.trim="title" placeholder="填写标题" maxlength="30">
                </div>
                <div class="textarea">
                    <textarea v-model.trim="describe" cols="30" rows="10" placeholder="填写内容" maxlength="200"></textarea>
                </div>
                <div class="btn-blue" @click="sumbit()">
                    提交
                </div>
            </div>
        </div>
        <toast v-model="cancel" :time="3000" type="cancel">{{(cancelText)}}</toast>
    </div>
</template>
<script>
import { Toast } from 'vux'
export default {
    components: {
        Toast,
    },
    data() {
        return {
            title: '',
            describe: '',
            cancel: false,
            cancelText: '',
        }
    },
    methods: {
        sumbit() {
            if (this.title.length < 3) {
                this.cancel = true;
                this.cancelText = '填写的问题不够完整';
            } else {
                let formData = new FormData();
                formData.append('expertsUserId', this.$route.params.id);
                formData.append('wxUserId', this.$parent.wxUserId);
                formData.append('title', this.title);
                formData.append('describe', this.describe);
                this.$ajax({
                    method: 'post',
                    url: this.psta + '/submitAskQuestions',
                    data: formData
                })
                    .then(response => {
                        //console.log(response)
                        let uuid = response.data.data.uuid;
                        this.$router.push({name:'forumMsg',params:{id:uuid}})
                    })
            }
        }
    }
}
</script>
<style lang="less" scoped>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.questions-box {
  .questions-title {
    font-size: 1.75rem;
    text-align: center;
    height: 5rem;
    line-height: 5rem;
  }
  .van-popup--right {
    background: #f3f3f3;
    width: 100%;
    height: 100%;
  }
  .input {
    input {
      width: 100%;
      height: 5rem;
      border: 0;
      font-size: 1.5rem;
      padding-left: 1.25rem;
      &::-webkit-input-placeholder {
        color: #9c9c9c;
        font-size: 1.5rem;
      }
    }
  }
  .textarea {
    margin-top: 1.25rem;
    textarea {
      padding: 1.25rem 0 0 1.25rem;
      font-size: 1.5rem;
      width: 100%;
      height: 22.5rem;
      border: 0;
      resize: none;
      &::-webkit-input-placeholder {
        color: #9c9c9c;
        font-size: 1.5rem;
      }
    }
  }
}
</style>
