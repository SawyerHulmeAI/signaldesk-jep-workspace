# Publish Checklist

## 1. Create The First Commit

Run these commands from this folder:

```bash
git add .
git commit -m "Build SignalDesk JEP workspace"
```

## 2. Create A GitHub Repo

Use GitHub web or GitHub CLI.

Suggested repo name:

```text
signaldesk-jep-workspace
```

If using GitHub CLI:

```bash
gh repo create signaldesk-jep-workspace --private --source=. --remote=origin --push
```

If you want it public, replace `--private` with `--public`.

## 3. Verify The Repo Contains

- The app files: `index.html`, `styles.css`, `app.js`
- The AI-written summary: `PROJECT_SUMMARY.md`
- The optional TiDB path: `TIDB_CLOUD_PLAN.md`

## 4. Deploy With GitHub Pages

Because this app is static, GitHub Pages is the fastest deployment path.

1. Open the repo on GitHub.
2. Go to `Settings` -> `Pages`.
3. Under `Build and deployment`, choose `Deploy from a branch`.
4. Select branch `main`.
5. Select folder `/ (root)`.
6. Save.

GitHub will publish the app after the first push. The live URL will show on the Pages settings screen.

## 5. What To Share For The Assignment

- GitHub repo link
- Live GitHub Pages link
- The summary from `PROJECT_SUMMARY.md`
- Optional note: “Future version can persist shared workspaces in TiDB Cloud”

## 6. If You Want True Multi-User Collaboration

The current version is local-first. To make it genuinely shared:

1. Add a backend API.
2. Store data in TiDB Cloud.
3. Add auth and workspace permissions.

The proposed data model is in `tidb/schema.sql`.
