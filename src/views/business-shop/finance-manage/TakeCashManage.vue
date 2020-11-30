<template>
  <div class="business-content-container">
    <div style="border-radius: 4px;" class="business-content-inner">
      <el-tabs style="margin-left: -1px;" type="card">
        <el-tab-pane>
          <div slot="label">
            <i class="el-icon-files"></i>
            <span> 提现记录 </span>
          </div>
          <take-cash-tab-item :type="1" />
        </el-tab-pane>
        <el-tab-pane>
          <div slot="label">
            <i class="el-icon-files"></i>
            <span> 提现审核中 </span>
          </div>
          <take-cash-tab-item :type="2" />
        </el-tab-pane>
        <el-tab-pane>
          <div slot="label">
            <i class="el-icon-files"></i>
            <span> 提现拒绝 </span>
          </div>
          <take-cash-tab-item :type="3" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import TakeCashTabItem from "./components/TakeCashTabItem";

export default {
  name: "PrintOrderManage",
  components: {
    "take-cash-tab-item": TakeCashTabItem,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.l-tab-item {
    flex-direction: column;
    justify-content: center;
}
.l-tab-item > p {
    margin: 0;
    padding: 0;
}

</style>

