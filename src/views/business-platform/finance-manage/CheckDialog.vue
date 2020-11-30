<template>
  <div class="l-dialog-content">
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">审核结果</p>
        <el-radio v-model="radio" label="1">同意，进行打款</el-radio>
        <el-radio v-model="radio" label="2">拒绝</el-radio>
      </div>
    </div>
    <div v-if="radio === '2'" class="l-dialog-row l-flex-row-start height-auto">
      <p class="min-width-text5">拒绝原因</p>
      <el-input
        type="textarea"
        :rows="4"
        style="width: 80%;"
        class="l-dialog-input"
        v-model="userName"
        placeholder="请输入拒绝原因"
      />
    </div>
    <div v-else class="l-dialog-row l-flex-row-start height-auto">
      <p class="min-width-text5">上传凭证</p>
      <image-upload class="l-dialog-imgae-uploader" :url.sync="image" action="http://scrm.1daas.com/api/upload/upload" name="image" :width="250" :height="150" :data="{'token':'TKD628431923530324'}" @onSuccess="handleSuccess1" />
    </div>
    <div class="l-dialog-option-footer">
      <el-button @click="cancelDialog">取 消</el-button>
      <el-button v-if="radio === '1'" @click="confirmOption" type="primary">确认通过</el-button>
      <el-button v-else @click="confirmOption" type="danger">确认拒绝</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckDialog",
  props: ["closeDialog"],
  data() {
      return {
          radio: '1',
      }
  },
  methods: {
    cancelDialog() {
      this.closeDialog();
    },
    confirmOption() {
      this.closeDialog();
    },
  },
};
</script>
