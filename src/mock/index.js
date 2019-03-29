import Mock from 'mockjs';

// 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send;
Mock.XHR.prototype.send = () => {
  if (this.custom.xhr) {
    this.custom.xhr.withCreadentials = this.withCreadentials || false;
  }
  this.proxy_send(...arguments);
};
