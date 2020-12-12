<template>
  <div class="l-dialog-content">
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">系统名称</p>
        <el-input
          class="l-dialog-input"
          v-model="name"
          placeholder="请输入系统名称"
        />
      </div>
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text4">标签</p>
        <el-input
          class="l-dialog-input"
          v-model="tag"
          placeholder="请输入标签"
        />
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">计费方式</p>
        <el-select v-model="billing_method" placeholder="请选择计费方式">
          <el-option
            v-for="item in billing_method_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text4">价格</p>
        <el-input
          class="l-dialog-input"
          v-model="price"
          placeholder="请输入价格"
          type="number"
        />
        <p v-if="billing_method === 'char'">/千字</p>
        <p v-else-if="billing_method === 'page'">/页</p>
        <p v-else-if="billing_method === 'article'">/篇</p>
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start height-auto">
      <div class="l-dialog-half-row l-flex-row-start height-auto">
        <p class="min-width-text5">初始化销</p>
        <el-input
          class="l-dialog-input"
          v-model="init_sales"
          placeholder="请输入初始化销"
        />
      </div>
      <div class="l-dialog-half-row l-flex-row-start height-auto">
        <p class="min-width-text4">logo</p>
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
    </div>
    <div style="margin-bottom: 18px;" class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">代理佣金</p>
        <el-input
          class="l-dialog-input"
          v-model="agency_commission"
          placeholder="请设定代理佣金"
        />
        <p>%</p>
        <p class="dec-text">支付额的百分比</p>
      </div>
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text4">店铺佣金</p>
        <el-input
          class="l-dialog-input"
          v-model="shop_commission"
          placeholder="请设定店铺佣金"
        />
        <p>%</p>
        <p class="dec-text">支付额的百分比</p>
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start height-auto">
      <p class="min-width-text5">简介</p>
      <el-input
        type="textarea"
        :rows="4"
        class="l-dialog-input"
        v-model="desc"
        placeholder="请输入系统简介(不超过72字)"
        maxlength="72"
      />
    </div>
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">渠道类型</p>
        <el-select
          v-model="franchise_channel_class"
          placeholder="请选择渠道类型"
        >
          <el-option
            v-for="item in channelType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="l-dialog-half-row l-flex-row-start" v-if="billing_method !== 'char'">
        <p class="min-width-text4">文件类型</p>
        <el-select
          v-model="activeFileTypes"
          placeholder="请选择接收的文件（多选）"
          multiple
        >
          <el-option
            v-for="item in fileTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
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
import { comon_image_uploader, addChannel } from "./../../../../api/admin-api";
import store from "@/store/index";
import api from "../../../../api";

export default {
  name: "AddJoinWayDialog",
  props: {
    closeDialog: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      imageUrl: "",
      uploaderFileUrl: process.env.VUE_APP_API_ROOT + comon_image_uploader,
      uploaderFileExtraParams: {
        token: store.state.user.token,
      },
      name: "", //加盟系统名称
      franchise_channel_class: "", //加盟分类
      billing_method: "char", //计费方式
      tag: "", //tag
      logo: "",
      price: "",
      init_sales: "",
      desc: "",
      agency_commission: "",
      shop_commission: "",
      addLoading: false,
      activeFileTypes: ['.doc','.word','.docx'],
      billing_method_options: [
        {
          value: "char",
          label: "按千字",
        },
        {
          value: "article",
          label: "按篇",
        },
        {
          value: "page",
          label: "按页",
        },
      ],
      channelType: [
        {
          value: "1",
          label: "权威系统",
        },
        {
          value: "2",
          label: "官方系统",
        },
      ],
      fileTypes: [
        {
          value: ".doc",
          label: ".doc",
        },
        {
          value: ".word",
          label: ".word",
        },
        {
          value: ".docx",
          label: ".docx",
        },
      ],
    };
  },
  watch: {
      activeFileTypes: function (value, oValue){
          console.log(value)
      }
  },
  methods: {
    onUploaderSuccess(e) {
      if (e.code === 200) {
        this.imageUrl = e.data.list[0].url;
        this.logo = e.data.list[0].url;
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

    cancelDialog() {
      this.closeDialog();
    },

    confirmAdd() {
      let _this = this;
      if (isEmpty(this.name)) {
        return this.$message.error("请输入系统名称");
      }
      if (isEmpty(this.tag)) {
        return this.$message.error("请输入系统标签");
      }
      if (isEmpty(this.name)) {
        return this.$message.error("请设置价格");
      }
      if (isEmpty(this.name)) {
        return this.$message.error("请设置代理佣金占比");
      }
      if (isEmpty(this.name)) {
        return this.$message.error("请设置店铺佣金占比");
      }
      if (isEmpty(this.name)) {
        return this.$message.error("请输入系统描述文字");
      }
      if (isEmpty(this.logo)) {
        return this.$message.error("请先上传图片");
      }
      if (isEmpty(this.franchise_channel_class)) {
        return this.$message.error("请选择渠道分类");
      }
      this.addLoading = true;
      let data = {
        name: this.name,
        franchise_channel_class: this.franchise_channel_class,
        billing_method: this.billing_method,
        tag: this.tag,
        logo: this.logo,
        price: this.price,
        init_sales: this.init_sales,
        desc: this.desc,
        agency_commission: this.agency_commission,
        shop_commission: this.shop_commission,
      };
      api
        .post(addChannel, data)
        .then((res) => {
          console.log(res);
          if (res.code === 200) {
            _this.closeDialog();
            _this.addLoading = false;
            _this.$message.success("创建成功！");
            _this.$emit("finish");
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.addLoading = false;
          console.log(err);
          this.$message.error(err);
        });
      //   this.closeDialog();
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
