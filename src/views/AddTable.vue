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
              <el-button round size="medium">保存</el-button>
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
    export default {
        name: 'AddTable',
        components: {
            'tool-box': ToolBox,
            'editor': Editor
        },
        methods: {
            goBack () {
                console.log('go back')
            }
        }
    }
</script>
