<template lang="">
  <div>
    <div class="setGetAppPoolList">
      <el-col>
        <el-form ref="form" :model="form" class="filtrate" label-width="150px">
          <el-row :gutter="10">
            <el-col :span="5">
              <el-form-item label="渠道列表">
                <el-select v-model="form.value" placeholder="请选择">
                  <el-option v-for="(item,index) in channelselectlist" :key="item.number" :label="item.channel_name"
                    :value="item.channel_name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="查询日期">
                <el-date-picker v-model="form.value2" value-format="yyyy-MM-dd" type="daterange" range-separator="至"
                  start-placeholder="开始日期" format="yyyy 年 MM 月 dd 日" end-placeholder="结束日期">
                </el-date-picker>
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
    <!-- <div style="margin: 20px">
      <el-button @click="setdelete">删除选中</el-button>
    </div> -->
    <el-table class="tablist" @current-change="handleSelectionChange" max-height="700" :data="tableData"
      style="width: 100%">
      <!-- <el-table-column  prop="id"  label="Id" > </el-table-column> -->
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="times" label="日期/日期段"> </el-table-column>
      <el-table-column prop="channel_name" label="渠道名"> </el-table-column>
      <el-table-column prop="today_process" label="进程数/重"> </el-table-column>
      <el-table-column prop="price" label="成功数"> </el-table-column>
      <el-table-column prop="percentage" label=" 成功比例"> </el-table-column>
      <el-table-column prop="term" label=" 终端数"> </el-table-column>
      <!-- <el-table-column fixed="right" label="操作" width="350">
        <template slot-scope="scope">
          <el-button @click="handdelete(scope.row)" type="primary" size="small">删除</el-button>
        </template>
      </el-table-column> -->
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

        isEditUploading: false,
        editDialogVisible: false,
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
        options: {},
        multipleSelection: "",
        channelselectlist: ""
      };
    },
    mounted() {
      this.getchannelStati()
    },
    methods: {
      getchannelStati() {
        var params = {
          page: 1,
          limit: "10000",
        };
        this.axios.get("/public/index.php/channelStati", {
          params: params
        })
          .then(res => {
            this.channelselectlist = res.data.list;
            console.log(this.channelselectlist)
          })
          .catch(err => {
            console.error(err);
          })
      },
      submitpost() { },
      handdelete(row) {
        var id = row.id;
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      },
      handleedit(row) {
        this.editDialogVisible = true;
      },
      setCurrent() {
        this.editDialogVisible = true;
      },
      setdelete() { },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleClickinfo(row) {
        var id = row.id;
        this.$router.push({ path: "channetableinfo", query: { id: id } });
      },
      onSubmit() {
        console.log(this.form)
        this.getstudentlist()
      },
      resetSearch() {
        this.endTime = 99999999999;
        this.startTime = 0;
        this.form.month = "";
        this.form.value = "";
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
          channel: this.form.value,
          times: this.form.value2[0] + '~' + this.form.value2[1]
        };
        this.axios
          .get("/public/index.php/clearChannel", {params:params})
          .then(res => {
            console.log(res);
            this.tableData = res.data.list;
            this.total = res.data.total;
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