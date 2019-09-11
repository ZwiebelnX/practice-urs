<template>
    <div>
        <el-container>
            <el-header>
                <mainheader></mainheader>
            </el-header>
            <el-container>
                <el-aside width="400px">
                  <el-card class="box-card card" shadow="hover">
                
                <div class="title">
                  <div style="text-align:left">
                  名称：{{activity.name}}
                </div>
                <div style="text-align:left">
                  状态：{{actStatus[activity.status]}}
                </div>
                <div style="text-align:left">
                  发布者：{{activity.publisher}}
                </div>
                <div style="text-align:left">
                  开始时间：{{activity.startTime}}
                </div>
                <div style="text-align:left">
                  截止时间：{{activity.endTime}}
                </div>
                </div>

              </el-card>
                </el-aside>
                <el-main >
                    <el-tree
                        :data="data"
                        
                        @node-click="handleNodeClick"
                        :default-expand-all="true"
                        :label="name"
                    >
                        <span
                           
                            slot-scope="{ node, data }"
                        >
                            <span  class="title">{{ data.name }}</span>

                        </span>
                    </el-tree>

                </el-main>
            </el-container>

        </el-container>

    </div>
</template>

<style scoped lang="scss">
.title {
  
    font-size: 18px;
    
  
}
.card{
  padding: 10px;
  margin:40px;
}
</style>
<script>
import MainHeader from "@/components/MainHeader.vue";
  import store from '../store'
export default {
  name: "Detail",
  components: {
    mainheader: MainHeader
  },
  data() {
    return {
      actStatus: ["设计", "启用", "暂停", "结束"],
      data: [

      ],
      activity:{
       
      },
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  mounted(){
      this.id = this.$route.query.detailId;
       this.$http
            .get("/api/admin/activity/" + this.$route.query.detailId, {})
            .then(response => {
              if (response.ok) {
                
                this.data=response.data;
                this.activity=store.state.activity
                console.log('hello?');
                console.log(response);
              
              }
            })
            .catch(function(error) {
              console.log(error);
            });
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
   
  }
};
</script>
