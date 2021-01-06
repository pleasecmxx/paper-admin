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
        <el-table-column prop="date" label="所属店铺" align="center">
        </el-table-column>
        <el-table-column
          prop="address"
          label="文件数量"
          align="center"
          width="180"
        >
        </el-table-column>
        <el-table-column prop="name" label="创建日期" align="center" width="96">
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
        <el-table-column
          prop="name"
          label="用户昵称"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户手机号"
          align="center"
          width="120"
        >
          15774186212
        </el-table-column>
        <el-table-column
          prop="name"
          label="待付款金额"
          align="center"
          width="96"
          v-if="type === 1"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="付款金额"
          align="center"
          width="96"
          v-if="type === 2 || type === 3"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="付款时间"
          align="center"
          width="96"
          v-if="type === 2 || type === 3"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="付款凭证"
          align="center"
          width="120"
          v-if="type === 2 || type === 3 || type === 3"
        >
          <template slot-scope="scope">
            <img
              class="user-table-id-card-img"
              :key="scope"
              src="https://picsum.photos/228/228?random=3aD6bceb-a5c9-c987-A7da-E031DFFCe1f7"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="付款说明"
          align="center"
          width="180"
          v-if="type === 2 || type === 3"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="核销时间"
          align="center"
          width="96"
          v-if="type === 3"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="操作"
          align="center"
          width="120"
          v-if="type === 1 || type === 2"
        >
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="showDetails(scope.$index)"
              type="text"
              size="small"
              v-if="type === 1 || type === 2"
            >
              查看
            </el-button>
            <el-button
              @click.native.prevent="closeOrder(scope.$index)"
              type="text"
              size="small"
              v-if="type === 1"
            >
              关闭
            </el-button>
            <el-button
              @click.native.prevent="writeOffOrder(scope.$index)"
              type="text"
              size="small"
              v-if="type === 2"
            >
              核销
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="l-page-jumper l-flex-row-start">
      <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination>
    </div>
    <el-dialog
      title="订单详情"
      :visible.sync="dialogShow"
      :width="isPc ? '50%' : '96%'"
      v-if="type === 1"
    >
      <unpaid-order-dialog :closeDialog="closeDialog" />
    </el-dialog>
    <el-dialog
      title="订单详情"
      :visible.sync="writeOffOrderDialogShow"
      :width="isPc ? '50%' : '96%'"
      v-if="type === 2"
      destroy-on-close
    >
      <write-off-order-dialog :closeDialog="closeDialog" />
    </el-dialog>
  </div>
</template>
<script>
import { isPC } from "./../../../../util";
import UnpaidOrderDialog from "./../dialog/UnpaidOrderDialog";
import WriteOffOrderDialog from './../dialog/WriteOffOrderDialog';
export default {
  name: "PaperOrderItem",
  props: ["type"],
  components: {
    "unpaid-order-dialog": UnpaidOrderDialog,
    'write-off-order-dialog': WriteOffOrderDialog
  },
  data() {
    return {
      isPc: isPC(),
      dialogShow: false,
      writeOffOrderDialogShow: false,
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
  methods: {
    showDetails() {
      if(this.type === 1){
          this.dialogShow = true;
      }else {
          this.writeOffOrderDialogShow = true;
      }
    },
    closeOrder(index) {
      this.$confirm('此操作将关闭该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '关闭成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '操作已取消'
          });
        });
    },
    closeDialog() {
      if(this.type === 1){
          this.dialogShow = false;
      }else {
          this.writeOffOrderDialogShow = false;
      }
    },
    writeOffOrder() {
        this.$confirm('此操作将核销该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '核销成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '操作已取消'
          });
        });
    }
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
