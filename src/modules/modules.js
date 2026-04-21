import { colorize } from "../ui/style.console.js";
import { navigate } from "../lib/navigation.js";
import { createSpinner } from "../ui/spinner.console.js";

// controllers
import { greetingController } from "./greeting/greeting.controller.js";

export const MODULES = [
  { module: "Test Greeting", handler: () => greetingController.hello() },
];

export async function initModules() {
  const spinner = createSpinner(`Loading ${MODULES.length} module(s)...`, 1000);
  await spinner.success(`Loaded ${colorize(`${MODULES.length}`, "yellow")} module(s)`);

  await navigate(MODULES);
}
