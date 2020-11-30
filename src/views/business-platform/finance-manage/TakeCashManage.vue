<template>
  <div class="business-content-container">
    <div style="border-radius: 4px;" class="business-content-inner">
      <el-tabs style="margin-left: -1px;" type="card">
        <el-tab-pane>
          <div class="l-flex-row-center l-tab-item" slot="label">
            <p class="l-tab-item-title">待审核</p>
            <p class="l-tab-item-price">¥122222.02</p>
          </div>
          <take-cash-tab-item :type="1" />
        </el-tab-pane>
        <el-tab-pane>
          <div class="l-flex-row-center l-tab-item" slot="label">
            <p class="l-tab-item-title">审核通过</p>
            <p class="l-tab-item-price">¥122222.02</p>
          </div>
          <take-cash-tab-item :type="2" />
        </el-tab-pane>
        <el-tab-pane>
          <div class="l-flex-row-center l-tab-item" slot="label">
           <p class="l-tab-item-title">审核拒绝</p>
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

