<template>
  <div class="l-tab-item-container">
    <div class="l-tab-table-container">
      <el-table height="100%" :data="list" border style="width: 100%;">
        <el-table-column
          prop="order_number"
          label="订单编号"
          width="240"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="date"
          label="创建日期"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            <p>{{ formatTime(scope.row.create_time) }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" align="center" width="180">
        </el-table-column>
        <!-- <el-table-column prop="author" label="作者" align="center" width="96">
        </el-table-column> -->
        <!-- <el-table-column
          prop="name"
          label="文件名称"
          align="center"
          width="120"
        >
          <template slot-scope="scope">
            <p v-if="scope.row.file">{{ scope.row.file }}</p>
            <p v-else>粘贴复制提交</p>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="name"
          label="支付方式"
          align="center"
          width="120"
        >
          <template slot-scope="scope">
            <p v-if="scope.row.payment_method === 1">支付宝支付</p>
            <p v-else>微信支付</p>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="支付金额" align="center" width="96">
          <template slot-scope="scope">
            <p>¥{{ Number(scope.row.order_money).toFixed(2) }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="订单来源" align="center" width="96">
          <template slot-scope="scope">
            <p v-if="scope.row.order_source == '1'">PC网页</p>
            <p v-else>H5/其他</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="franchise_channel__name"
          label="查重品牌"
          align="center"
          width="146"
        >
        </el-table-column>
        <el-table-column prop="name" label="订单状态" align="center" width="96">
          <template slot-scope="scope">
            <p v-if="scope.row.check_status == '1'">待检测</p>
            <p v-else-if="scope.row.check_status == '2'">检测中</p>
            <p v-else-if="scope.row.check_status == '3'">检测完成</p>
            <p v-else-if="scope.row.check_status == '4'">检测失败</p>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="预估佣金" align="center" width="96">
          <template slot-scope="scope">
            <p>{{ scope.row.order_estimate_commission }}</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="l-page-jumper l-flex-row-start">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :hide-on-single-page="false"
        :current-page="page"
        @current-change="currentPageChange"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import api from "./../../../../api";
import {
  deleteSolution,
  solutionList,
  paperOrderListApi,
  shopPaperOrderListApi,
} from "./../../../../api/admin-api";
import { formatUTCTime, isPC } from "./../../../../util/index";
export default {
  name: "PaperOrderItem",
  props: ["id"],
  data() {
    return {
      total: 0,
      list: [],
      page: 1,
      loading: true,
    };
  },
  created() {
    // var date = new Date('2020-12-25T11:35:44.721');
    // console.log("时间",date.toTimeString())
    // console.log("年",date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes())
    this.getListByPage(1);
  },
  methods: {
    formatTime(t) {
      return formatUTCTime(t);
    },
    currentPageChange(page) {
      console.log(page);
      this.page;
      this.getListByPage(page);
    },

    getListByPage(current_page) {
      this.loading = true;
      api
        .get(shopPaperOrderListApi, {
          params: {
            order_status: this.id,
            page: current_page,
          },
        })
        .then((res) => {
          console.log(res);
          this.loading = false;
          this.total = res.data.count;
          this.list = res.data.list;
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
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
.l-tab-table-container {
    width: 100%;
    height: calc(100% - 46px);
    overflow: hidden;
}
</style>
