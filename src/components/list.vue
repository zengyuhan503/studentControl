<template lang="">
  <div>

    <div class="setGetAppPoolList" style="margin-top:3%">

    </div>
    <el-table :data="tableData">
      <el-table-column property="times" label="时间" width="200"></el-table-column>
      <el-table-column property="qq" label="QQ"></el-table-column>
      <el-table-column property="mac" label="Mac"></el-table-column>
      <el-table-column property="ip" label="Ip"></el-table-column>
      <el-table-column property="areas" label="地区"></el-table-column>
      <el-table-column property="q_edition" label="Q版本"></el-table-column>
      <el-table-column property="edition" label="版本信息"></el-table-column>
      <el-table-column property="status" label="状态"></el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" layout="prev, pager, next"
        :page-size="pageSize" :hide-on-single-page="true" :page-count="total"></el-pagination>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {},
        tableData: [],
        pageNum: 0,
        pageSize: 8,
        total: 15,
        payrow: "",
        currentPage: 1,
        dialogTableVisible: false,
        channelId: "",
        timechanne: ""
      };
    },
    mounted() {
      this.channelId = this.$route.query.id;
      this.timechanne = this.$route.query.times;
      this.getstudentlist();
    },
    methods: {
      handleinfo(row) {
        var id = row.number;
        var params = {
          id: id,
          times: this.timechanne
        };
        this.$router.push({
          path: "/list",
          // name: 'mallList',
          query: params
        });
      },
      onSubmit() { },
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
          page: this.currentPage,
          limit: this.pageSize,
          channel: this.channelId,
          times: this.timechanne
        };
        this.axios
          .get("/public/index.php/getChannel", { params: params })
          .then(res => {
            this.tableData = res.data.list;
            this.total = res.data.totalPage;
            console.log(this.total)
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