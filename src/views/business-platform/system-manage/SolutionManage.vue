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
        <el-table :data="list" border style="width: 100%;">
          <el-table-column label="ID" width="96" align="center">
            1
          </el-table-column>
          <el-table-column
            prop="address"
            label="文章分类"
            align="center"
            width="180"
          >
          </el-table-column>
          <el-table-column prop="name" label="文章标题" align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="文章渠道"
            align="center"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="文章封面"
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
          <el-table-column label="最近编辑人" width="96" align="center">
            admin
          </el-table-column>
          <el-table-column label="状态" width="96" align="center">
            启用
          </el-table-column>
          <el-table-column prop="name" label="操作" align="center" width="160">
          </el-table-column>
        </el-table>
      </div>
      <div class="l-page-jumper l-flex-row-start">
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="添加文章"
      top="8vh"
      :visible.sync="dialogShow"
      :width="isPc ? '78%' : '96%'"
      :append-to-body="true"
    >
      <add-solution-dialog :closeDialog="closeDialog" />
    </el-dialog>
  </div>
</template>

<script>
import { isPC } from "./../../../util/index";
import AddSolutionDialog from "./dialog/AddSolutionDialog";

export default {
  name: "SolutionManage",
  components: {
    "add-solution-dialog": AddSolutionDialog,
  },
  data() {
    return {
      isPc: isPC(),
      userName: "",
      dialogShow: false,
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
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    closeDialog() {
      this.dialogShow = false;
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
