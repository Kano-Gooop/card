const app = getApp();

Page({
  data: {
    full_loading: true,
    route: '',
    inviter_id: 0
  },
  onLoad(options) {
    if (options.route) {
      this.data.route = decodeURIComponent(options.route);
    } else if (options.q) {
      this.data.route = this.q_format(options.q);
    }

    wx.setStorageSync('inviter_id', options.scene || 0);

    app.login((res) => {
      app.user_data.token = res.token;

      app.redirect_or_switch_or_index(this.data.route);

      // 用户角色信息保存
      // app.set_user_data();
    });
  },
  // 格式化通过二维码扫描进来的链接
  q_format(q) {
    q = decodeURIComponent(q);
    q = q.replace(app.my_config.base_url + '/', '').split('?');
    let page = q[0], search = q[1];

    return search ? `pages/${page}/${page}?${search}` : `pages/${page}/${page}`;
  }
});