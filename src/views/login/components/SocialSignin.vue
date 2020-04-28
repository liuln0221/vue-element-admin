<template>
  <div class="social-signup-container">
    <!-- 微信 -->
    <div class="sign-btn" @click="wechatHandleClick">
      <span class="wx-svg-container"><svg-icon icon-class="wechat" class="icon" /></span>
      WeChat
    </div>
    <!-- QQ -->
    <div class="sign-btn" @click="tencentHandleClick">
      <span class="qq-svg-container"><svg-icon icon-class="qq" class="icon" /></span>
      QQ
    </div>
  </div>
</template>

<script>
export default {
  name: 'SocialSignin',
  methods: {
    wechatHandleClick() {
      alert('wx');
    },
    tencentHandleClick() {
      alert('qq');
    }
  }
};
</script>

<style lang="scss" scoped>
.social-signup-container {
  margin: 20px 0;
  display: flex;
  justify-content: flex-start;

  .sign-btn {
    cursor: pointer;
  }

  .icon {
    color: #fff;
    font-size: 24px;
    margin-top: 8px;
  }

  .wx-svg-container,
  .qq-svg-container {
    display: inline-block;
    width: 40px;
    height: 40px;
    text-align: center;
    border-radius: 4px;
    margin: 20px 5px 20px 0;
  }

  .wx-svg-container {
    background: #24da70;
  }

  .qq-svg-container {
    background: #6ba2d6;
    margin-left: 50px;
  }
}
</style>
