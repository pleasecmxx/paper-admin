<template>
  <div class="l-dialog-content">
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">文章标题</p>
        <el-input
          class="l-dialog-input"
          v-model="title"
          placeholder="请输入文章标题"
          clearable
        />
      </div>
      <div class="l-dialog-half-row l-flex-row-start">
        <p>所属分类</p>
        <el-select v-model="solutionType" placeholder="请选择渠道类型">
          <el-option
            v-for="item in solutionTypes"
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
        <p class="min-width-text5">文章封面</p>
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
            将图片拖到此处，或<em>点击上传</em>
          </div>
          <img :src="imageUrl" class="after-uploader-img" v-else />
        </el-upload>
      </div>
    </div>
    <div class="edit-content">
      <editor
        :setting="{ min_height: 500, max_height: 500 }"
        v-model="content"
      />
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
import { comon_image_uploader, addSolution } from "./../../../../api/admin-api";
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
      uploaderFileExtraParams: {
        token: store.state.user.token,
      },
      uploaderFileUrl: process.env.VUE_APP_API_ROOT + comon_image_uploader,
      title: "",
      content: "",
      solutionType: "",
      solutionTypes: [
        {
          value: "1",
          label: "论文查重技巧",
        },
        {
          value: "2",
          label: "论文常见问题",
        },
        {
          value: "3",
          label: "论文行业资讯",
        },
        {
          value: "4",
          label: "论文知识普及",
        },
      ],
      addLoading: false,
    };
  },
  methods: {
    cancelDialog() {
      this.closeDialog();
    },
    confirmAdd() {
      if (isEmpty(this.title)) {
        return this.$message.error("请输入标题");
      }
      if (isEmpty(this.solutionType)) {
        return this.$message.error("请选择文章类型");
      }
      if (isEmpty(this.imageUrl)) {
        return this.$message.error("请选择文章封面");
      }
      if (isEmpty(this.content)) {
        return this.$message.error("请输入内容");
      }
      this.addLoading = true;
      console.log(this.content);
      let params = {
        title: this.title,
        desc: this.content,
        type: this.solutionType,
        cover_photo: this.imageUrl,
      };
      api
        .post(addSolution, params)
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
