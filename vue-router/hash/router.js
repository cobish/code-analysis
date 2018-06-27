class Router {
  constructor (options) {
    this.routes = {};
    
    this.init();
    
    // 遍历，绑定视图更新
    options.forEach(item => {
      this.route(item.path, () => {
        document.getElementById('content').innerHTML = item.component;
      });
    });
  }
  
  // 绑定监听事件
  init () {
    window.addEventListener('load', this.updateView.bind(this), false);
    window.addEventListener('hashchange', this.updateView.bind(this), false);
  }
  
  // 更新试图
  updateView () {
    const currentUrl = window.location.hash.slice(1) || '/';
    this.routes[currentUrl] && this.routes[currentUrl]();
  }
  
  // 将路由与回调函数关联
  route (path, cb) {
    this.routes[path] = cb;
  }
}