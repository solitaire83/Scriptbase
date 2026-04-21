
A lightweight CLI framework for building interactive, selection-driven scripts fast. No external dependencies, only nodejs built-ins.

---

## Getting started

```bash
git clone https://github.com/solitaire83/Scriptbase
cd Scriptbase
npm install   # or pnpm install
```

---

## Launch

You launch the app, pick an option from a menu, and a handler runs. The framework handles and you write your own modules.

```
npm run dev
```

```
  + Loaded 2 module(s)

  > My First Script
    Another Script
    Exit
```

---

## Project structure

```
app.js                          entry point
src/
  main.js                       startup (banner + module load)
  modules/
    modules.js                  module registry
    greeting/                   example module (delete this when starting your own)
      greeting.controller.js    prompts, user flow, display
      greeting.service.js       business logic
  ui/
    banner.console.js           ASCII banner on startup
    selector.console.js         arrow-key selection menu
    spinner.console.js          loading spinner
    style.console.js            ANSI colors and text styles
  lib/
    navigation.js               the naaavigation duuh
    prompt.js                   question helper with BACK/EXIT built in
```

---

## Adding a module

**1. Service** - pure logic, no UI (`src/modules/myscript/myscript.service.js`):

```js
export class MyScriptService {
  async process(option) {
    const map = {
      "Option A": "You picked A",
      "Option B": "You picked B",
    };
    return map[option];
  }
}

export const myScriptService = new MyScriptService();
```

**2. Controller** - prompts and displaying (`src/modules/myscript/myscript.controller.js`):

```js
import { ask } from "../../lib/prompt.js";
import { colorize } from "../../ui/style.console.js";
import { myScriptService } from "./myscript.service.js";

class MyScriptController {
  async handle() {
    const result = await ask("What do you want to do?", ["Option A", "Option B"]);
    if (!result) return; // user pressed BACK

    const answer = await myScriptService.process(result.options);
    console.log(`${colorize("[MYSCRIPT]", "green")}: ${answer}`);
  }
}

export const myScriptController = new MyScriptController();
```

**3. Register it in `src/modules/modules.js`:**

```js
import { myScriptController } from "./myscript/myscript.controller.js";

export const MODULES = [
  {
    module: "My Script",
    handler: () => myScriptController.handle(),
  },
  // ...
];
```

That's it. The module shows up in the menu automatically.

---

## Core utilities

### `selector(options)`
Raw arrow-key menu. Returns the index of the selected option.

```js
import { selector } from "../ui/selector.console.js";

const idx = await selector(["First", "Second", "Third"]);
```

### `ask(question, options)`
Wraps `selector` with a question label and automatically appends **BACK** and **EXIT** options. Returns the selected string, or `null` if the user goes back.

```js
import { ask } from "../lib/prompt.js";

const answer = await ask("Pick a color:", ["Red", "Blue", "Green"]);
if (!answer) return; // user went back
```

### `createSpinner(message, delay?)`
Animated spinner. Call `.success(msg)` or `.fail(msg)` to stop it. Optional `delay` (ms) adds a minimum display time before stopping.

```js
import { createSpinner } from "../ui/spinner.console.js";

const spinner = createSpinner("Fetching data...", 1000);
await something();
spinner.success("Done");
```

### `colorize(text, color)`
ANSI color wrapping. Colors like: `black`, `red`, `green`, `yellow` [...]
```js
import { colorize } from "../ui/style.console.js";

console.log(colorize("OK", "green"));
console.log(colorize("NOT OK", "red"));
```

## Requirements

- Node.js 18+
- Terminal with ANSI support

---