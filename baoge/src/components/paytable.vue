<template lang="">
  <div>
    <div class="setGetAppPoolList">
        <el-row :gutter="0" class="formCont">
          <el-col :span="4" :push="0">
            <h3>充值管理：</h3>
          </el-col>
        </el-row>
    </div>
    <div class="setGetAppPoolList">
      <el-col>
        <el-form ref="form" :model="form" class="filtrate" label-width="80px">
          <el-row :gutter="10">
            <el-col :span="5">
               <el-form-item label="学生姓名">
                <el-input v-model="form.name" placeholder="请输入内容"></el-input>
              </el-form-item>
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
  <el-table  class="tablist" :data="tableData"    style="width: 100%">
    <!-- <el-table-column fixed  prop="id" label="Id" > </el-table-column> -->
    <el-table-column  prop="name"  label="姓名" > </el-table-column>
    <el-table-column  prop="phone"  label="电话" > </el-table-column>
    <el-table-column  prop="classHour"  label="剩余课时次数" > </el-table-column>
     <el-table-column  prop="ladder"  label="剩余陪练课时常" > </el-table-column>
    <el-table-column  prop="state"  label="状态" >
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
   >
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="primary" size="small">充值</el-button>
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
  <el-dialog title="充值" :visible.sync="editDialogVisible" width="30rem">
         <div style="width: 100%;position: relative;">	
          <el-tabs   v-model="editableTabsValue" type="border-card">
              <el-tab-pane name="xs" label="学时充值">
                  <el-form :inline="true" :model="form.formInline" class="demo-form-inline">
                      <el-form-item label="选择次数">
                          <el-input-number v-model="num" :min="1" :max="10" label="描述文字"></el-input-number>
                      </el-form-item>
                  </el-form>
              </el-tab-pane>
              <el-tab-pane name="ks" label="陪练课充值">
                    <el-form :inline="true" :model="form.text" class="demo-form-inline">
                      <el-form-item label="输入时常">
                      <el-input v-model="time" placeholder="输入时常"></el-input>
                  </el-form-item>
                  </el-form>
              </el-tab-pane>
          </el-tabs>
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
      editableTabsValue: "xs",
      num: 1,
      time: "",
      editDialogVisible: false,
      form: {
        month: "",
        name: ""
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
    handleClick(row) {
      this.payrow = row;
      this.editDialogVisible = true;
    },
    resetSearch() {
      this.endTime = 99999999999;
      this.startTime = 0;
      this.form.name = "";
      this.getlist();
    },
    submitEditCover() {
      this.isEditUploading = true;
      console.log(this.payrow);
      var params = {
        account: this.payrow.phone,
        time: ""
      };
      var urls;
      if (this.editableTabsValue == "xs") {
        params.time = this.num;
        urls = "/pay/pay_num";
      } else {
        params.time = this.time;
        urls = "/pay/pay_time";
      }
      this.axios
        .post(urls, params)
        .then(res => {
          if (res.data.code !== 10000) {
            this.$message.error(res.data.msg);
          } else {
            this.getlist();
            this.$message({
              type: "success",
              message: "充值成功!"
            });
          }
          this.isEditUploading = false;
          this.editDialogVisible = false;
          this.num = 1;
          this.time = "";
        })
        .catch(err => {
          console.error(err);
        });
    },
    closeup() {
      this.isEditUploading = false;
      this.editDialogVisible = false;
    },
    onSubmit() {
      var params = {
        name: this.form.name
      };
      this.axios
        .post("/pay/student_find", params)
        .then(res => {
          console.log(res);
          this.tableData = res.data.data.list;
        })
        .catch(err => {
          console.error(err);
        });
    },
    getlist() {
      var params = {
        name: this.form.name,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        endTime: this.endTime,
        startTime: this.startTime
      };
      this.axios
        .post("/pay/student_list", params)
        .then(res => {
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
.el-form--inline {
  text-align: center;
  padding: 19px;
}
</style>