import { colorize } from "./style.console.js";

const FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

export function createSpinner(text, delay = 0) {
  let index = 0;
  let timer;

  process.stdout.write("\x1B[?25l");

  timer = setInterval(() => {
    process.stdout.write(`\r${FRAMES[index++ % FRAMES.length]} ${text}`);
  }, 80);

  async function stop(symbol, text) {
    await new Promise((r) => setTimeout(r, delay));
    clearInterval(timer);
    process.stdout.write(`\r\x1B[2K${symbol} ${text}\n`);
    process.stdout.write("\x1B[?25h");
  }

  return {
    success: (text) => stop(colorize("+", "green"), text),
    fail: (text) => stop(colorize("+", "red"), text),
  };
}
