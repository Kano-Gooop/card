const app = getApp();

Page({
  data: {
    loading: false,

    search: '',
    prop_type: 0,

    // shop_list: [0, 1, 2, 3],
    cate_ai: 0,  // cate active index
    cate_list: [],
    version_ai: 0,  // version active index
    version_list: [],

    shop_list: [],

    nomore: true,
    nodata: false
  },
  onLoad() {
    this.cateList();
    this.versionList();
  },
  // 获取分类
  cateList() {
    app.ajax('shop/cateList', null, res => {
      res.unshift({ id: 0, cate_name: '全部' });
      this.setData({ cate_list: res });
    });
  },
  // 获取版本
  versionList() {
    app.ajax('shop/versionList', null, res => {
      res.unshift({ id: 0, version_name: '全部' });
      this.setData({ version_list: res });
    });
  },
  // 搜索商品
  search_shop() {
  },
  // 清空搜索框
  clear_search() {
    this.setData({ search: '' });
  },
  // 切换筛选条件
  tab_change(e) {
    let prop_type = e.currentTarget.dataset.prop_type;
    if (this.data.prop_type === prop_type) {
      this.setData({ prop_type: 0 });
    } else {
      this.setData({ prop_type });
    }
  },
  // 隐藏筛选条件
  hide_tab() {
    this.setData({ prop_type: 0 });
  },
  bind_input(e) {
    app.bind_input(e, this);
  }
});