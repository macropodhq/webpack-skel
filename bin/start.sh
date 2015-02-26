#!/bin/sh

[ -z "${PORT}" ] && PORT=8080

webpack-dev-server \
-d --hot --inline --display-reasons --display-error-details --history-api-fallback --progress \
--colors --port ${PORT} --output-public-path http://127.0.0.1:${PORT}/
