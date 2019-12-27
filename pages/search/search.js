const app = getApp();

Page({
  data: {
    search: '',
    prop_type: 0,

    nomore: false,
    nodata: true
  },
  onLoad() {
  },
  // 搜索卡牌
  search_card() {
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
  bind_input(e) {
    app.bind_input(e, this);
  }
});