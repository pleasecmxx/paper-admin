<template>
  <div class="l-dialog-content">
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">代理名称</p>
        <el-input
          class="l-dialog-input"
          v-model="userName"
          placeholder="请输入代理名称"
        />
      </div>
      <div class="l-dialog-half-row l-flex-row-start">
        <p>身份证</p>
        <el-input
          class="l-dialog-input"
          v-model="userName"
          placeholder="请输入代理身份证"
        />
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">代理手机号</p>
        <el-input
          class="l-dialog-input"
          v-model="userName"
          placeholder="请输入代理手机号"
        />
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start height-auto">
      <p class="min-width-text5">描述</p>
      <el-input
        type="textarea"
        :rows="2"
        class="l-dialog-input"
        v-model="userName"
        placeholder="请输入代理描述/备注"
      />
    </div>
    <div class="l-dialog-row l-flex-row-start height-auto">
      <p class="min-width-text5">附件</p>
      <image-upload class="l-dialog-imgae-uploader" :url.sync="image" action="http://scrm.1daas.com/api/upload/upload" name="image" :width="250" :height="150" :data="{'token':'TKD628431923530324'}" @onSuccess="handleSuccess1" />
    </div>
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">账号</p>
        <el-input
          class="l-dialog-input"
          v-model="userName"
          placeholder="请输入代理账号"
        />
      </div>
      <div class="l-dialog-half-row l-flex-row-start">
        <p>密码</p>
        <el-input
          class="l-dialog-input"
          v-model="userName"
          placeholder="请设定代理初始密码"
        />
      </div>
    </div>
    <div class="l-dialog-option-footer">
      <el-button @click="cancelDialog">取 消</el-button>
      <el-button @click="confirmAdd" type="primary">确 认</el-button>
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
</style>
