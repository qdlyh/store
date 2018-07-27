import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const vuex = new Vuex.Store({
  //state全局状态变量
  state: {
    //page:1,     //缓存页数
    //replyPage:1,  //缓存回复页数
    listId:null,   //设置选项卡选中id
    itemTop:0,  //列表高度
    replyTop:0, //记录回复列表高度
    msgTop:0,   //留言列表高度
    article: {}, //缓存文章详细信息
  },
  //mutations改变全局状态方法
  mutations: {
    scrollTop(state,scroll){
      state.scrollTop = scroll;
    },
     message(state,id){
        state.msgId = id;
     },
     listId(state, id) {
      state.listId = id;
      //console.log(state.listId)
      state.listId = sessionStorage.setItem('listId', state.listId);
    }
  }
})

export default vuex
