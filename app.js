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
    base_url: 'https://card.psn.asia',
    api: 'https://card.psn.asia/api/',
    default_img: '/images/default-header.png',
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
    username: '',
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
              case -6: // token未传
                let current_pages = getCurrentPages();
                let current_page = current_pages[current_pages.length - 1];
                wx.redirectTo({
                  url: '/pages/login/login?route=' + encodeURIComponent(current_page.route + utils.obj2query(current_page.options))
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
  // 创建用来循环元素的空数组
  empty_arr(length) {
    let arr = [];
    for (let i = 0; i < length; i++) {
      arr[i] = null;
    }
    return arr;
  },
  // 小程序登录获取token
  login(callback) {
    this.get_code((code) => {
      let post = {
        code: code
      };

      this.ajax('login/login', post, (res) => {
        callback(res);
      });
    })
  },
  get_code(callback) {
    wx.login({
      success(login) {
        callback(login.code);
      }
    });
  },
  // 设置全局的 user_data
  set_user_data() {
    this.ajax('my/mydetail', null, res => {
      this.format_img(res, 'avatar');

      this.user_data.uid = res.id;
      this.user_data.user_auth = res.user_auth;
      this.user_data.username = res.username;
      this.user_data.avatar = res.avatar;
    });
  },
  redirect_or_switch_or_index(route) {
    if (!route) {
      wx.switchTab({
        url: '/pages/index/index'
      });
    } else {
      switch (route) {
        case 'pages/index/index':
        case 'pages/search/search':
        case 'pages/shop/shop':
        case 'pages/my/my':
          wx.switchTab({ url: '/' + route });
          break;
        default:
          wx.redirectTo({ url: '/' + route });
          break;
      }
    }
  },
  // 处理图像路径
  format_img(obj, img_field = 'pic') {
    if (obj instanceof Array) {
      if (typeof obj[0] === 'string') {
        for (let i = 0; i < obj.length; i++) {
          obj[i] = this.empty_or(obj[i]);
        }
      } else {
        for (let i = 0; i < obj.length; i++) {
          obj[i][img_field] = this.empty_or(obj[i][img_field]);
        }
      }
    } else if (typeof obj === 'object') {
      obj[img_field] = this.empty_or(obj[img_field]);
    } else {
      obj = this.empty_or(obj);
    }
  },
  empty_or(img) {
    if (img) {
      if (img.indexOf('https') === 0) {
        return img;
      } else {
        return this.my_config.base_url + '/' + img;
      }
    } else {
      return this.my_config.default_img;
    }
  }
});