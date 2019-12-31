const app = getApp();

Page({
  data: {
    id: 0,
    combo: {},

    show_tongji: false,  // 是否显示资源你统计图modal
    show_copy: false,  // 是否显示复制套牌modal
    show_succ: false,  // 复制套牌成功

    // 卡牌统计列表
    card_num_list: [
      {
        num: 1,
        height: 0
      },
      {
        num: 3,
        height: 0
      },
      {
        num: 5,
        height: 0
      },
      {
        num: 2,
        height: 0
      },
      {
        num: 4,
        height: 0
      },
      {
        num: 6,
        height: 0
      },
      {
        num: 1,
        height: 0
      },
      {
        num: 3,
        height: 0
      },
      {
        num: 7,
        height: 0
      }
    ]
  },
  onLoad(options) {
    this.data.id = options.id;
    this.myComboDetail();

    this.column_compute();
  },
  // 套牌详情
  myComboDetail() {
    app.ajax('my/myComboDetail', {dir_id: this.data.id}, res => {
      app.format_img(res, 'cover');
      app.format_img(res.list, 'cover');

      this.setData({combo: res});
    });
  },
  // 格式化卡牌列表，将其按主牌（主牌再按类型分类）、备牌分类
  format_list(list) {
    let main = [];
    let spare = [];

    let combo_key;


    for (let i = 0; i < list.length; i++) {

    }
  },
  show_tongji() {
    this.setData({ show_tongji: true });
  },
  hide_tongji() {
    this.setData({ show_tongji: false });
  },
  // 柱状图高度计算
  column_compute() {
    let max = 0;
    this.data.card_num_list.forEach((item) => {
      if (item.num > max) {
        max = item.num;
      }
    });

    if (max > 0) {
      // 计算每一份的高度
      let single = 350 / max;
      this.data.card_num_list.forEach((item) => {
        item.height = item.num * single;
      });

      this.setData({card_num_list: this.data.card_num_list});
    }
  }
});