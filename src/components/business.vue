<template lang="">
  <div>
    <div>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <ul class="listflow">
              <li>
                <p class="titile">
                  总关注数({{titles}})
                </p>
                <p class="nums">
                  {{totile.totalbusin}}
                </p>

              </li>

            </ul>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <ul class="listflow">
              <li>
                <p class="titile">
                  今日关注数({{titles}})
                </p>
                <p class="nums">
                  {{totile.todaybusin}}
                </p>

              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <ul class="listflow">
              <li>
                <p class="titile">
                  昨日关注数({{titles}})
                </p>
                <p class="nums">
                  {{totile.yesbusin}}
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
            <el-col :span="8">
              <el-button @click="setCurrent">添加业务</el-button>
              <el-button @click="setdelete">删除选中</el-button>
            </el-col>
            <el-col :span="5">
              <el-form-item label="业务类型">
                <el-select v-model="form.category" placeholder="请选择" @change="onSubmit">
                  <el-option v-for="item in optionsab_type" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </div>
    <div style="margin: 20px">

    </div>
    <div v-if="tabtable==1">
      <div v-if="category==1">
        <el-table ref="multipleTable" class="tablist" max-height="700" @current-change="handleSelectionChange"
          :data="tableData" style="width: 100%">
          <!-- <el-table-column  prop="id"  label="Id" > </el-table-column> -->
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="id" label="qid"> </el-table-column>
          <el-table-column prop="contact" label="权重"> </el-table-column>
          <el-table-column prop="contact" label="昵称/ID"> </el-table-column>

          <el-table-column prop="magnitude" label="量级"> </el-table-column>
          <el-table-column prop="totalbusin" label="已关注总数/重">
          </el-table-column>
          <el-table-column prop="todaybusin" label="今日已关注数/重"> </el-table-column>
          <el-table-column prop="yesbusin" label="昨日已关注数/重">
          </el-table-column>
          <el-table-column prop="ab_status" label="状态">
            <template slot-scope="scope">
              <span>{{scope.row.ab_status?'启':'停'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="备注"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="300">
            <template slot-scope="scope">
              <!-- <el-button @click="editDialogVisible4=true" type="primary" size="small">查看渠道</el-button> -->
              <el-button @click="handleedit(scope.row)" type="primary" size="small">编辑</el-button>
              <el-button @click="handdelete(scope.row)" type="primary" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="category==5">
        <el-table ref="multipleTable" class="tablist" max-height="700" @current-change="handleSelectionChange"
          :data="tableData" style="width: 100%">
          <!-- <el-table-column  prop="id"  label="Id" > </el-table-column> -->
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="id" label="qid"> </el-table-column>
          <el-table-column prop="contact" label="权重"> </el-table-column>
          <el-table-column prop="contact" label="YY/昵称"> </el-table-column>

          <el-table-column prop="magnitude" label="量级"> </el-table-column>
          <el-table-column prop="totalbusin" label="已关注总数/重">
          </el-table-column>
          <el-table-column prop="todaybusin" label="今日已关注数/重"> </el-table-column>
          <el-table-column prop="yesbusin" label="昨日已关注数/重">
          </el-table-column>
          <el-table-column prop="ab_status" label="状态">
            <template slot-scope="scope">
              <span>{{scope.row.ab_status?'启':'停'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="300">
            <template slot-scope="scope">
              <!-- <el-button @click="editDialogVisible4=true" type="primary" size="small">查看渠道</el-button> -->
              <el-button @click="handleedit(scope.row)" type="primary" size="small">编辑</el-button>
              <el-button @click="handdelete(scope.row)" type="primary" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="category==6">
        <el-table ref="multipleTable" class="tablist" max-height="700" @current-change="handleSelectionChange"
          :data="tableData" style="width: 100%">
          <!-- <el-table-column  prop="id"  label="Id" > </el-table-column> -->
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="id" label="qid"> </el-table-column>
          <el-table-column prop="contact" label="权重"> </el-table-column>
          <el-table-column prop="contact" label="CC/昵称"> </el-table-column>
          <el-table-column prop="magnitude" label="量级"> </el-table-column>
          <el-table-column prop="totalbusin" label="已关注总数/重">
          </el-table-column>
          <el-table-column prop="todaybusin" label="今日已关注数/重"> </el-table-column>
          <el-table-column prop="yesbusin" label="昨日已关注数/重">
          </el-table-column>
          <el-table-column prop="ab_status" label="状态">
            <template slot-scope="scope">
              <span>{{scope.row.ab_status?'启':'停'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="300">
            <template slot-scope="scope">
              <!-- <el-button @click="editDialogVisible4=true" type="primary" size="small">查看渠道</el-button> -->
              <el-button @click="handleedit(scope.row)" type="primary" size="small">编辑</el-button>
              <el-button @click="handdelete(scope.row)" type="primary" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="category==2||category==3||category==4||category==7">
        <el-table ref="multipleTable" class="tablist" max-height="700" @current-change="handleSelectionChange"
          :data="tableData" style="width: 100%">
          <!-- <el-table-column  prop="id"  label="Id" > </el-table-column> -->
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="id" label="qid"> </el-table-column>
          <el-table-column prop="contact" label="权重"> </el-table-column>
          <el-table-column prop="contact" label="业务QQ"> </el-table-column>
          <el-table-column prop="magnitude" label="量级"> </el-table-column>
          <el-table-column prop="totalbusin" label="已关注总数/重">
          </el-table-column>
          <el-table-column prop="todaybusin" label="今日已关注数/重"> </el-table-column>
          <el-table-column prop="yesbusin" label="昨日已关注数/重">
          </el-table-column>
          <el-table-column prop="ab_status" label="状态">
            <template slot-scope="scope">
              <span>{{scope.row.ab_status?'启':'停'}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="remark" label="备注"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="300">
            <template slot-scope="scope">
              <!-- <el-button @click="editDialogVisible4=true" type="primary" size="small">查看渠道</el-button> -->
              <el-button @click="handleedit(scope.row)" type="primary" size="small">编辑</el-button>
              <el-button @click="handdelete(scope.row)" type="primary" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div v-else>
      <el-table ref="multipleTable" class="tablist" max-height="700" @current-change="handleSelectionChange"
        :data="tableData" style="width: 100%">
        <!-- <el-table-column  prop="id"  label="Id" > </el-table-column> -->
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="id" label="qid"> </el-table-column>
        <el-table-column prop="contact" label="权重"> </el-table-column>
        <el-table-column prop="contact" label="评论内容"> </el-table-column>
        <el-table-column prop="magnitude" label="量级"> </el-table-column>
        <el-table-column prop="totalbusin" label="已评论总数">
        </el-table-column>
        <el-table-column prop="todaybusin" label="今日评论数"> </el-table-column>

        <el-table-column prop="yesbusin" label="昨日评论数">
        </el-table-column>
        <el-table-column prop="yesbusin" label="状态">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="300">
          <template slot-scope="scope">
            <!-- <el-button @click="editDialogVisible3=true" type="primary" size="small">查看渠道</el-button> -->
            <el-button @click="handleedit(scope.row)" type="primary" size="small">编辑</el-button>
            <el-button @click="handdelete(scope.row)" type="primary" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="添加业务" :visible.sync="editDialogVisible" width="30rem">
      <div style="width: 100%;position: relative;">
        <el-form ref="form" :model="form" label-width="130px">
          <el-form-item label="类型">
            <el-select v-model="form.ab_type" placeholder="请选择类型" @change="changeabtype">
              <el-option v-for="item in optionsab_type" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <div v-if="categoryseket==7">
            <!-- 你是我见过最蠢的产品设计 -->
            <el-form-item type="textarea" label="评论内容">
              <el-input type="textarea" autosize placeholder="请输入内容" v-model="form.ab_contact">
              </el-input>
            </el-form-item>
            <el-form-item label="每次条数">
              <el-input v-model="form.ab_contact1"></el-input>
            </el-form-item>
            <el-form-item label="间隔时间">
              <el-input v-model="form.ab_contact2"></el-input>
            </el-form-item>
            <!-- 你是我见过最蠢的产品设计 -->
          </div>
          <div v-else>
            <!-- 你是我见过最蠢的产品设计 -->
            <el-form-item v-if="categoryseket==1" label="昵称/ID">
              <el-input v-model="form.ab_contact"></el-input>
            </el-form-item>
            <el-form-item v-if="categoryseket==2" label="业务QQ">
              <el-input v-model="form.ab_contact"></el-input>
            </el-form-item>
            <el-form-item v-if="categoryseket==3" label="业务QQ">
              <el-input v-model="form.ab_contact"></el-input>
            </el-form-item>
            <el-form-item v-if="categoryseket==4" label="业务QQ">
              <el-input v-model="form.ab_contact"></el-input>
            </el-form-item>
            <el-form-item v-if="categoryseket==5" label="YY/昵称">
              <el-input v-model="form.ab_contact"></el-input>
            </el-form-item>
            <el-form-item v-if="categoryseket==6" label="CC/昵称">
              <el-input v-model="form.ab_contact"></el-input>
            </el-form-item>
            <!-- 你是我见过最蠢的产品设计 -->
          </div>
          <el-form-item label="量级">
            <el-input v-model="form.ab_magnitude"></el-input>
          </el-form-item>
          <el-form-item label="权重">
            <el-input v-model="form.ab_weights"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.ab_remark"></el-input>
          </el-form-item>
          <el-form-item label="启/停">
            <el-select v-model="form.ab_status" placeholder="请选择类型">
              <el-option v-for="item in optionsab_status" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cleardialog">取 消</el-button>
        <el-button type="primary" @click="submitpost" :loading="isEditUploading">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改业务" :visible.sync="editDialogVisible2" width="30rem">
      <div style="width: 100%;position: relative;">
        <el-form ref="form" :model="form" label-width="130px">
          <el-form-item label="类型">
            <el-select v-model="form.ab_type" disabled placeholder="请选择类型" @change="changeabtype">
              <el-option v-for="item in optionsab_type" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <div v-if="categoryseket==7">
            <!-- 你是我见过最蠢的产品设计 -->
            <el-form-item type="textarea" label="评论内容">
              <el-input type="textarea" autosize placeholder="请输入内容" v-model="form.ab_contact">
              </el-input>
            </el-form-item>
            <el-form-item label="每次条数">
              <el-input v-model="form.ab_contact"></el-input>
            </el-form-item>
            <el-form-item label="间隔内容">
              <el-input v-model="form.ab_contact"></el-input>
            </el-form-item>
            <!-- 你是我见过最蠢的产品设计 -->
          </div>
          <div v-else>
            <!-- 你是我见过最蠢的产品设计 -->
            <el-form-item v-if="categoryseket==1" label="昵称/ID">
              <el-input v-model="form.contact"></el-input>
            </el-form-item>
            <el-form-item v-if="categoryseket==2" label="业务QQ">
              <el-input v-model="form.contact"></el-input>
            </el-form-item>
            <el-form-item v-if="categoryseket==3" label="业务QQ">
              <el-input v-model="form.contact"></el-input>
            </el-form-item>
            <el-form-item v-if="categoryseket==4" label="业务QQ">
              <el-input v-model="form.contact"></el-input>
            </el-form-item>
            <el-form-item v-if="categoryseket==5" label="YY/昵称">
              <el-input v-model="form.contact"></el-input>
            </el-form-item>
            <el-form-item v-if="categoryseket==6" label="CC/昵称">
              <el-input v-model="form.contact"></el-input>
            </el-form-item>
            <!-- 你是我见过最蠢的产品设计 -->
          </div>

          <el-form-item label="量级">
            <el-input v-model="form.magnitude"></el-input>
          </el-form-item>
          <el-form-item label="权重">
            <el-input v-model="form.weights"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark"></el-input>
          </el-form-item>
          <el-form-item label="启/停">
            <el-select v-model="form.status" placeholder="请选择类型">
              <el-option v-for="item in optionsab_status" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cleardialog">取 消</el-button>
        <el-button type="primary" @click="submitposts" :loading="isEditUploading">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="渠道信息" :visible.sync="editDialogVisible3" width="30%">
      <el-table ref="multipleTable" class="tablist" max-height="700" @current-change="handleSelectionChange"
        :data="changlist" style="width: 100%">
        <el-table-column prop="totalbusin" label="已评论总数/重">
        </el-table-column>
        <el-table-column prop="todaybusin" label="今日已评论数/重"> </el-table-column>
        <el-table-column prop="yesbusin" label="昨日已评论数/重">
        </el-table-column>
        <el-table-column prop="yesbusin" label="来自渠道">
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="渠道信息" :visible.sync="editDialogVisible4" width="30%">
      <el-table ref="multipleTable" class="tablist" max-height="700" @current-change="handleSelectionChange"
        :data="tableData" style="width: 100%">
        <el-table-column prop="totalbusin" label="已关注总数/重">
        </el-table-column>
        <el-table-column prop="todaybusin" label="今日已关注数/重"> </el-table-column>
        <el-table-column prop="yesbusin" label="昨日已关注数/重">
        </el-table-column>
        <el-table-column prop="yesbusin" label="来自渠道">
        </el-table-column>
      </el-table>
    </el-dialog>
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
        editDialogVisible3: false,
        titles: "兴趣部落",
        isEditUploading: false,
        editDialogVisible: false,
        form: {
          category: 1,
          ab_type: 1
        },
        tableData: [],
        pageNum: 0,
        pageSize: 8,
        total: 2,
        payrow: "",
        currentPage: 1,
        options: {},
        multipleSelection: [],
        optionsab_type: [
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
        optionsname: [
          {
            value: 1,
            label: "部落id/昵称"
          },
          {
            value: 2,
            label: "认证Q"
          },
          {
            value: 3,
            label: "达人Q"
          },
          {
            value: 4,
            label: "校园Q"
          },
          {
            value: 5,
            label: "yy/昵称"
          },
          {
            value: 6,
            label: "CC/昵称"
          },
          {
            value: 7,
            label: "评论内容"
          }
        ],
        optionsab_status: [
          {
            value: 1,
            label: "启"
          },
          {
            value: 0,
            label: "停"
          }
        ],
        category: 1,
        rowinfo: "",
        editDialogVisible2: false,
        totile: {
          todaybusin: "",
          totalbusin: "",
          yesbusin: ""
        },
        namesa: "",
        tabtable: 1,
        categoryseket: "1",
        editDialogVisible4: false,
        changlist: []
      };
    },
    mounted() {
      this.getstudentlist();
    },
    methods: {
      handshowchangl() { },
      changeabtype(val) {
        console.log(val);
        this.categoryseket = val;
      },
      submitposts() {
        var id = this.form.id;

        this.axios
          .get("/public/index.php/updateBusin", {
            params: {
              ab_type: this.form.ab_type,
              ab_channels: this.form.ab_channels,
              ab_contact: this.form.contact,
              ab_magnitude: this.form.magnitude,
              ab_weights: this.form.weights,
              ab_remark: this.form.remark + " ",
              ab_status: this.form.status,
              ab_fullback: "测试",
              ab_id: id
            }
          })
          .then(res => {
            var code = res.data.code;
            if (code !== 200) {
              this.editDialogVisible2 = false;
              return false;
            }
            this.getstudentlist();
            this.editDialogVisible2 = false;
            this.editDialogVisible = false;
            this.form = {
              category: this.form.ab_type
            };
          })
          .catch(err => {
            console.error(err);
          });
      },
      submitpost() {
        this.axios
          .get("/public/index.php/addBusin", {
            params: {
              ab_type: this.form.ab_type,
              ab_channels: this.form.ab_channels,
              ab_contact: this.form.ab_contact,
              ab_magnitude: this.form.ab_magnitude,
              ab_weights: this.form.ab_weights,
              ab_remark: this.form.ab_remark,
              ab_status: this.form.ab_status,
              ab_fullback: this.form.ab_fullback
            }
          })
          .then(res => {
            var code = res.data.code;
            if (code !== 200) {
              this.editDialogVisible = false;
              return false;
            }
            this.editDialogVisible2 = false;
            this.editDialogVisible = false;
            this.getstudentlist();
            // this.form = {};
            console.log(res);
          })
          .catch(err => {
            console.error(err);
          });
      },
      handdelete(row) {
        var id = row.id;
        this.$confirm("此操作将永久删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.axios
              .get("/public/index.php/delBusin", {
                params: {
                  ids: id
                }
              })
              .then(res => {
                var code = res.data.code;
                if (code !== 200) {
                  this.$message.error(res.data.msg);
                  return false;
                }
                this.getstudentlist();
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              })
              .catch(err => {
                console.error(err);
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
        this.rowinfo = row;
        console.log(row);
        this.rowinfo.ab_type = this.optionsa(row.type);
        this.form = this.rowinfo;
        this.form.category = this.category;
        this.categoryseket = this.category;
        this.editDialogVisible2 = true;
      },
      optionsa(kew) {
        for (var a = 0; a < this.optionsab_type.length; a++) {
          console.log(this.optionsab_type[a].label);
          if (kew == this.optionsab_type[a].label) {
            return this.optionsab_type[a].value;
          }
        }
      },
      setCurrent() {
        this.form = {};
        this.form.category = this.category;
        this.form.ab_type = this.category;
        this.categoryseket = this.category;
        this.editDialogVisible = true;
      },
      cleardialog() {
        this.editDialogVisible2 = false;
        this.editDialogVisible = false;
        this.getstudentlist();
        // this.form = {};
      },
      setdelete() {
        var arrs = this.$refs.multipleTable.selection;
        var s = [];
        for (var a = 0; a < arrs.length; a++) {
          console.log(arrs[a]);
          s.push(arrs[a].id);
        }
        if (s.length == 0) {
          this.$message.error("请选中你要删除的项");
          return false;
        }
        s = s.join(",");

        this.axios
          .get("/public/index.php/delBusin", {
            params: {
              ids: s
            }
          })
          .then(res => {
            var code = res.data.code;
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
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleClickinfo(row) {
        var id = row.id;
        this.$router.push({ path: "channetableinfo", query: { id: id } });
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
        for (var a = 0; a < this.optionsab_type.length; a++) {
          if (category == this.optionsab_type[a].value) {
            return this.optionsab_type[a].label;
          }
        }
      },
      resetSearch() {
        this.pageNum = 0;
        this.pageSize = 10;
        this.category = "";
        this.getstudentlist();
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
      getlisttype(type) {
        // 1兴趣部落2空间认证3空间达人4校园达人5yy直播6cc直播7部落评论
        switch (type) {
          case 1:
            return "兴趣部落";
          case 2:
            return "空间认证";
          case 3:
            return "空间达人";
          case 4:
            return "校园达人";
          case 5:
            return "yy直播";
            break;
          case 6:
            return "cc直播";
            break;
          case 7:
            return "部落评论";
            break;

          default:
            break;
        }
      },
      getstudentlist() {
        var params = {
          page: this.currentPage,
          limit: this.pageSize,
          category: this.category
        };
        this.axios
          .get("/public/index.php/businList", { params: params })
          .then(res => {
            var code = res.data.code;
            if (code !== 200) {
              return false;
            }
            this.tableData = res.data.list;

            this.total = res.data.list.total;
            this.totile = res.data;
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