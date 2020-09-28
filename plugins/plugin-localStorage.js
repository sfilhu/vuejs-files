export default {
  install(Vue) {
    Vue.prototype.$localStorage = {

      setItem: function (name, data) {
        const dataToString = typeof data != 'string' ? JSON.stringify(data) : data;
        localStorage.setItem(name, dataToString)
      },

      getItem: function (name, type) {
        const getItem = localStorage.getItem(name)
        if (type === 'string') return getItem;
        return JSON.parse(getItem);
      },

      getLocalStorage: function () {
        return window.localStorage
      }
    }
  }
}