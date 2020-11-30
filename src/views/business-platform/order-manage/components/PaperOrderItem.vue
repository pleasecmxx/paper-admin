<template>
  <div class="l-tab-item-container">
    <div class="l-tab-table-container">
      <el-table height="100%" :data="list" border style="width: 100%;">
        <el-table-column
          prop="date"
          label="订单编号"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="date"
          label="创建日期"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="address" label="标题" align="center" width="180">
        </el-table-column>
        <el-table-column prop="name" label="作者" align="center" width="96">
        </el-table-column>
        <el-table-column
          prop="name"
          label="文件名称"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column prop="name" label="支付方式" align="center" width="96">
        </el-table-column>
        <el-table-column prop="name" label="金额" align="center" width="96">
        </el-table-column>
        <el-table-column prop="name" label="订单来源" align="center" width="96">
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户头像"
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
        <el-table-column prop="name" label="用户昵称" align="center" width="96">
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户手机号"
          align="center"
          width="120"
        >
          15774186212
        </el-table-column>
        <el-table-column prop="name" label="推荐店铺" align="center" width="96">
        </el-table-column>
      </el-table>
    </div>
    <div class="l-page-jumper l-flex-row-start">
      <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "PaperOrderItem",
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
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
};
</script>

<style scoped>
.l-tab-item-container {
    /* position: absolute;
    top: 0;
    left: 0; */
    width: 100%;
    height: calc(100% - 45px);

    /* background-color: red; */

    /* overflow-y: auto; */
}
.l-tab-table-container {
    width: 100%;
    height: calc(100% - 46px);
    overflow: hidden;
}
</style>
