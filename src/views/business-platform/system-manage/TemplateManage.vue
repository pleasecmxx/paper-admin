<template>
  <div class="business-content-container">
    <div class="business-content-inner">
      <div class="search-row l-flex-row-start">
        <el-input
          class="l-search-input"
          v-model="searchKeywords"
          placeholder="请输入模版标题关键字"
          clearable
        />
        <el-button type="primary" @click="search" icon="el-icon-search"
          >搜索</el-button
        >
        <el-button type="success" @click="dialogShow = true" icon="el-icon-plus"
          >添加</el-button
        >
      </div>
      <div class="l-table-content">
        <el-table
          :data="list"
          height="100%"
          border
          style="width: 100%;"
          v-loading="loading"
        >
          <el-table-column prop="id" width="96" align="center">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="ID" width="96" align="center">
          </el-table-column>
          <el-table-column label="模版底版" align="center" width="280">
            <template slot-scope="scope">
              <el-image
                class="user-table-logo-img"
                fit="contain"
                :src="scope.row.file ? scope.row.file : 'https://'"
                :preview-src-list="scope.row.file ? [scope.row.file] : []"
              >
              </el-image>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="模版标题" align="center">
          </el-table-column>
          <el-table-column prop="name" label="操作" align="center" width="180">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="showDetailsDialog(scope.row)"
                type="text"
                size="small"
              >
                预览
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
      title="添加推广模版"
      top="8vh"
      :visible.sync="dialogShow"
      :width="isPc ? '800px' : '96%'"
      :append-to-body="true"
      destroy-on-close
      :close="onDialogClose"
      v-if="refreshKit"
    >
      <add-qr-code-template-dialog
        :closeDialog="closeDialog"
        v-if="refreshKit"
        @finish="onAddFinish"
      />
    </el-dialog>
    <el-dialog
      title="添加推广模版"
      top="8vh"
      :visible.sync="dialogShow1"
      :width="isPc ? '620px' : '96%'"
      :append-to-body="true"
      destroy-on-close
      v-if="refreshKit"
    >
      <pre-viewer-qr-code-dialog
        ref="previewer-dialog-ref"
        :closeDialog="closeDialog1"
        v-if="refreshKit"
      />
    </el-dialog>
  </div>
</template>

<script>
import api from "../../../api";
import {
  deleteSolution,
  materialList,
  qr_code_template_list,
  solutionList,
} from "../../../api/admin-api";
import { isPC } from "./../../../util/index";
import AddQRCodeTemplate from "./dialog/AddQRCodeTemplate";
import PreViewerQRCodeDialog from "./dialog/PreViewerQRCodeDialog";

export default {
  name: "MaterialManage",
  components: {
    "add-qr-code-template-dialog": AddQRCodeTemplate,
    "pre-viewer-qr-code-dialog": PreViewerQRCodeDialog,
  },
  data() {
    return {
      isPc: isPC(),
      userName: "",
      dialogShow: false,
      dialogShow1: false,
      preViewDialogShow: false,
      refreshKit: true,
      total: 0,
      list: [],
      page: 1,
      loading: true,
      isInSearch: false,
      searchKeywords: "",
    };
  },
  watch: {
    dialogShow: function (val, _) {
      if (!val) {
        this.refreshKit = false;
        this.$nextTick(() => {
          this.refreshKit = true;
        });
      }
    },
    preViewDialogShow: function (val, _) {
      if (!val) {
        this.refreshKit = false;
        this.$nextTick(() => {
          this.refreshKit = true;
        });
      }
    },
    searchKeywords: function (val, _) {
      if (val.length === 0 && this.isInSearch) {
        this.isInSearch = false;
        this.getListByPage(1);
      }
    },
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
        .get(qr_code_template_list, {
          params: {
            page: current_page,
          },
        })
        .then((res) => {
          console.log("模版列表", res);
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

    search() {
      this.page = 1;
      this.$nextTick(() => {
        let params = {
          title: this.searchKeywords,
          page: this.page,
        };
        this.loading = true;
        api
          .get(qr_code_template_list, {
            params: params,
          })
          .then((res) => {
            console.log(res);
            this.loading = false;
            this.total = res.data.count;
            this.list = res.data.list;
            this.isInSearch = true;
          })
          .catch((err) => {
            this.loading = false;
            console.log(err);
          });
      });
    },

    showDetailsDialog(row) {
        this.dialogShow1 = true;
        this.$nextTick(() => {
            this.$refs['previewer-dialog-ref'].setEditData(row)
        })

    },

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

    closeDialog1() {
      this.dialogShow1 = false;
    },

    closePreViewDialog(row, index) {
      this.preViewDialogShow = false;
    },

    onDialogClose() {},
  },
};
</script>

<style scoped>
.business-content-container {
    width: 100%;
    min-height: 100%;
}
</style>
