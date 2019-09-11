<template>
  <div class="editordiv">
    <div class="block">
      <el-input v-model="tableName" @change="changeTablename()" placeholder="请输入报名表名称" style="width: 400px;float: left"></el-input>
    </div>
    <div class="block">
      <el-date-picker
        v-model="value3"
        type="datetimerange"
        align="right"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['12:00:00', '08:00:00']"
        value-format = 'yyyy-MM-dd HH:mm:ss'
        @change="changeDate()"
        style="float: left">
      </el-date-picker>
    </div>
    <el-tree
      ref= "ljTree"
      :data='datas'
      node-key="id"
      @node-drop="handleDrop"
      draggable
      :allow-drop="allowDrop"
      default-expand-all
      :expand-on-click-node="false"
      :check-on-click-node = "true">
      <span class="custom-tree-node" style="line-height: 50px" slot-scope="{ node, data }">
        <span>{{ node.label }}  :  {{data.name}}</span>
      <span>
          <el-button
            type="text"
            size="medium"
            icon="el-icon-delete"
            @click="() => remove(node, data)">
          </el-button>
           <el-button
             type="text"
             size="medium"
             icon="el-icon-edit"
             @click="() => editElement(node, data)">
          </el-button>
        <!-- Form -->
          <el-dialog :title="'表项：'+form.label" :visible.sync="dialogFormVisible" @close="handledialogClose">
            <el-row :gutter="10" >
              <el-col :span="6" class="tablelabel">
                表项名称
              </el-col>
              <el-col :span="18">
                <el-input v-model="form.name"></el-input>
              </el-col>
            </el-row>
            <div v-if="form.idx !==8">
              <el-row :gutter="10">
              <el-col :span="6" class="tablelabel">
                表项填写提示
              </el-col>
              <el-col :span="18">
                <el-input v-model="form.tip"></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="6" class="tablelabel">
                表项是否必填
              </el-col>
              <el-col :span="1">
               <el-switch v-model="form.require" active-color="#409EFF" inactive-color="#d3dce6" style="float: bottom;"></el-switch>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="6" class="tablelabel">
                表项是否验证唯一性
              </el-col>
              <el-col :span="1" >
               <el-switch v-model="form.unique" active-color="#409EFF" inactive-color="#d3dce6" style="float: bottom;"></el-switch>
              </el-col>
            </el-row>
            <el-row :gutter="10"  v-if="form.idx !==4 && (form.idx < 12 ||form.idx>19)">
               <el-col :span="6" class="tablelabel">
                表项是否使用范围限制
               </el-col>
               <el-col :span="1">
                <el-switch v-model="form.useRange" active-color="#409EFF" inactive-color="#d3dce6" style="float: bottom;"></el-switch>
               </el-col>
            </el-row>
            <el-row :gutter="10"  v-if="form.idx ===6">
              <el-col :span="6" class="tablelabel">
                -
              </el-col>
              <el-col :span="6">
                   <el-date-picker
                     v-model="form.range[0]"
                     type="date"
                     placeholder="最小日期"
                     format="yyyy . MM . dd "
                     value-format="yyyy-MM-dd"
                     :disabled="!form.useRange">
                   </el-date-picker>
              </el-col>
              <el-col :span="6">
                   <el-date-picker
                     v-model="form.range[1]"
                     type="date"
                     placeholder="最大日期"
                     format="yyyy . MM . dd "
                     value-format="yyyy-MM-dd"
                     :disabled="!form.useRange">
                   </el-date-picker>
              </el-col>
            </el-row>
            <el-row :gutter="10"  v-if="form.idx !== 6 && form.idx !==4 &&(form.idx < 12 ||form.idx>19)">
              <el-col :span="6" class="tablelabel">
                -
              </el-col>
              <el-col :span="9">
               <el-input :placeholder="['最小'+form.rangeName]"  type="number" v-model=form.range[0] :disabled="!form.useRange"></el-input>
              </el-col>
              <el-col :span="9">
               <el-input :placeholder="['最大'+form.rangeName]"  type="number" v-model=form.range[1] :disabled="!form.useRange"></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="10" v-if="form.idx === 6">
              <el-col :span="6" class="tablelabel">
                表项默认值
              </el-col>
              <el-col :span="6">
                   <el-date-picker
                     v-model="form.defaultValue"
                     type="date"
                     placeholder="默认日期"
                     format="yyyy . MM . dd "
                     value-format="yyyy-MM-dd">
                   </el-date-picker>
              </el-col>
            </el-row>
              <el-row :gutter="10" v-else-if="form.idx===12">
                <el-col :span="6" class="tablelabel">
                表项默认值
                </el-col>
                <el-col :span="5">
                  <el-select v-model="form.defaultValue"  @change="selectchange()" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
            <el-row :gutter="10" v-else>
              <el-col :span="6" class="tablelabel">
                表项默认值
              </el-col>
              <el-col :span="18">
                <el-input v-model="form.defaultValue"></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="10" v-if="form.idx ===4|| form.idx ===5 ||form.idx ===14">
              <el-col :span="6" class="tablelabel">
                表项新选项
              </el-col>
              <el-col :span="14">
                <el-tag
                  :key="tag"
                  v-for="tag in form.case"
                  closable
                  :disable-transitions="false"
                  @click="handleClick(tag)"
                  @close="handleClose(tag)">
                  {{tag}}
                </el-tag>
              </el-col>
              <el-col :span="4">
                <el-input
                  class="input-new-tag"
                  v-model="caseinputValue"
                  ref="saveTagInput"
                  placeholder=' + 新标签'
                  size="medium"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm">
                </el-input>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="6" class="tablelabel">
                表项描述
              </el-col>
              <el-col :span="18">
                <el-input type="textarea" autosize v-model="form.description"></el-input>
              </el-col>
            </el-row>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>
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
                value3: [store.state.startTime,store.state.endTime],
                tableName: store.state.tableName,
                dialogFormVisible: false,
                caseinputValue: '',
                form: '',
                formLabelWidth: '120px',
                options: [{
                    value: '',
                    label: '无默认选项'
                }, {
                    value: '男',
                    label: '男'
                }, {
                    value: '女',
                    label: '女'
                }]
            }
        },
        computed: {
            datas () {
                return JSON.parse(JSON.stringify(store.state.newTable))
            }
        },
        methods: {
            changeTablename () {
                store.commit('setTableName', this.tableName)
                console.log(store.state.tableName)
            },
            remove (node, data) {
                const parent = node.parent
                const children = parent.data.children || parent.data
                const index = children.findIndex(d => d.id === data.id)
                children.splice(index, 1)

                const updatedata = this.datas
                store.commit('updateTable', updatedata)
            },
            handleDrop () {
                const updatedata = this.datas
                store.commit('updateTable', updatedata)
            },
            allowDrop (draggingNode, dropNode, type) {
                if (dropNode.data.label !== '分组') {
                    return type !== 'inner'
                } else {
                    return true
                }
            },
            editElement (node, data) {
                this.dialogFormVisible = true
                this.form = data
            },
            handleClick (tag) {
                this.form.defaultValue = tag
            },
            handleClose (tag) {
                this.form.case.splice(this.form.case.indexOf(tag), 1)
                if (this.form.defaultValue === tag) {
                    this.form.defaultValue = ''
                }
            },
            handleInputConfirm () {
                let inputValue = this.caseinputValue
                if (inputValue) {
                    this.form.case.push(inputValue)
                }
                this.caseinputValue = ''
            },
            selectchange () {
                // console.log(this.form.defaultValue)
            },
            changeElement () {
                this.caseinputValue = ''
                this.dialogFormVisible = false
                console.log(this.form)
                let data = [JSON.parse(JSON.stringify(this.form))]
                // delete
                console.log(data)
                this.$refs['ljTree'].updateKeyChildren(data.id, data)
                console.log(this.$refs['ljTree'].data)
            },
            handledialogClose () {

                if(this.form.range.length === 2){
                    this.form.range[0] = Number(this.form.range[0])
                    this.form.range[1] = Number(this.form.range[1])
                }
                const updatedata = this.datas
               // console.log('关闭前的更新pp数据')
                //console.log(updatedata)
                //debugger
                store.commit('updateTable', updatedata)
               // this.dialogFormVisible = false
            },
            changeDate () {
                 store.commit('setTime', this.value3)
            }
        }
    }
</script>

<style lang="scss">
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"]{
    -moz-appearance: textfield;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 30px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .block {
    height: 60px;
  }
  .tablelabel {
    display: inline-block;
    height: 100%;
    font-size: 15px;
    min-width: 100px;
    text-align: left;
  }
  .switchposition {
    position: relative;
    bottom: 0px;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
  }

  .editordiv {
    .el-tree-node__content {
      height: 35px;
    }
  }
</style>
