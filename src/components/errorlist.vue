<template lang="">
  <div>

    <div>
      <el-row :gutter="20">

        <el-col :span="12">
          <div class="grid-content bg-purple">
            <ul class="listflow">
              <li style="text-align: left;width: 100%;">
                <p class="titile">
                  今日反馈数
                </p>
                <p class="nums">
                  {{today_yes}}
                </p>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <ul class="listflow">
              <li style="text-align: left;width: 100%;">
                <p class="titile">
                  总反馈数
                </p>
                <p class="nums">
                  {{total_error}}
                </p>
              </li>
            </ul>
          </div>
        </el-col>


      </el-row>
    </div>
    <el-divider></el-divider>
    <el-table class="tablist" @current-change="handleSelectionChange" max-height="700" :data="tableData"
      style="width: 100%">
      <!-- <el-table-column  prop="id"  label="Id" > </el-table-column> -->
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="e_number" label="默认编码"> </el-table-column>
      <el-table-column label="实时时间" width="200">
        <template slot-scope="scope">
          {{format(scope.row.e_time) }}
        </template>
      </el-table-column>
      <el-table-column prop="e_code" label="mac"> </el-table-column>
      <el-table-column prop="e_code" label="错误原因"> </el-table-column>
      <el-table-column prop="e_version" label="QQ">
      </el-table-column>
      <el-table-column prop="e_busin_number" label="Q版本"> </el-table-column>
      <el-table-column prop="e_busin_number" label="版本号" width="100"> </el-table-column>
      <el-table-column prop="e_channel" label="来自渠道"> </el-table-column>
      <el-table-column prop="e_details" label="错误信息" width="550"> </el-table-column>
    </el-table>

    <div class="block">

      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isEditUploading: false,
        editDialogVisible: false,

        form: {},
        tableData: [],
        pageNum: 0,
        pageSize: 10,
        total: 10,
        payrow: "",
        currentPage: 1,
        options: {},
        multipleSelection: "",
        today_yes: "",
        total_error: ""
      };
    },
    mounted() {
      this.getstudentlist();
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      submitpost() { },
      handdelete(row) {
        var id = row.id;
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
          category: this.category
        };
        this.axios
          .get("/public/index.php/errorInfo", { params: params })
          .then(res => {
            var code = res.data.code;
            if (code !== 200) {
              return false;
            }
            this.tableData = res.data.list.data;
            this.total = res.data.list.total;
            this.today_yes = res.data.today_yes;
            this.total_error = res.data.total_error
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