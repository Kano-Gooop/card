const app = getApp();

Page({
  data: {
    temp_arr: [],

    poster: '',

    il_height: 0,  // iinvite-list的高度
    modal_show: false,  // 被邀请人详情
    show_set_btn: false
  },
  onLoad() {
    this.setData({ temp_arr: app.empty_arr(20) });
  },
  // 给 iinvite-list 设置高度
  set_iL_wh() {
    const query = wx.createSelectorQuery();
    query.select('.il-wrapper').boundingClientRect(res => {
      this.setData({ il_height: res.height });
    }).exec();
  },
  // 显示被邀请框
  show_modal() {
    this.setData({ modal_show: true }, () => {
      this.set_iL_wh();
    });
  },
  // 关闭被邀请框
  hide_modal() {
    this.setData({ modal_show: false });
  },
  // 关闭授权菜单按钮
  hide_set_btn() {
    this.setData({ show_set_btn: false })
  }
});