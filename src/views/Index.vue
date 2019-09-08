
<template>

  <div>

    <el-container>
      <el-header>
        <Header>
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
          >
            <el-menu-item
              index="1"
              class="title"
            >报名系统</el-menu-item>
            <el-menu-item
              index="2"
              class="title"
              style="float: right;"
            >
              <el-tooltip
                class="item"
                effect="dark"
                content="新增报名"
                placement="top-end"
              >
                <i class="el-icon-circle-plus title"></i>
              </el-tooltip>
            </el-menu-item>

          </el-menu>

        </Header>
      </el-header>
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
              <el-card class="box-card">
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
                    content="导出"
                    placement="top-end"
                  >
                    <el-button
                      icon="el-icon-download"
                      circle
                      @click="download()"
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

export default {
  name:"Index",
  data(){
    return {
activeIndex: '1',
      actStatus:["设计","启用","暂停","结束"],
      test:0,
      activity: [
        {act:[{
          id:0,
          name: "0",
          publisher: "科协",
          status: 1,
          startTime: "2019-10-2 12:12:00",
          endTime: "2019-11-07 23:15:00"
        },
        {
          id:1,
          name: "1",
          publisher: "科协",
          status: 1,
          startTime: "2019-10-2 12:12:00",
          endTime: "2019-11-07 23:15:00"
        },
        {
          id:2,
          name: "2",
          publisher: "科协",
          status: 0,
          startTime: "2019-10-2 12:12:00",
          endTime: "2019-11-07 23:15:00"
        },]},
        {

          act:[ {
          id:3,
          name: "3",
          publisher: "科协",
          status: 2,
          startTime: "2019-10-2 12:12:00",
          endTime: "2019-11-07 23:15:00"
        },
        {
          id:4,
          name: "4",
          publisher: "科协",
          status: 3,
          startTime: "2019-10-2 12:12:00",
          endTime: "2019-11-07 23:15:00"
        },
        ]
        }]
    }

  },
  methods:{
     handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    mounted() {
     var _this = this
                _this.$http.get('/admin/activity', {

                    }, { emulateJSON: true }
                )
                    .then(function (response) {
                        if (response.ok) {
                            console.log(response)

                        } else {
                            alert('错误')
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
     },
    remove(id){
      for(var i=0;i<this.activity.length;i++){
        for(var j=0;j<this.activity[i].act.length;j++){
          if(this.activity[i].act[j].id==id){
            this.activity[i].act.splice(j);
          }
        }
      }
    },
    stop(id){
       for(var i=0;i<this.activity.length;i++){
        for(var j=0;j<this.activity[i].act.length;j++){
          if(this.activity[i].act[j].id==id){
            this.activity[i].act[j].status = 2;
          }
        }
      }
    },
    end(id){
      for(var i=0;i<this.activity.length;i++){
        for(var j=0;j<this.activity[i].act.length;j++){
          if(this.activity[i].act[j].id==id){
            this.activity[i].act[j].status = 3;
          }
        }
      }
    },
    start(id){
      for(var i=0;i<this.activity.length;i++){
        for(var j=0;j<this.activity[i].act.length;j++){
          if(this.activity[i].act[j].id==id){
            console.log(this.activity[i].act[j].status);

            //  Vue.set(this.activity[i].act[j],status,1);
            this.activity[i].act[j].status = 1;
             console.log(this.activity[i].act[j].status);
          }
        }
      }

    },
    download() {}
  }

};
</script>
