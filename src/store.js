import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tableItemId: 1000,
    newTable: [],
    tableName: '',
    startTime: '',
    endTime: '',
    activity:{}
  },
  mutations: {
    updateTable (state, data) {
      state.newTable = data
      //console.log(state.newTable)
    },
    addAct(state,data){
      state.activity=data

    },
    addElement2Table (state, data) {
      // let newid =
      var addData = {
        id: this.state.tableItemId++,
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
     // console.log(addData.id)
      this.state.newTable.push(addData)
    },
    setTableName (state, data) {
      state.tableName = data
    },
    setTime (state, data) {
      state.startTime = data[0]
      state.endTime = data[1]
    }
  },
  actions: {

  }
})
