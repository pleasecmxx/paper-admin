<template>
  <div class="business-content-container">
    <div style="border-radius: 4px;" class="business-content-inner">
      <div class="l-dialog-content l-page-content">
        <div class="l-dialog-row l-flex-row-start">
          <div class="l-dialog-half-row l-flex-row-start">
            <p class="min-width-text5">原密码</p>
            <el-input
              class="l-dialog-input"
              v-model="userName"
              placeholder="请输入店铺原密码"
            />
          </div>
        </div>
        <div class="l-dialog-row l-flex-row-start">
          <div class="l-dialog-half-row l-flex-row-start">
            <p class="min-width-text5">现密码</p>
            <el-input
              class="l-dialog-input"
              v-model="userName"
              placeholder="请输入现密码"
            />
          </div>
        </div>
        <div class="l-dialog-row l-flex-row-start">
          <div class="l-dialog-half-row l-flex-row-start">
            <p class="min-width-text5">确认现密码</p>
            <el-input
              class="l-dialog-input"
              v-model="userName"
              placeholder="请再输入一遍现密码"
            />
          </div>
        </div>
        <div style="padding-right: 40%;" class="l-dialog-option-footer">
          <el-button style="width: 120px;" @click="confirmAdd" type="primary"
            >保存</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditPassword",
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
