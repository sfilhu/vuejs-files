export default {
  install(Vue) {
    Date.prototype.add = function (days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    }
    Date.prototype.substractDays = function (days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() - days);
      return date;
    }

    Vue.prototype.$date = {
      format: function (date, format) {
        if (!date) return null;
        const [year, month, day] = date.split("-");

        switch (format) {
          case 'DD-MM-YYYY':
            return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`
          case 'DD/MM/YYYY':
            return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`
          default:
            return date
        }
      },

      get: {

        today: function () {
          return {
            data_inicio: new Date(new Date().setHours(-3, 0, 0)).toISOString(),
            data_final: new Date(new Date().setHours(20, 59, 59)).toISOString(),
          }
        },

        yesterday: function () {
          return {
            data_inicio: new Date(new Date().setHours(-3, 0, 0)).substractDays(1).toISOString(),
            data_final: new Date(new Date().setHours(20, 59, 59)).substractDays(1).toISOString(),
          }
        },

        currentWeek: function () {
          const date = new Date;
          const monday = date.getDate() - date.getDay();
          const friday = monday + 6;

          const startWeek = new Date(new Date(date.setDate(monday)).setHours(-3, 0, 0)).add(1).toISOString();
          const endWeek = new Date(new Date(date.setDate(friday)).setHours(20, 59, 59)).add(1).toISOString();

          return {
            data_inicio: startWeek,
            data_final: endWeek,
          }
        },

        lastWeek: function () {
          const date = new Date;
          const monday = (date.getDate() - date.getDay()) + 1;
          const sunday = monday + 6;

          const startWeek = new Date(new Date(date.setDate(monday)).setHours(-3, 0, 0)).substractDays(7).toISOString();
          const endWeek = new Date(new Date(date.setDate(sunday)).setHours(20, 59, 59)).substractDays(7).toISOString();

          return {
            data_inicio: startWeek,
            data_final: endWeek,
          }
        },

        currentMonth: function () {
          return {
            data_inicio: new Date(new Date().setHours(-3, 0, 0)).substractDays(30).toISOString(),
            data_final: new Date(new Date().setHours(20, 59, 59)).toISOString(),
          }
        },

        lastMonth: function () {
          var date = new Date();
          var firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1);
          var lastDay = new Date(date.getFullYear(), date.getMonth(), 0);

          return {
            data_inicio: new Date(new Date(firstDay).setHours(-3, 0, 0)).toISOString(),
            data_final: new Date(new Date(lastDay).setHours(20, 59, 59)).toISOString(),
          }
        }
      }
    }
  }
}
