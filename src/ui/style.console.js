export const console = {
  colors: {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
  },

  styles: {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    intensity: "\x1b[2m",
    underscore: "\x1b[4m",
    hidden: "\x1b[8m",
  },
};

export const colorize = (text, color) => {
  return `${console.colors[color]}${text}${console.styles.reset}`;
};