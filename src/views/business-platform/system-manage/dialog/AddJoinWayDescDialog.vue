<template>
  <div class="l-dialog-content">
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">提交方式</p>
        <el-select
          v-model="uploaderMethod"
          placeholder="请选择论文提交方式"
          style="width: 100%;"
        >
          <el-option
            v-for="item in uploaderMethodsOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">重置文档</p>
        <el-button @click="resetDoc" type="default"
          >将所有文档恢复到默认模版</el-button
        >
      </div>
    </div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="产品详情" name="first">
        <div class="json-edit-area">
          <vue-json-editor
            v-model="json1"
            :show-btns="false"
            :mode="'tree'"
            :expandedOnStart="true"
            @json-change="onJsonChange1"
            :style="{ width: '100%', height: '100%' }"
          >
          </vue-json-editor>
        </div>
      </el-tab-pane>
      <el-tab-pane label="报告演示" name="second">
        <div class="json-edit-area">
          <vue-json-editor
            v-model="json2"
            :show-btns="false"
            :mode="'tree'"
            :expandedOnStart="true"
            @json-change="onJsonChange2"
            :style="{ width: '100%', height: '100%' }"
          >
          </vue-json-editor>
        </div>
      </el-tab-pane>
      <el-tab-pane label="常见问题" name="third">
        <div class="json-edit-area">
          <vue-json-editor
            v-model="json3"
            :show-btns="false"
            :mode="'tree'"
            :expandedOnStart="true"
            @json-change="onJsonChange3"
            :style="{ width: '100%', height: '100%' }"
          >
          </vue-json-editor>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="l-dialog-option-footer">
      <el-button @click="cancelDialog">上一步</el-button>
      <el-button @click="onConfirm" type="primary" :loading="addLoading"
        >确 认</el-button
      >
    </div>
  </div>
</template>

<script>
import VueJsonEditor from "vue-json-editor";
import {
  isJSON,
  convertJSONArr2ObjectArr,
  deepClone,
  deepCopy,
} from "./../../../../util";
import * as defaultData from "./default";

export default {
  name: "AddJoinWayDescDialog",
  props: ["closeDialog", "onAddFinish", "isEdit", "editData"],
  components: {
    "vue-json-editor": VueJsonEditor,
  },
  watch: {
    // json1: {
    //   immediate: true,
    //   handler: function (val) {
    //     console.log("改变啦", val);
    //   },
    //   deep: true,
    // },
    // isEdit: function (val) {
    //   if (val && this.editData) {
    //     alert(1);
    //     this.uploaderMethod = this.editData.uploader_method;
    //     this.json1 = this.editData.details;
    //     this.json2 = this.editData.demo_report;
    //     this.json3 =
    //       this.editData.question === "暂无内容,敬请期待"
    //         ? {}
    //         : this.editData.question;
    //   }
    // },
  },
  data() {
    return {
      activeName: "first",
      uploaderMethod: "text",
      defaultJSON: defaultData,
      uploaderMethodsOptions: [
        {
          value: "text",
          label: "复制粘贴",
        },
        {
          value: "file",
          label: "文件上传",
        },
      ],
      json1: [
        {
          node: "h1",
          content:
            "PaperPass检测系统具有最新9000万学术期刊和学位论文库，超10亿数量级互联网网页数据库。自主研发动态指纹越级扫描检测技术，拥有较好的论文抄袭检测技术。",
          contentTextColor: "#ff0000",
        },
        {
          node: "tag",
          tagName: "系统特点",
          tgaBackgroundColor: "#409EFF",
          content:
            "适合采购PaperPass系统的学校查重，也适合采购知网系统的学校的毕业生初稿查重，只支持检测中文 。",
          contentTextColor: "#333333",
        },
      ],
      json2: [
        {
          node: "h1",
          content:
            "PaperPass检测系统具有最新9000万学术期刊和学位论文库，超10亿数量级互联网网页数据库。自主研发动态指纹越级扫描检测技术，拥有较好的论文抄袭检测技术。",
          contentTextColor: "#ff0000",
        },
        {
          node: "tag",
          tagName: "系统特点",
          tgaBackgroundColor: "#409EFF",
          content:
            "适合采购PaperPass系统的学校查重，也适合采购知网系统的学校的毕业生初稿查重，只支持检测中文 。",
          contentTextColor: "#333333",
        },
      ],
      json3: [
        {
          node: "h1",
          content:
            "PaperPass检测系统具有最新9000万学术期刊和学位论文库，超10亿数量级互联网网页数据库。自主研发动态指纹越级扫描检测技术，拥有较好的论文抄袭检测技术。",
          contentTextColor: "#ff0000",
        },
        {
          node: "tag",
          tagName: "系统特点",
          tgaBackgroundColor: "#409EFF",
          content:
            "适合采购PaperPass系统的学校查重，也适合采购知网系统的学校的毕业生初稿查重，只支持检测中文 。",
          contentTextColor: "#333333",
        },
      ],
      addLoading: false,
    };
  },
  created() {
    if (this.editData) {
      console.log("二级接收到的回显数据", this.editData);
      console.log(convertJSONArr2ObjectArr(this.editData.details));
      this.uploaderMethod = this.editData.uploader_methods;
      this.json1 = convertJSONArr2ObjectArr(this.editData.details);
      this.json2 = convertJSONArr2ObjectArr(this.editData.demo_report);
      this.json3 = convertJSONArr2ObjectArr(this.editData.question);
    }
  },
  methods: {
    resetDoc() {
      this.$confirm("此操作将重置以下文档, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.json1 = this.defaultJSON.data;
          this.json2 = this.defaultJSON.data2;
          this.json3 = this.defaultJSON.data3;
          this.$message({
            type: "success",
            message: "重置成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    onConfirm() {
      let data = {
        details: this.json1,
        demo_report: this.json2,
        question: this.json3,
        uploader_method: this.uploaderMethod,
      };
      this.$emit("finish", data);
      this.addLoading = true;
      this.$nextTick(() => {
        this.cancelDialog();
      });
    },
    cancelDialog() {
      this.closeDialog();
    },
    onJsonChange1(e) {
      console.log(e);
      //   this.json1 = deepCopy(e);
    },
    onJsonChange2(e) {
      console.log(e);
      //   this.json2 = deepCopy(e);
    },
    onJsonChange3(e) {
      console.log(e);
      //   this.json3 = deepCopy(e);
    },
  },
};
</script>


<style scoped>
.json-edit-area {
    width: 100%;
    height: 500px;

    /* background-color: red; */
}
.test {
    display: blocks;
}
</style>
