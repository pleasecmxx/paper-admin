<template>
  <div style="padding: 12px 24px;" class="l-tab-item-container">
    <div class="l-dialog-half-row l-flex-row-start">
      <p class="min-width-text5">网站名称</p>
      <el-input
        class="l-dialog-input"
        v-model="userName"
        placeholder="请输入平台网站名称"
      />
    </div>
    <div class="l-dialog-row l-flex-row-start height-auto">
      <p class="min-width-text5">logo上传</p>
      <image-upload
        class="l-dialog-imgae-uploader"
        :url.sync="image"
        action="http://scrm.1daas.com/api/upload/upload"
        name="image"
        :width="250"
        :height="150"
        :data="{ token: 'TKD628431923530324' }"
        @onSuccess="handleSuccess1"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "PlatformNameConfig",
  data() {
    return {
      userName: "",
      image: "",
    };
  },
  methods: {
    handleSuccess1() {},
  },
};
</script>
