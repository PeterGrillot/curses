#! /bin/sh
killall node
cd api
node index.js &
cd ../build
http-server &
