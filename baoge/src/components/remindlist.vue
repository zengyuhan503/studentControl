<template lang="">
<div>
    <div class="setGetAppPoolList">
        <el-row :gutter="0" class="formCont">
            <el-col :span="24" :push="0">
                <h3>警报列表：</h3>
            </el-col>
            <el-col :span="3" :push="17">
                <el-button type="primary" @click="pushRouter">设置警报时长</el-button>
              </el-col>
        </el-row>
    </div>
    
    <el-table  :data="tableData"    style="width: 100%">
        <!-- <el-table-column  prop="id"  label="Id" > </el-table-column> -->
        <el-table-column   prop="name" label="姓名" > </el-table-column>
        <el-table-column  prop="type" label="类型" > </el-table-column>
        <el-table-column  prop="createTime" label="创建时间" >
        </el-table-column>
    </el-table>
    <el-dialog title="设置警报时常" :visible.sync="editDialogVisible" width="30rem">
      <div style="width: 100%;position: relative;">	
      <el-form ref="rulesrorm" :model="forms" label-width="120px">
            <el-form-item label="次数：">
              <el-input v-model="forms.num" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="时长：">
              <el-input v-model="forms.time" placeholder=""></el-input>
            </el-form-item>
          </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="submitup" :loading="isEditUploading">确定</el-button>
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
      isEditUploading: false,
      tableData: [],
      pageNum: 0,
      pageSize: 10,
      total: 10,
      payrow: "",
      currentPage: 1,
      forms: {},
      editDialogVisible: false
    };
  },
  mounted() {
    console.log(this.$route.query.id);
    var id = this.$route.query.id;
    this.getlist(id);
  },
  methods: {
    submitup() {
      var params = this.forms;
      this.axios
        .post("/remind/updateTime", params)
        .then(res => {
          console.log(res);
          this.editDialogVisible = false;
        })
        .catch(err => {
          console.error(err);
        });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getlist();
    },
    handleClick() {},
    pushRouter() {
      this.axios
        .post("/remind/selectTime")
        .then(res => {
          console.log(res);
          this.forms = {
            num: res.data.data.num,
            time: res.data.data.time
          };
          this.editDialogVisible = true;
        })
        .catch(err => {
          console.error(err);
        });
    },
    add0(m) {
      return m < 10 ? "0" + m : m;
    },
    format(shijianchuo) {
      console.log(shijianchuo);
      var shijianchuo = shijianchuo * 1000;
      //shijianchuo是整数，否则要parseInt转换
      var time = new Date(shijianchuo);
      console.log(time);
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
    getlist(id) {
      var params = {
        id: id,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      };
      this.axios
        .post("/remind/remind_list", params)
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