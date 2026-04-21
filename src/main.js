import { BANNER } from "./ui/banner.console.js";
import { colorize } from "./ui/style.console.js";
import { initModules } from "./modules/modules.js";

export async function __MAIN() {
  BANNER();

  await initModules();
}