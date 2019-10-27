<template lang="">
    <div>
        <div>
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <ul class="listflow">
                            <li>
                                <p class="titile">
                                    下载总数：
                                </p>
                                <p class="nums">
                                    {{download_total}}
                                </p>
                                <p class="flowinfos">exe:{{exe_total_download}} 链接：{{link_total_download}}</p>
                            </li>

                        </ul>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <ul class="listflow">
                            <li>
                                <p class="titile">
                                    运行总数：
                                </p>
                                <p class="nums">
                                    {{run_number}}
                                </p>
                            </li>
                        </ul>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <ul class="listflow">
                            <li>
                                <p class="titile">
                                    运行成功比例：
                                </p>
                                <p class="nums">
                                    {{proport}}
                                </p>
                            </li>
                        </ul>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <ul class="listflow">
                            <li>
                                <p class="titile">
                                    总终端数：
                                </p>
                                <p class="nums">
                                    {{terminal_number}}
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
                        <el-col :span="5">
                            <el-form-item label="下载类型">
                                <el-select v-model="form.value" placeholder="请选择">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
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
                                <!-- <el-button @click="resetSearch">重置</el-button> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-col>
        </div>
        <el-table class="tablist" :data="tableData" max-height="700" style="width: 100%">
            <!-- <el-table-column  prop="id"  label="Id" > </el-table-column> -->
            <el-table-column prop="category" label="下载类型">
                <template slot-scope="scope">
                    {{scope.row.category==1?"exe":"下载链接"}}
                </template>
            </el-table-column>
            <el-table-column prop="total_download" label="下载总数">
            </el-table-column>
            <el-table-column prop="run_number" label="运行数">

            </el-table-column>
            <el-table-column prop="proport" label="运行成功比列"> </el-table-column>
            <el-table-column prop="terminal_number" label="终端数">
            </el-table-column>
            <el-table-column prop="channel" label="来自渠道">
            </el-table-column>
        </el-table>

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
        <div class="block">
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage"
                layout="prev, pager, next" :page-size="pageSize" :total="total">
            </el-pagination>
        </div>
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
                download_total:"0",
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
                exetotal: "0", //exe总下载
                linktotal: "0", //链接总下载
                exelinktotal: "0", //总下载数
                termexetotal: "0", //exe总终端
                termlinktotal: "", //链接总终端
                termtotal: "0", //总终端
                exe_total_download: "0", //exe日下载对比
                link_total_download: "0", //链接日下载对比
                link_and_exe: "0", //日下载数
                dialogTableVisible: false,
                terminal_number: "0",
                run_number: "0",
                proport: "0"
            };
        },
        mounted() {
            this.getstudentlist();
        },
        methods: {
            optionsrevalue(key) {
                console.log(key)
                this.options.forEach(element => {
                    if (key == element.value) {
                        console.log(element.label)
                        return element.label
                    }
                });
            },
            handleClickinfo(row) {
                this.dialogTableVisible = true;
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
                var timess = this.form.timess;
                console.log(timess)
                if (timess == undefined) {
                    return false;
                }
                var params = {
                    page: this.currentPage,
                    times: timess[0] + "~" + timess[1],
                    category: this.form.value
                };
                this.axios
                    .get("/public/index.php/searchDownload", { params: params })
                    .then(res => {
                        this.exe_total_download = res.data.exe_total_download;
                        this.link_total_download = res.data.link_total_download;
                        this.download_total = res.data.download_total;
                        this.proport = res.data.proport;
                        this.run_number = res.data.run_number;
                        this.terminal_number = res.data.terminal_number;
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