<template lang="">
    <div>
       <div class="setGetAppPoolList">
            <el-row :gutter="0" class="formCont">
              <el-col :span="4" :push="0">
                <h3>充值管理：</h3>
              </el-col>
            </el-row>
          </div>
        <div class="setGetAppPoolList">
             
          </div>
    <el-table  :data="tableData"   border style="width: 100%">
    <el-table-column fixed  prop="date" label="姓名" > </el-table-column>
    <el-table-column  prop="name"  label="年龄" > </el-table-column>
    <el-table-column
      prop="province"
      label="班级"
     >
    </el-table-column>
    <el-table-column
      prop="city"
      label="创建时间"
     >
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
    >
    </el-table-column>
    <el-table-column
      prop="zip"
      label="电话"
    >
    </el-table-column>
 	</el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="300"
   >
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="primary" size="small">充值</el-button>
    
      </template>
 	</el-table-column>
      <el-dialog title="查看头像" :visible.sync="editDialogVisible" width="30rem">
        <div style="width: 100%;height: 20rem;position: relative;">	
			<el-upload
				class="avatar-uploader"
				action="https://jsonplaceholder.typicode.com/posts/"
				:show-file-list="false"
				:auto-upload="false"
				:on-success="handleAvatarSuccess"
				:on-change="beforeAvatarUpload">
				<img v-if="imageUrl" :src="imageUrl" class="avatar">
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeup">取 消</el-button>
          <el-button type="primary" @click="submitEditCover" :loading="isEditUploading">确定</el-button>
        </span>
      </el-dialog>
  </el-table>
  
  <el-dialog title="充值" :visible.sync="editDialogVisible" width="30rem">
        <div style="width: 100%;height: 20rem;position: relative;">	
			<el-tabs type="border-card">
                <el-tab-pane label="学时充值">
                    <el-form :inline="true" :model="form.formInline" class="demo-form-inline">
                        <el-form-item label="选择次数">
                            <el-input-number v-model="num" :min="1" :max="10" label="描述文字"></el-input-number>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="陪练课充值">
                     <el-form :inline="true" :model="form.text" class="demo-form-inline">
                        <el-form-item label="输入市场">
                        <el-input v-model="input" placeholder="输入市场"></el-input>
                    </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeup">取 消</el-button>
          <el-button type="primary" @click="submitEditCover" :loading="isEditUploading">确定</el-button>
        </span>
      </el-dialog>
	  
</div>
</template>

<script>
export default {
  data() {
    return {
      num: 1,
      imageUrl: "",
      input: "",
      editDialogVisible: false,
      form: {
        formInline: "",
        text: ""
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
          imageUrl:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568904171877&di=e7af573fd1a040b228cc53a8b6448dea&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201508%2F09%2F20150809005320_whiQ4.jpeg"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333,
          imageUrl:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568904171877&di=e7af573fd1a040b228cc53a8b6448dea&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201508%2F09%2F20150809005320_whiQ4.jpeg"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333,
          imageUrl:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568904171877&di=e7af573fd1a040b228cc53a8b6448dea&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201508%2F09%2F20150809005320_whiQ4.jpeg"
        }
      ],
      isEditUploading: false
    };
  },
  methods: {
    handleClick(row) {
      this.editDialogVisible = true;
    },
    resetSearch() {},
    submitEditCover() {
      this.isEditUploading = true;
    },
    closeup() {
      this.isEditUploading = false;
      this.editDialogVisible = false;
    },
    handleAvatarSuccess(res, file) {
      console.log(file);
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    onSubmit() {
      console.log(this.form.month);
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
.el-form--inline {
  text-align: center;
  padding: 19px;
}
</style>