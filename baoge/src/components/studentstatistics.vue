<template lang="">
  <div>
    <div class="setGetAppPoolList">
        <el-row :gutter="0" class="formCont">
          <el-col :span="4" :push="0">
            <h3>学生统计：</h3>
          </el-col>
        </el-row>
    </div>
    <div class="setGetAppPoolList">
      <el-col>
        <el-form ref="form" :model="form" class="filtrate" label-width="80px">
          <el-row :gutter="10">
            <el-col :span="8">
               <el-date-picker
                v-model="form.month"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                 value-format="timestamp"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-col>
            <el-col :span="8">
              <el-form-item>  
                <el-button type="primary" @click="onSubmit">搜索</el-button>
                <el-button @click="resetSearch">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </div>
  <el-table  :data="tableData"    style="width: 100%">
    <el-table-column fixed  prop="id" label="Id" > </el-table-column>
    <el-table-column  prop="name"  label="姓名" > </el-table-column>
    <el-table-column   label="开始时间" >
            <template slot-scope="scope">
                <div>
                    {{format(scope.row.startTime)}}
                </div>
            </template>
        </el-table-column>
    <el-table-column   label="结束时间" >
        <template slot-scope="scope">
  <div>{{format(scope.row.endTime)}}</div>
</template>
    </el-table-column>
    <el-table-column
      prop="teacher"
      label="老师"
    >
    </el-table-column>
  </el-table>
  <el-dialog title="查看头像" :visible.sync="editDialogVisible" width="30rem">
    <div style="width: 100%;height: 20rem;position: relative;">	
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeup">取 消</el-button>
      <el-button type="primary" @click="submitEditCover" :loading="isEditUploading">确定</el-button>
    </span>
  </el-dialog>
   <div class="block">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      layout="prev, pager, next"
       :page-size="pageSize"
        :hide-on-single-page="true"
      :total="total"
    ></el-pagination>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      editDialogVisible: false,
      form: {
        month: ""
      },
      pickerOptions: {},
      endTime: 99999999999,
      startTime: 0,
      tableData: [],
      isEditUploading: false,
      pageNum: 0,
      pageSize: 10,
      total: 10,
      payrow: "",
      currentPage: 1
    };
  },
  mounted() {
    this.getlist();
  },
  methods: {
      handleCurrentChange(val) {
      this.currentPage = val;
      this.getlist();
    },
    add0(m) {
      return m < 10 ? "0" + m : m;
    },
    format(shijianchuo) {
      var shijianchuo = shijianchuo * 1000;
      //shijianchuo是整数，否则要parseInt转换
      var time = new Date(shijianchuo);

      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return (
        y +
        "-" +
        this.add0(m) +
        "-" +
        this.add0(d) +
        " " +
        this.add0(h) +
        ":" +
        this.add0(mm) +
        ":" +
        this.add0(s)
      );
    },
    handleClick(row) {
      this.editDialogVisible = true;
    },
    resetSearch() {
      this.endTime = 99999999999;
      this.startTime = 0;
      this.form.month = "";
      this.getlist();
    },
    submitEditCover() {
      this.isEditUploading = true;
    },
    closeup() {
      this.isEditUploading = false;
      this.editDialogVisible = false;
    },
    onSubmit() {
      console.log(this.form.month);
      this.startTime = this.form.month[0]/1000;
      this.endTime = this.form.month[1]/1000;
      this.getlist();
    },
    getlist() {
      var params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        endTime: this.endTime,
        startTime: this.startTime
      };
      this.axios
        .post("/find/find_student", params)
        .then(res => {
          console.log(res);
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>
<style lang="">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 235px;
  height: 235px;
  line-height: 235px;
  text-align: center;
}
.avatar-uploader {
  text-align: center;
}
.avatar {
  width: 235px;

  height: 235px;
  margin: auto;
  display: block;
}
</style>