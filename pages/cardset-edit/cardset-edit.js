const app = getApp();

Page({
  data: {
    id: 0,
    // modalName: null,  // null: 不显示侧边栏  viewModal: 显示侧边栏
    modalName: 'viewModal',  // null: 不显示侧边栏  viewModal: 显示侧边栏
    cl_height: 0,  // card-list-wrapper 的高度
    cl2_height: 0,

    search: '',
    prop_type: 0,
    temp_arr: [],

    cardset_type: 1,  // 1.主牌 2.备牌
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
  },
  // 打开侧栏
  showModal() {
    this.setData({ modalName: 'viewModal' });
  },
  // 关闭侧栏
  hideModal() {
    this.setData({ modalName: null });
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
  }
});