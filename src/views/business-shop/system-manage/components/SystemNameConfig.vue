<template>
  <div class="l-dialog-content l-page-content">
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">店铺名称</p>
        <el-input
          class="l-dialog-input"
          v-model="userName"
          placeholder="请输入店铺名称"
        />
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">位置经纬度</p>
        <el-input
          class="l-dialog-input"
          v-model="userName"
          placeholder="请选择店铺所在位置经纬度"
        />
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">网站名称</p>
        <el-input
          class="l-dialog-input"
          v-model="userName"
          placeholder="请输入网站名称"
        />
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">联系电话</p>
        <el-input
          class="l-dialog-input"
          v-model="userName"
          placeholder="请输入联系电话"
        />
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">支付宝账号</p>
        <el-input
          class="l-dialog-input"
          v-model="userName"
          placeholder="请输入收款支付宝姓名"
        />
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">支付宝姓名</p>
        <el-input
          class="l-dialog-input"
          v-model="userName"
          placeholder="请输入收款支付宝姓名"
        />
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start height-auto">
      <p class="min-width-text5">logo上传</p>
      <image-upload class="l-dialog-imgae-uploader" :url.sync="image" action="http://scrm.1daas.com/api/upload/upload" name="image" :width="250" :height="150" :data="{'token':'TKD628431923530324'}" @onSuccess="handleSuccess1" />
    </div>
    <div class="l-dialog-row l-flex-row-start height-auto">
      <p class="min-width-text5">打印收款码</p>
      <image-upload class="l-dialog-imgae-uploader" :url.sync="image" action="http://scrm.1daas.com/api/upload/upload" name="image" :width="250" :height="150" :data="{'token':'TKD628431923530324'}" @onSuccess="handleSuccess1" />
    </div>
    <div style="padding-right: 30%;" class="l-dialog-option-footer">
      <el-button style="width: 120px;" @click="confirmAdd" type="primary">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddAgentDialog",
  props: {
      closeDialog: {
          type: Function,
          default: null
      }
  },
  methods: {
      cancelDialog() {
          this.closeDialog();
      },
      confirmAdd() {
          this.closeDialog();
      }
  }
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
</style>
