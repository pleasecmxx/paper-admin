<template>
  <div class="l-dialog-content" style="padding-bottom: 8px;" v-if="object">
    <div ref="qrCodeContainer" class="pre-view-qr-code">
      <img ref="testImage" :src="object.file" class="pre-view-qr-code-img" />
      <p class="web-size-text">www.lwcc.net</p>
      <div id="qrCode"></div>
    </div>
    <el-button @click="generatorImage">测试</el-button>
  </div>
</template>

<script>
import { isEmpty } from "../../../../util";
import {
  comon_image_uploader,
  addChannel,
  platform_banner_uploader,
} from "./../../../../api/admin-api";
import store from "@/store/index";
import api from "../../../../api";
import QRCode from "qrcodejs2";
import html2canvas from "html2canvas";

export default {
  name: "AddBannerDialog",
  props: {
    closeDialog: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      object: null,
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
    setEditData(data) {
      this.object = data;
      this.$nextTick(() => {
        this.qrcodeScan();
        this.getBase64Image(data.file);
      });
    },

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

    getBase64Image(url) {
      var that = this;
      var image = new Image();
      image.src = url; // 处理缓存
      image.crossOrigin = "Anonymous"; // 支持跨域图片
      image.onload = function () {
        var base64 = that.drawBase64Image(image);
        that.$refs["testImage"].src = base64;
      };
    },

    drawBase64Image(img) {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      var dataURL = canvas.toDataURL("image/png");
      return dataURL;
    },

    generatorImage() {
      html2canvas(this.$refs.qrCodeContainer).then((canvas) => {
        // this.$refs.addImage.append(canvas) // 这个我没有加，看其他的文章有，但是我加上会有其他的问题，就取消了
        let link = document.createElement("a"); // 创建a标签
        link.href = canvas.toDataURL(); // 是canvas对象的一种方法，用于将canvas对象转换为base64位编码
        link.setAttribute("download", "图片canvas.png"); // 利用了a标签的download 来下载 canvas图片
        link.style.display = "none"; //将图片隐藏起来
        document.body.appendChild(link); //插入到其中
        link.click();
      });
    },

    qrcodeScan() {
      let _this = this;
      // _this.qrCodeInstance = null;
      document.getElementById("qrCode").innerHTML = "";
      // console.log(_this.payurl)
      //生成二维码
      // let qrcode = new QRCode("qrcode", {
      //   width: 112, // 二维码宽度
      //   height: 112, // 二维码高度
      //   text:' _this.payurl',
      // });
      _this.code_img = new QRCode(document.getElementById("qrCode"), {
        width: 80,
        height: 80, // 高度
        text: "www.lwcc.net", // 二维码内容
        // render: 'canvas' ,   // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        background: "#f0f", // 背景色
        // foreground: '#ff0'    // 前景色
      });
    },

    onError(e) {
      console.log("文件上传失败");
      this.$message.error("文件上传失败");
    },

    onProgress(e) {},

    onFilePickerChange(e) {},

    confirmAdd() {
      if (isEmpty(this.sort)) {
        return this.$message.error("请输入排序");
      }
      this.addLoading = true;
      console.log(this.content);
      let params = {
        sort: this.sort, //9809
        status: this.status, //1\2\3
        url: this.imageUrl, //url
        link_url: this.linkUrl, //
        disable: this.disable, //禁用 1 启用
      };
      console.log("参数", params);
      api
        .post(platform_banner_uploader, params)
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
    min-width: 72px;

    /* background-color: red; */
}
.pre-view-qr-code {
    position: relative;
    width: 580px;
    height: 780px;
    margin: 0 auto;
}
.pre-view-qr-code-img {
    width: 100%;
    height: 100%;
}
.web-size-text {
    position: absolute;
    width: 100%;
    top: 158px;
    left: 0;
    font-size: 60px;
    color: #999;
    font-weight: bold;
    z-index: 999;
    text-align: center;
}
#qrCode {
    position: absolute;
    top: 658px;
    left: 72px;
    width: 80px;
    height: 80px;
    background-color: #fff;
    z-index: 999;
}
</style>
