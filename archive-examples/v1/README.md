# Local examples playground

This folder is the developer sandbox for `json-to-dom-form`.

It is meant for experimentation without touching core library files. A clone should be able to open the examples folder and immediately understand:

- how the metadata object is shaped
- how different layouts render the same schema
- how labels, inputs, buttons, and search controls behave
- how to tweak the config and re-render quickly

## Start locally

From the repo root:

```bash
npm install
npm run dev
```

Then visit:

- `/examples/index.html` - landing page
- `/examples/pages/layouts.html` - vertical / horizontal / inline / grid examples
- `/examples/pages/controls.html` - input + label + button + search behavior
- `/examples/pages/bootstrap.html` - dashboard-style app layout

## Folder structure

- `examples/index.html` - big landing page and navigation
- `examples/shared.js` - reusable helper and metadata examples
- `examples/pages/layouts.html` - layout variants
- `examples/pages/controls.html` - control-focused examples
- `examples/pages/bootstrap.html` - app-shell example

## Quick tweak guide

1. Open `examples/shared.js`.
2. Change the `data` object, `columns`, or `config` for any example.
3. Save the file.
4. Refresh the page.

This is the fastest way to learn the renderer without touching the core source.

## Example flavors included

- stacked form
- horizontal form
- inline filter form
- two-column grid form
- section-card form
- bootstrap dashboard shell

These are intentionally bigger and more practical than the tiny starter examples.
