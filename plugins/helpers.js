export default (ctx, inject) => {
  inject('helpers', {
    declOfNum(number, words) {
      return words[
        number % 100 > 4 && number % 100 < 20
          ? 2
          : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
      ]
    },
    formatPhone(value) {
      if (value.length === 12) {
        // eslint-disable-next-line no-unused-vars
        const [x0, x1, x2, x3, x4] = value
          .replace(/\D/g, '')
          .match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/)

        return value ? `+${x1} ${x2}` + (x3 ? ` ${x3}` : '') + (x4 ? ` ${x4}` : '') : ''
      } else {
        // eslint-disable-next-line no-unused-vars
        const [x0, x1, x2, x3] = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,2})(\d{0,7})/)

        return value ? `+${x1} ${x2} ${x3}` : ''
      }
    },
  })
}
