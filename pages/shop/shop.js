const app = getApp();

Page({
  data: {
    loading: false,
    active_tab: -1,
    cate_list: [
      {
        "id": 1,
        "icon": "upload/goodscate/156706090338062300736.jpg",
        "cate_name": "分类1",
        "pid": 0,
        "status": 1,
        "del": 0
      },
      {
        "id": 2,
        "icon": "upload/goodscate/156706093085110600562.jpg",
        "cate_name": "分类2",
        "pid": 0,
        "status": 1,
        "del": 0
      },
      {
        "id": 3,
        "icon": "upload/goodscate/156706094135894800303.jpg",
        "cate_name": "分类3",
        "pid": 0,
        "status": 1,
        "del": 0
      }
    ],
    nomore: true,
    nodata: false
  },
  onLoad() {
  },
  // 全部商品
  all_goods() {
    if (!this.data.loading) {
      this.data.loading = true;
      this.setData({ active_tab: -1 }, () => {
        this.data.loading = false;
      });
    }
  },
  // 分类改变
  tab_change(e) {
    if (!this.data.loading) {
      this.data.loading = true;
      this.setData({ active_tab: e.currentTarget.dataset.index }, () => {
        this.data.loading = false;
      });
    }
  }
});