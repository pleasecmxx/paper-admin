<template>
  <div class="l-tab-item-container">
    <p class="notice-text" v-show="type === 2">
      说明：正常交易刷单钱将返回到余额里面，恶意刷单将从系统扣除
    </p>
    <div
      :class="[
        type === 2
          ? 'l-tab-table-container with-notice'
          : 'l-tab-table-container',
      ]"
    >
      <el-table height="100%" :data="list" border style="width: 100%;">
        <el-table-column
          prop="date"
          label="提交日期"
          width="180"
          align="center"
        >
        <template slot-scope="scope">
          <p>{{formatTime(scope.row.submit_time)}}</p>
        </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="提交身份"
          width="120"
          align="center"
        >
        <template slot-scope="scope">
          <p v-if="scope.row.withdraw_user__identity == 1">店铺</p>
          <p v-else-if="scope.row.withdraw_user__identity == 2">代理</p>
        </template>
        </el-table-column>
        <el-table-column
          prop="withdraw_account_number"
          label="提交账号"
          align="center"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="提现金额"
          align="center"
          width="120"
        >
        <template slot-scope="scope">
          <p>￥{{scope.row.withdraw_number}}</p>
        </template>
        </el-table-column>
        <el-table-column prop="phone_number" label="到账支付宝" align="center" width="120">
        </el-table-column>
        <el-table-column prop="withdraw_man_name" label="到账支付宝姓名" align="center" width="96">
        </el-table-column>
        <el-table-column prop="withdraw_desc" label="提现说明" align="center">
        </el-table-column>
        <el-table-column
          v-if="type === 1"
          prop="name"
          label="操作"
          align="center"
          width="96"
        >
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="showCheckDialog(scope.row)"
              type="text"
              size="small"
              v-if="type === 1"
            >
              审核
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="l-page-jumper l-flex-row-start">
      <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination>
    </div>
    <el-dialog
      title="审核"
      :visible.sync="dialogShow"
      :width="isPc ? '50%' : '96%'"
      v-if="type == 1"
    >
      <check-dialog ref="checkDialogRef" :closeDialog="closeDialog" />
    </el-dialog>
  </div>
</template>

<script>
import api from "../../../../api";
import { takeCashPlatformListApi } from "../../../../api/admin-api";
import { formatUTCTime, isPC } from "./../../../../util";
import CheckDialog from "./../CheckDialog";
export default {
  name: "PaperOrderItem",
  props: ["type"],
  components: {
    "check-dialog": CheckDialog,
  },
  data() {
    return {
      isPc: isPC(),
      dialogShow: false,
      list: [],
      page: 1,
      total: 0,
    };
  },
  created() {
    this.getListByPage();
  },
  methods: {
    formatTime(t){
      return formatUTCTime(t)
    },
    getListByPage() {
      let params = {
        withdraw_status: this.type,
        page: this.page,
      };
      api
        .get(takeCashPlatformListApi, {params})
        .then((res) => {
          console.log(res)
          if (res.code === 200) {
            this.list = res.data.list;
            this.$emit('send_total_money',{money: res.data.total_money, type: this.type})
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message.error("操作失败，请稍后重试");
        });
    },
    showCheckDialog(row) {
      this.dialogShow = true;
      this.$nextTick(() => {
        this.$refs['checkDialogRef'].setEditData(row)
      })
    },
    closeDialog() {
      this.dialogShow = false;
    },
  },
};
</script>

<style scoped>
.l-tab-item-container {
    /* position: absolute;
    top: 0;
    left: 0; */
    width: 100%;
    height: calc(100% - 45px);

    /* background-color: red; */

    /* overflow-y: auto; */
}
</style>
