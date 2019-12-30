const app = getApp();

Page({
  data: {
    user: {
      id: 0,
      user_auth: 0,
      nickname: '',
      username: '',
      sex: 0,
      avatar: '',
      tel: '',
      secret_tel: ''
    },

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
    this.mydetail();
  },
  // 获取个人信息
  mydetail() {
    app.mydetail(() => {
      let secret_tel;
      if (app.user_data.tel) {
        secret_tel = app.user_data.tel.slice(0, 3) + '****' + app.user_data.tel.slice(-4);
      } else {
        secret_tel = '';
      }

      this.setData({
        user: {
          id: app.user_data.uid,
          user_auth: app.user_data.user_auth,
          nickname: app.user_data.nickname,
          username: app.user_data.username,
          sex: app.user_data.sex,
          avatar: app.user_data.avatar,
          tel: app.user_data.tel,
          secret_tel: secret_tel
        }
      });
    });
  },
  // 修改个人信息
  modMyInfo() {
  },
  // 性别选择
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
  },
  bind_input() {
    app.bind_input(e, this);
  }
});