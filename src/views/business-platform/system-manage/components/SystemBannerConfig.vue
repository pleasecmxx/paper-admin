<template>
  <div class="l-tab-item-container">
    <div class="search-row l-flex-row-start">
      <el-button type="success" @click="dialogShow = true" icon="el-icon-plus"
        >添加轮播图</el-button
      >
    </div>
    <el-table :data="list" border style="width: 100%; height: auto;">
      <el-table-column prop="id" label="ID" align="center" width="96">
      </el-table-column>
      <el-table-column label="图片" align="center" width="240">
        <template slot-scope="scope">
          <el-image
            class="user-table-banner-img"
            :src="scope.row.url ? scope.row.url : 'https://'"
            :preview-src-list="scope.row.url ? [scope.row.url] : []"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" align="center" width="120">
      </el-table-column>
      <el-table-column label="权限" align="center" width="120">
        <template slot-scope="scope">
          <p v-if="scope.row.status == 0">未知权限</p>
          <p v-if="scope.row.status == 1">仅PC</p>
          <p v-if="scope.row.status == 2">仅H5</p>
          <p v-if="scope.row.status == 3">PC和H5</p>
        </template>
      </el-table-column>
      <el-table-column prop="link_url" label="目标地址" align="center">
        <template slot-scope="scope">
          <el-link type="info">{{ scope.row.link_url }}</el-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="link_url"
        label="启用状态"
        align="center"
        width="96"
      >
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.disable == 0">已禁用</el-tag>
          <el-tag type="success" v-else-if="scope.row.disable == 1"
            >已启用</el-tag
          >
          <el-tag type="info" v-else>未知状态</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="editBanner(scope.row)"
            type="text"
            size="small"
          >
            编辑
          </el-button>
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
    <el-dialog
      title="添加轮播图"
      :visible.sync="dialogShow"
      :width="isPc ? '55%' : '96%'"
    >
      <add-banner-dialog
        :closeDialog="closeDialog"
        @finish="onAddFinish"
        v-if="refreshKit"
      />
    </el-dialog>
  </div>
</template>

<script>
import api from "../../../../api";
import {
  platform_banner_list,
  platfrom_banner_delete,
} from "../../../../api/admin-api";
import { isPC } from "./../../../../util/index";
import AddBannerDialog from "./../dialog/AddBannerDialog";

export default {
  name: "SystemBannerConfig",
  components: {
    "add-banner-dialog": AddBannerDialog,
  },
  data() {
    return {
      isPc: isPC(),
      dialogShow: false,
      refreshKit: true,
      list: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
      ],
    };
  },
  created() {
    this.getListByPage();
  },
  methods: {
    onAddFinish() {
      this.getListByPage();
    },

    getListByPage() {
      this.refreshKit = false;
      this.$nextTick(() => {
        this.refreshKit = true;
      });
      api
        .get(platform_banner_list, {
          params: { page: 1, status: 3 },
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
    closeDialog() {
      this.dialogShow = false;
    },
    editBanner() {},

    deleteBanner(row) {
      console.log(row);
      this.$confirm("此操作将删除该轮播图, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          api
            .post(platfrom_banner_delete, { id: row.id })
            .then((res) => {
              if (res.code === 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.getListByPage();
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch((err) => {
              console.log(err);
              this.$message.error(err + "");
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
.l-tab-item-container {
    /* background-color: red; */
    height: calc(100% - 44px);
    overflow-y: auto;
}
</style>
