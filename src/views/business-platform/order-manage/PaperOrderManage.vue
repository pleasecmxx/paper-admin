<template>
  <div class="business-content-container">
    <div style="border-radius: 4px;" class="business-content-inner">
      <el-tabs style="margin-left: -1px;" type="card">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-news"></i> 新订单</span>
          <paper-order-item />
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="el-icon-alarm-clock"></i> 检测中</span>
          <paper-order-item />
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"
            ><i class="el-icon-circle-check"></i> 检测完成</span
          >
          <paper-order-item />
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"
            ><i class="el-icon-warning-outline"></i> 检测失败</span
          >
          <paper-order-item />
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

