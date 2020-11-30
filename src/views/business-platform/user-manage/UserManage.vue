<template>
  <!-- 普通用户管理 -->
  <div class="business-content-container">
    <div class="business-content-inner">
      <div class="search-row l-flex-row-start">
        <el-input
          class="l-search-input"
          v-model="userName"
          placeholder="请输入用户名称"
        />
        <el-input
          class="l-search-input"
          v-model="userTel"
          maxlength="11"
          type="number"
          placeholder="请输入用户手机号"
        />
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="l-table-content">
        <el-table :data="list" border style="width: 100%;">
          <el-table-column prop="date" label="用户编号" width="180" align="center">
          </el-table-column>
          <el-table-column prop="name" label="头像" width="100" align="center">
            <template slot-scope="scope">
             <img class="user-table-header-img" :key="scope" src="https://picsum.photos/228/228?random=3aD6bceb-a5c9-c987-A7da-E031DFFCe1f7"/>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="用户手机号" align="center"> </el-table-column>
          <el-table-column prop="name" label="注册时间" align="center"> </el-table-column>
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
export default {
  name: "UserManage",
  data() {
    return {
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
      userName: "",
      userTel: "",
    };
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
