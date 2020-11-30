<template>
  <div class="l-dialog-content">
    <div style="height: 24px;" class="l-dialog-row l-flex-row-start">
      <div style="height: 24px;" class="l-dialog-half-row l-flex-row-start">
        <p>订单编号</p>
        <p>HT807070709790707079</p>
      </div>
      <div style="height: 24px;" class="l-dialog-half-row l-flex-row-start">
        <p>创建日期</p>
        <p>2020-12-12 10:00</p>
      </div>
    </div>
    <el-table height="100%" :data="list" border style="width: 100%;">
      <el-table-column prop="date" label="文件名称" align="center">
      </el-table-column>
      <el-table-column prop="date" label="页数" width="96" align="center">
      </el-table-column>
      <el-table-column prop="date" label="纸张" width="120" align="center">
      </el-table-column>
      <el-table-column prop="date" label="色彩" width="120" align="center">
      </el-table-column>
      <el-table-column prop="date" label="打印份数" width="96" align="center">
      </el-table-column>
      <el-table-column prop="date" label="价格" width="96" align="center">
      </el-table-column>
    </el-table>
    <div class="price-row l-flex-row-end">
        <p>
            <span style="font-size: 16px;">合计金额&nbsp;</span>
            ¥55.00
        </p>
    </div>
    <div class="l-dialog-option-footer">
      <el-button @click="cancelDialog">取 消</el-button>
      <el-button @click="closeOrder" type="primary">关 闭</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "UnpaidOrderDialog",
  props: {
      closeDialog: {
          type: Function,
          default: null
      }
  },
  data() {
    return {
      list: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
    };
  },
  methods: {
      cancelDialog() {
          this.closeDialog();
      },
      closeOrder() {
          this.$confirm('此操作将关闭该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '关闭成功!'
          });
          this.closeDialog();
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

<style scoped>
.price-row {
    width: 100%;
    padding-top: 16px;
}
.price-row > p {
    font-size: 32px;
    color: #333;
    margin: 0;
    line-height: 32px;
    text-align: right;
}
</style>
