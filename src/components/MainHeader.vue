 
 <template>

  <div>
    <el-dialog
      title="新增报名"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="form"
        label-position="left"
        label-width="80px"
        style="text-align: left;"
      >
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="times"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00', '08:00:00']"
            value-format='yyyy-MM-dd HH:mm:ss'
            @change="changeDate()"
            style="float: left"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="上传模板">
          <el-upload
            class="upload-demo"
            action="/api/admin/activitybyfile"
            ref="upload"
            :data="form"
            :name="file"
            :auto-upload="false"
            :on-success="handelsuccess"
            :on-error="handelerror"
            :file-list="form.fileList"
          >
            <el-button
              size="small"
              type="primary"
            >点击上传</el-button>

          </el-upload>
        </el-form-item>

      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submit"
        >确 定</el-button>
      </div>
    </el-dialog>

    <el-header>

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
            <i
              class="el-icon-circle-plus title"
              @click="$router.push('/addtable')"
            ></i>
          </el-tooltip>
        </el-menu-item>

        <el-menu-item
          index="3"
          class="title"
          style="float: right;"
        >
          <el-tooltip
            class="item"
            effect="dark"
            content="上传模板报名"
            placement="top-end"
          >
            <i
              class="el-icon-upload2"
              @click="upload()"
            ></i>
          </el-tooltip>
        </el-menu-item>

      </el-menu>

    </el-header>
  </div>
</template>
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
<script>
export default {
  name: "MainHeader",
  data() {
    return {
      times: [],
      dialogFormVisible: false,
      form: {
        name: "",
        startTime: "",
        endTime: ""
      },
      formLabelWidth: "100px"
    };
  },

  methods: {
    upload() {
      this.dialogFormVisible = true;
    },
    handelsuccess(response, file, fileList) {
      this.$message.success("添加成功");
      this.$emit("headerid",response.id)
    },
    handelerror(err, file, fileList) {
      this.$message.error("添加失败");
    },
     changeDate() {
      this.form.startTime = this.times[0];
      this.form.endTime = this.times[1];
      console.log(this.data);
    },
    submit() {
      this.dialogFormVisible = false;
      this.$refs.upload.submit();
    },
  }
};
</script>
          
  
        