const app = getApp();

Page({
    data: {
      temp_arr: [],

      poster: '',
      poster_show: false,

      il_height: 0,  // iinvite-list的高度
      modal_show: false,  // 被邀请人详情
      show_set_btn: false
    },
    onLoad() {
      this.setData({ temp_arr: app.empty_arr(20) });

      this.create_poster();
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
    // 生成海报
    create_poster() {
      let promise1 = new Promise((resolve, reject) => {
        wx.getImageInfo({
          src: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqSIJibzjcxlUuahhmKCQJMB0icG66ia922MR7Bf4YkD4AU0H6zEK8FIsbdrJfGCAhv5g1CL70R5t06g/132',
          success: res => {
            resolve(res);
          }
        })
      });

      Promise.all([
        promise1
      ]).then(p_res => {
        let header = p_res[0];

        // 创建canvas
        var canvas = wx.createCanvasContext('poster-canvas');

        // 绘制白色背景
        canvas.setFillStyle('#ffffff');
        canvas.rect(0, 0, 500, 800);
        canvas.fill();
        canvas.draw();

        // 绘制3Z
        canvas.drawImage('/images/default-header.png', 150, 50, 200, 200);
        canvas.draw(true);

        // 绘制小程序码
        canvas.drawImage('/images/qrcode.jpg', 150, 300, 200, 200);
        canvas.draw(true);

        // 绘制描述
        canvas.setFontSize(24);
        canvas.setFillStyle("#999999");
        canvas.setTextAlign('center');
        canvas.fillText('扫描小程序码', 250, 600, 400);
        canvas.draw(true);

        setTimeout(() => {
          wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 500,
            height: 800,
            destWidth: 500,
            destHeight: 800,
            canvasId: 'poster-canvas',
            success: res => {
              this.setData({ poster: res.tempFilePath });
            },
            fail: err => {
              console.log(err, '生成失败');
              // app.toast(JSON.stringify(err));
              // 生成失败
            }
          })
        }, 500);
      });
    },
    // 打开海报
    show_poster() {
      this.setData({ poster_show: true });
    },
    // 关闭海报
    hide_poster() {
      this.setData({ poster_show: false });
    },
    // 保存海报
    save_poster() {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.writePhotosAlbum']) {
            wx.saveImageToPhotosAlbum({
              filePath: this.data.poster,
              success: () => {
                app.modal('图片成功保存到相册了，快去分享朋友圈吧', () => {
                  this.setData({ poster_show: false });
                });
              },
              fail: err => {
                if (err.errMsg.indexOf('cancel') !== -1) {
                  app.toast('保存已取消');
                } else {
                  app.toast('保存失败');
                }
              }
            })
          } else {
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success: () => {
                this.save_poster();
              },
              fail: () => {
                this.setData({
                  show_set_btn: true
                });
              }
            });
          }
        }
      });
    },
    // 关闭授权菜单按钮
    hide_set_btn() {
      this.setData({ show_set_btn: false });
    }
  }
);