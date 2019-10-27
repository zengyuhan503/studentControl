<template lang="">
  <div>
    <div>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <ul class="listflow">
              <li>
                <p class="titile">
                  日下载数：
                </p>
                <p class="nums">
                  500/515
                </p>
                <p class="flowinfos">exe：500/510 链接：500/510</p>
              </li>

            </ul>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <ul class="listflow">
              <li>
                <p class="titile">
                  总下载数：
                </p>
                <p class="nums">
                  500
                </p>
                <p class="flowinfos">exe：500 链接：10</p>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <ul class="listflow">
              <li>
                <p class="titile">
                  总终端数：
                </p>
                <p class="nums">
                  500
                </p>
                <p class="flowinfos">exe：500 链接：10</p>
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
              <el-form-item label="下载类型">
                <el-select v-model="form.value" placeholder="请选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
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
    <el-table class="tablist" :data="tableData" max-height="700" style="width: 100%">
      <!-- <el-table-column  prop="id"  label="Id" > </el-table-column> -->
      <el-table-column prop="name" label="默认编码"> </el-table-column>
      <el-table-column prop="phone" label="实施日期"> </el-table-column>
      <el-table-column prop="state" label="下载类型"> </el-table-column>
      <el-table-column prop="classHour" label="下载总数">
      </el-table-column>
      <el-table-column prop="state" label="运行总数"> </el-table-column>
      <el-table-column prop="state" label="运行成功比列"> </el-table-column>
      <el-table-column prop="ladder" label="来自渠道">
      </el-table-column>
      <el-table-column prop="state" label="终端数"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="350">
        <template slot-scope="scope">
          <el-button @click="handleClickinfo(scope.row)" type="primary" size="small">详情信息</el-button>
        </template>
      </el-table-column>
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
        options: {}
      };
    },
    mounted() {
      this.getstudentlist();
    },
    methods: {
      handleClickinfo(row) {
        var id = row.id;
        this.$router.push({ path: "downloadinfo", query: { id: id } });
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