#!/bin/bash
if [ -f tmp/server.pid ]
then
  PID=$(cat tmp/server.pid)
  if [ $(ps o cmd --pid $PID | grep -E '^node' | grep -E 'server\.js' -c) != '1' ]
  then
    echo "No running server with pid $PID found"
    exit 0
  fi
  echo "Stopping server pid=$PID"
  kill -SIGINT $PID
  rm tmp/server.pid
  echo "Server stopped"
fi
