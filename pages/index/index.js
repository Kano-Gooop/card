const app = getApp();

Page({
  data: {
    full_loading: false,
    banner: ['/images/t-banner.png', '/images/t-banner.png', '/images/t-banner.png', '/images/t-banner.png'],

    nomore: true,
    nodata: false
  },
  onLoad() {
    app.mp_update();
  }
});
