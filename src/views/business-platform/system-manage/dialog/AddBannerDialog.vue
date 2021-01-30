<template>
  <div class="l-dialog-content">
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">轮播图排序</p>
        <el-input
          class="l-dialog-input"
          v-model="sort"
          placeholder="请输入排序（越大越靠前）"
          clearable
        />
      </div>
      <div class="l-dialog-half-row l-flex-row-start">
        <p>权限</p>
        <el-select v-model="status" placeholder="请选择展示权限">
          <el-option
            v-for="item in status_types"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start height-auto">
      <div class="l-dialog-half-row l-flex-row-start height-auto">
        <p class="min-width-text5">链接地址</p>
        <el-input
          class="l-dialog-input"
          v-model="linkUrl"
          placeholder="请输入跳转链接地址（默认不跳转）"
        />
      </div>
      <div class="l-dialog-half-row l-flex-row-start height-auto">
        <p>logo</p>
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
            将轮播图拖到此处，或<em>点击上传</em>
          </div>
          <img :src="imageUrl" class="after-uploader-img" v-else />
        </el-upload>
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">启用状态</p>
        <el-switch v-model="value" active-color="#13ce66" inactive-color="#999">
        </el-switch>
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
  platform_banner_edit,
} from "./../../../../api/admin-api";
import store from "@/store/index";
import api from "../../../../api";

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
      imageUrl: "",
      value: true,
      disable: 1,
      uploaderFileUrl: process.env.VUE_APP_API_ROOT + comon_image_uploader,
      uploaderFileExtraParams: {
        token: store.state.user.token,
      },
      title: "",
      content: "",
      linkUrl: "",
      sort: 1,
      status: "1",
      status_types: [
        {
          value: "1",
          label: "仅PC",
        },
        {
          value: "2",
          label: "仅H5",
        },
        {
          value: "3",
          label: "PC和H5",
        },
      ],
      isEdit: false,
      editData: null,
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
        this.isEdit = true;
        this.editData = data;
        this.linkUrl = data.link_url;
        this.sort = data.sort;
        this.imageUrl = data.url;
        this.title = data.title;
        console.log("编辑数据",data)
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
      let requestApi = platform_banner_uploader;
      if(this.isEdit){
          requestApi = platform_banner_edit;
          params.id = this.editData.id;
      }
      console.log("参数", params);
      api
        .post(requestApi, params)
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
</style>
