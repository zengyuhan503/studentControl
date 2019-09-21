<template lang="">
    <div>
       <div class="setGetAppPoolList">
            <el-row :gutter="0" class="formCont">
              <el-col :span="4" :push="0">
                <h3>学生信息管理：</h3>
              </el-col>
              <!-- <el-col :span="3" :push="17">
                <el-button type="primary" @click="pushRouter">新增老师</el-button>
              </el-col> -->
            </el-row>
        </div>
    <el-table   class="tablist"  :data="tableData"    style="width: 100%">
      <el-table-column  prop="id"  label="Id" > </el-table-column>
      <el-table-column   prop="name" label="姓名" > </el-table-column>
      <el-table-column  prop="phone"  label="phone">  </el-table-column>
      <el-table-column  prop="state" label="状态" > </el-table-column>
      <el-table-column
        prop="classHour"
        label="所剩课时次数（次数）"
      >
      </el-table-column>
      <el-table-column
        prop="ladder"
        label="所剩陪练时长（分钟）"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="400"
    >
        <template slot-scope="scope">
          <!-- <el-button @click="handleClick(scope.row)" type="primary" size="small">查看头像</el-button> -->
          <el-button type="info" @click="pushrotu" size="small">课时管理</el-button>
          <el-button type="info" @click="pushrotu2" size="small">陪练课管理</el-button>
          <el-button type="danger" @click="handfreeze(scope.row)" size="small">冻结账户</el-button>
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
  <el-dialog title="查看头像" :visible.sync="editDialogVisible" width="30rem">
    <div style="width: 100%;height: 20rem;position: relative;">	
			<el-upload
				class="avatar-uploader"
				action="https://jsonplaceholder.typicode.com/posts/"
				:show-file-list="false"
				:auto-upload="false"
				:on-success="handleAvatarSuccess"
				:on-change="beforeAvatarUpload">
				<img v-if="imageUrl" :src="imageUrl" class="avatar">
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeup">取 消</el-button>
      <el-button type="primary" @click="submitEditCover" :loading="isEditUploading">确定</el-button>
    </span>
  </el-dialog>
	  
</div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      editDialogVisible: false,
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
    this.getstudentlist();
  },
  methods: {
      handleCurrentChange(val) {
      this.currentPage = val;
      this.getstudentlist();
    },
    pushrotu(row){
      this.$router.push({
        path: "/school_management",
        query: {
          id: row.id
        }
      });
    },
    pushrotu2(row){
      this.$router.push({
        path: "/practiceClassManagement",
        query: {
          id: row.id
        }
      });
    },
    getstudentlist() {
      var params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize
      };
      this.axios
        .post("/account/student_list", params)
        .then(res => {
          console.log(res);
          this.tableData = res.data.data.list;
           this.total = res.data.data.total;
           
          console.log(this.currentPage, this.total);
        })
        .catch(err => {
          console.error(err);
        });
    },
    handleClick(row) {
      console.log(row);
      this.imageUrl = row.imageUrl;
      this.editDialogVisible = true;
    },
    submitEditCover() {
      this.isEditUploading = true;
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
    
    handfreeze(row) {
      this.$confirm("此操作将冻结该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var params = {
            account: row.phone
          };
          console.log(row);
          console.log(params);
          this.axios
            .post("/account/freeze", params)
            .then(res => {
              console.log(res);
              if (res.data.code !== 10000) {
                this.$message.error(res.data.msg);
              } else {
                this.getstudentlist()
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