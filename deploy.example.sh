#!/bin/bash

USER=
APP_DIR=
APP_NAME=
GIT_REMOTE=
GET_BRANCH=
PM2_NAME=

sudo su - $USER << EOF
    cd $APP_DIR
    git status
    git pull $GIT_REMOTE $GET_BRANCH
    npm run build
    pm2 restart $PM2_NAME
EOF
