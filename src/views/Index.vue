<template>
  <div>

  </div>
</template>

<style scoped lang="scss">

</style>

<script>
    export default {
        name: 'Index',
        components: {
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
</script>
