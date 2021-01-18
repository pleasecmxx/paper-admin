<template>
  <div class="l-dialog-content">
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">代理名称</p>
        <el-input
          class="l-dialog-input"
          v-model="agentName"
          placeholder="请输入代理名称"
        />
      </div>
      <div class="l-dialog-half-row l-flex-row-start">
        <p>身份证</p>
        <el-input
          class="l-dialog-input"
          v-model="agentIdCardNumber"
          placeholder="请输入代理身份证"
        />
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">代理手机号</p>
        <el-input
          class="l-dialog-input"
          v-model="agentPhoneNumber"
          placeholder="请输入代理手机号"
        />
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start height-auto">
      <p class="min-width-text5">描述</p>
      <el-input
        type="textarea"
        :rows="2"
        class="l-dialog-input"
        v-model="agentDec"
        placeholder="请输入代理描述/备注"
      />
    </div>
    <div class="l-dialog-row l-flex-row-start height-auto">
      <p class="min-width-text5">附件</p>
      <div class="dialog-uploader-container">
        <el-upload
          class="upload-demo"
          drag
          :action="uploaderFileUrl"
          :on-success="onUploaderSuccess"
          :on-error="onError"
          :on-progress="onProgress"
          :data="uploaderFileExtraParams"
          :on-change="onFilePickerChange"
          :disabled="agentAccount.length > 0 ? false : true"
          :style="{ opacity: agentAccount.length > 0 ? 1 : 0.42 }"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
          <div
            v-show="agentAccount.length > 0 ? false : true"
            class="disable-box"
          >
            请先设置代理账号
          </div>
        </el-upload>
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">账号</p>
        <el-input
          class="l-dialog-input"
          v-model="agentAccount"
          placeholder="请输入代理账号"
          :disabled="hasUploaderImage"
        />
      </div>
      <div class="l-dialog-half-row l-flex-row-start">
        <p>密码</p>
        <el-input
          class="l-dialog-input"
          v-model="agentPassword"
          placeholder="请设定代理初始密码"
        />
      </div>
    </div>
    <div class="l-dialog-option-footer">
      <el-button @click="cancelDialog">取 消</el-button>
      <el-button
        @click="confirmAdd"
        :loading="handleAddAgentLoading"
        type="primary"
        >确 认</el-button
      >
    </div>
  </div>
</template>

<script>
import { isEmpty } from "../../../../util";
import {
  common_uploader,
  platform_user_manage_create_agent,
} from "./../../../../api/admin-api";
import store from "@/store/index";
import api from "../../../../api";

export default {
  name: "AddAgentDialog",
  props: {
    closeDialog: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      uploaderFileUrl: process.env.VUE_APP_API_ROOT + common_uploader,
      image: "",
      agentName: "",
      agentIdCardNumber: "",
      agentPhoneNumber: "",
      agentDec: "",
      agentAccount: "",
      agentPassword: "",
      handleAddAgentLoading: false,
      hasUploaderImage: false,
      uploaderFileExtraParams: {
        account_number: this.agentAccount,
        type: "0",
        token: store.state.user.token,
      },
    };
  },
  watch: {
    agentAccount: function (val, oVal) {
      console.log(val, oVal);
      this.uploaderFileExtraParams.account_number = val;
    },
  },
  created() {
    console.log("uploaderFileUrl", this.uploaderFileUrl);
  },
  methods: {
    cancelDialog() {
      this.closeDialog();
    },
    confirmAdd() {
      if (isEmpty(this.agentName)) {
        return this.$message.error("请输入代理名称");
      }
      if (isEmpty(this.agentIdCardNumber)) {
        return this.$message.error("请输入代理身份证号码");
      }
      if (isEmpty(this.agentPhoneNumber)) {
        return this.$message.error("请输入代理手机号");
      }
      if (isEmpty(this.agentDec)) {
        return this.$message.error("请输入描述/备注");
      }
      if (isEmpty(this.agentAccount)) {
        return this.$message.error("请输入代理账号");
      }
      if (isEmpty(this.agentPassword)) {
        return this.$message.error("请输入代理账号密码");
      }
      if (this.agentAccount.length < 6) {
        return this.$message.error("代理账号长度不能少于4位");
      }
      if (this.agentPassword.length < 6) {
        return this.$message.error("代理账号密码长度不能少于6位");
      }
      let params = {
        account_number: this.agentAccount,
        password: this.agentPassword,
        id_card: this.agentIdCardNumber,
        phone_number: this.agentPhoneNumber,
        name: this.agentName,
        desc: this.agentDec,
      };
      this.handleAddAgentLoading = true;
      api
        .post(platform_user_manage_create_agent, params)
        .then((res) => {
          this.handleAddAgentLoading = false;
          console.log(res);
          if (res.code === 200) {
            this.$emit("finish");
            this.closeDialog();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.handleAddAgentLoading = false;
          console.log(err);
        });
    },

    onUploaderSuccess(e) {
      console.log(e);
      this.hasUploaderImage = true;
    },

    onError(e) {
      console.log("文件上传失败");
      this.$message.error("文件上传失败");
    },

    onProgress(e) {
      console.log("文件上传进度", e);
    },

    onFilePickerChange(e) {
      if (isEmpty(this.agentAccount)) {
        return this.$message.error("请先设置代理账号");
      }
    },
  },
};
</script>

<style scoped>
.l-dialog-content {
    width: 100%;
    height: 100%;
}
.l-dialog-row {
    width: 100%;
    height: 60px;
    margin-bottom: 10px;
}
.l-dialog-half-row {
    width: 50%;
    height: 60px;

    /* background-color: #999; */
    padding-right: 12px;
}
.l-dialog-row > p,
.l-dialog-half-row > p {
    color: #5e6d82;
    margin-right: 8px;
}
.l-dialog-input {
    width: auto;
    min-width: calc(100% - 100px);
    max-height: 100px;
    overflow-x: auto;
}
.l-dialog-option-footer {
    width: 100%;

    /* height: 72px; */
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: -moz-box;
    display: -moz-flex;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding-top: 12px;
}
.l-dialog-imgae-uploader {
    width: 80%;
    min-width: calc(100% - 100px);

    /* background-color: red; */
}
.min-width-text5 {
    min-width: 72px;

    /* background-color: red; */
}
</style>
