<template>
  <div class="l-dialog-content">
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">审核结果</p>
        <el-radio v-model="radio" label="1">同意，进行打款</el-radio>
        <el-radio v-model="radio" label="0">拒绝</el-radio>
      </div>
    </div>
    <div v-if="radio === '0'" class="l-dialog-row l-flex-row-start height-auto">
      <p class="min-width-text5">拒绝原因</p>
      <el-input
        type="textarea"
        :rows="4"
        style="width: 80%;"
        class="l-dialog-input"
        v-model="remark"
        placeholder="请输入拒绝原因(200字内)"
        maxlength="200"
      />
    </div>
    <div v-else class="l-dialog-row l-flex-row-start height-auto">
      <p class="min-width-text5">上传凭证</p>
      <el-upload
        class="upload-demo"
        drag
        :action="uploaderFileUrl"
        :on-success="onUploaderSuccess"
        :on-error="onError"
        :on-progress="onProgress"
        :on-change="onFilePickerChange"
        :show-file-list="false"
        :data="uploaderFileExtraParams"
      >
        <i
          style="font-size: 32px;"
          class="el-icon-upload"
          v-if="!imageUrl.length"
        ></i>
        <div class="el-upload__text" v-if="!imageUrl.length">
          将文件拖到此处，或<em>点击上传</em>
        </div>
        <img :src="imageUrl" class="after-uploader-img" v-else />
      </el-upload>
    </div>
    <div class="l-dialog-option-footer">
      <el-button @click="cancelDialog">取 消</el-button>
      <el-button
        :loading="addLoading"
        v-if="radio === '1'"
        @click="confirmOption"
        type="primary"
        >确认通过</el-button
      >
      <el-button
        :loading="addLoading"
        v-else
        @click="confirmOption"
        type="danger"
        >确认拒绝</el-button
      >
    </div>
  </div>
</template>

<script>
import { isEmpty } from "./../../../util";
import {
  comon_image_uploader,
  addChannel,
  confirmPassOrNotTakeCashApi,
} from "./../../../api/admin-api";
import store from "@/store/index";
import api from "./../../../api";

export default {
  name: "CheckDialog",
  props: ["closeDialog"],
  data() {
    return {
      imageUrl: "",
      uploaderFileUrl: process.env.VUE_APP_API_ROOT + comon_image_uploader,
      uploaderFileExtraParams: {
        token: store.state.user.token,
      },
      radio: "1",
      remark: "",
      addLoading: false,
      editData: null,
    };
  },
  methods: {
    onUploaderSuccess(e) {
      if (e.code === 200) {
        this.imageUrl = e.data.list[0].url;
        // this.logo = e.data.list[0].url;
        this.$message.success("图片上传成功！");
      } else {
        this.$message.error(e.msg);
      }
    },

    onError(e) {
      console.log("文件上传失败");
      this.$message.error("文件上传失败");
    },

    onProgress(e) {},

    onFilePickerChange(e) {},

    setEditData(data) {
      console.log("data", data);
      this.editData = data;
    },
    cancelDialog() {
      this.closeDialog();
    },
    confirmOption() {
      let title;
      if (this.radio === "1") {
        title = "确认通过当前提现申请？";
        if (!this.imageUrl) {
          return this.$message.error("请上传打款凭证");
        }
      } else {
        title = "确认驳回当前提现申请？";
        if (!this.remark) {
          return this.$message.error("请输入驳回原因");
        }
      }
      this.$confirm(title, "确认提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((res) => {
          this.addLoading = true;
          let params = {
            withdraw_id: this.editData.id,
            withdraw_status: this.radio,
          };
          if (this.radio === "0") {
            params.withdraw_denial_reason = this.remark;
          } else {
            params.withdraw_voucher = this.imageUrl;
          }
          api
            .post(confirmPassOrNotTakeCashApi, params)
            .then((res) => {
              console.log("体现申请结果", res);
              this.addLoading = false;
              if (res.code === 200) {
                this.$emit("finish");
                this.closeDialog();
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch((err) => {
              this.addLoading = false;
              this.$message.error("操作失败，请稍后重试");
            });
        })
        .catch((err) => {
          console.log("出错了", err);
        });
    },
  },
};
</script>
