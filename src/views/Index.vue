
<template>

  <div>
    
    <el-dialog
      title="上传成绩"
      :visible.sync="scoreFormVisible"
    >
      <el-form :model="scoreid"  label-position="top"
        label-width="80px"
        style="text-align: center;">
        <el-form-item
          label=""
          :label-width="formLabelWidth"
        >
          <el-upload
            class="upload-demo"
            action="/api/admin/submitCSP"
            :limit="1"
            :data="scoreid"
            :name="file"
            :accept="xls"
            :auto-upload="true"
            :multiple="false"
            :on-exceed="scoreexceed"
            :on-success="scoresuccess"
            :on-error="scoreerror"
          >
            <el-button
              size="small"
              type="primary"
            >点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传xls文件</div>
          </el-upload>
        </el-form-item>

      </el-form>
      
    </el-dialog>

    <el-container>
     <mainheader v-on:headerid="getActivity()"></mainheader>
      <el-main>

        <div
          v-for="o in activity"
          :key="o"
          class="card"
        >

          <el-row :gutter="20">
            <el-col
              :span="8"
              v-for="j in o.act"
              :key="j"
            >
              <el-card class="box-card"  
              shadow="hover"
              @click="todetail(j.id)">
                <div
                  slot="header"
                  class="clearfix"
                   
                >
                  <el-tooltip
                    class="title button"
                    style="float: left;margin-top:-10px;"
                    effect="dark"
                    content="删除"
                    placement="top-end"
                  >
                    <el-button
                      icon="el-icon-delete-solid"
                      circle
                      @click="remove(j.id)"
                    ></el-button>
                  </el-tooltip>

                  <el-tooltip
                    v-if="j.status==3"
                    class="title button"
                    style="float: left;margin-top:-10px;"
                    effect="dark"
                    content="上传成绩"
                    placement="top-end"
                  >

                    <el-button
                      icon="el-icon-edit-outline"
                      circle
                      @click="score(j.id)"
                    ></el-button>

                  </el-tooltip>

                  <el-tooltip
                    v-if="j.status==1||j.status==2"
                    class="title button"
                    style="float: left;margin-top:-10px;"
                    effect="dark"
                    content="结束"
                    placement="top-end"
                  >
                    <el-button
                      icon="el-icon-switch-button"
                      circle
                      @click="end(j.id)"
                    ></el-button>
                  </el-tooltip>

                  <span style="text-align:left">{{j.name}}</span>
                  <el-tooltip
                    v-if="j.status==3"
                    class="title button"
                    style="float: right;margin-top:-10px;"
                    effect="dark"
                    content="导出报名表"
                    placement="top-end"
                  >
                    <el-button
                      icon="el-icon-download"
                      circle
                      @click="download(j.id)"
                    ></el-button>
                  </el-tooltip>

                  <el-tooltip
                    v-if="j.status==1"
                    class="title button"
                    style="float: right;margin-top:-10px;"
                    content="暂停"
                    placement="top-end"
                  >
                    <el-button
                      icon="el-icon-video-pause"
                      circle
                      @click="stop(j.id)"
                    ></el-button>
                  </el-tooltip>

                  <el-tooltip
                    v-if="j.status==2||j.status==0"
                    class="title button"
                    style="float: right;margin-top:-10px;"
                    content="开始"
                    placement="top-end"
                  >
                    <el-button
                      icon="el-icon-video-play"
                      circle
                      @click="start(j.id)"
                    ></el-button>
                  </el-tooltip>

                </div>
                <div  @click="todetail(j.id)">
                <div style="text-align:left">
                  状态：{{(actStatus[j.status])}}
                </div>
                <div style="text-align:left">
                  发布者：{{j.publisher}}
                </div>
                <div style="text-align:left">
                  开始时间：{{j.startTime}}
                </div>
                <div style="text-align:left">
                  截止时间：{{j.endTime}}
                </div>
                </div>

              </el-card>
            </el-col>

          </el-row>
        </div>

      </el-main>
      <el-footer>

      </el-footer>
    </el-container>

  </div>

