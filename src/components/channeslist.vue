<template lang="">
  <div>
    <div>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <ul class="listflow">
              <li>
                <p class="titile">
                  今日进程数/重
                </p>
                <p class="nums">
                  {{todayprocess}}
                </p>
                <p class="flowinfos">昨日进程/重：{{yesprocess}}</p>
              </li>

            </ul>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <ul class="listflow">

              <li>
                <p class="titile">
                  今日终端数量
                </p>
                <p class="nums">
                  {{todayterminal}}
                </p>
                <p class="flowinfos">昨日终端数:{{yesterminal}}</p>
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
                  渠道总数
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
                  活跃渠道
                </p>
                <p class="nums">
                  {{channel_active}}
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
                  今日需支付
                </p>
                <p class="nums">
                  100
                </p>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
    <div style="margin: 20px">
      <el-button @click="setCurrent">添加渠道</el-button>
    </div>
    <el-table class="tablist" @current-change="handleSelectionChange" max-height="600" :data="tableData"
      style="width: 100%">
      <!-- <el-table-column  prop="id"  label="Id" > </el-table-column> -->
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="number" label="默认编码"> </el-table-column>
      <el-table-column prop="channel_name" label="渠道名"> </el-table-column>
      <el-table-column prop="today_process" label="今日进程数（新/扣/重）"> </el-table-column>
      <el-table-column prop="yes_process" label="昨日进程数（新/扣/重）"> </el-table-column>
      <el-table-column prop="" label="百分比">
        <template slot-scope="scope">
          {{scope.row.percentage}}%
        </template>
      </el-table-column>
      <el-table-column prop="price" label="单价"> </el-table-column>
      <el-table-column prop="remark" label="备注"> </el-table-column>
      <!-- <el-table-column prop="total_price" label="终端数"> </el-table-column> -->
      <el-table-column fixed="right" label="操作" width="350">
        <template slot-scope="scope">
  <el-button @click="handleedit(scope.row)" type="primary" size="small">编辑</el-button>
  <el-button @click="handgetinfo(scope.row)" type="primary" size="small">出量概括</el-button>
  <el-button @click="handdelete(scope.row)" type="primary" size="small">删除</el-button>
  <el-button @click="handleadd(scope.row)" type="primary" size="small">业务</el-button>
