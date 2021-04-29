<template>
  <div class="l-dialog-content l-page-content">
    <div style="padding-right: 30%;" class="l-dialog-option-footer">
      <p style="color: #f00; margin-right: 12px;">注意所有配置变更，请修改后点击保存按钮👉</p>
      <el-button
        style="width: 120px;"
        @click="confimSaveShopConfig"
        type="primary"
        v-loading="loading"
        >保存</el-button
      >
    </div>
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">店铺名称</p>
        <el-input
          class="l-dialog-input"
          v-model="shopName"
          placeholder="请输入店铺名称"
        />
      </div>
    </div>
    <!-- <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">位置经纬度</p>
        <el-input
          class="l-dialog-input"
          v-model="location"
          placeholder="请选择店铺所在位置经纬度"
        />
      </div>
    </div> -->
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">网站名称</p>
        <el-input
          class="l-dialog-input"
          v-model="siteName"
          placeholder="请输入网站名称"
        />
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">联系电话</p>
        <el-input
          class="l-dialog-input"
          v-model="tel"
          placeholder="请输入联系电话"
        />
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">支付宝账号</p>
        <el-input
          class="l-dialog-input"
          v-model="alipayAccountName"
          placeholder="请输入收款支付宝账号"
        />
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">支付宝姓名</p>
        <el-input
          class="l-dialog-input"
          v-model="alipayRealName"
          placeholder="请输入收款支付宝姓名"
        />
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start height-auto">
      <p class="min-width-text5">logo上传</p>
      <el-upload
        class="system-config-img-uploader"
        drag
        :action="uploaderFileUrl"
        :on-success="onUploadeShopLogoSuccess"
        :show-file-list="false"
        :data="uploaderFileExtraParams"
      >
        <i style="font-size: 32px;" class="el-icon-upload" v-if="!shopLogo"></i>
        <div class="el-upload__text" v-if="!shopLogo">
          将店铺logo拖到此处，或<em>点击上传</em>
        </div>
        <el-image :src="shopLogo" class="system-config-img" v-else />
      </el-upload>
    </div>
    <div class="l-dialog-row l-flex-row-start height-auto">
      <p class="min-width-text5">打印收款码</p>
      <el-upload
        class="system-config-img-uploader"
        drag
        :action="uploaderFileUrl"
        :on-success="onUploadeWeixinPayQRcodeSuccess"
        :show-file-list="false"
        :data="uploaderFileExtraParams"
      >
        <i
          style="font-size: 32px;"
          class="el-icon-upload"
          v-if="!weixinPayQRcode"
        ></i>
        <div class="el-upload__text" v-if="!weixinPayQRcode">
          将微信收款码拖到此处，或<em>点击上传</em>
        </div>
        <el-image
          mode="fit"
          :src="weixinPayQRcode"
          class="system-config-img"
          v-else
        />
      </el-upload>
    </div>
    <div class="l-dialog-row l-flex-row-start height-auto">
      <p class="min-width-text5">服务号</p>
      <el-upload
        class="system-config-img-uploader"
        drag
        :action="uploaderFileUrl"
        :on-success="onUploadePropagandaCodeSuccess"
        :show-file-list="false"
        :data="uploaderFileExtraParams"
      >
        <i
          style="font-size: 32px;"
          class="el-icon-upload"
          v-if="!propaganda_code"
        ></i>
        <div class="el-upload__text" v-if="!propaganda_code">
          将微信服务号二维码拖到此处，或<em>点击上传</em>
        </div>
        <el-image
          mode="fit"
          :src="propaganda_code"
          class="system-config-img"
          v-else
        />
      </el-upload>
    </div>
  </div>
</template>

