#!/bin/bash
SSH_CONFIG="${1}"
PROJECT_PATH="${2}"
SSH_KEY_PATH="${3}"

if [ -z "$SSH_CONFIG" ] || [ -z "$PROJECT_PATH" ] || [ -z "$SSH_KEY_PATH" ]; then
  if [ -f .env.deploy ]; then
    DEPLOY_USER=$(awk -F= '/^DEPLOY_USER=/{print $2}' .env.deploy | tr -d '\r')
    DEPLOY_HOST=$(awk -F= '/^DEPLOY_HOST=/{print $2}' .env.deploy | tr -d '\r')
    DEPLOY_PATH=$(awk -F= '/^DEPLOY_PATH=/{print $2}' .env.deploy | tr -d '\r')
    DEPLOY_KEY=$(awk -F= '/^SSH_KEY_PATH=/{print $2}' .env.deploy | tr -d '\r')

    SSH_CONFIG="${SSH_CONFIG:-${DEPLOY_USER}@${DEPLOY_HOST}}"
    PROJECT_PATH="${PROJECT_PATH:-$DEPLOY_PATH}"
    SSH_KEY_PATH="${SSH_KEY_PATH:-$DEPLOY_KEY}"
  fi
fi

scp -i "$SSH_KEY_PATH" -Cr .env "$SSH_CONFIG:${PROJECT_PATH}/shared/.env"
