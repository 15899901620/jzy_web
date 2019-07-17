
export  const state =()=> {
  return{
    listTitle:''    //标题名字
  }
}
export  const mutations={

  changeNewsTitle(state,value){
      console.log('state:',state)
      console.log('value:',value)
      state.listTitle=value
      console.log('*** state.listTitle***', state.listTitle)
    }
}

export  const actions={
  changeNewsTitle({commit}){
    commit('changeNewsTitle')
  }
}




