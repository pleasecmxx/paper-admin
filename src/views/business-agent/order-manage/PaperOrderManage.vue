<template>
  <div class="business-content-container">
    <div style="border-radius: 4px;" class="business-content-inner">
      <el-tabs style="margin-left: -1px;" type="card">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-news"></i> 待结算</span>
          <paper-order-item :id="1"/>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="el-icon-alarm-clock"></i> 已结算</span>
          <paper-order-item :id="2"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import PaperOrderItem from "./components/PaperOrderItem";

export default {
  name: "PaperOrderManage",
  components: {
    "paper-order-item": PaperOrderItem,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

