const app = getApp();

Page({
  data: {
    nomore: false,
    nodata: true,

    user: {
      id: 0,
      user_auth: 0,
      nickname: '',
      username: '',
      sex: 0,
      avatar: ''
    },
    cardset_list: [1, 2]
  },
  onLoad() {
  },
  onShow() {
    this.mydetail();
  },
  // 获取个人信息
  mydetail() {
    app.mydetail(() => {
      this.setData({
        user: {
          id: app.user_data.uid,
          user_auth: app.user_data.user_auth,
          nickname: app.user_data.nickname,
          username: app.user_data.username,
          sex: app.user_data.sex,
          avatar: app.user_data.avatar,
          tel: app.user_data.tel
        }
      });
    });
  },
  auth(e) {
    if (e.detail.userInfo) {
      wx.showLoading({
        title: '授权中',
        mask: true
      });

      app.userAuth(res => {
        wx.hideLoading();

        if (res) {
          this.mydetail();
        } else {
          app.toast('授权失败，请重新授权');
        }
      });
    }
  },
});