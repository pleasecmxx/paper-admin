<template>
  <div class="l-dialog-content">
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">文章标题</p>
        <el-input
          class="l-dialog-input"
          v-model="title"
          placeholder="请输入文章标题"
          clearable
        />
      </div>
      <div class="l-dialog-half-row l-flex-row-start">
        <p>所属分类</p>
        <el-input
          class="l-dialog-input"
          v-model="type"
          placeholder="请选择所属分类"
          clearable
        />
      </div>
    </div>
    <div class="edit-content">
      <editor :setting="{ min_height: 500,max_height: 500 }" v-model="content" />
    </div>
    <div class="l-dialog-option-footer">
      <el-button @click="cancelDialog">取 消</el-button>
      <el-button @click="confirmAdd" type="primary">确 认</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddJoinWayDialog",
  props: {
    closeDialog: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      title: "",
      type: "",
      content: "",
    };
  },
  methods: {
    cancelDialog() {
      this.closeDialog();
    },
    confirmAdd() {
      console.log(this.content);
      this.closeDialog();
    },
  },
};
</script>

<style scoped>
.edit-content {
    position: relative;
    width: 100%;
    height: 500px;
}
.l-dialog-content {
    position: relative;
    width: 100%;
    height: 100%;
}
.test {
    height: 400px !important;
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
</style>
