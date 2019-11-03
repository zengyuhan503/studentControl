<template lang="">
    <div>
        <div>
            <el-row :gutter="20">
                <el-col :span="24">
                    <div class="grid-content bg-purple">
                        <ul class="listflow">
                            <li>
                                <p class="titile">
                                    兴趣部落新/重
                                </p>
                                <p class="nums">
                                    {{daylist.tribe_total}}
                                </p>
                            </li>
                            <li>
                                <p class="titile">
                                    空间认证新/重
                                </p>
                                <p class="nums">
                                    {{daylist.auth_total}}
                                </p>
                            </li>
                            <li>
                                <p class="titile">
                                    空间达人新/重
                                </p>
                                <p class="nums">
                                    {{daylist.daren_total}}
                                </p>
                            </li>
                            <li>
                                <p class="titile">
                                    校园达人/重
                                </p>
                                <p class="nums">
                                    {{daylist.school_total}}
                                </p>
                            </li>
                            <li>
                                <p class="titile">
                                    YY直播新/重
                                </p>
                                <p class="nums">
                                    {{daylist.yy_total}}
                                </p>
                            </li>
                            <li>
                                <p class="titile">
                                    CC直播新/重
                                </p>
                                <p class="nums">
                                    {{daylist.cc_total}}
                                </p>
                            </li>
                            <li>
                                <p class="titile">
                                    部落评论新/重
                                </p>
                                <p class="nums">
                                    {{daylist.tribe_total}}
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
                        <el-col :span="6">
                            <el-form-item label="查询日期">
                                <el-date-picker v-model="timess" type="daterange" range-separator="至"
                                    start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">搜索</el-button>
                                <!-- <el-button @click="resetSearch">重置</el-button> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-col>
        </div>
        <el-table class="tablist" :data="tableData" max-height="700" style="width: 100%">
            <el-table-column prop="tribe" label="兴趣部落新/重"> </el-table-column>
            <el-table-column prop="auth" label="空间认证新/重"> </el-table-column>
            <el-table-column prop="daren" label="空间达人新/重">
            </el-table-column>
            <el-table-column prop="school" label="校园达人/重">
            </el-table-column>
            <el-table-column prop="yy" label="YY直播新/重">
            </el-table-column>
            <el-table-column prop="cc" label="CC直播新/重">
            </el-table-column>
            <el-table-column prop="comment" label="部落评论新/重">
            </el-table-column>
        </el-table>

        <div class="block">
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage"
                layout="prev, pager, next" :page-size="pageSize" :hide-on-single-page="true" :page-count="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                gridData: [],
                tablist: [],
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
                timess: "",//时间段
                form: {
                    category: 1
                },
                defauleTimes: "",
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
            this.defauleTimes = Date.now();
            this.timess = this.getNowTime();
            console.log(this.timess);
        },
        methods: {
            handleClickinfo(row) {
                this.dialogTableVisible = true;
            },
            onSubmit() {
                this.category = this.form.category;
                this.getstudentlist();
            },
            resetSearch() {
                this.form.category = 1;
                this.category = this.form.category;
                this.getstudentlist();
                this.timess = "";
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
                console.log(this.timess);
                if (this.timess == "") {
                    return false;
                }
                var params = {
                    page: this.currentPage,
                    limit: this.pageSize,
                    times: this.timess[0] + "~" + this.timess[1]
                };
                this.axios
                    .get("/public/index.php/searchFlow", { params: params })
                    .then(res => {
                        console.log(res);
                        this.daylist = res.data;
                        this.tableData.push(res.data.list)
                        console.log(this.tableData)
                        // this.tableData = res.data.list;
                        // console.log(this.tableData);
                        this.total = res.data.totalPage;
                        // this.daylist = res.data;
                        // this.totallist = res.data;
                    })
                    .catch(err => {
                        console.error(err);
                    });
            },
            getNowTime() {
                var now = new Date();
                var year = now.getFullYear(); //得到年份
                var month = now.getMonth(); //得到月份
                var date = now.getDate(); //得到日期
                var hour = " 00:00:00"; //默认时分秒 如果传给后台的格式为年月日时分秒，就需要加这个，如若不需要，此行可忽略
                month = month + 1;
                month = month.toString().padStart(2, "0");
                date = date.toString().padStart(2, "0");
                var defaultDate = `${year}-${month}-${date}`;
                console.log(defaultDate)
                return defaultDate;
                this.$set(this.info, "stockDate", defaultDate);
            },
        }
    };
</script>
<style scoped>
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
        width: 10%;
        margin: 0 9px;
        text-align: center;
    }
</style>