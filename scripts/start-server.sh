#!/bin/bash
if [ -f tmp/server.pid ]
then
  ./scripts/stop-server.sh
  sleep 1
fi
rm -f server.log
echo "Starting server"
node ./scripts/server.js --seneca.log.all > server.log &
echo $! > tmp/server.pid
echo "Server running pid=$(cat tmp/server.pid)"
