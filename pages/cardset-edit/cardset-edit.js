const app = getApp();

Page({
  data: {
    id: 0,
    modalName: null,
    search: ''
  },
  onLoad(options) {
    if (options.id) {
    }
    this.setData({ temp_arr: app.empty_arr(100) });
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
  }
});