<template>
  <div class="l-tab-item-container" style="height: 100%;">
    <div class="search-row l-flex-row-start">
      <el-button type="success" @click="dialogShow = true" icon="el-icon-plus"
        >添加</el-button
      >
    </div>
    <div class="shop-banner-table-container">
      <el-table v-loading="loading" height="100%" :data="list" border style="width: 100%;">
        <el-table-column prop="id" label="ID" align="center" width="96">
          2
        </el-table-column>
        <el-table-column prop="date" label="图片" align="center">
          <template slot-scope="scope">
            <img class="user-table-banner-img" :src="scope.row.url" />
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" align="center">
        </el-table-column>
        <el-table-column label="权限" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.status == 0">未知权限</p>
            <p v-if="scope.row.status == 1">仅PC</p>
            <p v-if="scope.row.status == 2">仅H5</p>
            <p v-if="scope.row.status == 3">PC和H5</p>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteBanner(scope.row)"
              type="text"
              size="small"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="添加轮播图"
      :visible.sync="dialogShow"
      :width="isPc ? '55%' : '96%'"
    >
      <add-shop-banner-dialog
        :closeDialog="closeDialog"
        @finish="onAddFinish"
      />
    </el-dialog>
  </div>
</template>

<script>
import AddShopBannerDialog from "./../dialog/AddShopBannerDialog.vue";
import { isPC } from "./../../../../util";
import api from "../../../../api";
import { shopBannerDeleteApi, shopBannerList } from "../../../../api/admin-api";
export default {
  name: "SystemBannerConfig",
  components: {
    "add-shop-banner-dialog": AddShopBannerDialog,
  },
  data() {
    return {
      isPc: isPC(),
      dialogShow: false,
      loading: false,
      list: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      api
        .get(shopBannerList, {})
        .then((res) => {
          console.log(res);
          this.list = res.data.list;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },

    closeDialog() {
      this.dialogShow = false;
    },

    onAddFinish() {
      this.$message.success("操作成功");
      this.getList();
    },
    deleteBanner(row) {
      this.$confirm("此操作将删除该轮播图, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
            this.loading = true;
            let params = {
                id: row.id
            }
            api.post(shopBannerDeleteApi,params)
            .then(res => {
                console.log("删除结果",res);
                if(res.code === 200){
                    this.getList();
                }else {
                    this.$message.error(res.msg)
                }
            })
            .catch(err => {
                console.log('err',err);
                this.loading = false;
                this.$message.error("删除失败，请您稍后重试")
            })
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "操作已取消",
          });
        });
    },
  },
};
</script>

<style scoped>
.shop-banner-table-container {
    width: 100%;
    height: calc(100% - 120px);
    padding: 0 12px;

    /* background-color: red; */
}
</style>
