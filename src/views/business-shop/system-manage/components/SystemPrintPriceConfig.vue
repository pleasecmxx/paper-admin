<template>
  <div class="l-dialog-content l-page-content">
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text10">A3黑白单面定价</p>
        <el-input
          class="l-dialog-input"
          style="width: 120px;"
          v-model="userName"
          placeholder="请输入代理名称"
        />
        <p>&nbsp;元</p>
      </div>
      <div class="l-dialog-half-row l-flex-row-start">
        <p>A3彩色单面定价</p>
        <el-input
          class="l-dialog-input"
          v-model="userName"
          placeholder="请输入A3彩色单面定价"
        />
        <p>&nbsp;元</p>
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text10">A3黑白双面定价</p>
        <el-input
          class="l-dialog-input"
          style="width: 120px;"
          v-model="userName"
          placeholder="请输入A3黑白双面定价"
        />
        <p>&nbsp;元</p>
      </div>
      <div class="l-dialog-half-row l-flex-row-start">
        <p>A3彩色双面定价</p>
        <el-input
          class="l-dialog-input"
          v-model="userName"
          placeholder="请输入A3彩色双面定价"
        />
        <p>&nbsp;元</p>
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text10">A4黑白单面定价</p>
        <el-input
          class="l-dialog-input"
          style="width: 120px;"
          v-model="userName"
          placeholder="请输入A4黑白单面定价"
        />
        <p>&nbsp;元</p>
      </div>
      <div class="l-dialog-half-row l-flex-row-start">
        <p>A4彩色单面定价</p>
        <el-input
          class="l-dialog-input"
          v-model="userName"
          placeholder="请输入A4彩色单面定价"
        />
        <p>&nbsp;&nbsp; 元</p>
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text10">A4黑白双面定价</p>
        <el-input
          class="l-dialog-input"
          style="width: 120px;"
          v-model="userName"
          placeholder="请输入A4黑白双面定价"
        />
        <p>&nbsp;元</p>
      </div>
      <div class="l-dialog-half-row l-flex-row-start">
        <p>A4彩色双面定价</p>
        <el-input
          class="l-dialog-input"
          v-model="userName"
          placeholder="请输入A4彩色双面定价"
        />
        <p>&nbsp;&nbsp; 元</p>
      </div>
    </div>
    <div style="padding-right: 30%;" class="l-dialog-option-footer">
      <el-button style="width: 120px;" @click="confirmAdd" type="primary"
        >保存</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "AddAgentDialog",
  props: {
    closeDialog: {
      type: Function,
      default: null,
    },
  },
  methods: {
    cancelDialog() {
      this.closeDialog();
    },
    confirmAdd() {
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
    width: 40%;
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
    min-width: 180px;
    max-height: 100px;
    overflow-x: auto;
    margin-right: 4px;
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
.l-page-content {
    padding: 12px 24px;
    height: calc(100% - 46px);
    font-size: 14px;
    box-sizing: border-box;
    overflow-y: auto;
}
</style>
