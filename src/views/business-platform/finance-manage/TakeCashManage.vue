<template>
  <div class="business-content-container">
    <div style="border-radius: 4px;" class="business-content-inner">
      <el-tabs style="margin-left: -1px;" type="card">
        <el-tab-pane>
          <div class="l-flex-row-center l-tab-item" slot="label">
            <p class="l-tab-item-title">待审核</p>
            <p class="l-tab-item-price">¥{{money1}}</p>
          </div>
          <take-cash-tab-item :type="1" @send_total_money="send_total_money"/>
        </el-tab-pane>
        <el-tab-pane>
          <div class="l-flex-row-center l-tab-item" slot="label">
            <p class="l-tab-item-title">审核通过</p>
            <p class="l-tab-item-price">¥{{money2}}</p>
          </div>
          <take-cash-tab-item :type="2"  @send_total_money="send_total_money"/>
        </el-tab-pane>
        <el-tab-pane>
          <div class="l-flex-row-center l-tab-item" slot="label">
           <p class="l-tab-item-title">审核拒绝</p>
          </div>
          <take-cash-tab-item :type="3"  @send_total_money="send_total_money"/>
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
    return {
      money1: "",
      money2: ""
    };
  },
  methods: {
    send_total_money(params){
      const {type, money} = params;
      if(type === 1){
        this.money1 = Number(money).toFixed(2)
      }else if(type == 2){
        this.money2 = Number(money).toFixed(2)
      }
    }
  },
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

