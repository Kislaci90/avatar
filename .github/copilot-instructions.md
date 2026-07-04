# AI Coding Rules

## Planning

- Before making any changes, always create a brief implementation plan.
- Do not modify any files until the plan has been presented.
- Wait for user confirmation before executing the plan if the request is ambiguous or involves significant changes.

## Code Changes

- Only modify files required to implement the requested feature or fix.
- Prefer the smallest, safest set of changes that solves the problem.
- Avoid unrelated refactoring or cleanup unless explicitly requested.
- Preserve the existing coding style and project conventions.

## Documentation

- Never create or modify `README.md`.
- Never create or modify Markdown documentation (`*.md`) unless explicitly requested.
- Do not create or modify `CHANGELOG.md`, `RELEASE_NOTES.md`, migration guides, or files under `docs/`.
- If documentation would normally be updated, state: "Documentation intentionally not updated per repository instructions."

## General

- Ask for clarification instead of making assumptions when requirements are unclear.
- Explain the reasoning behind significant implementation decisions.
- Verify that changes compile or pass relevant tests when possible.