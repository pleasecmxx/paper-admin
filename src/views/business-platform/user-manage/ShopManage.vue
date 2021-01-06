<template>
  <!-- 普通用户管理 -->
  <div class="business-content-container">
    <div class="business-content-inner">
      <div class="search-row l-flex-row-start">
        <el-input
          class="l-search-input"
          v-model="searchShopName"
          placeholder="请输入店铺名称"
        />
        <el-input
          class="l-search-input"
          v-model="searchShopLeader"
          maxlength="11"
          placeholder="请输入店铺负责人"
        />
        <el-input
          class="l-search-input"
          v-model="searchShopAgent"
          maxlength="11"
          placeholder="请输入推荐代理"
        />
        <el-button type="primary" @click="search" icon="el-icon-search"
          >搜索</el-button
        >
      </div>
      <div class="l-table-content">
        <el-table
          :data="list"
          height="100%"
          border
          style="width: 100%;"
          v-loading="tableLoading"
        >
          <el-table-column
            prop="shop_name"
            label="店铺名称"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="date"
            label="店铺经纬度"
            width="180"
            align="center"
          >
            <template slot-scope="scope">
              <p>{{ scope.row.latitude }}-{{ scope.row.longitude }}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="合作照片"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              <el-image
                class="user-table-id-card-img"
                :src="
                  scope.row.cooperation_photo
                    ? scope.row.cooperation_photo
                    : 'https://'
                "
                :preview-src-list="
                  scope.row.cooperation_photo
                    ? [scope.row.cooperation_photo]
                    : []
                "
              >
              </el-image>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="店铺详细地址"
            align="center"
            width="240"
          >
            <template slot-scope="scope">
              <p>
                {{ scope.row.position_province }}/{{
                  scope.row.position_city
                }}/{{ scope.row.position_desc }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            prop="manager_name"
            label="负责人"
            align="center"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="phone_number"
            label="联系电话"
            align="center"
            width="120"
          >
          </el-table-column>
          <el-table-column label="营业执照" align="center" width="180">
            <template slot-scope="scope">
              <el-image
                class="user-table-id-card-img"
                :src="
                  scope.row.business_license
                    ? scope.row.business_license
                    : 'https://'
                "
                :preview-src-list="
                  scope.row.business_license ? [scope.row.business_license] : []
                "
              >
              </el-image>
            </template>
          </el-table-column>
          <el-table-column label="二级域名" align="center" width="180">
            <template slot-scope="scope">
              <p>
                https://<span style="color: #f00;">{{
                  scope.row.secondary_domain
                }}</span
                >*
              </p>
            </template>
          </el-table-column>
          <el-table-column
            prop="upper_account_name"
            label="推荐代理"
            align="center"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="cumulative_commission"
            label="累计总佣金"
            align="center"
            width="120"
          >
          </el-table-column>
        </el-table>
      </div>
      <div class="l-page-jumper l-flex-row-start">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="currentPageChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { isEmpty } from "../../../util";
import api from "./../../../api";
import { platform_user_manage_shop_list } from "./../../../api/admin-api";
export default {
  name: "ShopManage",
  data() {
    return {
      dialogShow: false,
      list: [],
      userName: "",
      userTel: "",
      page: 1,
      total: 0,
      searchShopName: "",
      searchShopLeader: "",
      searchShopAgent: "",
      isInSearch: false,
      tableLoading: false,
    };
  },
  watch: {
    searchShopName: function (val) {
      if (
        val.length === 0 &&
        isEmpty(this.searchShopLeader) &&
        isEmpty(this.searchShopAgent)
      ) {
        this.isInSearch = false;
        this.page = 1;
        this.$nextTick(() => {
          this.getListByPage();
        });
      }
    },
    searchShopLeader: function (val) {
      if (
        val.length === 0 &&
        isEmpty(this.searchShopName) &&
        isEmpty(this.searchShopAgent)
      ) {
        this.isInSearch = false;
        this.page = 1;
        this.$nextTick(() => {
          this.getListByPage();
        });
      }
    },
    searchShopAgent: function (val) {
      if (
        val.length === 0 &&
        isEmpty(this.searchShopName) &&
        isEmpty(this.searchShopLeader)
      ) {
        this.isInSearch = false;
        this.page = 1;
        this.$nextTick(() => {
          this.getListByPage();
        });
      }
    },
  },
  created() {
    this.page = 1;
    this.$nextTick(() => {
      this.getListByPage();
    });
  },
  methods: {
    getListByPage() {
      this.tableLoading = true;
      let params = {
        page: this.page,
      };
      api
        .get(platform_user_manage_shop_list, {
          params: params,
        })
        .then((res) => {
          console.log(res);
          this.tableLoading = false;
          if (res.code === 200) {
            this.total = res.data.count;
            this.list = res.data.list;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.tableLoading = false;
          console.log(err);
        });
    },

    search() {
      let params = {
        shop_name: this.searchShopName,
        agent_man: this.searchShopAgent,
        manager: this.searchShopLeader,
        page: this.page,
      };
      console.log("参数", params);
      this.tableLoading = true;
      api
        .get(platform_user_manage_shop_list, { params })
        .then((res) => {
          console.log(res);
          this.tableLoading = false;
          if (res.code === 200) {
            this.total = res.data.count;
            this.list = res.data.list;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.tableLoading = false;
          this.$message.error("操作失败，请稍后重试");
        });
    },

    currentPageChange(page) {
      this.page = page;
      this.$nextTick(() => {
        this.getListByPage();
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
</style>
