# Architecture

The repository is organized around a small pipeline.

## Top-level structure

- `src/` — library source
- `src/v1` to `src/v4` — versioned implementations
- `docs/` — demo and supporting documentation

## Main runtime flow

```text
Form
  -> FormStore
  -> buildSpec / buildForm
  -> renderForm
  -> DOM elements
  -> controlsTree
```

## Important pieces

### Form
The main public class. It manages configuration, columns, layout, theme, and runtime actions.

### FormStore
Stores the input schema and active form data. It resolves the active columns from the provided catalog.

### buildForm
Builds the form specification tree from active columns and config.

### renderForm
Converts the form spec into actual DOM nodes and mounts them into a target container.

### controlsTree
A pruned tree of rendered controls used for easier programmatic access and binding.

## Why the repo is split by version

The `v1` to `v4` folders show the project evolved over time. The current exported entry is the latest version, while older versions remain in the repo for compatibility and reference.

## Design intent

The architecture favors:

- small public surface area
- config-first rendering
- low coupling between schema and DOM output
- predictable runtime behavior

It is not designed to be a heavy framework runtime.
