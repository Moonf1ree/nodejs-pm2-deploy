#!/bin/bash
SSH_CONFIG="${1}"
PROJECT_PATH="${2}"
SSH_KEY_PATH="${3}"
scp -i "$SSH_KEY_PATH" -Cr .env "$SSH_CONFIG:${PROJECT_PATH}/shared/.env"