</template>
import { Component, Vue } from "vue-property-decorator";
import Header from "../components/Header.vue";

@Component({
  components: {
    Header
  }
})
<style scoped lang="scss">
.title {
  font-size: 20px;
}
.card {
  padding: 10px;
}
.button {
  border: 0px;
}
.button:hover {
  color: white;
  background: gainsboro;
}

.el-aside {
  color: #333;
}
</style>

<script type="text/javascript">
 import MainHeader from '../components/MainHeader.vue'
  import store from '../store'
export default {
  name: "Index",
  data() {
    return {
      activeIndex: "1",
      actStatus: ["设计", "启用", "暂停", "结束"],
      activity: [],
      singleAct:[],
      scoreFormVisible:false,
      scoreid:{id:-1},//上传成绩用的
      
    };
  },
  components: {
     'mainheader':MainHeader
           
  },
  mounted() {
    this.getActivity();
  },
  methods: {
    getActivity() {
      var _this = this;

      _this.$http
        .get("/api/admin/activity", {}, { emulateJSON: true })
        .then(function(response) {
          if (response.ok == true && response.status == 200) {
            this.singleAct=response.data
           // console.log(this.singleAct)
            this.activity = [];
            var length = response.data.length;
            var list = [];
            var k = 0;
            var length3 = Math.floor(length / 3);
            //console.log('length/3='+length3)
            for (var i = 0; i < length3; i++) {
              for (var j = 0; j < 3; j++) {
                list.push(response.data[k++]);
              }
              this.activity.push({ act: list });
              list = [];
            }
            for (var i = 0; i < length - length3 * 3; i++) {
              list.push(response.data[k++]);
            }
            this.activity.push({ act: list });
            //console.log(this.activity)
          } else {
            console.log("error");
            this.$router.push("/");
          }
        })
        .catch(function(error) {
          console.log(error);
          this.$router.push("/");
        });
    },

    remove(id) {
      this.$confirm("您确定删除吗？")
        .then(_ => {
          this.$http
            .delete("/api/admin/activity/" + id, {})
            .then(response => {
              if (response.ok) {
                console.log(response.data.reason);
                if (response.data.reason != "") {
                  this.$message.error(response.data.reason);
                }
                this.getActivity();
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(_ => {});
    },
    stop(id) {
      this.$http
        .put("/api/admin/activity/" + id + "/status", {
          status: 2
        })
        .then(response => {
          if (response.ok) {
            console.log(response);
            this.getActivity();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    end(id) {
      this.$confirm("此操作无法撤销，确定结束报名吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .put("/api/admin/activity/" + id + "/status", {
              status: 3
            })
            .then(response => {
              if (response.ok) {
                console.log(response);
                this.getActivity();
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(() => {});
    },
    start(id) {
      this.$http
        .put("/api/admin/activity/" + id + "/status", {
          status: 1
        })
        .then(response => {
          if (response.ok) {
            console.log(response);
            this.getActivity();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    
    download(id) {
      this.$http
        .get("/api/admin/activity/download/" + id, {})
        .then(response => {
          if (response.ok) {
            // console.log(response.data);
            window.open(response.data.url, "hello");
            window.open(response.data.excel, "hello");
            this.getActivity();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
   
    score(id) {
      this.scoreFormVisible = true;
      this.scoreid.id=id;
    },
    scoresuccess(response, file, fileList){
       console.log(response);
       if(response.reason==""){
          this.$message.success("上传成功");
       }
       else{
         this.$message.error(response.reason);
       }
      
      this.scoreFormVisible = false;

    },
    scoreerror(err, file, fileList){
      console.log(error);
       this.$message.error("上传失败");
        this.scoreFormVisible = false;
    },
    scoreexceed(){
       this.$message.error("只能上传一个文件");
    },
    todetail(id){
        
        for(var i=0;i<this.singleAct.length;i++){
            if(this.singleAct[i].id==id){
             // console.log('id'+this.singleAct[i])
               store.commit('addAct', this.singleAct[i])
            }
        }
      this.$router.push({path:'/detail',query: { detailId: id}})
    }
  }
};
</script>
