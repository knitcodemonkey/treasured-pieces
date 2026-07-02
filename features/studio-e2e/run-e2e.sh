#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"

python3 -m http.server 4173 >/tmp/tp-e2e-http.log 2>&1 &
SERVER_PID=$!
cleanup() {
	kill "$SERVER_PID" >/dev/null 2>&1 || true
}
trap cleanup EXIT

npx playwright install chromium >/tmp/tp-e2e-playwright.log 2>&1
node features/studio-e2e/studio-e2e.test.cjs http://127.0.0.1:4173/index.html
