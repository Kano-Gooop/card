const app = getApp();

Page({
  data: {
    full_loading: true,
    t_status: 3,  // 0.未支付 1.待发货 2.待收货 3.已完成 4.已评论  临时状态，写页面用
    is_ios: false,

    id: 0,
    order: {},

    active_odi: 0,  // 当前评论商品的 order_detail_id，用于商品评价
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
  // 订单详情
  orderDetail(complete) {
    app.ajax('my/orderDetail', { order_id: this.data.id }, (res) => {
      app.format_img(res.child, 'cover');
      app.format_time(res, 'pay_time', 'yyyy-MM-dd hh:mm');
      let amount = 0;
      for (let i = 0; i < res.child.length; i++) {
        amount += res.child[i].num;
      }
      res.amount = amount;
      this.setData({ order: res });
    }, null, () => {
      if (complete) {
        complete();
      }
    });
  },
  copy(e) {
    wx.setClipboardData({ data: e.currentTarget.dataset.text })
  },
  // 确认收货
  orderConfirm() {
    wx.showModal({
      title: '提示',
      content: '确认收货？',
      success: res => {
        if (res.confirm) {
          wx.showLoading({
            title: '确认收货...',
            mask: true
          });
          app.ajax('my/orderConfirm', { order_id: this.data.id }, () => {
            this.orderDetail();
          }, null, () => {
            wx.hideLoading();
          });
        }
      }
    });
  },
  bind_input(e) {
    app.bind_input(e, this);
  },
  // 显示评论框
  show_comment(e) {
    this.data.active_odi = e.currentTarget.dataset.active_odi;
    this.setData({
      show_comment: true,
      comment: ''
    });
  },
  // 隐藏评论框
  hide_comment() {
    this.setData({ show_comment: false });
  },
  // 下拉刷新
  onPullDownRefresh() {
    if (!this.data.loading) {
      this.data.loading = true;
      wx.showNavigationBarLoading();
      this.orderDetail(() => {
        this.data.loading = false;
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      });
    }
  },
  // 订单评价
  orderEvaluate() {
    if (!this.data.comment.trim()) {
      app.toast('评论不能为空');
    } else {
      wx.showLoading({
        title: '评论提交中...',
        mask: true
      });

      let post = {
        order_detail_id: this.data.active_odi,
        comment: this.data.comment
      };

      app.ajax('my/orderEvaluate', post, () => {
        this.setData({
          comment: '',
          show_comment: false
        }, () => {
          this.orderDetail();
        });
      }, null, () => {
        wx.hideLoading();
      });
    }
  },
  // 去物流页
  to_logistics() {
    wx.navigateTo({ url: '/pages/logistics/logistics?id=' + this.data.id });
  }
});