import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tableItemId: 1000,
    newTable: [],
    tableName: ''
  },
  mutations: {
    updateTable (state, data) {
      state.newTable = data
    },
    addElement2Table (state, data) {
      var addData = {
        id: state.tableItemId++,
        idx: data.idx,
        label: data.label,
        children: []
      }
      state.newTable.push(addData)
    },
    setTableName (state, data) {
      state.tableName = data
    }
  },
  actions: {

  }
})
