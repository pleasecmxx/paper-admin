<template>
  <!-- 普通用户管理 -->
  <div class="business-content-container">
    <div class="business-content-inner">
      <div class="search-row l-flex-row-start">
        <el-input
          class="l-search-input"
          v-model="userName"
          placeholder="请输入店铺名称"
        />
        <el-input
          class="l-search-input"
          v-model="userTel"
          maxlength="11"
          placeholder="请输入店铺负责人"
        />
        <el-input
          class="l-search-input"
          v-model="userTel"
          maxlength="11"
          placeholder="请输入推荐代理"
        />
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="l-table-content">
        <el-table :data="list" height="100%" border style="width: 100%;">
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
              <img
                class="user-table-header-img"
                :key="scope"
                src="https://picsum.photos/228/228?random=3aD6bceb-a5c9-c987-A7da-E031DFFCe1f7"
              />
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
                  scope.row.business_license[0]
                    ? scope.row.business_license[0].url
                    : 'https://'
                "
                :preview-src-list="
                  scope.row.business_license[0]
                    ? [scope.row.business_license[0].url]
                    : []
                "
              >
              </el-image>
            </template>
          </el-table-column>
          <el-table-column
            label="二级域名"
            align="center"
            width="180"
          >
          <template slot-scope="scope">
              <p>https://<span style="color: #f00;">{{scope.row.secondary_domain}}</span>*</p>
          </template>
          </el-table-column>
          <el-table-column prop="upper_account_name" label="推荐代理" align="center" width="120">
          </el-table-column>
          <el-table-column prop="cumulative_commission" label="累计总佣金" align="center" width="120">
          </el-table-column>
        </el-table>
      </div>
      <div class="l-page-jumper l-flex-row-start">
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
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
    };
  },
  created() {
    let params = {
      //   page: this.page,
    };
    api
      .get(platform_user_manage_shop_list, {
        params: params,
      })
      .then((res) => {
        console.log(res);
        if (res.code === 200) {
          this.list = res.data.list;
        } else {
          this.$message.error(res.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {},
};
</script>

<style scoped>
.business-content-container {
    width: 100%;
    min-height: 100%;

    /* background-color: tomato; */
}
</style>
