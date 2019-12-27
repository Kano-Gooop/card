var WxParse = require('../../wxParse/wxParse.js');
const app = getApp();

Page({
  data: {
  },
  onLoad() {
    this.gameRule();
  },
  gameRule() {
    app.ajax('api/gameRule', null, res => {
      let rich_text = app.rich_handle(res.content);
      WxParse.wxParse('rich_text', 'html', rich_text, this);
    });
  }
});