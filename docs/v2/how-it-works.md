# How it works

The form flow is straightforward.

## 1. Define columns

Each field is usually described with metadata such as:

- `key`
- `label`
- `type`

These columns become the raw field catalog.

## 2. Define config

The config tells the renderer how to organize those fields:

- which fields are active
- which layout to use
- which theme to apply
- whether there are head/body/foot sections

## 3. Build the form instance

The `Form` class stores:

- data
- columns
- config
- theme and layout state

It builds a form spec and then renders it into a target container.

## 4. Render DOM

The library builds a spec tree and hands it to a DOM-building utility. That output is mounted into the page.

## 5. Track controls

The project also prunes the structure and creates a `controlsTree`, which gives you a structured view of the rendered controls. This makes it easier to inspect or bind fields.

## 6. Read data back

Once rendered, the form can be updated, reset, or read back with `getData()`.

This keeps the library lightweight while still supporting common form operations.
