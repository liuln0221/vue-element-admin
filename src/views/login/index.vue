<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      class="login-form"
      :model="loginForm"
      :rules="loginRules"
      autocomplete="on"
      label-position="left"
    >
      <!-- 国际化切换 -->
      <div class="title-container">
        <h3 class="title">{{ $t('login.title') }}</h3>
        <lang-select class="set-language" />
      </div>
      <!-- 用户名 -->
      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          :placeholder="$t('login.username')"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        >
          <svg-icon slot="prefix" icon-class="user" />
        </el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            :placeholder="$t('login.password')"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          >
            <svg-icon slot="prefix" icon-class="password" />
            <svg-icon
              slot="suffix"
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
              @click="showPwd"
            />
          </el-input>
        </el-form-item>
      </el-tooltip>

      <!-- 登录按钮 -->
      <el-button :loading="loading" type="primary" class="login" @click.native.prevent="handleLogin">
        {{ $t('login.logIn') }}
      </el-button>

      <!-- 描述 -->
      <el-row class="tips">
        <el-col :span="12" class="tips__username">
          <el-row>
            <el-col :span="12">{{ $t('login.username') }} : admin</el-col>
            <el-col :span="12">{{ $t('login.password') }} : {{ $t('login.any') }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="12">{{ $t('login.username') }} : editor</el-col>
            <el-col :span="12">{{ $t('login.password') }} : {{ $t('login.any') }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" @click="showDialog = true">{{ $t('login.thirdparty') }}</el-button>
        </el-col>
      </el-row>
    </el-form>

    <!-- 第三方登录 -->
    <el-dialog :title="$t('login.thirdparty')" :visible.sync="showDialog">
      {{ $t('login.thirdpartyTips') }}
      <social-sign />
    </el-dialog>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate';

import LangSelect from '@/components/LangSelect';
import SocialSign from './components/SocialSignin';

export default {
  name: 'Login',
  components: { LangSelect, SocialSign },
  data() {
    /**
     * 用户名校验
     */
    const validateUsername = (rule, value, callBack) => {
      if (!validUsername(value)) {
        callBack(new Error('Please enter the correct user name'));
      } else {
        callBack();
      }
    };

    /**
     * 密码校验
     */
    const validatePassword = (rule, value, callBack) => {
      if (value.length < 6) {
        callBack(new Error('The password can not be less than 6 digits'));
      } else {
        callBack();
      }
    };

    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus();
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus();
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }

      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z');
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery });
              this.loading = false;
            }).catch(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    }
  }
};
</script>

<style lang="scss" scoped>
$bg: #2b3a4b;
$light_gray: #fff;
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;

      /deep/.el-input{

        .el-input__inner {
          padding-left: 45px;
          padding-right: 15px;

          background: transparent;
          border: 0;
          border-radius: 0;
          color: $light_gray;
          height: 47px;
        }

        .el-input__prefix {
          line-height: 47px;
          vertical-align: middle;

          svg {
            color: #889aa4;
            width: 30px;
          }
        }

        .el-input__suffix {
          line-height: 47px;
          vertical-align: middle;

          svg {
            color: #889aa4;
            margin-right: 10px;
            cursor: pointer;
          }
        }
      }
    }

    .login {
      width: 100%;
      margin-bottom: 30px;
    }

    .tips {
      display: flex;
      justify-content: space-between;
      color: #fff;
      font-size: 14px;

      .tips__username {
        .el-row {
          margin-bottom: 10px;
        }
      }

      .el-button {
        float: right;
      }
    }
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0;
      cursor: pointer;
    }
  }
}
</style>
