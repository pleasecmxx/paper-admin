<template>
  <div class="l-tab-item-container">
    <div class="search-row l-flex-row-start" v-if="type === 1">
      <!-- <el-input
        class="l-search-input"
        v-model="userName"
        placeholder="请输入代理名称"
      />
      <el-input
        class="l-search-input"
        v-model="userTel"
        maxlength="11"
        type="number"
        placeholder="请输入代理手机号"
      /> -->
      <el-button
        type="success"
        @click="dialogShow = true"
        icon="el-icon-plus"
        v-if="type === 1"
        >我要提现</el-button
      >
    </div>
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
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column
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
        </el-table-column>
        <el-table-column
          prop="name"
          label="提现金额"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column prop="name" label="账号" align="center" width="120">
        </el-table-column>
        <el-table-column prop="name" label="姓名" align="center" width="96">
        </el-table-column>
        <el-table-column prop="name" label="提现说明" align="center">
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
              @click.native.prevent="showCheckDialog(scope.$index)"
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
      title="我要提现"
      :visible.sync="dialogShow"
      :width="isPc ? '50%' : '96%'"
      v-if="type === 1"
    >
      <take-cash-dialog :closeDialog="closeDialog" />
    </el-dialog>
  </div>
</template>

<script>
import { isPC } from "./../../../../util";
import TakeCashDialog from "./../dialog/TakeCashDialog";
export default {
  name: "TakeCashTabItem",
  props: ["type"],
  components: {
    "take-cash-dialog": TakeCashDialog,
  },
  data() {
    return {
      isPc: isPC(),
      dialogShow: false,
      list: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
    };
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
