<template lang="">
  <div>
    <div>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <ul class="listflow">
              <li>
                <p class="titile">
                  今日进程
                </p>
                <p class="nums">
                  {{todayprocess}}
                </p>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <ul class="listflow">
              <li>
                <p class="titile">
                  总进程
                </p>
                <p class="nums">
                  {{yesprocess}}
                </p>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <ul class="listflow">
              <li>
                <p class="titile">
              <li>
                <p class="titile">
                  总金额
                </p>
                <p class="nums">
                  {{totalchannel}}
                </p>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <ul class="listflow">

              </li>
              <li>
                <p class="titile">
                  在线天数
                </p>
                <p class="nums">
                  {{channel_active}}
                </p>
              </li>

            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="setGetAppPoolList" style="margin-top:3%">

    </div>
    <el-table class="tablist" :data="tableData" max-height="700" style="width: 100%">
      <!-- <el-table-column  prop="id"  label="Id" > </el-table-column> -->
      <el-table-column prop="times" label="日期"> </el-table-column>
      <el-table-column prop="today_process" label="进程数新/扣/重"> </el-table-column>
      <el-table-column prop="price" label="单价"> </el-table-column>
      <el-table-column prop="total_price" label="结算金额">
      </el-table-column>
      <el-table-column prop="act_price" label="实际结算金额">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="350">
        <template slot-scope="scope">
          <el-button @click="handleinfo(scope.row)" type="primary" size="small">详情信息</el-button>
        </template>
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
        form: {},
        tableData: [],
        pageNum: 0,
        pageSize: 7,
        total: 7,
        payrow: "",
        currentPage: 1,
        dialogTableVisible: false,
        channelId: "",
        todayprocess: "", //今天进程
        yesprocess: '', //昨天进程
        totalchannel: '',//总渠道
        channel_active: '' //活跃渠道
      };
    },
    mounted() {
      this.channelId = this.$route.query.channel_name;
      this.getstudentlist();
    },
    methods: {
      handleinfo(row) {
        console.log(row)
        var id = row.channel;
        var params = {
          id: id,
          times: row.times
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
      format(timestamp) {
        var timestamp = timestamp * 1000;
        //timestamp是整数，否则要parseInt转换
        var time = new Date(timestamp);
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
        console.log(this.channelId)
        var params = {
          page: this.currentPage,
          limit: this.pageSize,
          channel: this.channelId
        };
        this.axios
          .get("/public/index.php/channelDetails", { params: params })
          .then(res => {
            // "today_pro": 0,
            // "total_pro": 0,
            // "total_price": 0,
            // "online": 0,
            this.tableData = res.data.list;
            this.total = res.data.totalPage;
            this.todayprocess = res.data.today_pro; //今天进程
            this.yesprocess = res.data.total_pro; //昨天进程
            this.totalchannel = res.data.total_price; //总渠道
            this.channel_active = res.data.online; //活跃渠道
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