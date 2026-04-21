import { selector } from "../ui/selector.console.js";
import { BACK, EXIT } from "./navigation.js";

export async function ask(question, options) {
  const allOptions = [...options, BACK.module, EXIT.module];
  const selected = await selector(question, allOptions);

  if (selected >= options.length) {
    const nav = [BACK, EXIT][selected - options.length];
    await nav.handler?.();
    return null;
  }

  return { selected, options: options[selected] };
}
