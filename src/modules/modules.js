import { colorize } from "../ui/style.console.js";
import { navigate } from "../lib/navigation.js";

// controllers
import { greetingController } from "./greeting/greeting.controller.js";

export const MODULES = [
  { module: "Test Greeting", handler: () => greetingController.hello() },
];

export async function initModules() {
  console.log(`${colorize("[APP]", "green")}: Loading ${colorize(`${MODULES.length}`, "yellow")} module(s)...`);
 
  await navigate(MODULES);
}
