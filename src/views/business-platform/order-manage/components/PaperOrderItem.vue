<template>
  <div class="l-tab-item-container">
    <div class="l-tab-table-container">
      <el-table height="100%" :data="list" border style="width: 100%;">
        <el-table-column
          prop="order_number"
          label="订单编号"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="date"
          label="创建日期"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <p>{{ scope.row.create_time }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" align="center" width="180">
        </el-table-column>
        <el-table-column prop="author" label="作者" align="center" width="96">
        </el-table-column>
        <el-table-column
          prop="name"
          label="文件名称"
          align="center"
          width="120"
        >
          <template slot-scope="scope">
            <p v-if="scope.row.file">{{ scope.row.file }}</p>
            <p v-else>粘贴复制提交</p>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="支付方式" align="center" width="96">
            <p>微信扫码支付</p>
        </el-table-column>
        <el-table-column prop="name" label="金额" align="center" width="96">
          <template slot-scope="scope">
            <p>¥{{ Number(scope.row.due_payment).toFixed(2) }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="订单来源" align="center" width="96">
          <template slot-scope="scope">
            <p v-if="scope.row.order_source == '1'">PC网页</p>
            <p v-else>H5/其他</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户头像"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <!-- <img
              class="user-table-header-img"
              :key="scope"
              src="https://picsum.photos/228/228?random=3aD6bceb-a5c9-c987-A7da-E031DFFCe1f7"
            /> -->
            <p>{{ scope.$index + "-" + "暂无" }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="用户昵称" align="center" width="96">
          <template>
            <p>-</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户手机号"
          align="center"
          width="120"
        >
          -
        </el-table-column>
        <el-table-column prop="name" label="推荐店铺" align="center" width="96">
          <template slot-scope="scope">
            <p v-if="scope.row.type == '1'">平台系统</p>
            <p v-else>店铺系统</p>
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
import { isPC } from "./../../../../util/index";
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
    this.getListByPage(1);
  },
  methods: {
    currentPageChange(page) {
      console.log(page);
      this.page;
      this.getListByPage(page);
    },

    getListByPage(current_page) {
      this.loading = true;
      api
        .get(paperOrderListApi, {
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
