<template>
  <div class="l-dialog-content">
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">系统名称</p>
        <el-input
          class="l-dialog-input"
          v-model="name"
          placeholder="请输入系统名称"
        />
      </div>
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">标签</p>
        <el-input
          class="l-dialog-input"
          v-model="tag"
          placeholder="请输入标签"
        />
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">计费方式</p>
        <el-select v-model="billing_method" placeholder="请选择计费方式">
          <el-option
            v-for="item in billing_method_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">价格</p>
        <el-input
          class="l-dialog-input"
          v-model="price"
          placeholder="请输入价格"
          type="number"
        />
        <p style="width: 80px;" v-if="billing_method == 'char'">/千字</p>
        <p style="width: 80px;" v-else-if="billing_method == 'char10'">/万字</p>
        <p style="width: 80px;" v-else-if="billing_method == 'page'">/页</p>
        <p style="width: 80px;" v-else-if="billing_method == 'article'">/篇</p>
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start height-auto">
      <div class="l-dialog-half-row l-flex-row-start height-auto">
        <p class="min-width-text5">初始化销</p>
        <el-input
          class="l-dialog-input"
          v-model="init_sales"
          placeholder="请输入初始化销"
        />
      </div>
      <div class="l-dialog-half-row l-flex-row-start height-auto">
        <p class="min-width-text5">logo</p>
        <el-upload
          class="upload-demo"
          drag
          :action="uploaderFileUrl"
          :on-success="onUploaderSuccess"
          :on-error="onError"
          :on-progress="onProgress"
          :on-change="onFilePickerChange"
          :show-file-list="false"
          :data="uploaderFileExtraParams"
        >
          <i
            style="font-size: 32px;"
            class="el-icon-upload"
            v-if="!imageUrl.length"
          ></i>
          <div class="el-upload__text" v-if="!imageUrl.length">
            将文件拖到此处，或<em>点击上传</em>
          </div>
          <img :src="imageUrl" class="after-uploader-img" v-else />
        </el-upload>
      </div>
    </div>
    <div class="l-dialog-row l-flex-row-start">
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">渠道类型</p>
        <el-select
          v-model="franchise_channel_class"
          placeholder="请选择渠道类型"
          style="width: 100%;"
        >
          <el-option
            v-for="item in channelType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">分佣方式</p>
        <el-select
          v-model="dispatchMethod"
          placeholder="请选择分佣方式"
          style="width: 100%;"
        >
          <el-option
            v-for="item in dispatchMethodOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div
      style="margin-bottom: 18px;"
      class="l-dialog-row l-flex-row-start"
      v-if="dispatchMethod === 1"
    >
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">代理佣金</p>
        <el-input
          type="number"
          class="l-dialog-input"
          v-model="agency_commission"
          placeholder="请设定代理佣金"
        />
        <p>%</p>
        <p class="dec-text">支付额的百分比</p>
      </div>
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">店铺佣金</p>
        <el-input
          type="number"
          class="l-dialog-input"
          v-model="shop_commission"
          placeholder="请设定店铺佣金"
        />
        <p>%</p>
        <p class="dec-text">支付额的百分比</p>
      </div>
    </div>
    <div
      style="margin-bottom: 18px;"
      class="l-dialog-row l-flex-row-start"
      v-if="dispatchMethod === 2"
    >
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">代理佣金</p>
        <el-input
          type="number"
          class="l-dialog-input"
          v-model="agency_commission_price"
          placeholder="请设定代理佣金"
        />
        <p>元</p>
        <p class="dec-text">固定金额/有效订单</p>
      </div>
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">店铺佣金</p>
        <el-input
          class="l-dialog-input"
          type="number"
          v-model="shop_commission_price"
          placeholder="请设定店铺佣金"
        />
        <p>元</p>
        <p class="dec-text">固定金额/有效订单</p>
      </div>
    </div>
    <div
      class="l-dialog-row l-flex-row-start height-auto"
      style="padding-right: 18px;"
    >
      <p class="min-width-text5">简介</p>
      <el-input
        type="textarea"
        style="width: 100%;"
        :rows="4"
        class="l-dialog-input"
        v-model="desc"
        placeholder="请输入系统简介(不超过72字)"
        maxlength="72"
      />
    </div>
    <div class="l-dialog-row l-flex-row-start wenxian-height-auto">
      <div class="l-dialog-half-row l-flex-row-start wenxian-height-auto">
        <p class="min-width-text5">文献库</p>
        <el-select
          v-model="literature_library"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请输入文献库"
          style="width: 100%;"
        >
          <el-option
            v-for="item in literature_library_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="l-dialog-half-row l-flex-row-start">
        <p class="min-width-text5">产品CODE</p>
        <!-- <el-input
          class="l-dialog-input"
          type="text"
          v-model="code"
          placeholder="请设定产品代码"
        /> -->
        <el-select
          v-model="code"
          placeholder="请选择产品代码"
          style="width: 100%;"
        >
          <el-option
            v-for="item in productCodeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="l-dialog-option-footer">
      <el-button @click="cancelDialog">取 消</el-button>
      <el-button @click="onPressNext" type="primary" :loading="addLoading"
        >下一步</el-button
      >
    </div>
    <el-dialog
      title="配置加盟渠道 - 产品介绍配置"
      :visible.sync="dialogShow"
      :width="isPc ? '65%' : '96%'"
      :top="'5vh'"
      destroy-on-close
      append-to-body
    >
      <add-join-way-desc-dialog
        ref="addDialogRef"
        :isEdit="isEdit"
        :editData="editData"
        :closeDialog="closeDescDialog"
        @finish="onAddFinish"
      />
    </el-dialog>
  </div>
