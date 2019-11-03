<template lang="">
    <div>

        <div>
            <el-row :gutter="20">
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <ul class="listflow">
                            <li>
                                <p class="titile">
                                    总进程数/重
                                </p>
                                <p class="nums">
                                    {{channellist.terminal_process}}
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
                                    总终端数/重
                                </p>
                                <p class="nums">
                                    {{channellist.total_process}}
                                </p>

                            </li>
                        </ul>
                    </div>
                </el-col>
                <!-- <el-col :span="4">
          <div class="grid-content bg-purple">
            <ul class="listflow">
              <li>
                <p class="titile">
                  昨日认证数量
                </p>
                <p class="nums">
                  500
                </p>
              </li>
            </ul>
          </div>
        </el-col> -->
            </el-row>
        </div>
        <el-divider></el-divider>
        <div class="setGetAppPoolList">
            <el-col>
                <el-form ref="form" :model="form" class="filtrate" label-width="80px">
                    <el-row :gutter="10">

                        <el-col :span="6">
                            <el-form-item label="查询日期">
                                <el-date-picker v-model=" form.timess" type="daterange" range-separator="至"
                                    start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd">
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
        <el-table class="tablist" :data="tableData" max-height="700" style="width: 100%">
            <el-table-column prop="process" label="进程数"> </el-table-column>
            <el-table-column prop="terminal_number" label="终端数"> </el-table-column>
            <el-table-column prop="channel" label="渠道名"> </el-table-column>
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
                dialogTableVisible: false,
                gridData: [],
                channellist: {
                    todayprocess: "", //今天进程
                    yesprocess: "", //昨天进程
                    totalchannel: "", //总渠道
                    channel_active: "", //活跃渠道
                    todayterminal: "", //今日终端
                    yesterminal: "" //昨日终端
                },
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
                pageSize: 7,
                total: 7,
                payrow: "",
                currentPage: 1,
                options: [
                    {
                        value: "选项2",
                        label: "双皮奶"
                    },
                    {
                        value: "选项3",
                        label: "蚵仔煎"
                    }
                ]
            };
        },
        mounted() {
            this.getstudentlist();
        },
        methods: {
            handleClickinfo(row) {
                console.log(row);
                var id = row.number;
                var params = {
                    id: id
                };
                this.axios
                    .get("/public/index.php/outputSur", { params: params })
                    .then(res => {
                        console.log(res);
                        this.gridData.push(res.data.list);
                        console.log(this.gridData);
                        this.dialogTableVisible = true;
                    })
                    .catch(err => {
                        console.error(err);
                    });
            },
            onSubmit() {
                this.getstudentlist()
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
                var timess = this.form.timess;
                console.log(timess)
                if (timess == undefined) {
                    return false;
                }
                var params = {
                    page: this.currentPage,
                    limit: this.pageSize,

                    times: timess[0] + "~" + timess[1],
                };
                this.axios
                    .get("/public/index.php/searchChannel", { params: params })
                    .then(res => {
                        var data = res.data;
                        this.channellist = {
                            terminal_process: data.terminal_process, //今天进程
                            total_process: data.total_process, //昨天进程
                        };
                        this.tableData = res.data.list;
                        this.total = res.data.totalPage;
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