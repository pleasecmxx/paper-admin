<template>
  <div class="l-dialog-content">
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">店铺名称</p>
        <el-input
          class="l-dialog-input"
          v-model="shop_name"
          placeholder="请输入店铺名称"
        />
      </div>
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">负责人</p>
        <el-input
          class="l-dialog-input"
          v-model="boss_name"
          placeholder="请输入负责人姓名"
        />
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">联系电话</p>
        <el-input
          class="l-dialog-input"
          v-model="tel"
          placeholder="请输入负责人联系电话"
        />
      </div>
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">域名配置</p>
        <div class="l-dialog-half-row-right l-flex-row-start" v-if="!isEdit">
          <!-- <p>http://www.&nbsp;</p> -->
          <el-input
            :maxlength="20"
            class="l-dialog-url-input"
            v-model="domin"
            placeholder=""
          />
          <p style="width: 100px;">&nbsp;.lwcc.net</p>
        </div>
        <p v-else>http://{{ domin }}.lwcc.net（不可编辑）</p>
        <div class="valid-box" v-show="!checkDominValid(domin)">
          <p>格式有误（只允许英文、数字、中划线）</p>
        </div>
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">账号</p>
        <el-input
          class="l-dialog-input"
          v-model="account"
          placeholder="请输入店铺账号"
        />
        <div class="valid-box" v-show="!checkAccountValid(account)">
          <p>格式有误（只允许英文、数字）</p>
        </div>
      </div>
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">密码</p>
        <el-input
          class="l-dialog-input"
          v-model="password"
          type="passwrod"
          placeholder="请输入密码"
        />
      </div>
    </div>
    <div
      class="l-dialog-row l-flex-row-start height-auto"
      style="margin-top: 40px;"
    >
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">营业执照</p>
        <el-upload
          class="upload-demo"
          drag
          :action="uploaderFileUrl"
          :on-success="onUploaderSuccess1"
          :on-error="onError"
          :on-progress="onProgress"
          :on-change="onFilePickerChange"
          :show-file-list="false"
          :data="uploaderFileExtraParams"
        >
          <i
            style="font-size: 32px;"
            class="el-icon-upload"
            v-if="!imageUrl1.length"
          ></i>
          <div class="el-upload__text" v-if="!imageUrl1.length">
            将文件拖到此处，或<em>点击上传</em>
          </div>
          <img :src="imageUrl1" class="after-uploader-img" v-else />
        </el-upload>
      </div>
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">合作照片</p>
        <el-upload
          class="upload-demo"
          drag
          :action="uploaderFileUrl"
          :on-success="onUploaderSuccess2"
          :on-error="onError"
          :on-progress="onProgress"
          :on-change="onFilePickerChange"
          :show-file-list="false"
          :data="uploaderFileExtraParams"
        >
          <i
            style="font-size: 32px;"
            class="el-icon-upload"
            v-if="!imageUrl2.length"
          ></i>
          <div class="el-upload__text" v-if="!imageUrl2.length">
            将文件拖到此处，或<em>点击上传</em>
          </div>
          <img :src="imageUrl2" class="after-uploader-img" v-else />
        </el-upload>
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start" style="margin-top: 40px;">
      <p class="min-width-text5">门店地址</p>
      <!-- <el-input
          class="l-dialog-input"
          v-model="tag"
          type="passwrod"
          placeholder="请输入门店关键字，根据搜索建议结果，选择对应的地址即可"
        /> -->
      <el-autocomplete
        class="my-autocomplete"
        v-model="explanation_register"
        :fetch-suggestions="getSuggestions"
        placeholder="请输入门店关键字，根据搜索建议结果，选择对应的地址即可"
        @select="handleSelect"
        @input="onAddressValueChange"
        style="width: 100%;"
        clearable
      >
        <!-- <i class="el-icon-edit el-input__icon" slot="suffix" @click="handleIconClick"></i> -->
        <template slot-scope="{ item }">
          <div class="suggestion-box flex-col">
            <p class="suggestion-title">{{ item.title }}</p>
            <span class="small-address">{{ item.address }}</span>
          </div>
        </template>
      </el-autocomplete>
    </div>
    <div
      class="l-dialog-row l-flex-row-start height-auto"
      style="margin-top: 12px;"
    >
      <p class="min-width-text5">地图位置</p>
      <!-- <div class="map-box"> -->
      <baidu-map
        :center="center"
        :zoom="zoom"
        :scroll-wheel-zoom="true"
        ak="A4oMBLHn6P3dNgsxz9XxrPxdQAFr7url"
        class="map-box"
      >
        <bm-view class="map-box"></bm-view>
        <bm-local-search
          @searchcomplete="saveAddressList"
          class="aaa"
          :keyword="explanation_register"
          :auto-viewport="true"
          :location="location"
        ></bm-local-search>
      </baidu-map>
      <!-- </div> -->
    </div>
    <div class="l-dialog-option-footer">
      <el-button @click="cancelDialog">取 消</el-button>
      <el-button :loading="addLoading" @click="confirmOption" type="primary"
        >确认</el-button
      >
    </div>
  </div>
