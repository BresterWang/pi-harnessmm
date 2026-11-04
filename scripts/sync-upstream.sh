#!/usr/bin/env bash
# Rebase this fork onto jlon/pi-harnessmm, then push to origin.
# Usage: scripts/sync-upstream.sh [--push]
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

if [ -n "$(git status --porcelain)" ]; then
  echo "working tree is not clean; commit or stash first" >&2
  exit 1
fi

git fetch upstream --tags --prune
upstream_sha=$(git rev-parse --short upstream/HEAD)
local_sha=$(git rev-parse --short HEAD)
behind=$(git rev-list --count "HEAD..upstream/HEAD")

if [ "$behind" -eq 0 ]; then
  echo "already up to date with upstream ($upstream_sha)"
else
  echo "rebasing $behind commit(s) from $local_sha onto $upstream_sha"
  git rebase upstream/HEAD
fi

if [ "${1:-}" = "--push" ]; then
  # pi resets its checkout to origin/HEAD, so the fork has to carry the rebase.
  git push --force-with-lease origin HEAD
fi
