<template>
  <div class="l-dialog-content l-page-content">
    <div style="padding-right: 30%;" class="l-dialog-option-footer">
      <p style="color: #f00; margin-right: 12px;">
        注意所有配置变更，请修改后点击保存按钮👉
      </p>
      <el-button style="width: 120px;" @click="confirmAdd" type="primary"
        >保存</el-button
      >
    </div>
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text10">A3黑白单面定价</p>
        <el-input
          class="l-dialog-input"
          style="width: 120px;"
          v-model="priceBlackSingleSideA3"
          placeholder="请输入代理名称"
        />
        <p>&nbsp;元</p>
      </div>
      <div class="l-dialog-half-row l-flex-row-start">
        <p>A3彩色单面定价</p>
        <el-input
          class="l-dialog-input"
          v-model="priceColorSingleSideA3"
          placeholder="请输入A3彩色单面定价"
        />
        <p>&nbsp;元</p>
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text10">A3黑白双面定价</p>
        <el-input
          class="l-dialog-input"
          style="width: 120px;"
          v-model="priceBlackDoubleSideA3"
          placeholder="请输入A3黑白双面定价"
        />
        <p>&nbsp;元</p>
      </div>
      <div class="l-dialog-half-row l-flex-row-start">
        <p>A3彩色双面定价</p>
        <el-input
          class="l-dialog-input"
          v-model="priceColorDoubleSideA3"
          placeholder="请输入A3彩色双面定价"
        />
        <p>&nbsp;元</p>
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text10">A4黑白单面定价</p>
        <el-input
          class="l-dialog-input"
          style="width: 120px;"
          v-model="priceBlackSingleSideA4"
          placeholder="请输入A4黑白单面定价"
        />
        <p>&nbsp;元</p>
      </div>
      <div class="l-dialog-half-row l-flex-row-start">
        <p>A4彩色单面定价</p>
        <el-input
          class="l-dialog-input"
          v-model="priceColorSingleSideA4"
          placeholder="请输入A4彩色单面定价"
        />
        <p>&nbsp;&nbsp; 元</p>
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text10">A4黑白双面定价</p>
        <el-input
          class="l-dialog-input"
          style="width: 120px;"
          v-model="priceBlackDoubleSideA4"
          placeholder="请输入A4黑白双面定价"
        />
        <p>&nbsp;元</p>
      </div>
      <div class="l-dialog-half-row l-flex-row-start">
        <p>A4彩色双面定价</p>
        <el-input
          class="l-dialog-input"
          v-model="priceColorDoubleSideA4"
          placeholder="请输入A4彩色双面定价"
        />
        <p>&nbsp;&nbsp; 元</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../../../api";
import {
  shopPricePriceCreateApi,
  shopPricePriceQueryApi,
  shopPrintPriceEditApi,
} from "../../../../api/admin-api";
import { isEmpty } from "../../../../util";
export default {
  name: "AddAgentDialog",
  props: {
    closeDialog: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      isEdit: true,
      priceBlackSingleSideA3: "", //A3黑白单面定价
      priceColorSingleSideA3: "", //A3彩色单面定价
      priceBlackDoubleSideA3: "", //A3黑白双面定价
      priceColorDoubleSideA3: "", //A3彩色双面定价
      priceBlackSingleSideA4: "", //A4黑白单面定价
      priceColorSingleSideA4: "", //A4彩色单面定价
      priceBlackDoubleSideA4: "", //A4黑白双面定价
      priceColorDoubleSideA4: "", //A4彩色双面定价
    };
  },
  mounted() {
    this.getInitPrintPriceData();
  },
  methods: {
    getInitPrintPriceData() {
      api
        .get(shopPricePriceQueryApi, {})
        .then((res) => {
          console.log("定价信息", res);
          if (res.code === 200) {
            if (!isEmpty(res.data)) {
              console.log("这是编辑");
              this.isEdit = true;
              const {
                  payment_a3,
                  payment_a4,
                  payment_double_a3,
                  payment_double_a4,
                  payment_color_a3,
                  payment_color_a4,
                  payment_double_color_a3,
                  payment_double_color_a4
              } = res.data;
              this.priceBlackSingleSideA3 = payment_a3; //黑白单面a3
              this.priceBlackSingleSideA4 = payment_a4; //黑白单面a4
              this.priceBlackDoubleSideA3 = payment_double_a3; //A3黑白双面定价
              this.priceBlackDoubleSideA4 = payment_double_a4; //A4黑白双面
              this.priceColorSingleSideA3 = payment_color_a3; //A3黑白单面
              this.priceColorSingleSideA4 = payment_color_a4; //A4黑白单面
              this.priceColorDoubleSideA3 = payment_double_color_a3; //A3彩色双面
              this.priceColorDoubleSideA4 = payment_double_color_a4; //A4彩色双面
            } else {
              this.isEdit = false;
            }
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          console.log("err", err);
          this.$message.error("加载店铺打印定价信息失败，请稍后重试");
        });
    },
    cancelDialog() {
      this.closeDialog();
    },
    confirmAdd() {
      if (isEmpty(this.priceBlackSingleSideA3)) {
        return this.$message.error("请输入A3黑白单面定价");
      }
      if (isEmpty(this.priceColorSingleSideA3)) {
        return this.$message.error("请输入A3彩色单面定价");
      }
      if (isEmpty(this.priceBlackDoubleSideA3)) {
        return this.$message.error("请输入A3黑白双面定价");
      }
      if (isEmpty(this.priceColorDoubleSideA3)) {
        return this.$message.error("请输入A3彩色双面定价");
      }
      if (isEmpty(this.priceBlackSingleSideA4)) {
        return this.$message.error("请输入A4黑白单面定价");
      }
      if (isEmpty(this.priceColorSingleSideA4)) {
        return this.$message.error("请输入A4彩色单面定价");
      }
      if (isEmpty(this.priceBlackDoubleSideA4)) {
        return this.$message.error("请输入A4黑白双面定价");
      }
      if (isEmpty(this.priceColorDoubleSideA4)) {
        return this.$message.error("请输入A4彩色双面定价");
      }
      let params = {
        payment_a3: this.priceBlackSingleSideA3, //黑白单面a3
        payment_a4: this.priceBlackSingleSideA4, //黑白单面a4
        payment_double_a3: this.priceBlackDoubleSideA3, //A3黑白双面定价
        payment_double_a4: this.priceBlackDoubleSideA4, //A4黑白双面
        payment_color_a3: this.priceColorSingleSideA3, //A3黑白单面
        payment_color_a4: this.priceColorSingleSideA4, //A4黑白单面
        payment_double_color_a3: this.priceColorDoubleSideA3, //A3彩色双面
        payment_double_color_a4: this.priceColorDoubleSideA4, //A4彩色双面
      };
      let priceApi = "";
      if (this.isEdit) {
        priceApi = shopPrintPriceEditApi;
      } else {
        priceApi = shopPricePriceCreateApi;
      }
      api
        .post(priceApi, params)
        .then((res) => {
          console.log(res);
          if (res.code === 200) {
            if (this.isEdit) {
              this.$message.success("保存定价成功");
            } else {
              this.$message.success("初始化定价成功");
            }
            this.isEdit = true;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
    width: 40%;
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
    min-width: 180px;
    max-height: 100px;
    overflow-x: auto;
    margin-right: 4px;
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
.l-page-content {
    padding: 12px 24px;
    height: calc(100% - 46px);
    font-size: 14px;
    box-sizing: border-box;
    overflow-y: auto;
}
</style>
