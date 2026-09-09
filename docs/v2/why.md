# Why this repo exists

This repo exists because form definitions often repeat the same structure in many places.

If you already have a column catalog, a config object, or a database schema, it is wasteful to manually write the same HTML repeatedly. The idea is to let the data describe the form and let the renderer build the DOM from that description.

## The main problem it solves

Manual form-building creates churn:

- repeated HTML for similar fields
- wrappers and layout code duplicated across screens
- awkward binding logic between schema and UI

This library keeps the system small and predictable by shifting the form definition to metadata.

## The tradeoff

This approach is powerful for simple and medium-complexity forms, but it does not try to solve every frontend pattern. It is intentionally narrow and focused.

## In one sentence

The repo exists to turn structured form metadata into working DOM forms with minimal boilerplate.
