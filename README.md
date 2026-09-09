# json-to-dom-form

A lightweight, config-driven form renderer for turning a column schema and config object into a DOM form.

## Start here

- Live runtime site: https://keshavsoft.github.io/json-to-dom-form/
- Live docs hub: https://keshavsoft.github.io/json-to-dom-form/docs/index.html
- Live examples: https://keshavsoft.github.io/json-to-dom-form/examples/index.html
- Repo: https://github.com/keshavsoft/json-to-dom-form

## Quick start

```bash
npm install
npm run dev
```

Then open the local browser at the Vite URL and use the examples folder locally. For the public runtime, use the GitHub Pages site above.

This repo is intentionally local-first and small in scope. The examples folder is the fastest place to experiment without touching core source files.

## Minimal usage

```javascript
import { Form } from "./src/v4/index.js";

const form = new Form({
  data: { stockItemName: "ROPE" },
  columns: [
    { key: "stockItemName", label: "Stock Item", type: "string" },
    { key: "batchName", label: "Batch", type: "string" },
    { key: "amount", label: "Amount", type: "number" }
  ],
  config: {
    body: { columns: ["stockItemName", "batchName", "amount"] }
  },
  targetContainerId: "form-container"
});

await form.render();
console.log(form.getData());
```

## Scope

This repo is intentionally narrow. It renders forms from metadata and config, but it is not a full application framework or a general-purpose UI system.

For a deeper explanation, read the linked docs in the `docs/` folder.

