const app = getApp();

Page({
  data: {},
  onLoad() {
  },
  // 放大卡牌
  zoom() {
    wx.previewImage({
      current: 'https://card.psn.asia/upload/admin/goods/2019-12-23/157706270853934400768.png',
      urls: ['https://card.psn.asia/upload/admin/goods/2019-12-23/157706270853934400768.png']
    });
  }
});