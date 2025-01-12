const helpers = {
  friendlyDate: function (a: {
    getFullYear?: any;
    getMonth?: any;
    getDay?: any;
    getDate?: any;
    getHours: any;
    getMinutes: any;
    getSeconds?: any;
  }) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const day = days[a.getDay()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    const time_friendly = this.getTime(a);
    const time = {
      day: day,
      date: date,
      month: month,
      year: year,
      hour: hour,
      min: min,
      sec: sec,
      time_friendly: time_friendly,
    };
    return time;
  },

  getTime: function (date: { getHours: () => any; getMinutes: () => any }) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const strTime = hours + ":" + minutes + ampm;
    return strTime;
  },
  stringToFriendlyDate: function (date_string: string | number | Date) {
    const date = helpers.friendlyDate(new Date(date_string));
    const friendly_date = `${date.month} ${date.date}, ${date.year}`;
    return friendly_date;
  },
};

export default helpers;
