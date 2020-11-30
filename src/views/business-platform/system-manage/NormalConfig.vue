<template>
  <div class="business-content-container">
    <div style="border-radius: 4px;" class="business-content-inner">
      <el-tabs style="margin-left: -1px;" type="card">
        <el-tab-pane>
          <div class="l-tab-item" slot="label">
            <i class="el-icon-files"></i>
            <span> banner图配置 </span>
          </div>
          <system-banner-config :type="2" />
        </el-tab-pane>
        <el-tab-pane>
          <div class="l-tab-item" slot="label">
            <i class="el-icon-monitor"></i>
            <span> 平台名称配置 </span>
          </div>
          <platform-name-config :type="1" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import PlatformNameConfig from "./components/PlatformNameConfig";
import SystemBannerConfig from "./components/SystemBannerConfig";
export default {
  name: "NormalConfig",
  components: {
    "platform-name-config": PlatformNameConfig,
    "system-banner-config": SystemBannerConfig,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.business-content-container {
    width: 100%;
    min-height: 100%;
}
</style>
