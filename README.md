# json-to-dom-form

A lightweight, config-driven form renderer that turns a column schema and a JSON config object into a DOM form. It is designed for cases where you want to describe form fields declaratively instead of writing repetitive HTML and binding logic by hand.

This repository is not a full application framework. It is a small rendering layer for forms built on top of a DOM-building pattern similar to `json-to-dom`.

## What this repo does

- Defines form columns as structured metadata, such as `key`, `label`, and `type`
- Renders those columns into a DOM form based on config
- Supports layout and theme switching through config or runtime methods
- Produces a `controlsTree` so you can inspect or bind form elements programmatically
- Lets you provide initial data, update it later, and read values back from the rendered form

## What this repo is for

This repo is useful when you have:

- a data schema already defined as JSON/JS objects
- a need to reuse the same input model in multiple screens
- a dashboard or admin UI that must render forms from metadata
- a use case where the form definition should be data-driven rather than hard-coded

Typical examples include:

- search/filter panels
- simple CRUD forms
- metadata-driven admin pages
- business forms driven by a column catalog

## What this repo is not for

This project does not try to be:

- a full form validation framework
- a backend/data service layer
- a component system with deep reactivity like React/Vue
- a universal UI framework for every complex form use case
- a replacement for app-specific business logic

It is intentionally small and opinionated: it renders declarative form structures, not a complete application runtime.

## Core API

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
    body: {
      columns: ["stockItemName", "batchName", "amount"]
    }
  },
  targetContainerId: "form-container"
});

const result = await form.render();
console.log(result.element);
console.log(form.getControlsTree());
```

## Important runtime requirement

This repository expects a `json-to-dom` builder to be available on `window.ks["json-to-dom"].buildSpecElement` when rendering. The demo page in `docs/index.html` includes a small fallback builder so the example still works locally, but in a real app you should provide the builder implementation that matches your DOM generation approach.

## Layouts and themes

The form exposes layout and theme support through the instance itself:

```javascript
form.setLayout({ inLayout: "stacked" });
form.setTheme({ inTheme: "dark" });
```

The current implementation supports layout/theme naming available in the versioned source tree, and the default values are:

- layout: `stacked`
- theme: `default`

## Data flow

The form instance supports:

- `data` for initial values
- `setData({ inData })` to replace form data
- `getData()` to read values back as a plain object
- `reset()` to reset the form element
- `load()` when a `dataProvider` is configured

Example:

```javascript
form.setData({
  stockItemName: "ROPE",
  batchName: "Tuf-Rs.170",
  amount: 420
});

const values = form.getData();
```

## Generated output

The form construction pipeline is:

1. `Form` stores columns + config + data
2. `buildSpec()` builds the form spec
3. `render()` creates the DOM node tree
4. `pruneTreeWithIds()` generates the `controlsTree`
5. the DOM is mounted into the target container

This makes the library handy when you want to bind or inspect specific form controls without tracking the entire DOM by hand.

## How to run the local demo

From the project root:

```bash
npm install
npm run build
```

Then serve the project locally and open the demo page in the browser.

Example:

```bash
npx vite
```

Then open the Vite served page and use the example in `docs/index.html`.

## Repo structure

- `src/` — library source
- `src/v1` to `src/v4` — versioned implementations
- `docs/` — demo and sample data
- `README.md` — project overview and API summary

## Why this repo exists

This repo exists to provide a simple, metadata-first way to build forms from JSON-like definitions. The idea is to shift form construction from manual DOM creation toward schema-driven rendering so the same configuration can be used across views, screens, and data models.

That is the core purpose of the project: declarative form rendering with minimal ceremony.

## Best fit vs. poor fit

Best fit:

- small-to-medium form UIs
- metadata-driven business data entry
- straightforward search/filter panels
- prototypes and internal admin tools

Poor fit:

- highly custom complex form UX
- nested form logic with heavy validation
- app-level state management that needs full reactivity
- workflows that require rich, custom widgets or backend-driven dynamic rules

## Summary

`json-to-dom-form` is a compact, schema-first form renderer. It is designed to take a column catalog and config and turn that into a usable DOM form with layout/theme support and a tree of controls that can be accessed programmatically.

It is intentionally narrow in scope. It is excellent for metadata-driven form generation, but not a replacement for a full UI framework or a complete business application layer.

