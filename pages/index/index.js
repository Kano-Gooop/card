const app = getApp();

Page({
  data: {
    full_loading: false,
    banner: ['/images/t-banner.jpg', '/images/t-banner.jpg', '/images/t-banner.jpg', '/images/t-banner.jpg'],

    nomore: true,
    nodata: false
  },
  onLoad() {
    app.mp_update();
  }
});
