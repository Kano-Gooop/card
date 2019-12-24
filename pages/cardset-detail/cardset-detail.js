const app = getApp();

Page({
  data: {
    show_tongji: false,  // 是否显示资源你统计图modal
    show_copy: true,  // 是否显示复制套牌modal

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
  onLoad() {
    this.column_compute();
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

    // 计算每一份的高度
    let single = 350 / max;
    this.data.card_num_list.forEach((item) => {
      item.height = item.num * single;
    });

    this.setData({card_num_list: this.data.card_num_list});
  }
});