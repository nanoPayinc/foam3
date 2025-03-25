#!/usr/bin/env bash
# Queries for a key in the keystore.
# NOTE: review/update variables before use

if [ "$#" -ne 2 ]; then
    echo "usage: $0 domain alias"
    exit 1
fi

set -e
DOMAIN=$1
ALIAS=$2
PASSWORD=$DOMAIN

# Set Name variables
DNAME="
CN=$DOMAIN
OU=R&D
O=$DOMAIN
L=Toronto
S=ON
C=CA
"

echo "keytool query key"

keytool -list -v \
        -alias "$ALIAS" \
        -keypass "$PASSWORD" \
        -keyalg PBEWithHmacSHA256AndAES_256 \
        -keystore "$DOMAIN.jks" \
        -storepass "$PASSWORD" \
        -storetype PKCS12

echo -e "Success!"
echo
