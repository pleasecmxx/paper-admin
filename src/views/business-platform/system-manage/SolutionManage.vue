<template>
  <div class="business-content-container">
    <div class="business-content-inner">
      <div class="search-row l-flex-row-start">
        <el-input
          class="l-search-input"
          v-model="userName"
          placeholder="请输入问答文章标题"
        />
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <el-button type="success" @click="dialogShow = true" icon="el-icon-plus"
          >添加</el-button
        >
      </div>
      <div class="l-table-content">
        <el-table :data="list" border style="width: 100%;" v-loading="loading">
          <el-table-column prop="id" label="ID" width="96" align="center">
          </el-table-column>
          <el-table-column label="文章分类" align="center" width="180">
            <template slot-scope="scope">
              <p style="color: #333;" v-if="scope.row.type == 1">
                #论文查重技巧#
              </p>
              <p style="color: #333;" v-if="scope.row.type == 2">
                #论文常见问题#
              </p>
              <p style="color: #333;" v-if="scope.row.type == 3">
                #论文行业资讯#
              </p>
              <p style="color: #333;" v-if="scope.row.type == 4">
                #论文知识普及#
              </p>
            </template>
          </el-table-column>
          <el-table-column label="文章封面" align="center" width="180">
            <template slot-scope="scope">
              <el-image
                class="user-table-logo-img"
                :src="
                  scope.row.cover_photo ? scope.row.cover_photo : 'https://'
                "
                :preview-src-list="
                  scope.row.cover_photo ? [scope.row.cover_photo] : []
                "
              >
              </el-image>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="文章标题" align="center">
          </el-table-column>
          <el-table-column label="最近编辑人" width="96" align="center">
            admin
          </el-table-column>
          <el-table-column label="创建时间" align="center" width="180">
            <template slot-scope="scope">
              <p>{{scope.row.create_time}}</p>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="96" align="center">
            启用
          </el-table-column>
          <el-table-column prop="name" label="操作" align="center" width="180">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="showPreviewDialog(scope.row)"
                type="text"
                size="small"
              >
                预览
              </el-button>
              <el-button
                @click.native.prevent="showDetailsDialog(scope.$index)"
                type="text"
                size="small"
              >
                编辑
              </el-button>
              <el-button
                @click.native.prevent="deleteArticle(scope.row)"
                type="text"
                size="small"
              >
                删除
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
      title="添加文章"
      top="8vh"
      :visible.sync="dialogShow"
      :width="isPc ? '78%' : '96%'"
      :append-to-body="true"
      destroy-on-close
      :close="onDialogClose"
    >
      <add-solution-dialog
        :closeDialog="closeDialog"
        v-if="refreshKit"
        @finish="onAddFinish"
      />
    </el-dialog>
    <el-dialog
      title="预览文章"
      top="8vh"
      :visible.sync="preViewDialogShow"
      :width="isPc ? '60%' : '96%'"
      :append-to-body="true"
      destroy-on-close
    >
      <preview-solution
        ref="previewSolutionRef"
        :closeDialog="closePreViewDialog"
        v-if="refreshKit"
      />
    </el-dialog>
  </div>
</template>

<script>
import api from "../../../api";
import { deleteSolution, solutionList } from "../../../api/admin-api";
import { isPC } from "./../../../util/index";
import AddSolutionDialog from "./dialog/AddSolutionDialog";
import PreViewSolution from "./dialog/PreViewSolution";
export default {
  name: "SolutionManage",
  components: {
    "add-solution-dialog": AddSolutionDialog,
    "preview-solution": PreViewSolution,
  },
  data() {
    return {
      isPc: isPC(),
      userName: "",
      dialogShow: false,
      preViewDialogShow: false,
      refreshKit: true,
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
    onAddFinish() {
      this.getListByPage(this.page);
    },

    getListByPage(current_page) {
      this.loading = true;
      api
        .get(solutionList, {
          params: {
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
    //展示预览弹窗
    showPreviewDialog(row, index) {
      console.log(row);
      this.preViewDialogShow = true;
      this.$nextTick(() => {
        this.$refs.previewSolutionRef.setContent(row.desc);
      });
    },

    showDetailsDialog() {},
    //删除问答文章
    deleteArticle(row) {
      this.$confirm("此操作将永久删除此项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params = {
            id: row.id,
          };
          api
            .post(deleteSolution, params)
            .then((res) => {
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
              } else {
                this.$message({
                  type: "error",
                  message: res.msg,
                });
              }
            })
            .catch((err) => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    closeDialog() {
      this.dialogShow = false;
      this.onDialogClose();
    },

    closePreViewDialog(row, index) {
      this.preViewDialogShow = false;
    },

    onDialogClose() {
      console.log("222");
      this.refreshKit = false;
      this.$nextTick(() => {
        this.refreshKit = true;
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
