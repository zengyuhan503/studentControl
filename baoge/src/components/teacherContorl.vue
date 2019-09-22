<template lang="">
    <div>
       <div class="setGetAppPoolList">
            <el-row :gutter="0" class="formCont">
              <el-col :span="4" :push="0">
                <h3>老师信息管理：</h3>
              </el-col>
              <el-col :span="3" :push="17">
                <el-button type="primary" @click="pushRouter">新增老师</el-button>
              </el-col>
            </el-row>
        </div>
    <el-table  :data="tableData"    style="width: 100%">
      <!-- <el-table-column  prop="id"  label="Id" > </el-table-column> -->
      <el-table-column   prop="name" label="姓名" > </el-table-column>
      <el-table-column  prop="account"  label="account">  </el-table-column>
      <el-table-column  prop="state" label="状态" > </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="350"
    >
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button type="info" size="small" @click="handgetinfo(scope.row)">上课情况</el-button>
          <el-button type="danger" @click="handfreeze(scope.row)" size="small">冻结账户</el-button>
          <el-button type="danger" @click="handdelte(scope.row)" size="small">删除</el-button>
       
        </template>
    </el-table-column>
  </el-table>
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
  <el-dialog title="编辑信息" :visible.sync="editDialogVisible" width="30rem">
    <div style="width: 100%;position: relative;">	
		 <el-form ref="rulesrorm" :model="forms" label-width="120px">
          <el-form-item label="名称：">
            <el-input v-model="forms.name" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="电话号：">
            <el-input v-model="forms.account" placeholder=""></el-input>
          </el-form-item>
        </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editDialogVisible=false">取 消</el-button>
      <el-button type="primary" @click="submitEditCover" :loading="isEditUploading">确定</el-button>
    </span>
  </el-dialog>
  <el-dialog title="新增老师" :visible.sync="editDialogVisible2" width="30rem">
    <div style="width: 100%;position: relative;">	
		 <el-form ref="rulesrorm" :model="forms" label-width="120px">
          <el-form-item label="名称：">
            <el-input v-model="forms.name" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="电话号：">
            <el-input v-model="forms.account" placeholder=""></el-input>
          </el-form-item>
        </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editDialogVisible2=false">取 消</el-button>
      <el-button type="primary" @click="submitaddtteacher" :loading="isEditUploading">确定</el-button>
    </span>
  </el-dialog>

</div>
</template>

<script>
export default {
  data() {
    return {
      forms: {},
      rulesror: {},
      imageUrl: "",
      editDialogVisible: false,
      editDialogVisible2: false,
      editDialogVisible3: false,
      tableData: [],
      isEditUploading: false,
      pageNum: 0,
      pageSize: 10,
      editrow: "",
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
    submitaddtteacher() {
      var params = this.forms;
      this.axios
        .post("/account/add_teacher", params)
        .then(res => {
          if (res.data.code !== 10000) {
            this.$message.error(res.data.msg);
          } else {
            this.editDialogVisible2 = false;
            this.getlist();
            this.$message({
              type: "success",
              message: "添加成功!"
            });
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    pushRouter() {
      this.forms = {};
      this.editDialogVisible2 = true;
    },
    getlist() {
      var params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize
      };
      this.axios
        .post("/account/teacher_list", params)
        .then(res => {
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
        })
        .catch(err => {
          console.error(err);
        });
    },
    handleClick(row) {
      this.forms = row;
      this.editDialogVisible = true;
    },
    submitEditCover() {
      this.isEditUploading = true;
      var params = this.forms;
      this.axios
        .post("/account/update_teacher", params)
        .then(res => {
          if (res.data.code !== 10000) {
            this.$message.error(res.data.msg);
          } else {
            this.getlist();
            this.isEditUploading = false;
            this.editDialogVisible = false;
            this.$message({
              type: "success",
              message: "编辑成功!"
            });
          }

          console.log(res);
        })
        .catch(err => {
          console.error(err);
        });
    },
    closeup() {
      this.isEditUploading = false;
      this.editDialogVisible = false;
    },
    handleAvatarSuccess(res, file) {
      console.log(file);
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handgetinfo(row) {
      // this.$router.push({path:'/AddShop',query:{id:val.ID})
      this.$router.push({
        path: "/teacherinfo",
        query: {
          id: row.id
        }
      });
    },
    handdelte(row) {
      this.$confirm("此操作将删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var params = {
            id: row.id
          };
          this.axios
            .post("/account/delete_teacher", params)
            .then(res => {
              console.log(res.data.code !== 10000);
              if (res.data.code !== 10000) {
                this.$message.error(res.data.msg);
              } else {
                this.getlist();
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
            })
            .catch(err => {
              console.error(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    handfreeze(row) {
      this.$confirm("此操作将冻结该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var params = {
            id: row.id
          };
          console.log(row);
          console.log(params);
          this.axios
            .post("/account/freeze_teacher", params)
            .then(res => {
              console.log(res);
              if (res.data.code !== 10000) {
                this.$message.error(res.data.msg);
              } else {
                this.getlist();
                this.$message({
                  type: "success",
                  message: "冻结成功!"
                });
              }
            })
            .catch(err => {
              console.error(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
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