#! /bin/sh
# Set up env var for your cloud creds ie: username@1.1.1.1:
# CURSES_CREDS='username@1.1.1.1'
# export CURSES_CREDS 

rsync -az $(pwd)/build/ $CURSES_CREDS:/var/www/html/curses/
