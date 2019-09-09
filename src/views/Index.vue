
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
                <i class="el-icon-circle-plus title" @click="addTable"></i>
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
  name: "Index",
  data() {
    return {
      activeIndex: "1",
      actStatus: ["设计", "启用", "暂停", "结束"],

      activity: []
    };
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
          if (response.ok) {
            console.log(response);
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
            this.$router.push("/login");
          }
        })
        .catch(function(error) {
          console.log(error);
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
        .get("/api/admin/activity/download/" + id, {

        })
        .then(response => {
          if (response.ok) {
            console.log(response.data.url);
            this.$router.push(response.data.url)
            this.getActivity();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
      addTable () {
        this.$router.push('/addtable')
      }
  }
};
</script>
