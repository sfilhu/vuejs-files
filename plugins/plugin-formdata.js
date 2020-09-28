export default {
  install(Vue) {
    Vue.prototype.$formdata = function(data) {
      const bodyFormData = new FormData();
      const key = Object.keys(data);
      const val = Object.values(data);
      for(let i = 0; i < key.length; i++) {
        bodyFormData.append(key[i], val[i])
      }
      return bodyFormData;
    }
  }
}