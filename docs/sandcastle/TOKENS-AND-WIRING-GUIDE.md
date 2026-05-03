# Sandcastle tokens and wiring (GH + LLM)

This guide walks through adding **GitHub** and **Anthropic** credentials for `.sandcastle/`, then validating each layer before you run the full factory.

---

## 1. What you need

| Secret | Env variable | Used for |
|--------|----------------|----------|
| Anthropic API key | `ANTHROPIC_API_KEY` | Claude inside Docker (Claude Code CLI) |
| GitHub PAT | `GH_TOKEN` | `gh` inside the sandbox (`gh issue list`, `gh issue view`, etc.) |

Sandcastle reads **`.sandcastle/.env`** (see also [SAND-CASTLE-AFK-FACTORY-GUIDE.md](SAND-CASTLE-AFK-FACTORY-GUIDE.md)).

---

## 2. Create the GitHub token

Personal access tokens are created under **your GitHub account**, not under a repository’s Settings page.

1. Open **[Generate new fine-grained personal access token](https://github.com/settings/personal-access-tokens/new)** (while signed in).
2. Choose **Resource owner** (your user or the org that owns the repo).
3. **Repository access**: select this repo only, or the repos Sandcastle should touch.
4. **Permissions** (minimum for current prompts):
   - **Issues**: Read and write — planner/implementer read issues; merger may close issues.
   - If agents **push branches or open PRs** from the sandbox, also grant **Contents** and **Pull requests** as your workflow requires.

Alternatively, use a **classic** token under [Developer settings → Tokens (classic)](https://github.com/settings/tokens): scope **`repo`** is the blunt option for private repos and full git/PR/issue access.

5. Generate the token and copy it once — GitHub will not show it again.

**Notes:**

- The GitHub CLI reads **`GH_TOKEN`** (and commonly **`GITHUB_TOKEN`** in automation). This repo’s `.env.example` uses `GH_TOKEN` to match `gh`.
- Never commit `.sandcastle/.env`; keep tokens out of git history and screenshots.

---

## 3. Create the Anthropic (LLM) API key

1. Sign in at **[Anthropic Console](https://console.anthropic.com/)**.
2. Go to **API keys** (or **Account → API keys**, depending on UI).
3. Create a key and copy it into `ANTHROPIC_API_KEY`.

---

## 4. Wire secrets locally

From the repository root:

```bash
cp .sandcastle/.env.example .sandcastle/.env
```

Edit **`.sandcastle/.env`** and set:

```dotenv
ANTHROPIC_API_KEY=sk-ant-api03-...
GH_TOKEN=github_pat_...   # or ghp_... for classic tokens
```

Save the file. Confirm `.sandcastle/.env` is gitignored (it should be).

---

## 5. Smoke tests (layered)

Run these in order. Stop when something fails and fix that layer before continuing.

### Level A — GitHub token on your machine (fast)

If you have `gh` installed locally:

```bash
export GH_TOKEN="paste-token-here"
gh auth status
gh issue list --repo OWNER/REPO --label s-castle --limit 5
```

Replace `OWNER/REPO` with your GitHub remote (e.g. `beneathatree/forecaste_v2`).  
You should see **`Logged in to github.com`** (via token) and either an empty list or your labeled issues. If you get **403** or **Resource not accessible**, fix repository selection or token permissions.

### Level B — GitHub token inside the Sandcastle Docker image

Build and run a one-shot check (overrides the image `ENTRYPOINT`):

```bash
docker build -t forecaste-sandcastle -f .sandcastle/Dockerfile .

docker run --rm \
  --entrypoint bash \
  -e GH_TOKEN \
  forecaste-sandcastle \
  -lc 'gh auth status && gh issue list --repo OWNER/REPO --label s-castle --limit 3'
```

Export `GH_TOKEN` in your shell first, or pass `-e GH_TOKEN=...` explicitly. Success means **`gh` in the container** can reach GitHub with your PAT.

### Level C — Dependencies and Sandcastle entrypoint (no API spend yet)

From repo root:

```bash
npm install
```

Optional: confirm the script resolves:

```bash
npx tsx --eval "console.log('tsx ok')"
```

If Level A/B passed and `.sandcastle/.env` is filled in, Sandcastle can load secrets when you run the factory (exact passthrough is handled by `@ai-hero/sandcastle` when using the Docker sandbox).

### Level D — Full wiring sample exercise (uses Anthropic API)

This validates **planner → sandbox → Claude → `gh`** end-to-end. It consumes API usage and may take several minutes.

**Before you start:**

1. In the GitHub repo, ensure label **`s-castle`** exists ([Labels](https://github.com/beneathatree/forecaste_v2/labels) or equivalent for your fork).
2. Open **one small test issue**, e.g. “Smoke test: add a one-line comment to README” or a trivial docs tweak, and add the **`s-castle`** label.
3. Confirm `.sandcastle/.env` has both `ANTHROPIC_API_KEY` and `GH_TOKEN`.

**Run:**

```bash
npm run sandcastle
```

**What “working” looks like:**

- Logs show iterations starting; the planner phase runs `gh issue list` (label `s-castle`) via prompt injection.
- If issues are planned, implementer sandboxes start; you see agent activity and eventually commits or completion logs.
- Failures often cluster as: **missing/wrong `GH_TOKEN`** (401/403 in logs), **missing `ANTHROPIC_API_KEY`**, **Docker not running**, or **no labeled issues** (factory may exit early by design).

**After the exercise:** Close or relabel the test issue so it is not picked up again unintentionally.

---

## 6. Quick checklist

- [ ] Fine-grained PAT created via [personal access tokens (new)](https://github.com/settings/personal-access-tokens/new) (or classic token with appropriate scopes).
- [ ] Anthropic key created in console.
- [ ] `.sandcastle/.env` exists (copied from `.env.example`) and is **not** committed.
- [ ] Level A or B: `gh auth status` succeeds with `GH_TOKEN`.
- [ ] Label **`s-castle`** exists; test issue labeled when running Level D.

---

## Reference links

- [Generate new fine-grained personal access token](https://github.com/settings/personal-access-tokens/new)
- [Anthropic Console — API keys](https://console.anthropic.com/)
- Repo factory overview: [SAND-CASTLE-AFK-FACTORY-GUIDE.md](SAND-CASTLE-AFK-FACTORY-GUIDE.md)