</template>

<script>
import { isEmpty, isPC } from "../../../../util";
import {
  comon_image_uploader,
  addChannel,
  eidtChannleApi,
} from "./../../../../api/admin-api";
import store from "@/store/index";
import api from "../../../../api";
import AddJoinWayDescDialog from "./AddJoinWayDescDialog";

export default {
  name: "AddJoinWayDialog",
  props: {
    closeDialog: {
      type: Function,
      default: null,
    },
  },
  components: {
    "add-join-way-desc-dialog": AddJoinWayDescDialog,
  },
  data() {
    return {
      isPc: isPC(),
      dialogShow: false,
      imageUrl: "",
      uploaderFileUrl: process.env.VUE_APP_API_ROOT + comon_image_uploader,
      uploaderFileExtraParams: {
        token: store.state.user.token,
      },
      name: "", //加盟系统名称
      franchise_channel_class: "", //加盟分类
      billing_method: "char", //计费方式
      tag: "", //tag
      logo: "",
      price: "",
      init_sales: "",
      desc: "",
      agency_commission: "", //代理分佣比例
      shop_commission: "", //店铺分佣比例
      agency_commission_price: "", //代理固定分佣金额
      shop_commission_price: "", //店铺佣金固定金额
      literature_library: [], //文献库
      code: "",
      literature_library_options: [],
      addLoading: false,
      activeFileTypes: [".doc", ".word", ".docx"],
      dispatchMethod: 1,
      billing_method_options: [
        {
          value: "char10",
          label: "按万字",
        },
        {
          value: "char",
          label: "按千字",
        },
        {
          value: "article",
          label: "按篇",
        },
        // {
        //   value: "page",
        //   label: "按页",
        // },
      ],
      dispatchMethodOptions: [
        {
          value: 1,
          label: "按比例分佣",
        },
        {
          value: 2,
          label: "按固定金额分佣",
        },
      ],
      channelType: [
        {
          value: 2,
          label: "优选系统",
        },
        {
          value: 1,
          label: "权威系统",
        },
      ],
      fileTypes: [
        {
          value: ".doc",
          label: ".doc",
        },
        {
          value: ".word",
          label: ".word",
        },
        {
          value: ".docx",
          label: ".docx",
        },
      ],
      productCodeOptions: [
        {
          value: "PaperOk",
          label: "PaperOk论文查重 PaperOk",
        },
        {
          value: "PaperKey",
          label: "PaperKey论文查重 PaperKey",
        },
        {
          value: "Paperright",
          label: "PaperRight论文 Paperright",
        },
        {
          value: "Writecheck",
          label: "WriteCheck论文查重 Writecheck",
        },
        {
          value: "wanfangbk",
          label: "万方查重本科版 wanfangbk",
        },
        {
          value: "wanfangsb",
          label: "万方查重硕博版 wanfangsb",
        },
      ],
      editData: null,
      isEdit: false,
    };
  },
  watch: {
    activeFileTypes: function (value, oValue) {
      console.log(value);
    },
    dispatchMethod: function (val) {
      if (val === 1) {
        //比例
        this.shop_commission_price = "";
        this.agency_commission_price = "";
      } else {
        this.agency_commission = "";
        this.shop_commission = "";
      }
    },
  },
  methods: {
    closeDescDialog() {
      this.dialogShow = false;
    },

    onAddFinish(data) {
      console.log("接收到的二级参数", data);
      this.confirmAdd(data);
    },

    setEditData(data) {
      console.log("编辑数据", data);
      this.isEdit = true;
      this.editData = data;
      this.name = data.name;
      this.tag = data.tag;
      this.billing_method = data.billing_method;
      this.init_sales = data.init_sales;
      this.literature_library = data.literature_library.split(",");
      this.code = data.code;
      this.logo = data.logo;
      this.price = data.price;
      this.desc = data.desc;
      this.agency_commission = data.agency_commission; //两种分佣方式数据都回显上去
      this.agency_commission_price = data.agency_commission_price;
      this.shop_commission_price = data.shop_commission_price;
      this.shop_commission = data.shop_commission;
      this.imageUrl = data.logo;
      this.franchise_channel_class = data.franchise_channel_class;
      this.dispatchMethod = data.commission_type;
    },
    onUploaderSuccess(e) {
      if (e.code === 200) {
        this.imageUrl = e.data.list[0].url;
        this.logo = e.data.list[0].url;
        this.$message.success("图片上传成功！");
      } else {
        this.$message.error(e.msg);
      }
    },

    onError(e) {
      console.log("文件上传失败");
      this.$message.error("文件上传失败");
    },

    onProgress(e) {},

    onFilePickerChange(e) {},

    cancelDialog() {
      this.closeDialog();
    },

    onPressNext() {
      if (isEmpty(this.name)) {
        return this.$message.error("请输入系统名称");
      }
      if (isEmpty(this.tag)) {
        return this.$message.error("请输入系统标签");
      }
      if (isEmpty(this.price)) {
        return this.$message.error("请设置价格");
      }
      if (this.dispatchMethod === 1) {
        if (isEmpty(this.agency_commission)) {
          return this.$message.error("请设置代理佣金占比");
        }
        if (isEmpty(this.shop_commission)) {
          return this.$message.error("请设置店铺佣金占比");
        }
      } else {
        if (isEmpty(this.agency_commission_price)) {
          return this.$message.error("请设置代理固定佣金");
        }
        if (isEmpty(this.shop_commission_price)) {
          return this.$message.error("请设置店铺固定佣金");
        }
      }
      if (isEmpty(this.desc)) {
        return this.$message.error("请输入系统描述文字");
      }
      if (isEmpty(this.logo)) {
        return this.$message.error("请先上传图片");
      }
      if (isEmpty(this.franchise_channel_class)) {
        return this.$message.error("请选择渠道分类");
      }
      if (isEmpty(this.code)) {
        return this.$message.error("请设定产品代码");
      }
      if (
        isEmpty(this.literature_library) ||
        this.literature_library.length === 0
      ) {
        return this.$message.error("请输入系统文献库");
      }
      this.dialogShow = true;
    },

    confirmAdd(params) {
      let _this = this;
      if (isEmpty(this.name)) {
        return this.$message.error("请输入系统名称");
      }
      if (isEmpty(this.tag)) {
        return this.$message.error("请输入系统标签");
      }
      if (isEmpty(this.price)) {
        return this.$message.error("请设置价格");
      }
      if (this.dispatchMethod === 1) {
        if (isEmpty(this.agency_commission)) {
          return this.$message.error("请设置代理佣金占比");
        }
        if (isEmpty(this.shop_commission)) {
          return this.$message.error("请设置店铺佣金占比");
        }
      } else {
        if (isEmpty(this.agency_commission_price)) {
          return this.$message.error("请设置代理固定佣金");
        }
        if (isEmpty(this.shop_commission_price)) {
          return this.$message.error("请设置店铺固定佣金");
        }
      }
      if (isEmpty(this.desc)) {
        return this.$message.error("请输入系统描述文字");
      }
      if (isEmpty(this.logo)) {
        return this.$message.error("请先上传图片");
      }
      if (isEmpty(this.franchise_channel_class)) {
        return this.$message.error("请选择渠道分类");
      }
      if (isEmpty(this.code)) {
        return this.$message.error("请设定产品代码");
      }
      if (
        isEmpty(this.literature_library) ||
        this.literature_library.length === 0
      ) {
        return this.$message.error("请输入系统文献库");
      }
      this.addLoading = true;
      let data = {
        name: this.name,
        franchise_channel_class: this.franchise_channel_class,
        billing_method: this.billing_method,
        tag: this.tag,
        logo: this.logo,
        price: this.price,
        init_sales: this.init_sales,
        desc: this.desc,
        literature_library: this.literature_library.toString(),
        commission_type: this.dispatchMethod,
        code: this.code,
      };
      data.details = JSON.stringify(params.details);
      data.demo_report = JSON.stringify(params.demo_report);
      data.question = JSON.stringify(params.question);
      data.uploader_methods = params.uploader_method;
      if (this.dispatchMethod === 1) {
        data.agency_commission = this.agency_commission;
        data.shop_commission = this.shop_commission;
      } else {
        data.agency_commission_price = this.agency_commission_price;
        data.shop_commission_price = this.shop_commission_price;
      }
      let request_api = addChannel;
      if (this.isEdit) {
        request_api = eidtChannleApi;
        data.id = this.editData.id;
      }
      console.log("data", data);
      api
        .post(request_api, data)
        .then((res) => {
          console.log(res);
          if (res.code === 200) {
            _this.closeDialog();
            _this.addLoading = false;
            _this.$message.success("创建成功！");
            _this.$emit("finish");
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.addLoading = false;
          console.log(err);
          this.$message.error(err);
        });
      //   this.closeDialog();
    },
  },
};
</script>

<style scoped>
.l-dialog-content {
    width: 100%;
    height: 100%;
    overflow-y: auto;
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
    text-align: right;

    /* background-color: red; */
}
.wenxian-height-auto {
    height: auto !important;
    max-height: 400px !important;
    overflow-y: auto;
}
</style>
