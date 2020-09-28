import axios from 'axios'
import logout from '@/util/logout'
import store from '@/store'
export default {
  install(Vue) {

    // Config
    Vue.prototype.$axios = axios.create({
      baseURL: process.env.VUE_APP_URL_BASE,
      headers: {
        "Content-Type": "multipart/form-data",
        "x-api-key": process.env.VUE_APP_API_KEY,
      }
    });

    // Interceptors
    Vue.prototype.$axios.interceptors.response.use(function (response) {
      store.commit("setFeedbackProgress", false);
      return response;
    }, function (error) {

      // Erro 401 - Token Expired
      if (error.response.status === 401) {
        store.commit("setFeedbackSnack", {
          msg: error.response.data.messages.error,
          color: "danger",
        });
        logout();
      }

      // Erro 400 - No data, Alert Snack
      if (error.response.status === 400) {
        store.commit("setFeedbackSnack", {
          msg: error.response.data.messages.error,
          color: "warning",
        });
      }

      store.commit("setFeedbackProgress", false);
      return Promise.reject(error);
    });
  }
}