</template>

<script>
import { isEmpty, validDomin, validAccount } from "./../../../../util";
import {
  comon_image_uploader,
  addChannel,
  confirmPassOrNotTakeCashApi,
  agentCreateShopApi,
  agentEditShopApi,
} from "./../../../../api/admin-api";
import store from "@/store/index";
import api from "./../../../../api";
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import BmView from "vue-baidu-map/components/map/MapView";
import LocalSeach from "vue-baidu-map/components/search/LocalSearch";
import BMcontrol from "vue-baidu-map/components/controls/Control";
import AutoComplete from "vue-baidu-map/components/others/AutoComplete";

export default {
  name: "CheckDialog",
  props: ["closeDialog"],
  components: {
    BaiduMap,
    "bm-local-search": LocalSeach,
    "bm-view": BmView,
    "bm-control": BMcontrol,
    "bm-auto-complete": AutoComplete,
  },
  data() {
    return {
      center: { lng: 112.9388, lat: 28.2282 },
      zoom: 18,
      location: "长沙市",
      addressSuggestionList: [],
      longitude: "", //经度
      latitude: "", //纬度
      position_province: "",
      position_city: "",
      explanation_register: "", //详细地址

      shop_name: "",
      boss_name: "",
      tel: "",
      domin: "",
      account: "",
      password: "",
      imageUrl1: "",
      imageUrl2: "",
      uploaderFileUrl: process.env.VUE_APP_API_ROOT + comon_image_uploader,
      uploaderFileExtraParams: {
        token: store.state.user.token,
      },
      radio: "1",
      remark: "",
      addLoading: false,
      editData: null,
      delayCall: null,
      isEdit: false,
    };
  },

  watch: {
    addressSuggestionList: function (val) {
      console.log("结果", val);
    },
  },
  beforeDestroy() {
    this.delayCall && clearTimeout(this.delayCall);
  },
  methods: {
    onUploaderSuccess1(e) {
      if (e.code === 200) {
        this.imageUrl1 = e.data.list[0].url;
        // this.logo = e.data.list[0].url;
        this.$message.success("图片上传成功！");
      } else {
        this.$message.error(e.msg);
      }
    },

    onUploaderSuccess2(e) {
      if (e.code === 200) {
        this.imageUrl2 = e.data.list[0].url;
        // this.logo = e.data.list[0].url;
        this.$message.success("图片上传成功！");
      } else {
        this.$message.error(e.msg);
      }
    },

    checkAccountValid(val) {
      if (val.length === 0) {
        return true;
      }
      return validAccount(val);
    },

    checkDominValid(val) {
      //   console.log("检查", val);
      if (val.length === 0) {
        return true;
      }
      return validDomin(val);
    },

    onError(e) {
      console.log("文件上传失败");
      this.$message.error("文件上传失败");
    },

    getSuggestions(queryString, cb) {
      this.delayCall = setTimeout(() => {
        return cb(this.addressSuggestionList);
      }, 200);
    },

    onProgress(e) {},

    onFilePickerChange(e) {},

    setEditData(data) {
      console.log("data", data);
      this.editData = data;
      this.shop_name = data.shop_name;
      this.boss_name = data.manager_name;
      this.tel = data.phone_number;
      this.domin = data.secondary_domain;
      this.account = data.account_number;
      this.password = data.password;
      this.explanation_register = data.position_desc;
      this.position_province = data.position_province;
      this.position_city = data.position_city;
      this.latitude = data.latitude;
      this.longitude = data.longitude;
      this.center = {
        lng: data.longitude,
        lat: data.latitude,
      };
      this.imageUrl1 = data.business_license;
      this.imageUrl2 = data.cooperation_photo;
      this.isEdit = true;
    },
    cancelDialog() {
      this.closeDialog();
    },

    confirmOption() {
      if (isEmpty(this.shop_name)) {
        return this.$message.error("请输入店铺名称");
      }
      if (isEmpty(this.boss_name)) {
        return this.$message.error("请输入店铺负责人姓名");
      }
      if (isEmpty(this.domin)) {
        return this.$message.error("请输入店铺二级域名");
      }
      if (!this.checkDominValid(this.domin)) {
        return this.$message.error("店铺域名格式有误！");
      }
      if (isEmpty(this.tel)) {
        return this.$message.error("请输入店铺联系电话");
      }
      if (isEmpty(this.account)) {
        return this.$message.error("请输入店铺管理后台账号");
      }
      if (!this.checkAccountValid(this.account)) {
        return this.$message.error("店铺账号格式有误！");
      }
      if (isEmpty(this.password)) {
        return this.$message.error("请设置店铺管理后台默认密码");
      }
      if(this.account.length < 6){
        return this.$message.error("店铺账号长度不能小于6位字符！");
      }
      if (this.password.length < 6) {
        return this.$message.error("店铺管理后台默认密码不可低于6位数");
      }
      if (isEmpty(this.imageUrl1)) {
        return this.$message.error("请上传店铺营业执照");
      }
      if (isEmpty(this.imageUrl2)) {
        return this.$message.error("请上传合作照片");
      }
      if (
        isEmpty(this.longitude) ||
        isEmpty(this.longitude) ||
        isEmpty(this.explanation_register)
      ) {
        return this.$message.error("请选择店铺所在地址");
      };
      if(this.domin === 'lwcc'){
          return this.$message.error("很抱歉，lwcc是系统保留名称，不开放使用！")
      }
      this.addLoading = true;
      let params = {
        shop_name: this.shop_name,
        longitude: this.longitude,
        latitude: this.latitude,
        name: this.boss_name,
        account_number: this.account,
        password: this.password,
        phone_number: this.tel,
        position_province: this.position_province,
        position_city: this.position_city,
        position_desc: this.explanation_register,
        web_name: this.shop_name,
        secondary_domain: this.domin,
        business_license_photo: this.imageUrl1,
        cooperation_photo: this.imageUrl2,
      };
      let reqeust_api = agentCreateShopApi;
      if (this.isEdit) {
        reqeust_api = agentEditShopApi;
        params.id = this.editData.id;
      }
      console.log("params",params)
      api
        .post(reqeust_api, params)
        .then((res) => {
          console.log("创建结果");
          this.addLoading = false;
          if(res.code === 200){
              this.$emit('finish');
              this.closeDialog();
          }else {
              this.$message.error(res.msg)
          }
        })
        .catch((err) => {
          console.log("创建失败", err);
          this.addLoading = false;
          this.$message.error("操作失败，请稍后重试");
        });
    },

    saveAddressList(r) {
      console.log(r);
      console.log(r, 1);
      if (Object.prototype.toString.call(r) === "[object Object]") {
        // console.log(r["Br"]);
        this.addressSuggestionList = r["Hr"];
        this.$nextTick(() => {
          this.addressSuggestionList = r["Hr"];
        });
      } else {
        console.log("初始化");
      }
      // this.addressSuggestionList = e.ih.Br;
    },

    onAddressValueChange(e) {
      if (e === null || e === "") {
        this.addressSuggestionList = [];
      }
      console.log(e);
    },

    handleSelect(item) {
      console.log(item);
      this.explanation_register = item.address;
      this.longitude = item.point["lng"];
      this.latitude = item.point["lat"];
      this.position_province = item.province;
      this.position_city = item.city;
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
    position: relative;
    width: 50%;
    height: 60px;

    /* background-color: #999; */
    padding-right: 12px;
}
.valid-box {
    position: absolute;
    top: 40px;
    height: 24px;
    line-height: 24px;
    left: 80px;
    z-index: 999;
    color: #f00;
    font-size: 12px;
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
.l-dialog-half-row-right {
    width: 100%;
}
.l-dialog-half-row-right > p {
    word-break: break-all;
    word-wrap: nowrap;
}
.l-dialog-url-input {
    width: 100%;
}
.map-box {
    width: 100%;
    height: 130px;
    background-color: #5e6d82;
}
.aaa {
    display: none !important;
    height: 0 !important;
    overflow: hidden;
}
.suggestion-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0;
    margin-bottom: 6px;

    /* background-color: red */
}
.suggestion-title {
    font-size: 14px;
    margin: 0;
    padding: 0;
}
.small-address {
    font-size: 12px;
    padding: 0;
    margin: 0;
    line-height: 16px;
    color: #999;
}
</style>
