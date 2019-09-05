<template>
  <div class="editordiv">
    <div class="block">
      <el-input v-model="tableName" placeholder="请输入报名表名称" style="width: 400px;float: left"></el-input>
    </div>
    <div class="block">
      <el-date-picker
        v-model="value3"
        type="datetimerange"
        align="right"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['12:00:00', '08:00:00']"
        style="float: left">
      </el-date-picker>
    </div>
   <el-tree
      :data='datas'
      node-key="id"
      @node-drop="handleDrop"
      draggable
      :allow-drop="allowDrop"
      default-expand-all
      :expand-on-click-node="false">
      <span class="custom-tree-node" style="line-height: 50px" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            icon="el-icon-delete"
            @click="() => remove(node, data)">
          </el-button>
           <el-button
             type="text"
             size="mini"
             icon="el-icon-edit"
             @click="() => edit(node, data)">
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
  import store from '../store'
    export default {
        name: 'Editor',
        store,
        id: 1000,
        data () {
            return {
                value1: true,
                value2: true,
                value3: ''
            }
        },
        computed: {
            datas () {
                return JSON.parse(JSON.stringify(store.state.newTable))
            },
            tableName () {
                return store.state.tableName
            }
        },
        methods: {
            remove (node, data) {
                const parent = node.parent
                const children = parent.data.children || parent.data
                const index = children.findIndex(d => d.id === data.id)
                children.splice(index, 1)
                const updatedata = this.datas
                store.commit('updateTable', updatedata)
                console.log(store.state.newTable)
            },
            handleDrop () {
                const updatedata = this.datas
                store.commit('updateTable', updatedata)
            },
            edit (node, data) {
                this.$prompt('请输入邮箱', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                    inputErrorMessage: '邮箱格式不正确'
                }).then(({ value }) => {
                    this.$message({
                        type: 'success',
                        message: '你的邮箱是: ' + value
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    })
                })
            },
            allowDrop (draggingNode, dropNode, type) {
                if (dropNode.data.label !== '分组') {
                    return type !== 'inner'
                } else {
                    return true
                }
            }
        }
    }
</script>

<style lang="scss">
  .block{
    height: 60px;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
  }
  .editordiv{
    .el-tree-node__content{
      height: 35px;
    }
  }
</style>
