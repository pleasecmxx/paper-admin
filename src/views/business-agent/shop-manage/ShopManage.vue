<template>
  <div class="business-content-container">
    <div class="business-content-inner">
      <div class="search-row l-flex-row-start">
        <el-button type="success" @click="dialogShow = true" icon="el-icon-plus"
          >创建店铺</el-button
        >
      </div>
      <div class="l-table-content">
        <el-table
          :data="tableData"
          border
          style="width: 100%;"
          height="100%"
          v-loading="tableLoading"
        >
          <el-table-column
            prop="shop_name"
            label="店铺名称"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column label="店铺经纬度" width="120" align="center">
            <template slot-scope="scope">
              <p>{{ scope.row.longitude + ",\n" + scope.row.latitude }}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="合作照片"
            width="180"
            align="center"
          >
            <template slot-scope="scope">
              <el-image
                class="cooperation_photo"
                :src="scope.row.cooperation_photo"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="店铺详细地址"
            width="180"
            align="center"
          >
            <template slot-scope="scope">
              <p>
                {{ scope.row.position_desc }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            prop="manager_name"
            label="负责人"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="phone_number"
            label="联系电话"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="营业执照"
            width="180"
            align="center"
          >
            <template slot-scope="scope">
              <el-image
                :src="scope.row.business_license"
                class="cooperation_photo"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="店铺地址域名"
            width="260"
            align="center"
          >
            <template slot-scope="scope">
              <p
                @click="
                  openUrl(
                    'http://www.' + scope.row.secondary_domain + '.lwcc.net'
                  )
                "
                class="url-link"
                title="点击打开"
              >
                http://www.<span style="color: #f00;">{{
                  scope.row.secondary_domain
                }}</span
                >.lwcc.net
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="操作" width="180" align="center">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="eidtRow(scope.row)"
                type="text"
                size="small"
              >
                编辑
              </el-button>
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
    <el-dialog
      title="添加店铺"
      :visible.sync="dialogShow"
      :width="isPc ? '65%' : '96%'"
      :top="'5vh'"
    >
      <add-shop-dialog
        ref="shopDialogRef"
        :closeDialog="closeDialog"
        @finish="onFinish"
      />
    </el-dialog>
  </div>
</template>

<script>
import api from "../../../api";
import { agentShopList } from "../../../api/admin-api";
import { isPC } from "../../../util";
import AddShopDialog from "./dialog/AddShopDialog";

export default {
  name: "ShopManage",
  components: {
    "add-shop-dialog": AddShopDialog,
  },
  data() {
    return {
      isPc: isPC(),
      dialogShow: false,
      tableData: [],
      tableLoading: [],
      total: 0,
      page: 1,
    };
  },
  mounted() {
    this.getDataByPage();
  },
  methods: {
    getDataByPage() {
      this.tableLoading = true;
      let params = {
        page: this.page,
      };
      api
        .get(agentShopList, { params })
        .then((res) => {
          console.log("res", res);
          this.tableLoading = false;
          if (res.code == 200) {
            this.tableData = res.data.list;
            this.total = res.data.count;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.tableLoading = false;
          console.log("err", err);
          this.$message.error("操作失败，请稍后重试");
        });
    },

    openUrl(url) {
      window.open(url);
    },

    eidtRow(row) {
      this.dialogShow = true;
      this.$nextTick(() => {
        this.$refs["shopDialogRef"].setEditData(row);
      });
    },

    closeDialog() {
      this.dialogShow = false;
    },

    onFinish() {
      this.$message.success("操作成功");
      this.getDataByPage();
    },

    currentPageChange(page) {
      this.page = page;
      this.$nextTick(() => {
        this.getDataByPage();
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
.cooperation_photo {
    width: 52px;
    height: 80px;
}
.url-link {
    text-decoration: underline;
    cursor: pointer;
}
</style>
