const app = getApp();

Page({
  data: {
    sex: -1,
    sex_list: [
      { name: '男', value: 1 },
      { name: '女', value: 2 }
    ],

    show_input: false,
    input_index: -1,  // 0.昵称 1.姓名 2.电话
    input_list: [
      {
        title: '昵称',
        max: 20,
        type: 'text'
      },
      {
        title: '姓名',
        max: 20,
        type: 'text'
      },
      {
        title: '电话',
        max: 11,
        type: 'number'
      }
    ]
  },
  onLoad() {
  },
  sex_choose(e) {
    this.setData({ sex: parseInt(e.detail.value) });
  },
  // 显示输入框
  show_input(e) {
    let input_index = e.currentTarget.dataset.input_index;
    this.setData({
      input_index: input_index,
      show_input: true
    })
  },
  // 隐藏输入框
  hide_input() {
    this.setData({ show_input: false });
  }
});