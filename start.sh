#!/bin/sh
set -eu
cd "$(dirname "$0")"
if command -v node >/dev/null 2>&1; then
  exec node server.mjs
fi
if command -v python3 >/dev/null 2>&1; then
  exec python3 -m http.server 4174 --bind 127.0.0.1
fi
echo "Please install Node.js or Python 3 to run infruite." >&2
exit 1
