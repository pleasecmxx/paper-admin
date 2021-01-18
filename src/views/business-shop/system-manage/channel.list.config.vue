<template>
  <div class="business-content-container">
    <div class="business-content-inner">
      <div class="search-row l-flex-row-start">
        <el-input
          class="l-search-input"
          v-model="userName"
          placeholder="请输入渠道名称"
          disabled
        />
        <el-button type="primary" disabled icon="el-icon-search">搜索</el-button>
      </div>
      <div class="l-table-content">
        <el-table :data="list" height="100%" border style="width: 100%;" v-loading="loading">
          <el-table-column
            prop="name"
            label="加盟系统名称"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="franchise_channel_class"
            label="渠道类别"
            align="center"
            width="96"
          >
            <template slot-scope="scope">
              <el-tag
                type="success"
                v-if="scope.row.franchise_channel_class == 1"
                >权威系统</el-tag
              >
              <el-tag v-else>优选系统</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="计费单位" align="center">
            <template slot-scope="scope">
              <p v-if="scope.row.billing_method === 'char'">/千字</p>
              <p v-else-if="scope.row.billing_method === 'page'">/页</p>
              <p v-else-if="scope.row.billing_method === 'article'">/篇</p>
            </template>
          </el-table-column>
          <el-table-column prop="tag" label="标签" align="center" width="120">
          </el-table-column>
          <el-table-column prop="name" label="logo" width="100" align="center">
            <template slot-scope="scope">
              <img class="user-table-header-img" :src="scope.row.logo" />
            </template>
          </el-table-column>
          <el-table-column prop="price" label="价格" align="center" width="96">
          </el-table-column>
          <el-table-column
            prop="init_sales"
            label="系统销量"
            align="center"
            width="120"
          >
          </el-table-column>
          <el-table-column label="描述" align="center" width="240">
            <template slot-scope="scope">
              <div class="table-max-text-area">
                <p>{{ scope.row.desc }}</p>
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="name" label="操作" align="center" width="180">
            <template slot-scope="scope">

            </template>
          </el-table-column> -->
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
    <el-dialog
      title="配置加盟渠道"
      :visible.sync="dialogShow"
      :width="isPc ? '65%' : '96%'"
      :top="'5vh'"
      destroy-on-close
    >
      <!-- <add-join-way-dialog :closeDialog="closeDialog" @finish="onAddFinish" /> -->
    </el-dialog>
  </div>
</template>

<script>
import { isPC } from "./../../../util/index";
// import AddJoinWayDialog from "./dialog/AddJoinWayDialog";
import api from "./../../../api";
import { shopChannelList, deletChanelApi } from "./../../../api/admin-api";

export default {
  name: "channel.list.config",
  components: {
    // "add-join-way-dialog": AddJoinWayDialog,
  },
  data() {
    return {
      isPc: isPC(),
      userName: "",
      dialogShow: false,
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
      this.page = page;
      this.getListByPage(page);
    },

    onAddFinish() {
      let _this = this;
      _this.getListByPage(1);
    },

    getListByPage(current_page) {
      this.loading = true;
      let params = {
        page: 1,
      };
      api
        .get(shopChannelList, {
          params: params,
        })
        .then((res) => {
          console.log(res);
          this.loading = false;
          if (res.code === 200) {
            this.total = res.data.count;
            this.list = res.data.list;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },

    closeDialog() {
      this.dialogShow = false;
    },

    showDetailsDialog() {},

    deleteChannel(row) {
      let _this = this;
      this.$confirm("此操作将永久删除此项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params = {
            id: row.id,
          };
          console.log("删除渠道参数", params);
          api
            .post(deletChanelApi, params)
            .then((res) => {
              if (res.code === 200) {
                _this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                _this.getListByPage(1);
              } else {
                _this.$message({
                  type: "error",
                  message: res.msg,
                });
              }
            })
            .catch((e) => {
              this.$message({
                type: "error",
                message: e,
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped>
.business-content-container {
    width: 100%;
    min-height: 100%;
}
.table-max-text-area {
    width: 100%;
    margin: 0;
    max-height: 300px;
    overflow-y: auto;
    text-align: left;
}
.table-max-text-area > p {
    text-indent: 24px;
}
</style>
