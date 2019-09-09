<template>
  <div class="toolboxdiv">
    <el-tree
      :data="tools"
      node-key="id"
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <div v-if="data.idx ===4">
          **
        </div>
        <div v-if="data.idx !== 1 && data.idx !== 9 && data.idx !== 22">
          <span>{{data.idx}}</span>
        <span>
           <el-button
             type="text"
             icon="el-icon-circle-plus-outline"
             @click="addelements(node, data)">
          </el-button>
        </span>
        </div>
      </span>
    </el-tree>
  </div>

</template>

<script>
  import store from '../store'
  import constValue from '../utils/constValues'
    export default {
        name: 'ToolBox',
        store,
        data () {
            return {
                tools: constValue.tools,
                ccfData: JSON.parse(JSON.stringify(constValue.ccfTable)),
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        methods: {
            addelements (node, data) {
                if (data.idx === 23) {
                    store.commit('setTableName', data.label)
                    store.commit('updateTable', this.ccfData)
                } else {
                    store.commit('addElement2Table', data)
                }
            }
        }

    }
</script>

<style lang="scss">
  .toolboxdiv{
    .el-tree-node__content{
      height: 35px;
      font-size: 13px;
    }
  }
</style>
