<template>
  <div class="l-tab-item-container">
    <el-table height="100%" :data="list" border style="width: 100%;">
        <el-table-column prop="address" label="ID" align="center" width="96">
            2
      </el-table-column>
      <el-table-column prop="date" label="图片" align="center">
        <template slot-scope="scope">
          <img
            class="user-table-banner-img"
            :key="scope"
            src="https://picsum.photos/228/228?random=3aD6bceb-a5c9-c987-A7da-E031DFFCe1f7"
          />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="排序" align="center">
      </el-table-column>
      <el-table-column prop="address" label="权限" align="center">
      </el-table-column>
      <el-table-column prop="address" label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteBanner(scope.$index)"
              type="text"
              size="small"
            >
              删除
            </el-button>
          </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "SystemBannerConfig",
  data() {
    return {
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
  methods: {
      deleteBanner() {
            this.$confirm('此操作将删除该轮播图, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '操作已取消'
          });
        });
      }
  }
};
</script>
