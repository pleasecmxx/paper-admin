<template>
  <div class="l-dialog-content">
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">系统名称</p>
        <el-input
          class="l-dialog-input"
          v-model="userName"
          placeholder="请输入系统名称"
        />
      </div>
      <div class="l-dialog-half-row l-flex-row-start">
        <p>标签</p>
        <el-input
          class="l-dialog-input"
          v-model="userName"
          placeholder="请输入标签"
        />
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">计费方式</p>
        <el-input
          class="l-dialog-input"
          v-model="userName"
          placeholder="请选择计费方式"
        />
      </div>
      <div class="l-dialog-half-row l-flex-row-start">
        <p>价格</p>
        <el-input
          class="l-dialog-input"
          v-model="userName"
          placeholder="请输入价格"
        />
        <p>/篇</p>
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start height-auto">
      <div class="l-dialog-half-row l-flex-row-start height-auto">
        <p class="min-width-text5">初始化销</p>
        <el-input
          class="l-dialog-input"
          v-model="userName"
          placeholder="请输入初始化销"
        />
      </div>
      <div class="l-dialog-half-row l-flex-row-start height-auto">
        <p>logo</p>
        <image-upload
          class="l-dialog-imgae-uploader"
          :url.sync="image"
          action="http://scrm.1daas.com/api/upload/upload"
          name="image"
          :width="190"
          :height="96"
          :data="{ token: 'TKD628431923530324' }"
          @onSuccess="handleSuccess1"
          notip
        />
      </div>
    </div>
    <div style="margin-bottom: 18px;" class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">代理佣金</p>
        <el-input
          class="l-dialog-input"
          v-model="userName"
          placeholder="请设定代理佣金"
        />
        <p>%</p>
         <p class="dec-text">支付额的百分比</p>
      </div>
      <div class="l-dialog-half-row l-flex-row-start">
        <p>店铺佣金</p>
        <el-input
          class="l-dialog-input"
          v-model="userName"
          placeholder="请设定店铺佣金"
        />
        <p>%</p>
        <p class="dec-text">支付额的百分比</p>
      </div>
    </div>
        <div class="l-dialog-row l-flex-row-start height-auto">
      <p class="min-width-text5">描述</p>
      <el-input
        type="textarea"
        :rows="4"
        class="l-dialog-input"
        v-model="userName"
        placeholder="请输入系统描述"
      />
    </div>
    <div class="l-dialog-option-footer">
      <el-button @click="cancelDialog">取 消</el-button>
      <el-button @click="confirmAdd" type="primary">确 认</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddJoinWayDialog",
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
</style>
