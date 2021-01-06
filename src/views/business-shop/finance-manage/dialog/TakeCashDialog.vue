<template>
  <div class="l-dialog-content">
    <div v-show="dataLoading" class="l-dialog-loading l-flex">
      <i class="el-icon-loading" style="font-size: 24px;" />
    </div>
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">可提现金额</p>
        <p style="font-size: 24px;">¥{{ cashNumber }}</p>
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p>提现支付宝</p>
        <el-input
          class="l-dialog-input"
          v-model="takeCashAlipayAccount"
          placeholder="请输入提现支付宝"
        />
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">提现姓名</p>
        <el-input
          class="l-dialog-input"
          v-model="takeCashAlipayName"
          placeholder="请输入提现姓名"
        />
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start height-auto">
      <p class="min-width-text5">提现说明</p>
      <el-input
        type="textarea"
        :rows="2"
        class="l-dialog-input"
        v-model="takeCashRemark"
        placeholder="请输入提现说明"
      />
    </div>
    <div class="l-dialog-option-footer">
      <el-button @click="cancelDialog">取 消</el-button>
      <el-button @click="confirmAdd" :loading="addLoading" type="primary"
        >确 认</el-button
      >
    </div>
  </div>
</template>

<script>
import api from "../../../../api";
import {
  askTackCashApi,
  canTakeCashMoneyQuery,
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
      dataLoading: true,
      addLoading: false,
      cashNumber: 0.0,
      takeCashAlipayAccount: "",
      takeCashAlipayName: "",
      takeCashRemark: "",
    };
  },
  created() {},
  methods: {
    getData() {
      this.dataLoading = true;
      api
        .get(canTakeCashMoneyQuery, {})
        .then((res) => {
          this.dataLoading = false;
          console.log("可提现金额", res);
          if (res.code === 200) {
            // this.cashOrignNumber =
            this.cashNumber = Number(res.data.cumulative_commission).toFixed(2);
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.dataLoading = false;
          console.log("出错了", err);
          this.$message.error("操作失败，请稍后重试");
        });
    },
    cancelDialog() {
      this.closeDialog();
    },
    confirmAdd() {
      if (Number(this.cashNumber) > 0) {
        if (isEmpty(this.takeCashAlipayAccount)) {
          return this.$message.error("请输入支付宝账号");
        }
        if (isEmpty(this.takeCashAlipayName)) {
          return this.$message.error("请输入到账人姓名");
        }
        let params = {
          withdraw_number: parseFloat(Math.floor(this.cashOrignNumber)),
          withdraw_man_name: this.takeCashAlipayName,
          withdraw_phone_number: this.takeCashAlipayAccount,
          withdraw_desc: this.takeCashRemark,
        };
        api
          .post(askTackCashApi, params)
          .then((res) => {
            console.log(res);
            if (res.code === 200) {
              this.$message.success("操作成功");
              this.$emit("finish");
              this.closeDialog();
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((err) => {
            this.$message.error("操作失败，请稍后重试");
          });
        this.closeDialog();
      } else {
        this.$message.error("很抱歉，您暂无可提现金额");
      }
    },
  },
};
</script>

<style scoped>
.l-dialog-content {
    position: relative;
    width: 100%;
    height: 100%;
}
.l-dialog-loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99999999999999;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.72);
}
.l-dialog-row {
    width: 100%;
    height: 60px;
    margin-bottom: 10px;
}
.l-dialog-half-row {
    width: 50%;
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
    min-width: calc(100% - 100px);
    max-height: 100px;
    overflow-x: auto;
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
.min-width-text5 {
    min-width: 72px;

    /* background-color: red; */
}
</style>
