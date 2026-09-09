# json-to-dom-form

A lightweight, config-driven form renderer for turning a column schema and config object into a DOM form.

## Start here

- Overview: [docs/overview.md](docs/overview.md)
- Why this repo exists: [docs/why.md](docs/why.md)
- How it works: [docs/how-it-works.md](docs/how-it-works.md)
- Architecture: [docs/architecture.md](docs/architecture.md)
- Tasks / todo: [docs/tasks.md](docs/tasks.md)

## Quick start

```bash
npm install
npm run dev
```

Then open the local demo or visit:

- Demo: https://keshavsoft.github.io/json-to-dom-form/
- Repo: https://github.com/keshavsoft/json-to-dom-form

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

