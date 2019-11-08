<template lang="">
  <div>
    <div>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <ul class="listflow">
              <li>
                <p class="titile">
                  今日进程数量
                </p>
                <p class="nums">
                  {{todaybusin}}
                </p>
                <p class="flowinfos">昨日进程：{{yesbusin}}</p>
              </li>

            </ul>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <ul class="listflow">

              <li>
                <p class="titile">
                  执行数({{titles}})
                </p>
                <p class="nums">
                  {{total_follow}}
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
                  今日关注({{titles}})
                </p>
                <p class="nums">
                  {{today_follow}}
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
                  总关注({{titles}})
                </p>
                <p class="nums">
                  {{totals}}
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
                  在线天数
                </p>
                <p class="nums">
                  {{imptotal}}
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
            <!-- <el-col :span="5">
              <el-form-item label="业务类型">
                <el-select v-model="form.category" @change="onSubmit" placeholder="请选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
            <el-col :span="5">
              <el-form-item label="业务类型">
                <el-select v-model="form.category" placeholder="请选择" @change="onSubmit">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-button @click="setCurrent" :loading="setCurrentStati">关联业务</el-button>
              <el-button @click="getchannelStati" :loading="channelStati">一键镜像</el-button>
              <el-button @click="setdelete">一键删除</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </div>
    <div style="margin: 20px">

    </div>

    <!-- //兴趣部落 -->
    <div v-if="category==1">
      <el-table class="tablist" ref="ChangeTable" @current-change="handleSelectionChange" max-height="700"
        :data="tableData" style="width: 100%">
        <!-- <el-table-column  prop="id"  label="Id" > </el-table-column> -->
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="id" label="qid"> </el-table-column>
        <el-table-column prop="weights" label="权重"> </el-table-column>
        <el-table-column prop="contact" label="昵称/id"> </el-table-column>
        <el-table-column prop="magnitude" label="量级"> </el-table-column>
        <el-table-column prop="totalbusin" label="已关注总数（兴趣）"> </el-table-column>
        <el-table-column prop="todayrepeatbusin" label="已重关注数（兴趣）"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClickinfo(scope.row)" type="primary" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- //空间认证 -->
    <div v-if="category==3">
      <el-table class="tablist" ref="ChangeTable" @current-change="handleSelectionChange" max-height="700"
        :data="tableData" style="width: 100%">
        <!-- <el-table-column  prop="id"  label="Id" > </el-table-column> -->
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="id" label="qid"> </el-table-column>
        <el-table-column prop="weights" label="权重"> </el-table-column>
        <el-table-column prop="contact" label="业务QQ"> </el-table-column>
        <el-table-column prop="magnitude" label="量级"> </el-table-column>
        <el-table-column prop="totalbusin" label="已关注总数（达人）"> </el-table-column>
        <el-table-column prop="todayrepeatbusin" label="已重关注数（达人）"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClickinfo(scope.row)" type="primary" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- //空间达人 -->
    <div v-if="category==2">
      <el-table class="tablist" ref="ChangeTable" @current-change="handleSelectionChange" max-height="700"
        :data="tableData" style="width: 100%">
        <!-- <el-table-column  prop="id"  label="Id" > </el-table-column> -->
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="id" label="qid"> </el-table-column>
        <el-table-column prop="weights" label="权重"> </el-table-column>
        <el-table-column prop="contact" label="业务QQ"> </el-table-column>
        <el-table-column prop="magnitude" label="量级"> </el-table-column>
        <el-table-column prop="totalbusin" label="已关注总数（认证）"> </el-table-column>
        <el-table-column prop="todayrepeatbusin" label="已重关注数（认证）"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClickinfo(scope.row)" type="primary" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- //校园达人 -->
    <div v-if="category==4">
      <el-table class="tablist" ref="ChangeTable" @current-change="handleSelectionChange" max-height="700"
        :data="tableData" style="width: 100%">
        <!-- <el-table-column  prop="id"  label="Id" > </el-table-column> -->
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="id" label="qid"> </el-table-column>
        <el-table-column prop="weights" label="权重"> </el-table-column>
        <el-table-column prop="contact" label="业务QQ"> </el-table-column>
        <el-table-column prop="magnitude" label="量级"> </el-table-column>
        <el-table-column prop="totalbusin" label="已关注总数（校园）"> </el-table-column>
        <el-table-column prop="todayrepeatbusin" label="已重关注数（校园）"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClickinfo(scope.row)" type="primary" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- //校园达人 -->
    <div v-if="category==5">
      <el-table class="tablist" ref="ChangeTable" @current-change="handleSelectionChange" max-height="700"
        :data="tableData" style="width: 100%">
        <!-- <el-table-column  prop="id"  label="Id" > </el-table-column> -->
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="id" label="qid"> </el-table-column>
        <el-table-column prop="weights" label="权重"> </el-table-column>
        <el-table-column prop="contact" label="业务YY"> </el-table-column>
        <el-table-column prop="magnitude" label="量级"> </el-table-column>
        <el-table-column prop="totalbusin" label="已关注总数（yy）"> </el-table-column>
        <el-table-column prop="todayrepeatbusin" label="已重关注数（yy）"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClickinfo(scope.row)" type="primary" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- //cc直播 -->
    <div v-if="category==6">
      <el-table class="tablist" ref="ChangeTable" @current-change="handleSelectionChange" max-height="700"
        :data="tableData" style="width: 100%">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="id" label="qid"> </el-table-column>
        <el-table-column prop="weights" label="权重"> </el-table-column>
        <el-table-column prop="contact" label="业务CC"> </el-table-column>
        <el-table-column prop="magnitude" label="量级"> </el-table-column>
        <el-table-column prop="totalbusin" label="已关注总数（cc）"> </el-table-column>
        <el-table-column prop="todayrepeatbusin" label="已重关注数（cc）"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClickinfo(scope.row)" type="primary" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- //部落评论 -->
    <div v-if="category==7">
      <el-table class="tablist" ref="ChangeTable" @current-change="handleSelectionChange" max-height="700"
        :data="tableData" style="width: 100%">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="id" label="qid"> </el-table-column>
        <el-table-column prop="weights" label="权重"> </el-table-column>
        <el-table-column prop="contact" label="评论内容"> </el-table-column>
        <el-table-column prop="magnitude" label="量级"> </el-table-column>
        <!-- <el-table-column prop="magnitude" label="权重"> </el-table-column>
        <el-table-column prop="contact" label="评论内容"> </el-table-column>
        <el-table-column prop="weights" label="量级"> </el-table-column> -->
        <el-table-column prop="totalbusin" label="已评论总数"> </el-table-column>
        <el-table-column prop="todayrepeatbusin" label="已重评论数"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClickinfo(scope.row)" type="primary" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="选择业务" :visible.sync="editDialogVisible" width="60%">
      <div style="width: 100%;position: relative;">
        <el-table class="tablist" ref="multipleTable" @current-change="handleSelectionChange" max-height="500"
          height="500px" :data="businesstable" style="width: 100%">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="ab_id" label="默认编号"> </el-table-column>
          <template v-if="category==1">
            <el-table-column prop="ab_contact" label="昵称/ID"></el-table-column>
          </template>
          <template v-if="category==5">
            <el-table-column prop="ab_contact" label="YY/昵称"></el-table-column>
          </template>
          <template v-if="category==6">
            <el-table-column prop="ab_contact" label="CC/昵称"></el-table-column>
          </template>
          <template v-if="category==2||category==3||category==4">
            <el-table-column prop="ab_contact" label="业务QQ"></el-table-column>
          </template>
          <template v-if="category==7">
            <el-table-column prop="ab_contact" label="评论内容"></el-table-column>
          </template>
          <el-table-column prop="ab_magnitude" label="量级"> </el-table-column>
          <el-table-column prop="ab_weights" label="权重"> </el-table-column>
          <!-- <el-table-column fixed="remark" label="备注"></el-table-column> -->
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitpost">确认关联</el-button>
      </span>
    </el-dialog>
    <el-dialog title="选择渠道" :visible.sync="channelselect" width="40%">
      <div style="width: 100%;position: relative;">
        <el-table class="tablist" ref="channellists" @current-change="handleSelectionChange" max-height="350"
          height="350px" :data="channelselectlist" style="width: 100%">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="number" label="默认编号"> </el-table-column>
          <el-table-column prop="channel_name" label="渠道名称"> </el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitmirrorChannel">确定镜像</el-button>
      </span>
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
        businesslist: "",
        listtype: 1,
        titles: "兴趣部落",
        editDialogVisible: false,
        form: {
          category: 1
        },
        busiselectionlist: [],
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
        imptotal: "",
        totals: "",
        multipleSelection: "",
        category: 1,
        businesstable: [],
        channelselect: false,
        channelselectlist: [],
        channelStati: false,
        setCurrentStati: false,
        channel_name: "",
        today_follow: "",
        todaybusin: "",
        total_follow: "",
        totalpage: "",
        yesbusin: ""
      };
    },
    mounted() {
      this.channelId = this.$route.query.id;
      this.channel_name = this.$route.query.channel_name;
      this.getstudentlist();
    },
    methods: {
      getbusinesslist() {
        this.setCurrentStati = true;
        var params = {
          page: 1,
          limit: "10000",
          category: this.form.category
        };
        this.axios
          .get("/public/index.php/channelRelaBusin", {
            params: params
          })
          .then(res => {
            console.log(res);
            this.setCurrentStati = false;
            // this.category = this.form.category;
            this.businesstable = res.data.list.data;
            this.editDialogVisible = true;
            console.log(this.businesstable);
          })
          .catch(err => {
            console.error(err);
          });
      },
      getchannelStati() {
        var rows = this.$refs.ChangeTable.selection;
        console.log(rows);
        if (rows.length == 0) {
          this.$message.error("请选择需要镜像的业务");
          return false;
        }
        for (var a = 0; a < rows.length; a++) {
          this.busiselectionlist.push(rows[a].id);
        }
        this.channelStati = true;
        var params = {
          page: 1,
          limit: "10000"
        };
        this.axios
          .get("/public/index.php/channelStati", {
            params: params
          })
          .then(res => {
            this.channelStati = false;
            this.channelselectlist = res.data.list;
            this.channelselect = true;
          })
          .catch(err => {
            console.error(err);
          });
      },
      submitmirrorChannel() {
        var rows = this.$refs.channellists.selection;
        console.log(rows);
        if (rows.length == 0) {
          this.$message.error("请选择渠道");
          return false;
        }
        var list = [];
        for (var a = 0; a < rows.length; a++) {
          list.push(rows[a].number);
        }
        console.log(list, this.busiselectionlist);
        this.$confirm(
          "你确定要让选择的业务镜像到选择的渠道吗, 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            var params = {
              bids: this.busiselectionlist.join(","),
              cid: list.join(",")
            };
            this.axios
              .get("/public/index.php/oneKeyImage", { params: params })
              .then(res => {
                var code = res.data.code;

                if (code !== 200) {
                  this.$message.error(res.data.msg);
                  return false;
                }
                this.channelselect = false;
                this.$message({
                  type: "success",
                  message: res.data.msg
                });
              })
              .catch(err => {
                console.error(err);
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消关联"
            });
          });
      },
      submitpost() {
        var rows = this.$refs.multipleTable.selection;
        console.log(rows);
        if (rows.length == 0) {
          this.$message.error("请选择业务");
          return false;
        }
        var list = [];
        for (var a = 0; a < rows.length; a++) {
          list.push(rows[a].ab_id);
        }
        console.log(list);
        this.$confirm("你确定要让选择的业务关联到当前渠道吗, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            var params = {
              channel: this.channel_name,
              bids: list.join(",")
            };
            this.axios
              .get("/public/index.php/setBusin", { params: params })
              .then(res => {
                var code = res.data.code;

                if (code !== 200) {
                  this.$message.error(res.data.msg);
                  return false;
                }
                this.editDialogVisible = false;
                this.getstudentlist();
                this.$message({
                  type: "success",
                  message: res.data.msg
                });
              })
              .catch(err => {
                console.error(err);
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消关联"
            });
          });
      },
      setCurrent() {
        this.getbusinesslist();
      },
      setcope() { },
      setdelete() {
        // var rows = this.$refs.ChangeTable.selection;
        // if (rows.length == 0) {
        //   this.$message.error("请选择业务");
        //   return false;
        // }
        // var list = []
        // for (var a = 0; a < rows.length; a++) {
        //   list.push(rows[a].id)
        // };
        // console.log(list)
        this.deletebuis();
      },
      deletebuis(list) {
        this.$confirm("你确定要删除业务, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            var params = {
              cid: this.channelId
            };
            this.axios
              .get("/public/index.php/businDels", { params: params })
              .then(res => {
                var code = res.data.code;
                if (code !== 200) {
                  this.$message.error(res.data.msg);
                  return false;
                }
                this.getstudentlist();
                this.$message({
                  type: "success",
                  message: res.data.msg
                });
              })
              .catch(err => {
                console.error(err);
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消关联"
            });
          });
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleClickinfo(row) {
        console.log(row.id);
        this.$confirm("你确定要删除业务, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            var params = {
              cid: this.channelId,
              bid: row.id,
            };
            this.axios
              .get("/public/index.php/businOneDels", { params: params })
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
      onSubmit() {
        this.category = this.form.category;
        this.categoryseket = this.category;
        if (this.category == 7) {
          this.tabtable = 2;
        } else {
          this.tabtable = 1;
        }

        this.form.ab_type = this.category;
        this.titles = this.switchcategory(this.category);
        this.getstudentlist();
      },
      switchcategory(category) {
        for (var a = 0; a < this.options.length; a++) {
          if (category == this.options[a].value) {
            return this.options[a].label;
          }
        }
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
          limit: this.pageSize,
          category: this.category,
          channel: this.channel_name
        };
        this.axios
          .get("/public/index.php/channelBusinList", { params: params })
          .then(res => {
            var code = res.data.code;
            if (code !== 200) {
              return false;
            }
            this.tableData = res.data.list;
            this.total = res.data.totalPage;
            this.totile = res.data;
            this.today_follow = res.data.today_follow;
            this.todaybusin = res.data.todaybusin;
            this.total_follow = res.data.imptotal;
            this.totalpage = res.data.totalpage;
            this.yesbusin = res.data.yesbusin;
            this.totals = res.data.total_follow;
            this.imptotal = res.data.imp_day
            console.log(this.today_follow);
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