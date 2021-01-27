#! /bin/bash

# touch secret.sh && chmod -x secret.sh
# CURSES_CREDS="name@1.1.1.1"
# DEPLOY=$CURSES_CREDS $(pwd)/scripts/deploy.sh
rsync -az $(pwd)/build/ $DEPLOY:/var/www/html/curses/