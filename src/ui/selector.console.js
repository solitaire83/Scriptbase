import readline from "readline";

const KEY_UP = "\x1B[A";
const KEY_DOWN = "\x1B[B";
const KEY_ENTER = "\r";

export function selector(question, options) {
  if (!options) {
    options = question;
    question = null;
  }

  return new Promise((resolve) => {
    let selected = 0;

    function render() {
      process.stdout.write(`\x1B[${options.length + (question ? 1 : 0)}A\x1B[0J`);
      if (question) console.log(question);
      options.forEach((opt, i) => {
        console.log(`${i === selected ? "> " : "  "}${opt}`);
      });
    }

    function cleanup() {
      process.stdout.write("\x1B[?25h");
      process.stdout.write("\x1Bc");
      process.stdin.setRawMode(false);
      process.stdin.pause();
      process.stdin.removeListener("keypress", handler);
    }

    process.stdout.write("\x1B[?25l");
    if (question) console.log(question);
    options.forEach((opt, i) => {
      console.log(`${i === selected ? "> " : "  "}${opt}`);
    });

    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.resume();

    function handler(_, key) {
      if (!key) return;

      if (key.sequence === KEY_UP) {
        selected = (selected - 1 + options.length) % options.length;
        render();
      } else if (key.sequence === KEY_DOWN) {
        selected = (selected + 1) % options.length;
        render();
      } else if (key.sequence === KEY_ENTER) {
        cleanup();
        resolve(selected);
      } else if (key.ctrl && key.name === "c") {
        cleanup();
        process.exit();
      }
    }

    process.stdin.on("keypress", handler);
  });
}
