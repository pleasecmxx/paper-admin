<template>
  <div class="business-content-container">
    <div style="border-radius: 4px;" class="business-content-inner">
      <div class="l-dialog-content l-page-content">
        <div class="l-dialog-row l-flex-row-start">
          <div class="l-dialog-half-row l-flex-row-start">
            <p class="min-width-text5">原密码</p>
            <el-input
              class="l-dialog-input"
              v-model="old_password"
              placeholder="请输入店铺原密码"
              type="password"
            />
          </div>
        </div>
        <div class="l-dialog-row l-flex-row-start">
          <div class="l-dialog-half-row l-flex-row-start">
            <p class="min-width-text5">现密码</p>
            <el-input
              class="l-dialog-input"
              v-model="new_password"
              placeholder="请输入现密码"
              type="password"
              :maxlength="24"
            />
          </div>
        </div>
        <div class="l-dialog-row l-flex-row-start">
          <div class="l-dialog-half-row l-flex-row-start">
            <p class="min-width-text5">确认现密码</p>
            <el-input
              class="l-dialog-input"
              v-model="re_new_password"
              placeholder="请再输入一遍现密码"
              type="password"
              :maxlength="24"
            />
          </div>
        </div>
        <div style="padding-right: 40%;" class="l-dialog-option-footer">
          <el-button
            style="width: 120px;"
            :loading="addLoading"
            @click="confirmAdd"
            type="primary"
            >保存</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../../api';

import { editPasswordApi} from './../../../api/admin-api'
import { isEmpty, validAccount } from "../../../util";
export default {
  name: "EditPassword",
  props: {
    closeDialog: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      old_password: "",
      new_password: "",
      re_new_password: "",
      addLoading: false,
    };
  },
  methods: {
    confirmAdd() {
      if (isEmpty(this.old_password)) {
        return this.$message.error("请输入原始密码");
      }
      if (isEmpty(this.new_password)) {
        return this.$message.error("请输入新密码");
      }
      if (!validAccount(this.new_password)) {
        return this.$message.error("密码格式不正确，只允许字母、数字");
      }
      if (isEmpty(this.re_new_password)) {
        return this.$message.error("请再次输入新密码");
      }
      if (this.new_password !== this.re_new_password) {
        return this.$message.error("前后两次新密码输入不一致，请重新输入");
      }
      this.addLoading = true;
      let params = {
        old_password: this.old_password,
        new_password: this.new_password,
      };
      api.post(editPasswordApi,params)
      .then(res => {
          this.addLoading = false;
          console.log("编辑密码结果",res);
          if(res.code === 200){
              this.$message.success("编辑成功")
          }else {
              this.$message.error(res.msg)
          }
      })
      .catch(err => {
          this.addLoading = false;
          console.log("编辑密码出错了，请稍后重试")
          this.$message.error('操作失败，请稍后重试')
      })
    },
  },
};
</script>

<style scoped>
.l-dialog-content {
    width: 100%;
    height: 100%;
}
.l-dialog-row {
    width: 100%;
    height: 60px;
    margin-bottom: 10px;
}
.l-dialog-half-row {
    width: 50%;
    height: 60px;

    /* background-color: #999; */
    padding-right: 12px;
}
.l-dialog-row > p,
.l-dialog-half-row > p {
    color: #5e6d82;
    margin-right: 8px;
}
.l-dialog-input {
    width: auto;
    min-width: calc(100% - 100px);
    max-height: 100px;
    overflow-x: auto;
}
.l-dialog-option-footer {
    width: 100%;

    /* height: 72px; */
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: -moz-box;
    display: -moz-flex;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding-top: 12px;
}
.l-dialog-imgae-uploader {
    width: 80%;
    min-width: calc(100% - 100px);

    /* background-color: red; */
}
.min-width-text5 {
    min-width: 72px;

    /* background-color: red; */
}
.l-page-content {
    padding: 12px 24px;
    height: calc(100% - 46px);
    font-size: 14px;
    box-sizing: border-box;
    overflow-y: auto;
}
</style>
