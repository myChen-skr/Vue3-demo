import { createStore } from "vuex"
import state from "./state"
import actions from "./actions"
import mutations from "./mutations"

const store = createStore({
    state, // 状态管理
    mutations, // 更改 state 数据，并返回最新的 state
    actions, // dispatch 执行的方法列表
    modules: {},
})

export default store