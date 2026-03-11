# SignalDesk

SignalDesk is a web-based joint execution plan workspace. It replaces the typical Excel JEP with a guided tool for keeping account alignment, milestones, success criteria, pilot tasks, next actions, issues, discovery notes, architecture context, and sizing decisions in one operating view.

## What It Solves

Traditional JEP spreadsheets are hard to maintain because the important information gets split across tabs, owners update different sections inconsistently, and the team loses the thread between success criteria and the work required to prove them.

SignalDesk fixes that by giving the team:

- A single account overview with the business outcome, current phase, and decision target.
- A milestone tracker that is easier to scan than a weekly spreadsheet grid.
- A success criteria board next to the pilot plan that proves those criteria.
- Separate operating queues for next actions and real blockers.
- Structured discovery, architecture, and sizing records that stay visible.
- Local persistence plus JSON import/export for easy handoff.

## Assignment Fit

This project satisfies the brief in the screenshot:

1. It was built using an AI coding agent as a productivity improvement tool.
2. It is ready to publish as a GitHub repo.
3. It includes an AI-generated summary in [PROJECT_SUMMARY.md](/Users/sawyerhulme/Documents/New%20project/PROJECT_SUMMARY.md).
4. It includes an optional TiDB Cloud implementation path in [TIDB_CLOUD_PLAN.md](/Users/sawyerhulme/Documents/New%20project/TIDB_CLOUD_PLAN.md).

## Files

- [index.html](/Users/sawyerhulme/Documents/New%20project/index.html): app shell and forms
- [styles.css](/Users/sawyerhulme/Documents/New%20project/styles.css): UI system and layout
- [app.js](/Users/sawyerhulme/Documents/New%20project/app.js): local app logic, persistence, rendering, import/export
- [PROJECT_SUMMARY.md](/Users/sawyerhulme/Documents/New%20project/PROJECT_SUMMARY.md): AI-written project summary
- [PUBLISH_CHECKLIST.md](/Users/sawyerhulme/Documents/New%20project/PUBLISH_CHECKLIST.md): exact publish steps
- [TIDB_CLOUD_PLAN.md](/Users/sawyerhulme/Documents/New%20project/TIDB_CLOUD_PLAN.md): optional TiDB Cloud path
- [tidb/schema.sql](/Users/sawyerhulme/Documents/New%20project/tidb/schema.sql): proposed relational model if you persist this app in TiDB

## Running It

This is a static app. Open [index.html](/Users/sawyerhulme/Documents/New%20project/index.html) in a browser.

The app stores data in browser local storage and lets you export/import the workspace as JSON.

## Publishing

The simplest path is GitHub plus GitHub Pages because the app has no build step.

See [PUBLISH_CHECKLIST.md](/Users/sawyerhulme/Documents/New%20project/PUBLISH_CHECKLIST.md) for the exact commands and repo setup flow.

## Optional TiDB Cloud Direction

The current app is local-first. If you want it to become a true shared tracker, the right architecture is:

1. Keep the current frontend.
2. Add a small API layer.
3. Persist workspaces and records in TiDB Cloud.
4. Add user auth and team-level sharing.

That plan is documented in [TIDB_CLOUD_PLAN.md](/Users/sawyerhulme/Documents/New%20project/TIDB_CLOUD_PLAN.md).
