var WxParse = require('../../wxParse/wxParse.js');
const app = getApp();

Page({
  data: {
  },
  onLoad() {
    // rich_text = rich_text.replace(/\/ueditor\/php\/upload\//g, app.my_config.base_url + '/ueditor/php/upload/');
    WxParse.wxParse('rich_text', 'html', '<p>啦啦啦啦啦</p>', this);
  }
});