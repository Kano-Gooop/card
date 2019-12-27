const app = getApp();

Page({
  data: {
    full_loading: true,
    t_status: 3,  // 0.未支付 1.待发货 2.待收货 3.已完成 4.已评论  临时状态，写页面用
    is_ios: false,

    id: 0,
    order: {},

    show_comment: false,
    comment: '',
  },
  onLoad(options) {
    this.data.id = options.id;
    this.orderDetail(() => {
      this.setData({ full_loading: false });
    });

    this.setData({ is_ios: app.is_ios });
  },
  orderDetail(complete) {
    app.ajax('my/orderDetail', { order_id: this.data.id }, (res) => {
      app.format_img(res.child, 'cover');
      let amount = 0;
      for (let i = 0; i < res.child.length; i++) {
        amount += res.child[i].num;
      }
      res.amount = amount;
      switch (res.status) {
        case 0:
          res.status_text = '待付款';
          break;
        case 1:
          res.status_text = '待发货';
          break;
        case 2:
          res.status_text = '待收货';
          break;
        case 3:
          res.status_text = '已完成';
          break;
      }
      this.setData({ order: res });
    }, null, () => {
      if (complete) {
        complete();
      }
    });
  },
  copy() {
    let that = this;
    wx.setClipboardData({
      data: that.data.order.pay_order_sn,
      success() {
        app.toast('已复制到剪贴板');
      }
    })
  },
  bind_input(e) {
    app.bind_input(e, this);
  },
  // 显示评论框
  show_comment() {
    this.setData({ show_comment: true });
  },
  // 隐藏评论框
  hide_comment() {
    this.setData({ show_comment: false });
  }
});