#!/bin/bash

USER=root
APP_DIR=/Users/admin/projects/product/tasybook/tasybook
GIT_REMOTE=origin
GET_BRANCH=master
PM2_NAME=TasyNuxt

sudo su - $USER << EOF
    cd $APP_DIR
    git status
    git pull $GIT_REMOTE $GET_BRANCH
    npm run build
    pm2 restart $PM2_NAME
EOF
