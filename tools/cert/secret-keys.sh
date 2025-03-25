#!/usr/bin/env bash

# imports secret key into keystore

set -e

if [ "$#" -lt 1 ]; then
    echo "usage: $0 domain"
    exit 1
fi

DOMAIN=$1

# List keys here

# Test Secret Key
./import-secret-key.sh $DOMAIN test_secret_key_name 28B28874C459468BA08688981A949F66
