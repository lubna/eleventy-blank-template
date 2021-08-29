const { DateTime } = require('luxon')

module.exports = {
  dateString: (dateObj, format = 'yyyy-LL-dd') => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(format)
  },

  formatNumber: (num) => {
    if (num > 999) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
    }
    return num
  },

  subList: (array, n) => {
    if (!Array.isArray(array) || array.length === 0) {
      return []
    }
    if (n < 0) {
      return array.slice(n)
    }

    return array.slice(0, n)
  },
}
