<template lang="">
  <div>
    <el-table :data="tableData">
      <el-table-column property="times" label="时间" width="200"></el-table-column>
      <el-table-column property="ip" label="QQ"></el-table-column>
      <el-table-column property="online_qq" label="ip"></el-table-column>
      <el-table-column property="edition" label="结算金额"></el-table-column>
    
    </el-table>
    <div class="block">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" layout="prev, pager, next"
        :page-size="pageSize" :hide-on-single-page="true" :total="total"></el-pagination>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      tableData: [
        {
          times: "1",
          ip: "1",
          online_qq: "1",
          edition: "1"
        }
      ],
      pageNum: 0,
      pageSize: 10,
      total: 10,
      payrow: "",
      currentPage: 1,
      dialogTableVisible: false
    };
  },
  mounted() {
    this.getstudentlist();
  },
  methods: {
    handleClickinfo(row) {
      var id = row.number;
      var params = {
        id: id
      };
      this.$router.push({
        path: "/list",
        // name: 'mallList',
        query: {
          id: "id"
        }
      });
    },
    onSubmit() {},
    resetSearch() {
      this.endTime = 99999999999;
      this.startTime = 0;
      this.form.month = "";
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
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getstudentlist();
    },

    getstudentlist() {
      var params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize
      };
      this.axios
        .post("/account/student_list", params)
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
</style>