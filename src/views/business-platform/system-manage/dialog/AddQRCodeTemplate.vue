<template>
  <div class="l-dialog-content">
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">模版标题</p>
        <el-input
          class="l-dialog-input"
          v-model="title"
          placeholder="请输入模版标题"
          clearable
        />
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start height-auto">
      <div class="l-dialog-half-row l-flex-row-start height-auto">
        <p class="min-width-text5">模版底版</p>
        <el-upload
          class="upload-qr-code"
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
            将图片拖到此处，或<em>点击上传</em><br />
            推荐尺寸宽高为：1080 x 1460
          </div>
          <el-image
            :src="imageUrl"
            fit="contain"
            class="after-uploader-img"
            v-else
          />
        </el-upload>
      </div>
      <div class="l-dialog-half-row l-flex-row-start height-auto">
        <p class="min-width-text5">示例</p>
        <el-image
          fit="contain"
          :preview-src-list="[demo]"
          :src="demo"
          class="upload-qr-code"
        />
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">二维码上边距</p>
        <el-input
          class="l-dialog-input"
          v-model="qr_code.top_intent"
          type="number"
          placeholder="请输入二维码上边距"
          clearable
        />
      </div>
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">二维码左边距</p>
        <el-input
          class="l-dialog-input"
          v-model="qr_code.left_intent"
          type="number"
          placeholder="请输入二维码左边距"
          clearable
        />
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">网址上边距</p>
        <el-input
          class="l-dialog-input"
          v-model="link_text.top_intent"
          type="number"
          placeholder="请输入网址上边距"
          clearable
        />
      </div>
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">字体大小</p>
        <el-input
          class="l-dialog-input"
          v-model="link_text.font_size"
          type="number"
          placeholder="请输入网址字体大小"
          clearable
        />
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">字体颜色</p>
        <el-color-picker v-model="link_text.color" show-alpha></el-color-picker>
      </div>
    </div>
    <div class="l-dialog-option-footer">
      <el-button @click="cancelDialog">取 消</el-button>
      <el-button @click="confirmAdd" type="primary" :loading="addLoading"
        >确 认</el-button
      >
    </div>
  </div>
</template>

<script>
import { isEmpty } from "../../../../util";
import {
  comon_image_uploader,
  addChannel,
  platform_banner_uploader,
  add_qr_code_template,
} from "./../../../../api/admin-api";
import store from "@/store/index";
import api from "../../../../api";

export default {
  name: "AddQRCodeTemplate",
  props: {
    closeDialog: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      demo: require("./../../../../assets/images/template-md.png"),
      imageUrl: "",
      uploaderFileUrl: process.env.VUE_APP_API_ROOT + comon_image_uploader,
      uploaderFileExtraParams: {
        token: store.state.user.token,
      },
      title: "",
      color: "",
      fontSize: "",
      qr_code: {
        top_intent: "", //666px
        left_intent: "", //73px
      },
      link_text: {
        color: "",  //f1dd4b
        font_size: "",    //24px
        top_intent: "",     //242px
      },
      top_intent: "",
      addLoading: false,
    };
  },
  watch: {
    value: function (value, oldValue) {
      console.log("value改变了", value, oldValue);
      this.disable = value ? 1 : 0;
    },
  },
  methods: {
    cancelDialog() {
      this.closeDialog();
    },
    onUploaderSuccess(e) {
      if (e.code === 200) {
        this.imageUrl = e.data.list[0].url;
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

    confirmAdd() {
      if (isEmpty(this.imageUrl)) {
        return this.$message.error("请上传模版底版");
      };
      if (isEmpty(this.title)) {
        return this.$message.error("请上传模版标题");
      };
      if (isEmpty(this.title)) {
        return this.$message.error("请上传模版标题");
      };
      if (isEmpty(this.qr_code.top_intent)) {
        return this.$message.error("请设定模版二维码上边距");
      };
      if (isEmpty(this.qr_code.left_intent)) {
        return this.$message.error("请设定模版二维码左边距");
      };
      if (isEmpty(this.link_text.top_intent)) {
        return this.$message.error("请设定模版网址上边距");
      };
      if (isEmpty(this.link_text.color)) {
        return this.$message.error("请设定模版网址字体大小");
      };
      if (isEmpty(this.link_text.color)) {
        return this.$message.error("请设定模版网址字体颜色");
      };
      this.addLoading = true;
      console.log(this.content);
      let params = {
        title: this.title,
        file: this.imageUrl,
        qr_code: JSON.stringify(this.qr_code),
        link_text: JSON.stringify(this.link_text)
      };
      console.log("参数", params);
      api
        .post(add_qr_code_template, params)
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.$emit("finish");
            this.addLoading = false;
            this.cancelDialog();
          }
        })
        .catch((err) => {
          this.addLoading = false;
          console.log(err);
        });
      //
    },
  },
};
</script>

<style scoped>
.edit-content {
    position: relative;
    width: 100%;
    height: 500px;
}
.l-dialog-content {
    position: relative;
    width: 100%;
    height: 100%;
}
.test {
    height: 400px !important;
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
    min-width: 88px;
    text-align: right;

    /* background-color: red; */
}
</style>
