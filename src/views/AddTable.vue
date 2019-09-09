<template>
  <div>
    <div class="pageheader">
      <el-page-header @back="goBack" content="">
      </el-page-header>
    </div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-container>
          <el-header>
            工具箱
          </el-header>
          <el-main>
            <tool-box></tool-box>
          </el-main>
        </el-container>
      </el-col>
      <el-col :span="18">
        <el-container>
          <el-header>
            <span>
              编辑区
            </span>
            <span style="float: right">
              <el-button round size="medium" @click="saveTable()">保存</el-button>
            </span>
          </el-header>
          <el-main>
            <editor></editor>
          </el-main>
        </el-container>

      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
  .pageheader{
    padding-top: 10px;
    padding-bottom: 20px;
    padding-left: 10px;
  }
  .el-scrollbar__wrap {overflow-x: hidden;}
  .el-row {
    margin-bottom: 0px;
    height : 100%;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 40px;
    text-align: center;
  }
  .row-bg {
    padding: 0px 0;
    background-color: #f9fafc;
  }
  .el-header {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    line-height: 60px;
    height: 40px;
    font-size: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
  .el-main {
    color: #333;
    text-align: center;
    line-height: 100%;
    padding-left: 0px;
    font-size: 17px;
  }
</style>

<script>
    import ToolBox from '../components/ToolBox.vue'
    import Editor from '../components/Editor.vue'
    import store from '../store'
    export default {
        name: 'AddTable',
        store,
        data () {
            return {
                tableState: {
                    dirty: false,
                    hassave: false
                }
            }
        },
        mounted() {
            this.tableState.hassave =false
        },
        components: {
            'tool-box': ToolBox,
            'editor': Editor
        },
        methods: {
            goBack () {
                // console.log('go back')
                if (!this.tableState.hassave) {
                    this.$confirm('你编辑的内容(已暂存)还没提交， 是否继续离开此页面?', '提示', {
                        confirmButtonText: '停留',
                        cancelButtonText: '离开',
                        type: 'warning'
                    }).then(() => {
                        // this.$message({
                        //     type: 'success',
                        //     message: '提交成功!'
                        // });
                        // this.$router.push('/index')
                    }).catch(() => {
                        this.$router.push('/index')
                    });
               } else {
                    this.$router.push('/index')
                }
            },
            saveTable () {

                const finalTable = JSON.parse(JSON.stringify(store.state.newTable));
                console.log(finalTable)
                //debugger
                for(var i =0;i<finalTable.length;i++) {
                    this.bfs(finalTable[i])
                }
                this.$http.post('/api/admin/activity',
                    {
                        name :store.state.tableName,
                        startTime: store.state.startTime,
                        endTime: store.state.endTime,
                        items: finalTable
                    })
                    .then(function(response) {
                        console.log(response)
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
                store.commit('setTableName', '')
                store.commit('setTime', ['',''])
                store.commit('updateTable', '')
                this.$message({
                    type: 'success',
                    message: '提交报名成功'
                })
                //this.tableState.hassave = true
                this.$router.push('/index')
            },
            bfs (data) {
                delete data.id
                delete data.idx
                delete data.label
                delete data.caseEditable
                delete data.rangeName
                delete data.useRange
                data.subItem = JSON.parse(JSON.stringify(data.children))
                delete data.children
                for(var i=0;i<data.subItem.length;i++) {
                    this.bfs(data.subItem[i])
                }
            }
        }
    }
</script>
