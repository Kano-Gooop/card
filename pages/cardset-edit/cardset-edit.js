const app = getApp();

Page({
  data: {
    id: 0,
    show_side: false,  // 是否显示侧边栏
    cl_height: 0,  // card-list-wrapper 的高度
    cl2_height: 0,

    search: '',
    prop_type: 0,
    temp_arr: [],

    dot_left_origin: 0,
    dot_top_origin: 0,
    dot_left: 0,
    dot_top: 0,
    dot_active: false,

    cardset_type: 1,  // 1.主牌 2.备牌

    nomore: true,
    nodata: false
  },
  onLoad(options) {
    if (options.id) {
    }
    this.setData({ temp_arr: app.empty_arr(13) });
  },
  onReady() {
    const query = wx.createSelectorQuery();

    query.select('.card-box').boundingClientRect(res => {
      this.setData({ cl_height: res.height });
    }).exec();

    query.select('#card-list2-wrapper').boundingClientRect(res => {
      this.setData({ cl2_height: res.height });
    }).exec();

    query.select('#card-list2-wrapper').boundingClientRect(res => {
      this.setData({ cl2_height: res.height });
    }).exec();

    query.select('#dot-num').boundingClientRect(res => {
      this.setData({
        dot_left_origin: res.left,
        dot_top_origin: res.top,
        dot_left: 0,
        dot_top: 0
      });
    }).exec();
  },
  // 打开侧栏
  showModal() {
    this.setData({ show_side: true });
  },
  // 关闭侧栏
  hideModal() {
    this.setData({ show_side: false });
  },
  // 搜索卡牌
  search_card() {
  },
  bind_input(e) {
    app.bind_input(e, this);
  },
  // 清空搜索框
  clear_search() {
    this.setData({ search: '' });
  },
  // 切换分类
  pt_change(e) {
    let prop_type = e.currentTarget.dataset.prop_type;
    if (this.data.prop_type === prop_type) {
      this.setData({ prop_type: 0 });
    } else {
      this.setData({ prop_type });
    }
  },
  // 隐藏分类
  hide_pt() {
    this.setData({ prop_type: 0 });
  },
  onReachBottom() {
    console.log('上拉加载');
  },
  // 滚动到底部
  more_card() {
    console.log('滚动到底');
  },
  // 临时，获取卡牌位置
  get_position(e) {
    let index = e.currentTarget.dataset.index;
    let type = e.currentTarget.dataset.type;

    const query = wx.createSelectorQuery();
    query.select((type === 1 ? '#card_zhu_' : '#card_bei_') + index).boundingClientRect(res => {
      this.setData({
        dot_left: res.left + 19.5,
        dot_top: res.top + 6.5,
        dot_active: true
      }, () => {
        wx.nextTick(() => {
          this.setData({
            dot_left: this.data.dot_left_origin,
            dot_top: this.data.dot_top_origin
          }, () => {
            setTimeout(() => {
              this.setData({ dot_active: false});
            }, 420);
          });
        });
      });
      console.log(res);
    }).exec();
  }
});