<template>
  <!-- 普通用户管理 -->
  <div class="business-content-container">
    <div class="business-content-inner">
      <div class="search-row l-flex-row-start">
        <el-input
          class="l-search-input"
          v-model="agentSearchName"
          placeholder="请输入代理名称"
        />
        <el-input
          class="l-search-input"
          v-model="agentSearchPhoneNumber"
          maxlength="11"
          type="number"
          placeholder="请输入代理手机号"
        />
        <el-button @click="handleSearch" type="primary" icon="el-icon-search"
          >搜索</el-button
        >
        <el-button type="success" @click="dialogShow = true" icon="el-icon-plus"
          >添加</el-button
        >
      </div>
      <div class="l-table-content">
        <el-table :data="list" border style="width: 100%;">
          <el-table-column
            prop="account_number"
            label="代理编号"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="代理名称"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="phone_number"
            label="代理手机号"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="name" label="代理身份证号" align="center">
          </el-table-column>
          <el-table-column prop="name" label="代理身份证复印件" align="center">
            <template slot-scope="scope">
              <el-image
                class="user-table-id-card-img"
                :src="
                  scope.row.id_card_photos[0]
                    ? scope.row.id_card_photos[0].url
                    : 'https://'
                "
                :preview-src-list="
                  scope.row.id_card_photos[0]
                    ? [scope.row.id_card_photos[0].url]
                    : []
                "
              >
              </el-image>
            </template>
          </el-table-column>
          <el-table-column label="累计总佣金" align="center">
            <template slot-scope="scope">
              <p>¥{{ Number(scope.row.cumulative_commission).toFixed(2) }}</p>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="l-page-jumper l-flex-row-start">
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="添加代理"
      :visible.sync="dialogShow"
      :width="isPc ? '45%' : '96%'"
    >
      <add-agent-dialog :closeDialog="closeDialog" />
    </el-dialog>
  </div>
</template>

<script>
import { isPC } from "./../../../util/index";
import AddAgentDialog from "./dialog/AddAgentDialog";
import api from "./../../../api";
import { platform_user_manage_agent_list } from "./../../../api/admin-api";

export default {
  name: "UserManage",
  components: {
    "add-agent-dialog": AddAgentDialog,
  },
  data() {
    return {
      isPc: isPC(),
      dialogShow: false,
      page: 1,
      list: [],
      agentSearchName: "",
      agentSearchPhoneNumber: "",
    };
  },
  created() {
    // console.log("1111");
    let params = {
      page: this.page,
    };
    api
      .get(platform_user_manage_agent_list, {
        params: params,
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
  methods: {
    closeDialog() {
      this.dialogShow = false;
    },
    handleSearch() {
      let params = {
        page: 1,
        phone_number: this.agentSearchPhoneNumber,
        name: this.agentSearchName,
      };
      api
        .get(platform_user_manage_agent_list, {
          params: params,
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
  },
};
</script>

<style scoped>
.business-content-container {
    width: 100%;
    min-height: 100%;
}
</style>
