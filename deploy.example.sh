#!/bin/bash

USER=root
APP_NAME=TasyNuxt
GIT_REMOTE=origin
GET_BRANCH=master

sudo su - $USER << EOF
    git status
    git pull $GIT_REMOTE $GET_BRANCH
EOF
