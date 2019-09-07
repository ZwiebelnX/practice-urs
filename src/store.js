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
      console.log(state.newTable)
    },
    addElement2Table (state, data) {
      var addData = {
        id: state.tableItemId++,
        idx: data.idx,
        label: data.label,
        extension: data.extension,
        name: data.name,
        type: data.type,
        defaultValue: data.defaultValue,
        unique: data.unique,
        description: data.description,
        tip: data.tip,
        require: data.require,
        caseEditable: data.caseEditable,
        case: data.case,
        rangeName: data.rangeName,
        range: data.range,
        useRange: data.useRange,
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