</template>
      </el-table-column>
    </el-table>

    <el-dialog title="填写信息" :visible.sync="editDialogVisible" width="30rem">
      <div style="width: 100%;position: relative;">
        <el-form ref="form" :model="form" label-width="130px">
          <el-form-item label="渠道名">
            <el-input v-model="form.channels" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="form.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="登录密码">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="下载链接配置">
            <el-input v-model="form.download_config"></el-input>
          </el-form-item>
          <el-form-item label="链接配置">
            <el-input v-model="form.link_config"></el-input>
          </el-form-item>
          <el-form-item label="单价">
            <el-input v-model="form.price"></el-input>
          </el-form-item>
          <el-form-item label="百分比">
            <el-input v-model="form.percentage"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.status" placeholder="请选择">
              <el-option v-for="item in optionsab_status" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="submitpost" :loading="isEditUploading">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="添加渠道信息" :visible.sync="editDialogVisible3" width="30rem">
      <div style="width: 100%;position: relative;">
        <el-form ref="form" :model="form" label-width="130px">
          <el-form-item label="渠道名">
            <el-input v-model="form.channels"></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="登录密码">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="下载链接配置">
            <el-input v-model="form.download_config"></el-input>
          </el-form-item>
          <el-form-item label="链接配置">
            <el-input v-model="form.link_config"></el-input>
          </el-form-item>
          <el-form-item label="单价">
            <el-input v-model="form.price"></el-input>
          </el-form-item>
          <el-form-item label="百分比">
            <el-input v-model="form.percentage"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.status" placeholder="请选择">
              <el-option v-for="item in optionsab_status" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible3=false">取 消</el-button>
        <el-button type="primary" @click="submitpost2" :loading="isEditUploading">确定</el-button>
      </span>
    </el-dialog>
    <div class="block">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" layout="prev, pager, next"
        :page-size="pageSize" :total="total"></el-pagination>
    </div>

    <!-- <el-dialog title="出量概率详情" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="times" label="时间"></el-table-column>
        <el-table-column property="todayprocess" label="进程数"></el-table-column>
        <el-table-column property="price" label="结算单价"></el-table-column>
        <el-table-column property="totalprice" label="结算金额"></el-table-column>
        <el-table-column prop="state" label="出量概括">
          <template slot-scope="scope">
            <el-button @click="Visibletable(scope.row)" type="info" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog width="50%" title="详情信息" :visible.sync="innerVisible" append-to-body>
        <el-table :data="gridData2" max-height="250">
          <el-table-column property="times" label="时间" width="200"></el-table-column>
          <el-table-column property="ip" label="ip地址"></el-table-column>
          <el-table-column property="online_qq" label="在线qq"></el-table-column>
          <el-table-column property="edition" label="版本号"></el-table-column>
          <el-table-column property="channel" label="渠道"></el-table-column>
          <el-table-column property="success" label="是否执行成功"></el-table-column>
        </el-table>
      </el-dialog>
    </el-dialog> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      gridData2: [],
      innerVisible: false,
      dialogTableVisible: false,
      editDialogVisible2: false,
      isEditUploading: false,
      editDialogVisible: false,

      form: {},
      tableData: [],
      pageNum: 0,
      pageSize: 8,
      total: 7,
      payrow: "",
      currentPage: 1,
      infotable: [],
      options: {},
      multipleSelection: "",
      optionsab_status: [
        {
          value: "1",
          label: "启"
        },
        {
          value: "0",
          label: "停"
        }
      ],
      todayprocess: 0, //今天进程
      yesprocess: 1, //昨天进程
      totalchannel: 1, //总渠道
      channel_active: 3, //活跃渠道
      todayterminal: 0, //今日终端
      yesterminal: 1, //昨日终端
      editDialogVisible3: false,
      gridData: []
    };
  },
  mounted() {
    this.getstudentlist();
  },
  methods: {
    submitpost() {
      console.log(this.form);
      var parms = {
        username: this.form.username,
        password: this.form.password,
        download_config: this.form.download_config,
        qq: this.form.qq,
        link_config: this.form.link_config,
        percentage: this.form.percentage,
        remark: this.form.remark,
        channels: this.form.channel_name,
        id: this.form.id,
        magn: this.form.magn,
        price: this.form.price,
        weight: this.form.weight
      };
      console.log(parms);
      this.axios
        .get("/public/index.php/updateChannels", { params: parms })
        .then(res => {
            var code = res.data.code;
          console.log(res);
          if (code !== 200) {
            this.$message.error(res.data.msg);
            return false;
          }
          this.$message({
            type: "success",
            message: res.data.msg
          });
          this.getstudentlist();
          this.editDialogVisible = false;
          this.form = {};
        })
        .catch(err => {
          console.error(err);
        });
    },
    submitpost2() {
      var parms = this.form;
      this.axios
        .get("/public/index.php/addChannels", { params: parms })
        .then(res => {
            var code = res.data.code;
          if (code !== 200) {
            this.$message.error(res.data.msg);
            return false;
          }
          this.$message({
            type: "success",
            message: res.data.msg
          });
          this.getstudentlist();
          this.editDialogVisible = false;
          this.editDialogVisible3 = false;
          this.form = {};
        })
        .catch(err => {
          console.error(err);
        });
    },
    handgetinfo(row) {
      var id = row.id;
      var channel_name = row.channel_name;
      var params = {
        id: id,
        channel_name: channel_name
      };
      console.log(params);
      this.$router.push({
        path: "/channetableinfo",
        // name: 'mallList',
        query: params
      });
    },
    Visibletable(row) {
      console.log(row);
      var channel_names = row.row.channel_name;
      var params = {
        page: 1,
        channel: channel_names,
        limit: 999999999999
      };
      this.axios
        .get("/public/index.php/channelDetails", { params: params })
        .then(res => {
          console.log(res);
          this.gridData2 = res.data.list;
          this.innerVisible = true;
        })
        .catch(err => {
          console.error(err);
        });
    },
    handleadd(row) {
      console.log(row);
      var id = row.number;
      var channel_name = row.channel_name;
      var params = {
        id: id,
        channel_name: channel_name
      };
      this.$router.push({ path: "channestable", query: params });
    },
    handleedit(row) {
      console.log(row);
      var params = {
        id: row.number
      };
      this.axios
        .get("/public/index.php/getOneChannel", { params: params })
        .then(res => {
          var code = res.data.code;
          // if (code !== 200) {
          //   this.$massage.error("请刷新重试");
          //   return false;
          // }
          this.form = res.data.list;
          console.log(this.form);
          this.editDialogVisible = true;
        })
        .catch(err => {
          console.error(err);
        });
      // console.log(row);
      // var rows = row;
      // this.form = rows;
      // this.editDialogVisible = true;
    },
    setCurrent() {
      this.form = {};
      this.editDialogVisible3 = true;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    showinfotable(row) {
      this.editDialogVisible2 = true;
    },
    handleClickinfo(row) {
      var id = row.id;
      this.$router.push({ path: "channetableinfo", query: { id: id } });
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
    handdelete(row) {
      // delChannels
      console.log(row);
      var ids = [];
      ids.push(row.number);
      this.$confirm("你确定要删除渠道, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var params = {
            ids: ids.join(",")
          };
          this.axios
            .get("/public/index.php/delChannels", { params: params })
            .then(res => {
              var code = res.data.code;

              this.getstudentlist();
              if (code !== 200) {
                this.$message.error(res.data.msg);
                return false;
              }
              this.getstudentlist();
              this.$message({
                type: "success",
                message: "删除成功"
              });
            })
            .catch(err => {
              console.error(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除"
          });
        });
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
        limit: this.pageSize
      };
      this.axios
        .get("/public/index.php/channelStati", { params: params })
        .then(res => {
          console.log(res);
          this.tableData = res.data.list;
          this.total = res.data.total;
          console.log(this.total);
          this.todayprocess = res.data.todayprocess; //今天进程
          this.yesprocess = res.data.yesprocess; //昨天进程
          this.totalchannel = res.data.totalchannel; //总渠道
          this.channel_active = res.data.channel_active; //活跃渠道
          this.todayterminal = res.data.todayterminal; //今日终端
          this.yesterminal = res.data.yesterminal; //昨日终端
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