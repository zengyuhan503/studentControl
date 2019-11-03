<template lang="">
  <div>
    <div class="setGetAppPoolList">
      <el-row :gutter="0" class="formCont">
        <el-col :span="4" :push="0">
          <h3>详情信息</h3>
        </el-col>
        <!-- <el-col :span="3" :push="17">
                <el-button type="primary" @click="pushRouter">新增老师</el-button>
              </el-col> -->
      </el-row>
    </div>
    <el-table class="tablist" :data="tableData" max-height="700" style="width: 100%">
      <!-- <el-table-column  prop="id"  label="Id" > </el-table-column> -->
      <el-table-column prop="name" label="实施时间"> </el-table-column>
      <el-table-column prop="phone" label="来源IP"> </el-table-column>
      <el-table-column prop="state" label="地区"> </el-table-column>
      <el-table-column prop="classHour" label="下载方式">
      </el-table-column>
      <el-table-column prop="ladder" label="是否成功运行">
      </el-table-column>
      <el-table-column prop="ladder" label="来此渠道">
      </el-table-column>
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
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [
            {
              text: "今天",
              onClick(picker) {
                picker.$emit("pick", new Date());
              }
            },
            {
              text: "昨天",
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit("pick", date);
              }
            },
            {
              text: "一周前",
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", date);
              }
            }
          ]
        },
        form: {},
        tableData: [],
        pageNum: 0,
        pageSize: 10,
        total: 10,
        payrow: "",
        currentPage: 1,
        options: [
          {
            value: "选项2",
            label: "双皮奶"
          },
          {
            value: "选项3",
            label: "蚵仔煎"
          }
        ]
      };
    },
    mounted() {
      this.getstudentlist();
    },
    methods: {
      handleClick(row) {
        var id = row.id;
        this.$router.push({
          name: "downloadinfo",
          query: { id: id }
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
          pageNum: this.currentPage,
          pageSize: this.pageSize
        };
        this.axios
          .post("/account/student_list", params)
          .then(res => {
            this.tableData = res.data.data.list;
            this.total = res.data.totalPage;
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