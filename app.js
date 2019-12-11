const utils = require('utils/utils.js');

App({
  onLaunch() {
    wx.getSystemInfo({
      success: res => {
        this.my_config.statusBarHeight = res.statusBarHeight;
        if (res.model.indexOf('iPhone') !== -1) {
          this.my_config.topBarHeight = 44;
        } else {
          this.my_config.topBarHeight = 48;
        }
      }
    });

    let phone = wx.getSystemInfoSync();
    this.is_ios = phone.platform === 'ios';
  },
  is_ios: '',
  my_config: {
    base_url: 'https://caves.wcip.net', // 正式
    api: 'https://caves.wcip.net/api/', // 正式
    default_img: '/images/default.png',
    reg: {
      tel: /^1\d{10}$/,
      phone: /\d{3,4}-\d{7,8}/,
      email: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
      natural: /^([1-9]\d*|0)$/,
      positive: /^[1-9]\d*$/,
      price: /^([1-9]\d*|0)(\.\d{1,2})?$/
    },
    statusBarHeight: 0,
    topBarHeight: 0,
  },
  user_data: {
    token: '',
    uid: 0,
    user_auth: 0, // 0.用户未授权 1.用户已授权
    avatar: ''
  },
  mp_update() {
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      console.log(res.hasUpdate); // 是否有更新
    });
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否马上重启小程序？',
        success: function (res) {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        }
      })
    });
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
    })
  },
  toast(title, duration, icon = 'none') {
    let dura = duration || 2000;
    wx.showToast({
      title: String(title),
      icon: icon,
      duration: dura
    });
  },
  modal(content, callback) {
    wx.showModal({
      title: '提示',
      content: content,
      showCancel: false,
      success() {
        if (callback) {
          callback();
        }
      }
    });
  },
  confirm(content, callback) {
    wx.showModal({
      title: '提示',
      content: content,
      success: res => {
        if (res.confirm) {
          callback();
        }
      }
    });
  },
  ajax(path, data, succ, err, complete) {
    data = data || {};
    if (!data.token) {
      data.token = this.user_data.token;
    }

    wx.request({
      url: this.my_config.api + path,
      method: 'POST',
      dataType: 'json',
      data: data,
      success: res => {
        if (res.data.code !== 1) {
          if (err) {
            err(res.data);
          } else {
            switch (res.data.code) {
              case -3: // token失效
              case -5: // token未传
                let current_pages = getCurrentPages();
                let current_page = current_pages[current_pages.length - 1];
                wx.redirectTo({
                  url: '/pages/login/login?route=' + encodeURIComponent(current_page.route + this.obj2query(current_page.options))
                });
                break;
              case 49:
                this.toast(res.data.data);
                break;
              case 63:
              case 64:
                this.modal(res.data.message);
                break;
              case 87:  // 活动已删除
              case 88:  // 创意已删除
              case 89:  // 作品已删除
                this.modal(res.data.message, () => {
                  wx.navigateBack({ delta: 1 });
                });
                break;
              default:
                if (res.data.message) {
                  this.toast(res.data.message);
                } else {
                  this.toast('网络异常');
                }
                break;
            }
          }
        } else {
          if (succ) {
            succ(res.data.data);
          }
        }
      },
      fail() {
        // this.toast('网络异常');
      },
      complete() {
        if (complete) {
          complete();
        }
      }
    });
  },
  // 获取打开的页面
  get_page(page_name) {
    let pages = getCurrentPages();
    for (let i = 0; i < pages.length; i++) {
      if (pages[i].route === page_name) {
        return pages[i];
      }
    }
    return false;
  },
  // input绑定page中的数据
  bind_input(e, page) {
    page.setData({
      [e.currentTarget.dataset['name']]: e.detail.value || ''
    })
  },
  // 创建指定数量元素的数组（flex填充用）
  null_arr(number, line_number) {
    let num = (line_number - number % line_number) % line_number;

    let arr = [];
    arr[num - 1] = null;
    return arr;
  },
});