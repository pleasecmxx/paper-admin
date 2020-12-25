<template>
  <div class="l-tab-item-container">
    <div class="search-row l-flex-row-start">
      <!-- <el-date-picker
        v-model="startTime"
        type="date"
        class="l-search-input"
        placeholder="选择起始日期"
      >
      </el-date-picker>
      <el-date-picker
        v-model="endTime"
        type="date"
        class="l-search-input"
        placeholder="选择起始日期"
      >
      </el-date-picker> -->
      <el-date-picker
        style="margin-right: 12px;"
        v-model="timeArr"
        type="daterange"
        align="left"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
      >
      </el-date-picker>
      <el-button type="success" @click="dialogShow = true" icon="el-icon-plus"
        >我要提现</el-button
      >
      <p class="notice-text" v-show="type === 2">
        说明：正常交易刷单钱将返回到余额里面，恶意刷单将从系统扣除
      </p>
    </div>
    <div class="shop-take-cash-table">
      <el-table
        height="100%"
        :data="list"
        border
        style="width: 100%;"
        v-loading="tableLoading"
      >
        <el-table-column
          prop="submit_time"
          label="提交日期"
          width="240"
          align="center"
        >
          <template slot-scope="scope">
            <p>{{ formatTime(scope.row.submit_time) }}</p>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="date"
          label="提交身份"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="提交账号"
          align="center"
          width="180"
        >
        </el-table-column> -->
        <el-table-column
          prop="withdraw_number"
          label="提现金额"
          align="center"
          width="240"
        >
        </el-table-column>
        <!-- <el-table-column prop="name" label="账号" align="center" width="120">
        </el-table-column>
        <el-table-column prop="name" label="姓名" align="center" width="96">
        </el-table-column> -->
        <el-table-column
          prop="withdraw_denial_reason"
          label="提现说明"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="提现进度"
          align="center"
          width="120"
        >
          <template slot-scope="scope">
            <p v-if="scope.row.withdraw_status === 1">待审核</p>
            <p
              style="color: #67c23a;"
              v-else-if="scope.row.withdraw_status === 2"
            >
              审核通过
            </p>
            <p style="color: #f00;" v-else-if="scope.row.withdraw_status === 3">
              审核拒绝
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="备注" align="center" width="120">
          <template slot-scope="scope">
            <el-image
              v-if="scope.row.withdraw_status === 2"
              class="take-cash-withdraw_voucher"
              :src="scope.row.withdraw_voucher"
            />
            <p style="color: #f00;" v-else-if="scope.row.withdraw_status === 3">
              拒绝原因: {{ scope.row.withdraw_denial_reason }}
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="l-page-jumper l-flex-row-start">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
        @current-change="currentPageChange"
      >
      </el-pagination>
    </div>
    <el-dialog
      title="我要提现"
      :visible.sync="dialogShow"
      :width="isPc ? '50%' : '96%'"
      destroy-on-close
    >
      <take-cash-dialog :closeDialog="closeDialog" />
    </el-dialog>
  </div>
</template>

<script>
import api from "../../../../api";
import { takeCashRecordListApi } from "../../../../api/admin-api";
import { formatUTCTime, isPC } from "./../../../../util";
import TakeCashDialog from "./../dialog/TakeCashDialog";
export default {
  name: "TakeCashTabItem",
  props: ["type"],
  components: {
    "take-cash-dialog": TakeCashDialog,
  },
  data() {
    return {
      total: 0,
      isPc: isPC(),
      tableLoading: false,
      dialogShow: false,
      page: 1,
      list: [],
      timeArr: [],
      startTime: "",
      endTime: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  watch: {
    timeArr: function (val, _) {
      console.log("时间变化了", val, _);
      this.startTime = val[0];
      this.endTime = val[1];
      let _this = this;
      this.$nextTick(() => {
        _this.getDataByPage();
      });
    },
  },
  created() {
    this.getDataByPage();
  },
  methods: {
    formatTime(t) {
      return formatUTCTime(t);
    },
    getDataByPage() {
      this.tableLoading = true;
      let params = {
        withdraw_status: this.type,
        page: this.page,
      };
      if (this.startTime) {
        params.time_from = this.startTime;
      }
      if (this.startTime) {
        params.time_to = this.endTime;
      }
      api
        .get(takeCashRecordListApi, params)
        .then((res) => {
          this.tableLoading = false;
          console.log("提现记录", res);
          this.list = res.data.list;
        })
        .catch((err) => {
          this.tableLoading = false;
          console.log(err);
          this.$message.error("操作失败，请稍后重试");
        });
    },
    onFinish() {
      //   this.page = 1;
      //   this.$nextTick(() => {
      this.getDataByPage();
      //   })
    },

    closeDialog() {
      this.dialogShow = false;
    },

    currentPageChange(page) {
      //   console.log(page);
      this.page = page;
      this.$nextTick(() => {
        this.getDataByPage();
      });
    },
  },
};
</script>

<style scoped>
.l-tab-item-container {
    width: 100%;
    height: calc(100% - 45px);
}
.shop-take-cash-table {
    width: 100%;
    height: calc(100% - 72px);
    padding: 0 10px;
}
.take-cash-withdraw_voucher {
    height: 120px;
    width: 80px;
}
</style>
