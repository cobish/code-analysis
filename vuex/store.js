class Store {
  constructor (Vue, options) {
    var bus = new Vue({
      data: {
        state: options.state
      }
    })

    this.install(Vue, bus)
  }
  
  install (Vue, bus) {
    Vue.mixin({
      beforeCreate () {
        if (this.$options.store) {
          Vue.prototype.$store = bus
        }
      }
    })
  }
}