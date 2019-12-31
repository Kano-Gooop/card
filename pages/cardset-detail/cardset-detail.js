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
  // 卡牌筛选条件（势力的小图标）
  cardParams(complete) {
    app.ajax('api/cardParams', null, res => {
      for (let key in res) {
        if (key !== 'resource') {
          for (let i = 0; i < res[key].length; i++) {
            res[key][i].active = false;
          }
        }
      }

      res.card_attr.unshift({ id: -2, attr_name: '全部', active: true });
      res.card_type.unshift({ id: -2, type_name: '全部', active: true });
      res.card_camp.unshift({ id: -2, camp_name: '全部', active: true });
      res.card_ability.unshift({ id: -2, ability_name: '全部', active: true });
      res.card_version.unshift({ id: -2, version_name: '全部', active: true });

      this.setData({
        card_attr: res.card_attr,
        card_type: res.card_type,
        card_camp: res.card_camp,
        card_ability: res.card_ability,
        card_version: res.card_version,

        card_attr_fp: app.null_arr(res.card_attr.length, 4),
        resource_fp: app.null_arr(this.data.resource.length, 4),
        card_type_fp: app.null_arr(res.card_type.length, 4),
        card_camp_fp: app.null_arr(res.card_camp.length, 4),
        card_ability_fp: app.null_arr(res.card_ability.length, 4),
      });
    }, null, () => {
      if (complete) {
        complete();
      }
    });
  },
  // 套牌详情
  myComboDetail() {
    app.ajax('my/myComboDetail', {dir_id: this.data.id}, res => {
      app.format_img(res, 'cover');
      app.format_img(res.list, 'cover');

      this.setData({combo: res});

      this.format_list(res.list);
    });
  },
  // 格式化卡牌列表，将其按主牌（主牌再按类型分类）、备牌分类
  format_list(list) {
    let main = [];
    let spare = [];

    for (let i = 0; i < list.length; i++) {
      if (list[i].combo_key.split('_')[2] === '1') {
        main.push(list[i]);
      } else {
        spare.push(list[i]);
      }
    }

    console.log(main, spare);
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