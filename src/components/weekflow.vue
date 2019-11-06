<template lang="">
  <div>
    <div>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <h2>周流量数</h2>
            <ul class="listflow">
              <li>
                <p class="titile">
                  兴趣部落
                </p>
                <p class="nums">
                  {{daylist.tribe}}
                </p>
              </li>
              <li>
                <p class="titile">
                  空间认证
                </p>
                <p class="nums">
                  {{daylist.auth}}
                </p>
              </li>
              <li>
                <p class="titile">
                  空间达人
                </p>
                <p class="nums">
                  {{daylist.daren}}
                </p>
              </li>
              <li>
                <p class="titile">
                  校园
                </p>
                <p class="nums">
                  {{daylist.school}}
                </p>
              </li>
              <li>
                <p class="titile">
                  yy直播
                </p>
                <p class="nums">
                  {{daylist.yy}}
                </p>
              </li>
              <li>
                <p class="titile">
                  cc直播
                </p>
                <p class="nums">
                  {{daylist.cc}}
                </p>
              </li>
              <li>
                <p class="titile">
                  部落评论
                </p>
                <p class="nums">
                  {{daylist.comment}}
                </p>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <h2>总流量数</h2>
            <ul class="listflow">
              <li>
                <p class="titile">
                  兴趣部落
                </p>
                <p class="nums">
                  {{totallist.tribe_total}}
                </p>
              </li>
              <li>
                <p class="titile">
                  空间认证
                </p>
                <p class="nums">
                  {{totallist.auth_total}}
                </p>
              </li>
              <li>
                <p class="titile">
                  空间达人
                </p>
                <p class="nums">
                  {{totallist.daren_total}}
                </p>
              </li>
              <li>
                <p class="titile">
                  校园
                </p>
                <p class="nums">
                  {{totallist.school_total}}
                </p>
              </li>
              <li>
                <p class="titile">
                  yy直播
                </p>
                <p class="nums">
                  {{totallist.yy_total}}
                </p>
              </li>
              <li>
                <p class="titile">
                  cc直播
                </p>
                <p class="nums">
                  {{totallist.cc_total}}
                </p>
              </li>
              <li>
                <p class="titile">
                  部落评论
                </p>
                <p class="nums">
                  {{totallist.comment_total}}
                </p>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
    <div class="setGetAppPoolList">
      <el-col>
        <el-form ref="form" :model="form" class="filtrate" label-width="80px">
          <el-row :gutter="10">
            <el-col :span="5">
              <el-form-item label="流量类型">
                <el-select v-model="form.category" placeholder="请选择" @change="onSubmit">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </div>
    <el-table class="tablist" :data="tableData" max-height="700" style="width: 100%">
      <!-- <el-table-column  prop="id"  label="Id" > </el-table-column> -->
      <!-- <el-table-column prop="name" label="默认编码"> </el-table-column> -->
      <el-table-column prop="time" label="日期段"> </el-table-column>
      <el-table-column prop="type" label="流量类型"> </el-table-column>
      <el-table-column prop="flow_total" label="流量总数">
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClickinfo(scope.row)" type="primary" size="small">流量概况</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="流量概况" :visible.sync="dialogTableVisible " width="40%" center>
      <el-table :data="gridData" style="min-height:200px" max-height="400px">
        <el-table-column property="date" label="渠道名"></el-table-column>
        <el-table-column property="name" label="类型"></el-table-column>
        <el-table-column property="address" label="流量数新/重"></el-table-column>
      </el-table>
    </el-dialog>
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
      gridData: [],
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
      form: {
        category: 1
      },
      dialogTableVisible: false,
      tableData: [],
      pageNum: 0,
      pageSize: 7,
      total: 7,
      payrow: "",
      currentPage: 1,
      options: [
        {
          value: 1,
          label: "兴趣部落"
        },
        {
          value: 2,
          label: "空间认证"
        },
        {
          value: 3,
          label: "空间达人"
        },
        {
          value: 4,
          label: "校园达人"
        },
        {
          value: 5,
          label: "yy直播"
        },
        {
          value: 6,
          label: "cc直播"
        },
        {
          value: 7,
          label: "部落评论"
        }
      ],
      category: "1",
      daylist: {
        tribe: "0/14", //兴趣部落（日）
        auth: "0/9", //空间认证（日）
        daren: "0/12", // 空间达人（日）
        school: "0/7", //校园达人（日）
        yy: "0/11", //yy直播（日）
        cc: "0/9", //cc直播（日）
        comment: "0/10" //部落评论（日）
      },
      totallist: {
        tribe_total: "0", //兴趣部落（总）
        auth_total: "0", //空间认证（总）
        daren_total: "0", // 空间达人（总）
        school_total: "0", //校园达人（总）
        yy_total: "0", //yy直播（总）
        cc_total: "0", //cc直播（总）
        comment_total: "0" //部落评论（总）
      }
    };
  },
  mounted() {
    this.getstudentlist();
  },
  methods: {
    handleClickinfo(row) {
      var params = {
        times: row.time,
        type: 2,
        category: this.form.category
      };
      this.axios
        .get("/public/index.php/flowDetail", { params: params })
        .then(res => {
          this.gridData = res.data.list;
          this.dialogTableVisible = true;
        })
        .catch(err => {
          console.error(err);
        });
    },
    onSubmit() {
      this.category = this.form.category;
      this.getstudentlist();
    },
    resetSearch() {
      this.form.category = 1;
      this.category = this.form.category;
      this.getstudentlist();
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
        category: this.category
      };
      this.axios
        .get("/public/index.php/statiFlowWeek", { params: params })
        .then(res => {
          this.tableData = res.data.list;
          console.log(this.tableData);
          this.total = res.data.totalPage;
          this.daylist = res.data;
          this.totallist = res.data;
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>
<style lang="">
.titile {
  font-size: 14px;
  color: #928282;
}

.nums {
  color: #e89c4b;
  font-size: 18px;
  line-height: 25px;
  margin: 0;
  font-weight: 600;
}

.listflow li {
  float: left;
  margin: 0 9px;
  text-align: center;
}
</style>