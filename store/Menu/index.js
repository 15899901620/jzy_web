//
// export  const state =()=> {
//   return{
//     listTitle:''    //标题名字
//   }
// }
// export  const mutations={
//
//   changeNewsTitle(state,value){
//     console.log('state:',state)
//     console.log('value:',value)
//     state.listTitle=value
//     console.log('*** state.listTitle***', state.listTitle)
//   }
// }
//
// export  const actions={
//   changeNewsTitle({commit}){
//     commit('changeNewsTitle')
//   }
// }
// export  const getters={
//   changeNewsTitle({commit}){
//     commit('changeNewsTitle')
//   }
// }

 export default {
  // 通过添加namespaced将actions,mutations,getters限定在模块命名空间中
  // 当所有的actions, mutations, getters 都被限定到模块的命名空间下，我们dispatch actions, commit mutations 都需要用到命名空间。
  // dispacth("changeName"),  就要变成 dispatch("login/changeName"); getters.localJobTitle 就要变成 getters["login/localJobTitle"]
  namespaced:true,
  state:{
    listTitle:''    //标题名字
  },
  getters:{

  },

  mutations:{
  changeNewsTitle(state,value){
    console.log('state:',state)
    console.log('value:',value)
    state.listTitle=value
    console.log('*** state.listTitle***', state.listTitle)
  }
  },

   actions:{
     changeNews({commit},value){
       commit("changeNewsTitle", value)
     }
   },


}

