<template>
  <div class="business-content-container">
    <div style="border-radius: 4px;" class="business-content-inner">
      <el-tabs style="margin-left: -1px;" type="card">
        <el-tab-pane>
          <div class="l-tab-item" slot="label">
            <i class="el-icon-time"></i>
            <el-badge :value="200" :max="99" class="item"> 待付款 </el-badge>
          </div>
          <print-order-item :type="1" />
        </el-tab-pane>
        <el-tab-pane>
          <div class="l-tab-item" slot="label">
            <i class="el-icon-circle-check"></i>
            <el-badge :value="15" :max="99" class="item"> 已付款 </el-badge>
          </div>
          <print-order-item :type="2"/>
        </el-tab-pane>
        <el-tab-pane>
          <div class="l-tab-item" slot="label">
            <i class="el-icon-success"></i>
            <el-badge :value="15" :max="99" class="item"> 已完成 </el-badge>
          </div>
          <print-order-item :type="3"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import PrintOrderItem from "./components/PrintOrderItem";

export default {
  name: "PrintOrderManage",
  components: {
    "print-order-item": PrintOrderItem,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

