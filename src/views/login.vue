<template>
  <div>
    <swiper :options="bgSwiperOption" class="swiper-no-swiping bg-banner">
      <swiper-slide class="item item1" />
      <swiper-slide class="item item2" />
      <swiper-slide class="item item3" />
    </swiper>
    <div id="login-box">
      <div class="flex-container">
        <swiper :options="swiperOption" class="banner">
          <swiper-slide v-for="(item, index) in banner" :key="index">
            <img class="item" :src="item" />
          </swiper-slide>
        </swiper>
      </div>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        size="default"
        class="flex-container login-form"
        auto-complete="on"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">{{ title }}管理后台v1.0</h3>
        </div>
        <div>
          <el-form-item prop="account">
            <el-input
              ref="name"
              v-model="form.account"
              :placeholder="$t('app.account')"
              type="text"
              tabindex="1"
              auto-complete="on"
            >
              <svg-icon slot="prefix" name="user" />
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              ref="password"
              v-model="form.password"
              :type="passwordType"
              :placeholder="$t('app.password')"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            >
              <svg-icon slot="prefix" name="password" />
              <svg-icon
                slot="suffix"
                :name="passwordType === 'password' ? 'eye' : 'eye-open'"
                @click="showPassword"
              />
            </el-input>
          </el-form-item>
        </div>
        <el-checkbox v-model="form.remember">记住我</el-checkbox>
        <el-button
          :loading="loading"
          type="primary"
          size="default"
          style="width: 100%;"
          @click.native.prevent="handleLogin"
          >{{ $t("app.login") }}</el-button
        >
        <!-- <div>
          演示帐号一键登录：<span
            style="padding: 0 5px; cursor: pointer; color: #666;"
            @click="testAccount('admin')"
            >admin</span
          >或<span
            style="padding: 0 5px; cursor: pointer; color: #666;"
            @click="testAccount('test')"
            >test</span
          >
        </div> -->
      </el-form>
    </div>
    <Copyright />
  </div>
</template>

<script>
import Vue from "vue";
import {
  Swiper as SwiperClass,
  Pagination,
  Mousewheel,
  Autoplay,
  EffectFade,
} from "swiper/swiper.esm";
import getAwesomeSwiper from "vue-awesome-swiper/dist/exporter";
SwiperClass.use([Pagination, Mousewheel, Autoplay, EffectFade]);
Vue.use(getAwesomeSwiper(SwiperClass));
const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass);
import "swiper/swiper-bundle.css";

export default {
  name: "Login",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      title: process.env.VUE_APP_TITLE,
      bgSwiperOption: {
        init: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        loop: true,
        effect: "fade",
      },
      swiperOption: {
        init: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        loop: true,
      },
      banner: [
        "https://i.loli.net/2020/04/21/B2ThI5N6UZlxMwr.png",
        "https://i.loli.net/2020/04/21/A1cvYsQeXfTDoJx.png",
        "https://i.loli.net/2020/04/21/5URp2Ge6YVEcfS1.png",
      ],
      form: {
        account: localStorage.login_account || "",
        password: "",
        remember: !!localStorage.login_account,
      },
      rules: {
        account: [{ required: true, trigger: "blur", message: "请输入用户名" }],
        password: [
          { required: true, trigger: "blur", message: "请输入密码" },
          { min: 6, max: 18, trigger: "blur", message: "密码长度为6到18位" },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created() {
  },

  methods: {
    compare(a, b) {
      console.log(a, b, a > b);
      if (a > b) {
        return 1;
      } else {
        return -1;
      }
    },

    showPassword() {
      this.passwordType = this.passwordType === "password" ? "" : "password";
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.form)
            .then((res) => {
              console.log(res);
              this.loading = false;
              if (res === "ok") {
                this.form.remember &&
                  localStorage.setItem("login_account", this.form.account);
                console.log("redirect", this.redirect);
                this.$router.push({ path: this.redirect || "/" });
              } else {
              }
            })
            .catch(() => {
              this.loading = false;
            });
        }
      });
    },
    testAccount(account) {
      this.form.account = account;
      this.form.password = "123456";
      this.handleLogin();
    },
  },
};
</script>

<style lang="scss" scoped>
[data-mode="mobile"] {
    #login-box {
        max-width: 80%;
        .flex-container:first-child {
            display: none;
        }
    }
}
::v-deep input[type="password"]::-ms-reveal {
    display: none;
}
.bg-banner {
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    .item {
        background-size: cover;
        &1 {
            background-image: url(../assets/images/login/bg1.jpg);
        }
        &2 {
            background-image: url(../assets/images/login/bg2.jpg);
        }
        &3 {
            background-image: url(../assets/images/login/bg3.jpg);
        }
    }
}
#login-box {
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: rgba(255, 255, 255, 0.8);
    height: 400px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 5px #999;
    .flex-container {
        width: 400px;
    }
    .banner {
        opacity: 0.9;
        .item {
            width: 400px;
            height: 400px;
        }
    }
    .login-form {
        width: 450px;
        padding: 50px 35px 0;
        overflow: hidden;
        .svg-icon {
            vertical-align: -0.35em;
        }
        .title-container {
            position: relative;
            .title {
                font-size: 22px;
                color: #666;
                margin: 0 auto 30px;
                text-align: center;
                font-weight: bold;
                @include text-overflow;
            }
        }
    }
    ::v-deep .el-input {
        display: inline-block;
        height: 48px;
        width: 100%;
        input {
            height: 48px;
        }
        .el-input__prefix {
            left: 10px;
        }
        .el-input__suffix {
            right: 10px;
        }
    }
    .el-checkbox {
        margin: 20px 0;
    }
}
.copyright {
    position: absolute;
    bottom: 30px;
    width: 100%;
    margin: 0;
    mix-blend-mode: difference;
}
</style>
