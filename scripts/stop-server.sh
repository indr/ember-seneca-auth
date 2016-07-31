#!/bin/bash
if [ -f tmp/server.pid ]
then
  PID=$(cat tmp/server.pid)
  echo "Stopping server pid=$PID"
  kill -SIGINT $PID
  rm tmp/server.pid
  echo "Server stopped"
fi
