#!/usr/bin/env bash
#
# deploy.sh -- Build the WA Benefits Navigator and sync it to the Lightsail
# instance "risk-radar", where Caddy serves it at wabenefitsnavigator.org.
#
# Run this from your LAPTOP (not on the server), from the repo root:
#
#     ./deploy/deploy.sh user@<instance-ip-or-host>
#
# Example:
#     ./deploy/deploy.sh ubuntu@wabenefitsnavigator.org
#     ./deploy/deploy.sh ubuntu@52.12.34.56
#
# Requirements on your laptop: bash, node (for the build), rsync, ssh.
# Your SSH key for the Lightsail instance must already be set up.
#
# What it does:
#   1. Rebuilds the static site from TypeScript (npm run build:web).
#   2. Copies the freshly built web/ output into docs/ (the deploy artifact).
#   3. rsyncs docs/ up to /var/www/wa-benefits/docs on the instance.
#   4. Does NOT touch Caddy or the existing risks-radar app.
#
set -euo pipefail

REMOTE="${1:-}"
REMOTE_PATH="/var/www/wa-benefits/docs"

if [[ -z "$REMOTE" ]]; then
  echo "Usage: ./deploy/deploy.sh user@host" >&2
  echo "   e.g. ./deploy/deploy.sh ubuntu@wabenefitsnavigator.org" >&2
  exit 1
fi

# Move to repo root (directory above this script).
cd "$(dirname "$0")/.."

echo "==> Building the web app (tsc -> web/build) ..."
# Some environments ship a broken NODE_OPTIONS; unset it defensively.
unset NODE_OPTIONS || true
npm run build:web

echo "==> Refreshing docs/ from the web/ build output ..."
# docs/ is the deploy artifact. Keep it in sync with the latest build.
rsync -a --delete \
  --exclude '.nojekyll' \
  web/build/ docs/build/
cp web/index.html docs/index.html
cp web/styles.css docs/styles.css

echo "==> Syncing docs/ to ${REMOTE}:${REMOTE_PATH} ..."
# Ensure the remote directory exists, then sync. --delete removes stale files.
ssh "$REMOTE" "sudo mkdir -p '${REMOTE_PATH}' && sudo chown -R \$(whoami) '/var/www/wa-benefits'"
rsync -az --delete docs/ "${REMOTE}:${REMOTE_PATH}/"

echo ""
echo "==> Done. Live at: https://wabenefitsnavigator.org"
echo "    (If this is the first deploy, allow a few seconds for Caddy to"
echo "     obtain the HTTPS certificate on first request.)"
