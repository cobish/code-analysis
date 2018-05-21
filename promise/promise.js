function MyPromise (fn) {
  var _this = this;

  this.callback = [];
  this.isResolved = false;
  
  function resolve (val) {
    if (_this.isResolved) return;
    _this.isResolved = true;

    if (_this.callback.length > 0) {
      _this.callback.forEach(function (item) {
        var res;
        var cb = item.cb;
        var resolve = item.resolve;
        
        cb && (res = cb(val));
        if (typeof res === 'object' && res.then) {
          res.then(resolve);
        } else {
          resolve && resolve(res);
        }
      });
    }
  }
  
  fn(resolve);
}

MyPromise.prototype.then = function (cb) {
  var _this = this;

  return new MyPromise(function (resolve) {
    _this.callback.push({
      cb: cb,
      resolve: resolve
    });
  });
};