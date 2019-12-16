const app = getApp();
var WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
    id: 0,
    goods: {
      "id": 170,
      "name": "创意文创产品北京天坛水晶建筑模型旅游纪念品家居装饰品摆件",
      "detail": "<p style=\"margin-top: 0px; margin-bottom: 0px; padding: 0px; line-height: 1.5; clear: both;\"><img alt=\"undefined\" src=\"/ueditor/php/upload/image/20191023/1571803073368965.jpg\" max-width=\"990\" style=\"border: none; visibility: visible; vertical-align: bottom; max-width: 990px; zoom: 1;\"/><br/><img alt=\"undefined\" src=\"/ueditor/php/upload/image/20191023/1571803073312623.jpg\" max-width=\"990\" style=\"border: none; visibility: visible; vertical-align: bottom; max-width: 990px; zoom: 1;\"/><br/><img alt=\"undefined\" src=\"/ueditor/php/upload/image/20191023/1571803073243939.jpg\" max-width=\"990\" style=\"border: none; visibility: visible; vertical-align: bottom; max-width: 990px; zoom: 1;\"/><br/><img alt=\"undefined\" src=\"/ueditor/php/upload/image/20191023/1571803073316061.jpg\" max-width=\"990\" style=\"border: none; visibility: visible; vertical-align: bottom; max-width: 990px; zoom: 1;\"/><br/><img alt=\"undefined\" src=\"/ueditor/php/upload/image/20191023/1571803073636457.jpg\" max-width=\"990\" style=\"border: none; visibility: visible; vertical-align: bottom; max-width: 990px; zoom: 1;\"/><br/><img alt=\"undefined\" src=\"/ueditor/php/upload/image/20191023/1571803074523862.jpg\" max-width=\"990\" style=\"border: none; visibility: visible; vertical-align: bottom; max-width: 990px; zoom: 1;\"/><br/><img alt=\"undefined\" src=\"/ueditor/php/upload/image/20191023/1571803074595481.jpg\" max-width=\"990\" style=\"border: none; visibility: visible; vertical-align: bottom; max-width: 990px; zoom: 1;\"/><br/><img alt=\"undefined\" src=\"/ueditor/php/upload/image/20191023/1571803074691943.jpg\" max-width=\"990\" style=\"border: none; visibility: visible; vertical-align: bottom; max-width: 990px; zoom: 1;\"/><br/><img alt=\"undefined\" src=\"/ueditor/php/upload/image/20191023/1571803074976527.jpg\" max-width=\"990\" style=\"border: none; visibility: visible; vertical-align: bottom; max-width: 990px; zoom: 1;\"/><br/><img alt=\"详情_10\" src=\"/ueditor/php/upload/image/20191023/1571803074360191.jpg\" max-width=\"990\" style=\"border: none; visibility: visible; vertical-align: bottom; max-width: 990px; zoom: 1;\"/><br/>价格说明<br/></p><ul style=\"margin: 0px; padding: 0px;\" class=\" list-paddingleft-2\"><hr style=\"margin: 5px 0px 15px; padding: 0px; border-top: none; border-right: none; border-bottom: 2px solid rgb(221, 221, 221); border-left: none; border-image: initial; height: 1px;\"/><li><p>一般情况下：</p></li><li><p>划线价格：划线的价格可能是商品的销售指导价或该商品的曾经展示过的销售价等，并非原价，仅供参考。<br/>未划线价格：未划线的价格是商品在阿里巴巴中国站上的销售标价，具体的成交价格根据商品参加活动，或因用户使用优惠券等发生变化，最终以订单结算页价格为准。</p></li><li><p>活动预热状态下：</p></li><li><p>划线价格：划线的价格是商品在目前活动预热状态下的销售标价，并非原价，具体的成交价可能因用户使用优惠券等发生变化，最终以订单结算页价格为准。<br/>未划线价格：未划线的价格可能是商品即将参加活动的活动价，仅供参考，具体活动时的成交价可能因用户使用优惠券等发生变化，最终以活动是订单结算页价格为准。</p></li><li><p>伙拼折上折活动状态下：</p></li><li><p>该商品（部分规格除外）在伙拼折上折活动期间内，买家可享受伙拼折上折活动优惠价格（该价格较同时期伙拼日常活动价格更优惠）。</p></li></ul><p><span class=\"tips\" style=\"color: rgb(255, 96, 0);\">*注：前述说明仅当出现价格比较时有效。若商家单独对划线价格进行说明的，以商家的表述为准。</span></p><p><br/></p>",
      "origin_price": "590.00",
      "price": "590.00",
      "pics": [
        "upload/goods/157180300529381000771.jpg",
        "upload/goods/157180302159654100799.jpg",
        "upload/goods/157180303270663400421.jpg"
      ],
      "carriage": "10.00",
      "stock": 972,
      "sales": 28,
      "use_attr": 0,
      "attr": "默认",
      "hot": 0,
      "limit": 10,
      "uid": 414,
      "nickname": "上海鼎晶礼品有限公司",
      "avatar": "upload/avatar/157137555866104800285.jpg",
      "org": "上海鼎晶礼品有限公司",
      "level": 1,
      "attr_list": []
    },
    rich_text: {},
    add_loading: false,  // 加入购物车loading
    attr_show: false,
    attr_active: false,
    attr_index: 0,  // 选中的参数索引，默认为第一个
    buy_type: 1, // 1.购买 2.购物车
    amount: 0  // 购买数量
  },
  onLoad(options) {
    this.data.id = options.id;

    // 海报二维码
    drawQrcode({
      width: 150,
      height: 150,
      correctLevel: 1,
      canvasId: 'qrcode',
      text: 'http://caves.wcip.net/shop-detail?id=' + options.id
    });

    this.goodsDetail();
  },
  // 商品详情
  goodsDetail() {
    let post = {
      id: this.data.id,
      token: app.user_data.token
    };

    app.ajax('shop/goodsDetail', post, (res) => {
      // for (let i = 0; i < res.pics.length; i++) {
      //   res.pics[i] = app.my_config.base_url + '/' + res.pics[i];
      // }
      app.format_img(res.pics);
      app.avatar_format(res);
      this.setData({ goods: res });
      let rich_text = res.detail;
      rich_text = rich_text.replace(/\/ueditor\/php\/upload\//g, app.my_config.base_url + '/ueditor/php/upload/');
      WxParse.wxParse('rich_text', 'html', rich_text, this);
    });
  },
  // 点击购买
  buy() {
    let data = this.data;

    if (data.goods.stock === 0) {
      app.toast('该商品已告罄！');
    } else {
      let amount;
      if (data.goods.use_attr === 1) {
        if (data.amount === 0) {
          amount = data.goods.attr_list[data.attr_index].stock !== 0 ? 1 : 0;
        } else {
          amount = data.amount;
        }
      } else {
        amount = data.amount || 1;
      }

      this.setData({
        attr_show: true,
        buy_type: 1,
        amount: amount
      }, () => {
        this.setData({ attr_active: true });
      });
    }
  },
  // 点击加入购物车
  cartAdd() {
    let data = this.data;

    if (this.data.goods.stock === 0) {
      app.toast('该商品已告罄！');
    } else {
      let amount;
      if (data.goods.use_attr === 1) {
        if (this.data.amount === 0) {
          amount = data.goods.attr_list[data.attr_index].stock !== 0 ? 1 : 0;
        } else {
          amount = data.amount;
        }
      } else {
        amount = data.amount || 1;
      }

      this.setData({
        attr_show: true,
        buy_type: 2,
        amount: amount
      }, () => {
        this.setData({ attr_active: true });
      });
    }
  },
  // 购买或加入购物车，取决于buy_type的值
  buy_btn() {
    if (this.data.buy_type === 1) {
      if (this.data.amount === 0) {
        app.toast('请至少选择一件商品');
      } else {
        let data = this.data;
        let attr_id;
        if (data.goods.use_attr === 1) {
          attr_id = data.goods.attr_list[data.attr_index].id;
        } else {
          attr_id = 1;
        }
        wx.redirectTo({ url: '/pages/order-create/order-create?id=' + data.id + '&num=' + data.amount + '&attr_id=' + attr_id })
      }
    } else {
      if (this.data.amount === 0) {
        app.toast('请至少选择一件商品');
      } else {
        if (!this.data.add_loading) {
          this.data.add_loading = true;

          let data = this.data;
          let post = {
            token: app.user_data.token,
            goods_id: data.id,
            num: data.amount
          };

          if (data.goods.use_attr === 1) {
            post.attr_id = data.goods.attr_list[data.attr_index].id;
          }

          app.ajax('shop/cartAdd', post, () => {
            let set_data = {
              attr_show: false,
              attr_active: false,
              attr_index: 0,
              amount: 0,
              ['goods.stock']: data.goods.stock - data.amount
            };

            if (data.goods.use_attr === 1) {
              set_data['goods.attr_list[' + data.attr_index + '].stock'] = data.goods.attr_list[data.attr_index].stock - data.amount;
            }

            this.setData(set_data);
            app.toast('已加入购物车~');

            let shop_page = app.get_page('pages/shop/shop');
            if (shop_page) {
              shop_page.cartList();
            }
          }, (err) => {
            app.toast(err.message);
          }, () => {
            this.data.add_loading = false;
          });
        }
      }
    }
  },
  // 去我的购物车
  to_shop_car() {
    wx.navigateTo({ url: '/pages/shop-car/shop-car' });
  },
  // 隐藏参数框
  hide() {
    this.setData({
      attr_show: false,
      attr_active: false
    });
  },
  // 增加
  add() {
    let data = this.data;
    if (data.goods.use_attr === 1) {
      if (data.amount === data.goods.limit || data.amount === data.goods.attr_list[data.attr_index].stock) {
        if (data.amount === data.goods.limit) {
          app.toast('该商品最多限购' + data.goods.limit + '件哦');
        } else {
          app.toast('已经没有这么多商品了');
        }
      } else {
        this.setData({ amount: data.amount + 1 });
      }
    } else {
      if (data.amount === data.goods.limit || data.amount === data.goods.stock) {
        if (data.amount === data.goods.limit) {
          app.toast('该商品最多限购' + data.goods.limit + '件哦');
        } else {
          app.toast('已经没有这么多商品了');
        }
      } else {
        this.setData({ amount: data.amount + 1 });
      }
    }
  },
  // 减少
  sub() {
    let data = this.data;
    if (this.data.amount !== 1) {
      this.setData({ amount: data.amount - 1 });
    }
  },
  // 选择参数
  attr_choose(e) {
    let index = e.currentTarget.dataset.index;
    let data = this.data;
    if (data.goods.attr_list[index].stock === 0) {
      app.toast('该商品已告罄！');
    } else if (data.goods.attr_list[index].stock < data.amount) {
      app.toast('“' + data.goods.attr_list[index].value + '”只有' + data.goods.attr_list[index].stock + '件了');
      this.setData({
        amount: data.goods.attr_list[index].stock,
        attr_index: index
      });
    } else {
      this.setData({ attr_index: index });
    }
  },
  // 去他人主页
  to_person() {
    app.page_open(() => {
      wx.navigateTo({ url: '/pages/person-page/person-page?uid=' + this.data.goods.uid });
    });
  },
  // 分享
  onShareAppMessage() {
    wx.showShareMenu();
    return { path: app.share_path() };
  }
});