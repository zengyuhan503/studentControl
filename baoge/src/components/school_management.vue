<template lang="">
    <div>
       <div class="setGetAppPoolList">
            <el-row :gutter="0" class="formCont">
                <el-col :span="24" :push="0">
                    <h3>课时管理列表：</h3>
                </el-col>
                <el-col :span="10" :push="0">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item >首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/studentControl' }">学生信息列表</el-breadcrumb-item>
                    <el-breadcrumb-item>课时管理列表</el-breadcrumb-item>
                </el-breadcrumb>
                </el-col>
            </el-row>
        </div>
    <el-table  :data="tableData"    style="width: 100%">
        <el-table-column  prop="id"  label="Id" > </el-table-column>
        <el-table-column   prop="name" label="姓名" > </el-table-column>
        <el-table-column  prop="student"  label="学生姓名">  </el-table-column>
        <el-table-column  prop="type" label="课时" > </el-table-column>
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
</div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pageNum: 0,
      pageSize: 10,
      total: 10,
      payrow: "",
      currentPage: 1
    };
  },
  mounted() {
    console.log(this.$route.query.id);
    var id = this.$route.query.id;
    this.getlist(id);
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
        .post("/account/school_management", params)
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