<script>
import store from "@/store/index";
import {
  comon_image_uploader,
  shopConfigApi,
  shopConfigQuery,
} from "./../../../../api/admin-api";
import api from "../../../../api";
import { isEmpty } from '../../../../util';

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
      uploaderFileUrl: process.env.VUE_APP_API_ROOT + comon_image_uploader,
      uploaderFileExtraParams: {
        token: store.state.user.token,
      },
      lng: 112.97935279,
      lat: 28.21347823,
      shopName: "",
      siteName: "",
      tel: "",
      alipayAccountName: "",
      alipayRealName: "",
      shopLogo: "", //店铺的logo img
      weixinPayQRcode: "", //微信收款二维码 img
      propaganda_code: "", //服务号二维码 img
      loading: false,
      pageLoading: false,
    };
  },
  mounted() {
    this.getConfig()
  },
  methods: {
      getConfig() {
        this.pageLoading = true;
        api.get(shopConfigQuery,{})
        .then(res => {
            console.log("店铺配置",res);
            this.shopName = res.data.shop_name;
            this.siteName = res.data.web_name;
            this.tel = res.data.phone_number;
            this.alipayAccountName = res.data.alipay_account_number;
            this.alipayRealName = res.data.alipay_name;
            this.shopLogo = res.data.shop_name;
            this.weixinPayQRcode = res.data.payment_qr_code;
            this.propaganda_code = res.data.shop_name;
            this.shopLogo = res.data.logo;
            this.propaganda_code = res.data.propaganda_code
        })
        .catch(err => {
            this.$message.error("同步店铺配置失败")
        })
      },
    onUploadeShopLogoSuccess(e) {
      console.log("店铺logo上传结果", e);
      if (!e) {
        return this.$message.error("上传失败，请您稍后重试");
      }
      if (e.code === 200) {
        this.shopLogo = e.data.list[0].url;
      } else {
        this.$message.error(e.msg);
      }
    },

    onUploadeWeixinPayQRcodeSuccess(e) {
      console.log("收款码", e);
      if (!e) {
        return this.$message.error("上传失败，请您稍后重试");
      }
      if (e.code === 200) {
        this.weixinPayQRcode = e.data.list[0].url;
      } else {
        this.$message.error(e.msg);
      }
    },

    onUploadePropagandaCodeSuccess(e) {
      if (!e) {
        return this.$message.error("上传失败，请您稍后重试");
      }
      if (e.code === 200) {
        this.propaganda_code = e.data.list[0].url;
      } else {
        this.$message.error(e.msg);
      }
    },

    confimSaveShopConfig() {
      if (isEmpty(this.shopName)) {
        return this.$message.error("请填写店铺名称");
      }
      if (isEmpty(this.siteName)) {
        return this.$message.error("请填写网站名称");
      }
      if (isEmpty(this.tel)) {
        return this.$message.error("请填写店铺联系电话");
      }
    //   if (isEmpty(this.alipayAccountName)) {
    //     return this.$message.error("请填写支付宝收款账号");
    //   }
    //   if (isEmpty(this.alipayRealName)) {
    //     return this.$message.error("请填写支付宝收款账号用户姓名");
    //   }
    //   if (isEmpty(this.shopLogo)) {
    //     return this.$message.error("请填写店铺logo");
    //   }
    //   if (isEmpty(this.weixinPayQRcode)) {
    //     return this.$message.error("请填写店铺收款二维码");
    //   }
    //   if (isEmpty(this.propaganda_code)) {
    //     return this.$message.error("请填写店铺微信服务号二维码");
    //   }
      this.loading = true;
      let params = {
        shop_name: this.shopName,
        longitude: this.lng,
        latitude: this.lat,
        phone_number: this.tel,
        web_name: this.siteName,
        payment_qr_code: this.weixinPayQRcode,
        alipay_name: this.alipayRealName,
        alipay_account_number: this.alipayAccountName,
        logo: this.shopLogo,
        propaganda_code: this.propaganda_code
      };
      api
        .post(shopConfigApi, params)
        .then((res) => {
          this.loading = false;
          console.log(res);
          if (res.code === 200) {
            this.$message.success("保存成功");
          } else {
            this.$message.error("保存失败");
          }
        })
        .catch((err) => {
          this.loading = false;
          this.$message.error("保存配置失败，请您稍后重试");
        });
    },

    cancelDialog() {
      this.closeDialog();
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
.l-page-content {
    padding: 12px 24px;
    height: calc(100% - 46px);
    font-size: 14px;
    box-sizing: border-box;
    overflow-y: auto;
}
.system-config-img-uploader {
    width: 160px;
    height: 160px;
}
.system-config-img {
    width: 160px;
    height: 160px;
}
</style>
