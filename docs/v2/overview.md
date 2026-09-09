# Overview

`json-to-dom-form` is a metadata-driven form renderer.

It accepts a schema of columns and a config object, then turns that into a DOM form. The core idea is simple: instead of hard-coding HTML and wiring each field by hand, the form is generated from structured data.

## What it is

This project is a small library for creating forms from JSON-like definitions. It is especially useful when the input model already exists as metadata and you want to render the UI from that source of truth.

## What it is not

It is not:

- a full form validation framework
- a backend or data service layer
- a general UI framework
- a replacement for app-specific business logic

## Typical use cases

- search/filter panels
- CRUD-like forms
- metadata-driven admin screens
- simple forms where the field list is known ahead of time

## Core idea

The repo separates three things:

1. the column schema
2. the render config
3. the runtime form instance

That model keeps the form definition data-first and reusable.
