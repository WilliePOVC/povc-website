#!/bin/sh
# Refresh the committed YouTube feed snapshot used when CI can't reach YouTube RSS.
set -e
cd "$(dirname "$0")/.."
curl -sf "https://www.youtube.com/feeds/videos.xml?playlist_id=UULFBZ2His5V_nTxXtBc4cxeUA" -o lib/podcast/feed-snapshot.xml
grep -c "<entry>" lib/podcast/feed-snapshot.xml
