<template lang="">
  <div>
    <div>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <ul class="listflow">
              <li>
                <p class="titile">
                  年下载数：
                </p>
                <p class="nums">
                  {{link_and_exe}}
                </p>
                <p class="flowinfos">exe:{{exe_today_yes}} 链接：{{link_today_yes}}</p>
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
                  {{exelinktotal}}
                </p>
                <p class="flowinfos">exe：{{exetotal}} 链接：{{linktotal}}</p>
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
                  {{termtotal}}
                </p>
                <p class="flowinfos">exe：{{termexetotal}} 链接：{{termlinktotal}}</p>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
    <div class="setGetAppPoolList">
      <div>
      </div>
      <el-form ref="form" :model="form" class="filtrate" label-width="80px">
        <el-row :gutter="10">
          <el-col :span="5">
            <el-form-item label="下载类型">
              <el-select v-model="form.value" placeholder="请选择" @change="onSubmit">
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

      <el-table-column prop="time" label="年份" width="230"> </el-table-column>
      <el-table-column prop="type" label="下载类型"> </el-table-column>
      <el-table-column prop="downloads" label="下载总数（今/昨）">
      </el-table-column>
      <el-table-column label="运行总数">
        <template slot-scope="scope">
          {{scope.row.today==''?scope.row.today:scope.row.yes}}
        </template>
      </el-table-column>
      <el-table-column prop="links" label="运行成功比列"> </el-table-column>
      <el-table-column prop="terminals" label="终端数">
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="350">
        <template slot-scope="scope">
          <el-button @click="handleClickinfo(scope.row)" type="primary" size="small">下载概况</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" layout="prev, pager, next"
        :page-size="pageSize" :hide-on-single-page="true" :total="total"></el-pagination>
    </div>
    <el-dialog title="下载概况" :visible.sync="dialogTableVisible" width="40%" center>
      <el-table :data="gridData" style="min-height:200px" max-height="400px">
        <el-table-column property="date" label="渠道名"></el-table-column>
        <el-table-column property="name" label="类型"></el-table-column>
        <el-table-column property="address" label="下载数"></el-table-column>
        <el-table-column property="address" label="成功运行数"></el-table-column>
        <el-table-column property="address" label="运行比例数"></el-table-column>
        <el-table-column property="address" label="终端数"></el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        gridData: [],
        form: {
          value: "1"
        },
        tableData: [],
        pageNum: 0,
        pageSize: 10,
        total: 10,
        payrow: "",
        currentPage: 1,
        options: [
          {
            value: "1",
            label: "exe"
          },
          {
            value: "2",
            label: "链接"
          }
        ],
        exetotal: "1", //exe总下载
        linktotal: 0, //链接总下载
        exelinktotal: "1", //总下载数
        termexetotal: "1", //exe总终端
        termlinktotal: 0, //链接总终端
        termtotal: "1", //总终端
        exe_today_yes: "0/0", //exe日下载对比
        link_today_yes: "0/0", //链接日下载对比
        link_and_exe: "0/0", //日下载数
        dialogTableVisible: false
      };
    },
    mounted() {
      this.getstudentlist();
    },
    methods: {
      handleClickinfo(row) {

        var params = {
          times: row.time,
          category: this.form.value
        };
        this.axios.get('/public/index.php/downloadDetails', { params: params }).then(res => {
          this.gridData = res.data.list;
          this.dialogTableVisible = true;
        }).catch(err => {
          console.error(err);
        });
      },
      onSubmit() {
        this.getstudentlist();
      },
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
          category: this.form.value
        };
        this.axios
          .get("/public/index.php/statiHomeYear", { params: params })
          .then(res => {
            console.log(res.data);
            this.link_and_exe = res.data.link_and_exe;
            this.exetotal = res.data.exetotal;
            this.linktotal = res.data.linktotal;
            this.termexetotal = res.data.termexetotal;
            this.termlinktotal = res.data.termlinktotal;
            this.link_and_exe = res.data.link_and_exe;
            this.termtotal = res.data.termtotal;
            this.exe_today_yes = res.data.exe_today_yes;
            this.link_today_yes = res.data.link_today_yes;
            this.tableData = res.data.list;
            this.total = res.data.total;
            console.log(this.tableData);
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

  .flowinfos {
    font-size: 1px;
    color: #a29797;
  }
</style>