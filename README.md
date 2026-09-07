# json-to-dom-form

Standalone, zero-dependency, config-driven Form renderer built on top of `json-to-dom`.

## Features
- **Config-Driven**: Input fields, buttons, labels, and placeholders generated automatically from column schemas.
- **Layouts & Themes**: Stacked, inline, and multi-theme support.
- **Tree Pruning**: Automatically generates `controlsTree` for easy programmatic binding to input events.

## Usage

```javascript
import { Form } from "./src/index.js";

const form = new Form({
    targetContainerId: "form-container",
    columns: sampleColumns,
    config: sampleSearchConfig
});

const renderResult = form.render();
```
