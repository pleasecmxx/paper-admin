<template>
  <div class="l-tab-item-container">
    <div class="l-tab-table-container">
      <el-table
        height="100%"
        :data="list"
        v-loading="tableLoading"
        border
        style="width: 100%;"
      >
        <el-table-column
          prop="order_number"
          label="订单编号"
          width="240"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建日期"
          width="240"
          align="center"
        >
          <template slot-scope="scope">
            <p>{{ formatTime(scope.row.create_time) }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="文章标题"
          align="center"
          min-width="180"
        >
        </el-table-column>
        <el-table-column
          prop="author"
          label="文章作者"
          align="center"
          min-width="180"
        >
        </el-table-column>
        <!-- <el-table-column label="支付时间" width="180" align="center">
          <template slot-scope="scope">
            <p>{{ formatTime(scope.row.pay_time) }}</p>
          </template>
        </el-table-column> -->
        <el-table-column prop="name" label="支付金额" align="center" width="96">
          <template slot-scope="scope">
            <p>¥{{ Number(scope.row.order_money).toFixed(2) }}</p>
          </template>
        </el-table-column>
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
        <el-table-column prop="name" label="订单来源" align="center" width="96">
          <template slot-scope="scope">
            <p v-if="scope.row.order_source == '1'">PC网页</p>
            <p v-else>H5/其他</p>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="订单状态" align="center" width="96">
          <template slot-scope="scope">
            <p v-if="scope.row.check_status == '1'">待检测</p>
            <p v-else-if="scope.row.check_status == '2'">检测中</p>
            <p v-else-if="scope.row.check_status == '3'">检测完成</p>
            <p v-else-if="scope.row.check_status == '4'">检测失败</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="franchise_channel__name"
          label="下单系统"
          align="center"
          width="146"
        >
        </el-table-column>
        <el-table-column label="所属代理" align="center" width="96">
          <template slot-scope="scope">
            <p>{{ scope.row.agent__agent_name }}</p>
          </template>
        </el-table-column>
        <el-table-column label="所属店铺" align="center" width="96">
          <template slot-scope="scope">
            <p>{{ scope.row.shop__shop_name }}</p>
          </template>
        </el-table-column>
        <el-table-column label="下单网址" align="center" width="240">
          <template slot-scope="scope">
            <p
              @click="
                openUrl('http://' + scope.row.secondary_domain + '.lwcc.net')
              "
              class="url-link"
              title="点击打开"
            >
              http://<span style="color: #f00;">{{
                scope.row.secondary_domain
              }}</span
              >.lwcc.net
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
      tableLoading: true,
    };
  },
  created() {
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

    openUrl(url) {
      window.open(url);
    },

    getListByPage(current_page) {
      this.tableLoading = true;
      api
        .get(paperOrderListApi, {
          params: {
            order_status: this.id,
            page: current_page,
          },
        })
        .then((res) => {
          console.log(res);
          this.tableLoading = false;
          this.total = res.data.count;
          this.list = res.data.list;
        })
        .catch((err) => {
          this.tableLoading = false;
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
.url-link {
    text-decoration: underline;
    cursor: pointer;
}
</style>
