<template>
  <div style="padding: 12px 24px;" class="l-tab-item-container">
    <div class="l-dialog-half-row l-flex-row-start">
      <p class="min-width-text5">网站名称</p>
      <el-input
        class="l-dialog-input"
        style="width: 120px;"
        v-model="platformName"
        placeholder="请输入平台网站名称"
        clearable
      >
        <el-button
          @click="confirmToChangeName"
          slot="append"
          type="primary"
          style="width: 96px;"
          :loading="changeNameLoading"
          >确认</el-button
        >
      </el-input>
    </div>
    <div class="l-dialog-row l-flex-row-start height-auto">
      <p class="min-width-text5">logo上传</p>
      <!-- <el-upload
        class="upload-demo"
        drag
        :action="uploaderFileUrl"
        :on-success="onUploaderSuccess"
        :on-error="onError"
        :on-progress="onProgress"
        :data="uploaderFileExtraParams"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload> -->
      <el-upload
        drag
        class="platform-logo-uploader"
        :data="uploaderFileExtraParams"
        :action="uploaderFileUrl"
        :show-file-list="false"
        :width="160 + 'px'"
        :height="160 + 'px'"
        :on-success="handleAvatarSuccess"
      >
        <img v-if="imageUrl" :src="imageUrl" class="platform-logo" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
  </div>
</template>

<script>
import store from "@/store/index";
import api from "../../../../api";
import {
  common_uploader,
  platform_base_config,
} from "./../../../../api/admin-api";
import { deepCopy, isEmpty } from "../../../../util";

export default {
  name: "PlatformNameConfig",
  data() {
    return {
      uploaderFileUrl: process.env.VUE_APP_API_ROOT + common_uploader,
      platformName: store.state.user.systemTitle,
      imageUrl: store.state.user.systemLogo,
      uploaderFileExtraParams: {
        type: "1",
        token: store.state.user.token,
      },
      changeNameLoading: false,
      initalUserState: store.state.user
    };
  },
  created() {
    console.log(store.state.user);
  },
  methods: {
    handleAvatarSuccess(e) {
      console.log(e);
      console.log(e.data.list[0].url);
      if (e.code === 200) {
        this.imageUrl = e.data.list[0].url;
        this.$message.success("更新成功");
      } else {
        this.$message.error(e.msg);
      }
    },
    onError(e) {},

    onProgress(e) {
      console.log(e);
    },

    confirmToChangeName() {
      if (isEmpty(this.platformName)) {
        return this.$message.error("请先输入名称");
      }
      this.changeNameLoading = true;
      let params = {
        platform_name: this.platformName,
      };
      api
        .post(platform_base_config, params)
        .then((res) => {
          this.changeNameLoading = false;
          if (res.code === 200) {
            this.$message.success("更新成功");
            let data = deepCopy(this.initalUserState);
            data.systemTitle = this.platformName;
            this.$store.dispatch("user/handleSetUserData", data);
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.changeNameLoading = false;
          this.$$message.error(err);
        });
    },
  },
};
</script>

<style scoped>
.platform-logo-uploader {
    width: 160px !important;
    height: 160px !important;
}
.platform-logo {
    width: 100%;
    height: 100%;
}
</style>
