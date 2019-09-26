<template lang="">
  <div>
    <div class="setGetAppPoolList">
        <el-row :gutter="0" class="formCont">
          <el-col :span="4" :push="0">
            <h3>统计列表：</h3>
          </el-col>
           
        </el-row>
    </div>
    <div class="setGetAppPoolList">
      <el-col>
        <el-form ref="form" :model="form" class="filtrate" label-width="80px">
          <el-row :gutter="10">
            <el-col :span="7">
               <el-date-picker
                v-model="form.month"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                 value-format="timestamp"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-col>
         
            <el-col :span="8">
              <el-form-item>  
                <el-button type="primary" @click="onSubmit">搜索</el-button>
                <el-button @click="resetSearch">重置</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" @click="dowExcel">导出Excel</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </div>
  <el-table  :span-method="arraySpanMethod"  :data="tableData"    style="width: 100%">
    <!-- <el-table-column fixed  prop="id" label="Id" > </el-table-column> -->
    <el-table-column  prop="name"  label="姓名" >
    </el-table-column>
    <el-table-column  prop="time"  label="次数" > </el-table-column>
    <el-table-column  prop="type" label="类型"> </el-table-column>
  </el-table>
 <el-dialog title="导出Excel" :visible.sync="editDialogVisible" width="30rem">
    <div style="width: 100%;position: relative;">	
		 <el-form ref="rulesrorm" :model="forms" label-width="120px">
          <el-form-item label="文件名称">
            <el-input v-model="forms.name" placeholder=""></el-input>
          </el-form-item>
        </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editDialogVisible=false">取 消</el-button>
      <el-button type="primary" @click="submitform" :loading="isEditUploading">确定</el-button>
    </span>
  </el-dialog>
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
      typeoptions: [
        {
          value: "",
          label: "所有"
        },
        {
          value: "1",
          label: "主课"
        },
        {
          value: "2",
          label: "陪练"
        }
      ],
      forms: {
        name: "",
        account: "",
        type: ""
      },
      names: "",
      editDialogVisible: false,
      form: {
        month: "",
        name: ""
      },
      pickerOptions: {},
      endTime: 99999999999,
      startTime: 0,
      tableData: [],
      isEditUploading: false,
      pageNum: 0,
      pageSize: 10,
      total: 10,
      payrow: "",
      currentPage: 1
    };
  },
  mounted() {
    this.getlist();
  },
  methods: {
    createNewArr(tablisst) {
      var st = [];
      for (var a = 0; a < tablisst.length; a++) {
        var names = tablisst[a].name;
        if (tablisst[a].statistics.length > 0) {
          var statisticsarr = tablisst[a].statistics;
          var jsonsstatistic = {};
          for (var i = 0; i < statisticsarr.length; i++) {
            console.log(statisticsarr[i]);
            jsonsstatistic = {
              name: names,
              time: statisticsarr[i].time,
              type: statisticsarr[i].type
            };
            st.push(jsonsstatistic);
          }
        }
      }
      console.log(st);
      this.tableData = st;
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    submitform() {
      this.startTime = this.form.month[0] ? this.form.month[0] / 1000 : 0;
      this.endTime = this.form.month[1]
        ? this.form.month[1] / 1000
        : 99999999999;
      this.names = this.form.name;
      var params = {
        endTime: this.endTime,
        export: "2",
        file: this.forms.name,
        startTime: this.startTime
      };
      this.axios
        .post("/find/statistical_export", params, {
          responseType: "arraybuffer"
        })
        .then(_res => {
          const blob = new Blob([_res.data], {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
          });
          const a = document.createElement("a");
          // 生成文件路径
          let href = window.URL.createObjectURL(blob);
          console.log(href);
          a.href = href;

          console.log(_res.headers);
          // let _fileName = _res.headers["content-disposition"]
          //   .split(";")[1]
          //   .split("=")[1]
          //   .split(".")[0];
          // 文件名中有中文 则对文件名进行转码
          a.download = decodeURIComponent(this.forms.name);
          // 利用a标签做下载
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(href);
          this.editDialogVisible = false;
        })
        .catch(err => {
          console.error(err);
        });
    },
    dowExcel() {
      this.editDialogVisible = true;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getlist();
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
    handleClick(row) {
      this.editDialogVisible = true;
    },
    resetSearch() {
      this.endTime = 99999999999;
      this.startTime = 0;
      this.form.month = "";
      this.form.name = "";
      this.form.type = "";
      this.getlist();
    },
    submitEditCover() {
      this.isEditUploading = true;
    },
    closeup() {
      this.isEditUploading = false;
      this.editDialogVisible = false;
    },
    onSubmit() {
      console.log(this.form.month[1]);
      this.startTime = this.form.month[0] ? this.form.month[0] / 1000 : 0;
      this.endTime = this.form.month[1]
        ? this.form.month[1] / 1000
        : 99999999999;
      this.getlist();
    },
    getlist() {
      var params = {
        endTime: this.endTime,
        startTime: this.startTime
      };
      this.axios
        .post("/find/statistical", params)
        .then(res => {
          this.tableData = res.data.data;
          console.log(this.tableData);
          this.createNewArr(this.tableData);
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