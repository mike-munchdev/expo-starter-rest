import colors from './colors';

export default {
  blue: {
    dark: false,
    colors: {
      primary: colors.white.normal,
      background: colors.white.normal,
      card: colors.blue.dark,
      text: colors.white.normal,
      border: colors.blue.dark,
      notification: colors.red.normal,
    },
  },
  green: {
    dark: false,
    colors: {
      primary: colors.green.normal,
      background: 'rgb(242, 242, 242)',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(28, 28, 30)',
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)',
    },
  },
  red: {
    dark: false,
    colors: {
      primary: colors.green.normal,
      background: 'rgb(242, 242, 242)',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(28, 28, 30)',
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)',
    },
  },
};
