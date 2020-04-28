import request from '@/utils/request';

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  });
}

export function login(data) {
  return request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
  });
}
