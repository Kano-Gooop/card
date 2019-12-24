const app = getApp();

Page({
  data: {
    nomore: true,
    nodata: false,

    user_auth: 0,

    cardset_list: [1, 2]
  },
  onLoad() {
  },
  auth(e) {
    if (e.detail.userInfo) {
      wx.showLoading({
        title: '授权中',
        mask: true
      });

      app.userAuth(this.data.inviter_id, (res) => {
        if (res) {
          app.redirect_or_switch_or_index(this.data.route);
        } else {
          app.toast('授权失败，请重新授权');
        }
      });
    }
  },
});