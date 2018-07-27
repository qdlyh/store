<template>
    <div>
        <div class="userType" v-for="(item,index) in list" :key="item.uuid">
            <div class="my-type">
                <div class="type-color" :id="'active'+item.settingId">
                    <!-- @click="$router.push('/userTypeForm')" -->
                    <p class="redact">编辑</p>
                    <div class="user-msg">
                        <div>
                            <img v-lazy="item.image" alt="">
                        </div>
                        <p>{{item.nickName}}</p>
                        <i v-if="item.settingId==61">会员</i>
                        <i v-if="item.settingId==62">专家</i>
                        <i v-if="item.settingId==63">志愿者</i>
                        <i v-if="item.settingId==64">企业</i>
                    </div>
                </div>
                <div class="typeBtn-box" v-if="item.settingId==61">
                    <div class="typeBtn" @click="$router.push({ name: 'resume', params: { id: 0 } })">
                        <a href="javascript:;" style="background:#23C3FF">我是专家</a>
                    </div>
                    <div class="typeBtn" @click="$router.push({ name: 'resume', params: { id: 1 } })">
                        <a href="javascript:;" style="background:#FF6B6D">我是志愿者</a>
                    </div>
                    <div class="typeBtn" @click="$router.push('/enterprise')">
                        <a href="javascript:;" style="background:#FFA34C">我是企业家</a>
                    </div>
                </div>
                <div class="text-type" v-if="item.settingId!=61">
                    <p class="text">{{item.signature}}</p>
                </div>
            </div>
            <!-- <div class="userType-link-box">
                <div class="userType-link" v-if="item.settingId!=63">
                    <group>
                        <cell title="购物车" :value="item.spCount" is-link></cell>
                    </group>
                </div>
                <div class="userType-link" v-if="item.settingId!=63">
                    <group>
                        <cell title="订单" :value="item.orderCount" is-link></cell>
                    </group>
                </div>
                <div class="userType-link" v-if="item.settingId!=63" @click="$router.push('/myAddress')">
                    <group>
                        <cell title="收货地址" :value="item.addressCount" is-link></cell>
                    </group>
                </div>
            </div> -->

            <!-- 企业 -->
            <div class="userType-link-box">
                <div class="userType-link" v-if="item.settingId==63&&$parent.isIn!=1" @click="$router.push('/enterText')">
                    <group>
                        <cell title="入驻" is-link></cell>
                    </group>
                </div>
            </div>

            <div class="userType-link-box">
                <div class="userType-link" v-if="item.settingId!=62" @click="$router.push('/myAttention')">
                    <group>
                        <cell title="我的关注" is-link></cell>
                    </group>
                </div>
                <div class="userType-link" v-if="item.settingId==62" @click="$router.push('/myArticle')">
                    <group>
                        <cell title="我的博文" is-link></cell>
                    </group>
                </div>
                <div class="userType-link" @click="$router.push({ name: 'mySchistory', params: { id: 4 } })">
                    <group>
                        <cell title="我的收藏" is-link></cell>
                    </group>
                </div>
                <div class="userType-link" v-if="item.settingId==61" @click="$router.push({ name: 'myIssue', params: { id: 5 } })">
                    <group>
                        <cell title="我的提问" is-link></cell>
                    </group>
                </div>
                <div class="userType-link" v-if="item.settingId==62" @click="$router.push({ name: 'myIssue', params: { id: 6 } })">
                    <group>
                        <cell title="我的回答" is-link></cell>
                    </group>
                </div>
            </div>

            <div class="userType-link-box">
                <div class="userType-link" @click="$router.push('/myMessage')">
                    <group>
                        <cell title="消息通知" is-link></cell>
                    </group>
                </div>
                <div class="userType-link" @click="$router.push({ name: 'mySchistory', params: { id: 8 } })">
                    <group>
                        <cell title="历史记录" is-link></cell>
                    </group>
                </div>
            </div>

            <div class="userType-link-box">
                <div class="userType-link" @click="$router.push('/safety')">
                    <group>
                        <cell title="设置" is-link></cell>
                    </group>
                </div>
            </div>
            <br/> <br/>
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
            isText: false,
            list: [],
        }
    },
    mounted() {
        this.$ajax({
            method: 'get',
            url: this.psta + '/getWxPersonalCenterInFo?wxUserId=' + this.$parent.wxUserId,
        })
            .then(response => {
                //console.log(response)
                this.list = [response.data.data];
            })
    }
}
</script>
<style lang="less" scoped>
#active61 {
  //游客
  background: #00cc9e;
}
#active62 {
  //专家
  background: #23c3ff;
}
#active63 {
  //志愿者
  background: #ff6b6d;
}
#active64 {
  //企业
  background: #ffa34c;
}

.userType {
  .my-type {
    width: 100%;
    height: 18.75rem;
    .type-color {
      height: 10rem;
      .redact {
        float: right;
        text-align: center;
        color: #fff;
        font-size: 1.75rem;
        margin: 1.875rem;
        padding: 8px 5px;
        border-radius: 50%;
        transition: 0.3s;
        &:active {
          border-radius: 50%;
          background: #657180;
        }
      }
      .user-msg {
        padding: 4.6875rem 0 0 1.875rem;
        display: flex;
        position: relative;
        p {
          margin-top: 1.5rem;
          font-size: 2rem;
          color: #fff;
        }
        i {
          position: absolute;
          left: 11rem;
          bottom: 0.625rem;
          font-size: 1.5rem;
          color: #9c9c9c;
        }
        img {
          width: 7.8125rem;
          height: 7.8125rem;
          border-radius: 100%;
          margin-right: 1.25rem;
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5),
            0px 2px 20px 3px rgba(0, 0, 0, 0.25);
        }
      }
    }
    .typeBtn-box {
      height: 8.75rem;
      display: flex;
      justify-content: space-between;
      padding-top: 2.5rem;
      background: #fff;
      /* 按钮 */
      .typeBtn {
        text-align: center;
        margin: 1.25rem auto;
        width: 30%;
        height: 3.125rem;
        line-height: 3.125rem;
        border-radius: 0.9375rem;
        a {
          display: inline-block;
          width: 100%;
          height: 100%;
          font-size: 1.5rem;
          border-radius: 0.9375rem;
          color: #fff;
          text-overflow: ellipsis;
          border: none;
          outline: none;
        }
      }
    }
    .text-type {
      height: 8.75rem;
      background: #fff;
      padding: 3.6rem 1.25rem;
      display: -webkit-box;
      /*! autoprefixer: off */
      -webkit-box-orient: vertical;
      /* autoprefixer: on */
      -webkit-line-clamp: 2;
      overflow: hidden;
      .text {
        font-size: 1.5rem;
        color: #9c9c9c;
      }
    }
  }

  /* vux框 */
  .userType-link-box {
    margin-top: 1.875rem;
    .userType-link {
      margin-top: 0.625rem;
      height: 5rem;
      background: #fff;
      .weui-cell {
        height: 5rem;
        font-size: 1.5rem;
        color: #454545;
        ::after {
          margin-top: -5px !important;
          right: 0px !important;
        }
      }
    }
  }
}

.show-text {
  .shade {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
  }
  .my-text {
    padding: 1.25rem;
    position: fixed;
    left: 50%;
    top: 50%;
    margin: auto;
    z-index: 999;
    transform: translate(-50%, -50%);
    width: 80%;
    min-height: 30%;
    border-radius: 10px;
    color: #454545;
    background: #fff;
    font-size: 1.5rem;
    color: #454545;
  }
}
</style>
