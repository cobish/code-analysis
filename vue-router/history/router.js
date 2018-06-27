class Router {
  constructor (options) {
    this.routes = {};

    this.init();
    this.bindEvent();

    // 遍历，绑定视图更新
    options.forEach(item => {
      this.route(item.path, () => {
        document.getElementById('content').innerHTML = item.component;
      });
    });
  }

  // 绑定点击事件
  bindEvent () {
    const _this = this;
    const links = document.getElementsByTagName('a');

    [].forEach.call(links, link => {
      link.addEventListener('click', function () {
        const url = this.getAttribute('data-href');
        _this.push(url);
      });
    });
  }

  // 绑定监听事件
  init () {
    window.addEventListener('load', this.updateView.bind(this), false);
    window.addEventListener('popstate', this.updateView.bind(this), false);
  }

  push (url) {
    window.history.pushState({}, null, url);
    this.updateView();
  }

  // 更新试图
  updateView () {
    const currentUrl = window.location.pathname || '/';
    this.routes[currentUrl] && this.routes[currentUrl]();
  }

  // 将路由与回调函数关联
  route (path, cb) {
    this.routes[path] = cb;
  }
}