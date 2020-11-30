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
            <span> 图标及店铺名称配置 </span>
          </div>
          <system-name-config :type="1" />
        </el-tab-pane>
        <el-tab-pane>
          <div class="l-tab-item" slot="label">
            <i class="el-icon-printer"></i>
            <span> 打印收费配置 </span>
          </div>
          <system-print-price-config :type="1" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import SystemBannerConfig from "./components/SystemBannerConfig";
import SystemNameConfig from "./components/SystemNameConfig";
import SystemPrintPriceConfig from "./components/SystemPrintPriceConfig";

export default {
  name: "NormalConfig",
  components: {
    "system-banner-config": SystemBannerConfig,
    "system-name-config": SystemNameConfig,
    "system-print-price-config": SystemPrintPriceConfig,
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
