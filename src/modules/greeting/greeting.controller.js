import { ask } from "../../lib/prompt.js";
import { colorize } from "../../ui/style.console.js";
import { greetingService } from "./greeting.service.js";

class GreetingController {
  async hello() {
    const result = await ask("Ceau, ce faci?", ["Bine", "Foarte bine", "Exceptional"]);
    if (!result) return;

    const answer = await greetingService.CeFaci(result.options);
    console.log(`${colorize("[GREETING]", "green")}: ${answer}`);
  }
}

export const greetingController = new GreetingController();
