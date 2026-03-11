# TiDB Cloud Plan

Connecting this tool directly from the browser to TiDB Cloud is not the right production model. The better path is to keep the frontend as-is and add a thin backend that reads and writes shared workspace data into TiDB Cloud.

## Recommended Architecture

1. Frontend
   Use the existing static app for the interface.

2. API layer
   Add a lightweight service in Node, Python, or Go with endpoints such as:
   - `GET /api/workspaces/:id`
   - `POST /api/workspaces`
   - `PUT /api/workspaces/:id`
   - `POST /api/workspaces/:id/milestones`
   - `POST /api/workspaces/:id/criteria`
   - `POST /api/workspaces/:id/actions`

3. Database
   Persist the workspace and tracker records in TiDB Cloud using the schema in [tidb/schema.sql](/Users/sawyerhulme/Documents/New%20project/tidb/schema.sql).

4. Auth
   Add simple team auth so workspaces can be shared safely.

## Why This Is Better

- Keeps database credentials off the client
- Supports real multi-user collaboration
- Makes updates durable across browsers and machines
- Lets you layer on comments, history, and reporting later

## Good First Backend Scope

If you want a minimal shared version:

1. Store one `workspace`
2. Store `milestones`
3. Store `criteria`
4. Store `actions`
5. Store `issues`

That is enough to turn the current prototype into a useful team tracker.

## Suggested Next Step

If you want, the next iteration can be:

1. Add a small API server
2. Wire it to TiDB Cloud
3. Replace local storage with live fetch/save calls
4. Keep JSON export as a backup
