import { colorize } from "../ui/style.console.js";
import { selector } from "../ui/selector.console.js";

export const BACK = { module: `${colorize("BACK", "yellow")}`, handler: null };
export const EXIT = { module: `${colorize("Exit", "red")}`, handler: () => process.exit(0) };

export async function navigate(modules) {
  const options = [...modules, EXIT];

  while (true) {
    const selected = await selector(options.map((m) => m.module));

    if (options[selected] === BACK) continue;
    await options[selected].handler();
  }
}
