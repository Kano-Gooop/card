const app = getApp();

Page({
  data: {
    id: 0,
    combo: {},  // 套牌详情
    main: [],  // 主牌列表
    spare: [],  // 备牌列表

    camp_list: [],  // 势力列表（获取势力小图标）
    type_list: [],  // 卡牌类型列表

    show_cd_modal: false,
    dir_name: '',  // 套牌名称

    show_tongji: false,  // 是否显示资源你统计图modal
    copy_dir_name: '',

    show_copy: false,  // 是否显示复制套牌modal
    show_succ: false,  // 复制套牌成功
    copy_id: 0,  // 复制成功的套牌id

    // 卡牌统计列表
    card_num_list: [
      {
        num: 0,
        height: 0
      },
      {
        num: 0,
        height: 0
      },
      {
        num: 0,
        height: 0
      },
      {
        num: 0,
        height: 0
      },
      {
        num: 0,
        height: 0
      },
      {
        num: 0,
        height: 0
      },
      {
        num: 0,
        height: 0
      },
      {
        num: 0,
        height: 0
      },
      {
        num: 0,
        height: 0
      }
    ]
  },
  onLoad(options) {
    this.setData({ id: options.id });
    this.cardParams(() => {
      this.myComboDetail();
    });
  },
  // 卡牌筛选条件（势力的小图标）
  cardParams(complete) {
    app.ajax('api/cardParams', null, res => {
      app.format_img(res.card_camp, 'icon');
      this.data.camp_list = res.card_camp;
      this.data.type_list = res.card_type;
    }, null, () => {
      if (complete) {
        complete();
      }
    });
  },
  // 套牌详情
  myComboDetail(complete) {
    app.ajax('my/myComboDetail', { dir_id: this.data.id }, res => {
      app.format_img(res, 'cover');
      app.format_img(res.list, 'cover');

      let [main, spare] = this.format_list(res.list);

      this.setData({
        combo: res,
        main: main,
        spare: spare
      });

      this.column_compute();
    }, null, () => {
      if (complete) {
        complete();
      }
    });
  },
  // 格式化卡牌列表，将其按主牌（主牌再按类型分类）、备牌分类，将势力小图标放入卡牌对象中
  format_list(list) {
    let main = this.data.type_list;
    let spare = [];

    for (let i = 0; i < main.length; i++) {
      main[i].list = [];
    }

    for (let i = 0; i < list.length; i++) {
      this.insert_camp(list[i]);

      if (list[i].resource === '资源-事件') {
        list[i].resource = -2;
      }

      if (list[i].combo_key.split('_')[2] === '1') {
        if (list[i].resource === -2) {
          this.data.card_num_list[0].num += list[i].num;
        } else if (list[i].resource === 'X') {
          this.data.card_num_list[8].num += list[i].num;
        } else if (list[i].resource >= 7) {
          this.data.card_num_list[7].num += list[i].num;
        } else {
          this.data.card_num_list[list[i].resource].num += list[i].num;
        }

        for (let j = 0; j < main.length; j++) {
          if (list[i].type_id === main[j].id) {
            main[j].list.push(list[i]);
            break;
          }
        }
      } else {
        spare.push(list[i]);
      }
    }

    main = main.filter((value) => {
      return value.list.length > 0;
    });

    return [main, spare];
  },
  insert_camp(card) {
    for (let i = 0; i < this.data.camp_list.length; i++) {
      if (card.camp_id === this.data.camp_list[i].id) {
        card.camp_icon = this.data.camp_list[i].icon;
        break;
      }
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

      this.setData({ card_num_list: this.data.card_num_list });
    }
  },
  bind_input(e) {
    app.bind_input(e, this);
  },
  // 显示修改套牌名称modal
  show_cd_modal() {
    this.setData({
      show_cd_modal: true,
      dir_name: this.data.combo.dir_name
    });
  },
  // 隐藏修改套牌名称modal
  hide_cd_modal() {
    this.setData({ show_cd_modal: false });
  },
  // 修改套牌名称
  dirnameModify() {
    if (!this.data.dir_name.trim()) {
      app.toast('套牌名不能为空');
    } else {
      let post = {
        dir_id: this.data.id,
        dir_name: this.data.dir_name
      };

      app.ajax('my/dirnameModify', post, () => {
        this.setData({ show_cd_modal: false });
        app.modal('修改成功', () => {
          this.myComboDetail();
        });
      });
    }
  },
  // 显示复制套牌modal
  show_copy_modal() {
    this.setData({ show_copy: true });
  },
  // 隐藏复制套牌modal
  hide_copy_modal() {
    this.setData({ show_copy: false });
  },
  // 复制套牌
  cardComboCopy() {
    if (!this.data.copy_dir_name.trim()) {
      app.toast('套牌名不能为空');
    } else {
      let post = {
        dir_id: this.data.id,
        dir_name: this.data.copy_dir_name
      };

      app.ajax('my/cardComboCopy', post, res => {
        this.data.copy_id = res;
        this.setData({
          show_copy: false,
          show_succ: true
        });
      });
    }
  },
  // 隐藏复制套牌modal
  hide_succ_modal() {
    this.setData({ show_succ: false });
  },
  // 进入复制的套牌详情
  to_copy_set() {
    wx.redirectTo({ url: '/pages/cardset-detail/cardset-detail?id=' + this.data.copy_id });
  },
  // 下拉刷新
  onPullDownRefresh() {
    if (!this.data.loading) {
      this.data.loading = true;

      wx.showNavigationBarLoading();
      this.myComboDetail(() => {
        this.data.loading = false;
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      });
    }
  },
});