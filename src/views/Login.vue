<template>
  <div class="login-main">
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">CCF报名管理端登录</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" show-password placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="submitForm('ruleForm2')" >登录</el-button>
        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: 'Login',
        data () {
            return {
                ruleForm2: {
                    account: 'admin',
                    checkPass: 'cse2016'
                },
                rules2: {
                    account: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                        // { validator: validaePass }
                    ],
                    checkPass: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                        // { validator: validaePass2 }
                    ]
                },
                checked: true
            }
        },
        methods: {
            
            submitForm () {
                this.$http.post('/api/login',
                    {
                        username: this.ruleForm2.account,
                        password: this.ruleForm2.checkPass
                    })
                    .then((response) => {
                        if (response.ok) {
                            console.log(response)
                            this.$router.push('/addtable')
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                        if (error.status === 401) {
                            // console.log('错误')
                            this.$message('密码错误')
                        } else if (error.status === 403) {
                            this.$message('禁止访问')
                        } else {
                            this.$message('不明错误')
                        }
                    })
            }
        }
    }
</script>

<style scoped lang="scss">
  .login-main{
    position: fixed;
    width : 40%;
    height : 40%;
    line-height: 60px;
    left : 30%;
    bottom: 30%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    background-color: azure;
    border-radius: 50px;
  }
</style>
